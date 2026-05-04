"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { supabase } from "@/Lib/supabaseClient";
import { Navbar } from "@/components/ui/Navbar";

type AdminUser = {
  id: string;
  email: string | null;
  role: string;
  created_at: string | null;
  confirmed: boolean;
};

const ADMIN_EMAIL = "ffef8191@gmail.com";

export default function DashboardPage() {
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "user" | "admin" | "week" | "month" | "year">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "unconfirmed">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [pendingUser, setPendingUser] = useState<AdminUser | null>(null);
  const [pendingRole, setPendingRole] = useState<"user" | "admin" | "week" | "month" | "year">("user");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter((account) => {
      const emailMatch = account.email?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
      const roleMatch = roleFilter === "all" || account.role === roleFilter;
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "confirmed" && account.confirmed) ||
        (statusFilter === "unconfirmed" && !account.confirmed);

      const createdAt = account.created_at ? new Date(account.created_at) : null;
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;
      const toDateEnd = toDate ? new Date(toDate) : null;
      if (toDateEnd) {
        toDateEnd.setHours(23, 59, 59, 999);
      }
      const dateMatch =
        (!fromDate || (createdAt && createdAt >= fromDate)) &&
        (!toDateEnd || (createdAt && createdAt <= toDateEnd));

      return emailMatch && roleMatch && statusMatch && dateMatch;
    });
  }, [users, searchQuery, roleFilter, statusFilter, dateFrom, dateTo]);

  const totalUsers = users.length;
  const adminCount = users.filter((account) => account.role === "admin").length;
  const confirmedCount = users.filter((account) => account.confirmed).length;
  const pendingCount = totalUsers - confirmedCount;
  const newUsersThisWeek = users.filter((account) => {
    if (!account.created_at) return false;
    const created = new Date(account.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return created >= weekAgo;
  }).length;

  const fetchUsers = async (accessToken: string) => {
    setLoading(true);
    setError(null);
    const response = await fetch("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Impossible de charger les utilisateurs.");
      setLoading(false);
      return;
    }

    const data = await response.json();
    setUsers(data.users || []);
    setLastUpdate(new Date().toLocaleString());
    setLoading(false);
  };

  useEffect(() => {
    let refreshInterval: ReturnType<typeof setInterval> | null = null;

    const load = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;
      setSessionLoaded(true);
      
      if (!session) {
        setLoading(false);
        return;
      }

      setUser(session.user);
      
      // Only fetch users if user is admin
      if (session.user?.email === ADMIN_EMAIL) {
        await fetchUsers(session.access_token);
        
        if (refreshInterval === null) {
          refreshInterval = setInterval(() => {
            if (session?.access_token) {
              fetchUsers(session.access_token);
            }
          }, 30000);
        }
      } else {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, []);

  const isAdmin = !!user && user.email === ADMIN_EMAIL;
  // Don't display admin email in UI
  const displayAdminEmail = isAdmin ? "Admin" : ADMIN_EMAIL;

  const handleRoleChange = async (userId: string, newRole: string) => {
    setSavingId(userId);
    setError(null);

    const { data } = await supabase.auth.getSession();
    const accessToken = data?.session?.access_token;
    if (!accessToken) {
      setError("Session manquante. Veuillez vous reconnecter.");
      setSavingId(null);
      return;
    }

    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ userId, role: newRole }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Impossible de mettre à jour le rôle.");
      setSavingId(null);
      return;
    }

    const updated = await response.json();
    setUsers((current) => current.map((item) => (item.id === userId ? { ...item, role: updated.user.role } : item)));
    setSavingId(null);
  };

  if (!sessionLoaded) {
    return (
      <main className="min-h-screen bg-background bg-[url('/25e45cf3153f5d88e4833a5133ffd821.jpg')] bg-center bg-cover bg-fixed text-white flex items-center justify-center px-4 py-12">
        <div className="rounded-[2rem] border border-violet-500/10 bg-white/5 p-10 shadow-[0_40px_120px_rgba(124,58,237,0.18)] backdrop-blur-xl">
          <p>Chargement...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background bg-[url('/25e45cf3153f5d88e4833a5133ffd821.jpg')] bg-center bg-cover bg-fixed text-white px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-violet-500/10 bg-white/5 p-10 shadow-[0_40px_120px_rgba(124,58,237,0.18)] backdrop-blur-xl">
          <h1 className="text-3xl font-semibold mb-4">Accès restreint</h1>
          <p className="text-violet-200 mb-6">Vous devez être connecté pour accéder au dashboard.</p>
          <Link href="/connexion" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:brightness-110 transition">
            Se connecter
          </Link>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-background bg-[url('/25e45cf3153f5d88e4833a5133ffd821.jpg')] bg-center bg-cover bg-fixed text-white px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-violet-500/10 bg-white/5 p-10 shadow-[0_40px_120px_rgba(124,58,237,0.18)] backdrop-blur-xl">
          <h1 className="text-3xl font-semibold mb-4">Accès refusé</h1>
          <p className="text-violet-200 mb-6">Votre compte n’a pas les droits nécessaires pour accéder à cette page.</p>
          <p className="text-sm text-white/80">Seul l'administrateur peut voir et gérer les comptes.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-background bg-[url('/25e45cf3153f5d88e4833a5133ffd821.jpg')] bg-center bg-cover bg-fixed text-white px-4 pt-28 pb-12">
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.22),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(124,58,237,0.18),_transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-violet-500/10 bg-[#120a1f]/90 p-8 shadow-[0_40px_120px_rgba(124,58,237,0.16)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Administration</p>
              <h1 className="mt-3 text-5xl font-semibold text-white">Dashboard admin</h1>
              <p className="mt-4 text-sm text-violet-200/85">Seul l'administrateur peut ouvrir cette page. Ici vous pouvez gérer les comptes, rechercher les utilisateurs et définir leur rôle.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white border border-violet-500/20 hover:bg-white/15 transition"
              >
                Mon profil
              </Link>
              <button
                onClick={async () => {
                  const { data } = await supabase.auth.getSession();
                  if (data?.session?.access_token) await fetchUsers(data.session.access_token);
                }}
                className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-400 transition"
              >
                Actualiser
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-violet-500/10 bg-[#120a1f]/90 p-6 shadow-[0_40px_100px_rgba(124,58,237,0.12)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Utilisateurs</p>
            <p className="mt-4 text-4xl font-semibold">{totalUsers}</p>
            <p className="mt-2 text-sm text-white/70">Comptes inscrits</p>
          </div>
          <div className="rounded-[2rem] border border-violet-500/10 bg-[#120a1f]/90 p-6 shadow-[0_40px_100px_rgba(124,58,237,0.12)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Admins</p>
            <p className="mt-4 text-4xl font-semibold">{adminCount}</p>
            <p className="mt-2 text-sm text-white/70">Rôles admin attribués</p>
          </div>
          <div className="rounded-[2rem] border border-violet-500/10 bg-[#120a1f]/90 p-6 shadow-[0_40px_100px_rgba(124,58,237,0.12)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Confirmés</p>
            <p className="mt-4 text-4xl font-semibold">{confirmedCount}</p>
            <p className="mt-2 text-sm text-white/70">Comptes vérifiés</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-violet-500/10 bg-[#120a1f]/90 p-8 shadow-[0_40px_100px_rgba(124,58,237,0.12)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Recherche & filtres</h2>
              <p className="mt-2 text-sm text-violet-200/80">Trouvez un utilisateur rapidement et filtrez par rôle, statut ou date d’inscription.</p>
            </div>
            <div className="grid gap-3 w-full md:w-auto md:grid-cols-[minmax(220px,_1fr)_minmax(180px,_1fr)]">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Rechercher un email..."
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50"
              />
              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value as "all" | "user" | "admin" | "week" | "month" | "year")}
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="all">Tous les rôles</option>
                <option value="admin">Admin</option>
                <option value="year">1 an</option>
                <option value="month">1 mois</option>
                <option value="week">1 semaine</option>
                <option value="user">User</option>
              </select>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as "all" | "confirmed" | "unconfirmed")}
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="confirmed">Confirmé</option>
                <option value="unconfirmed">Non confirmé</option>
              </select>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-xs text-white/70">
                  Du
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(event) => setDateFrom(event.target.value)}
                    className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2 text-xs text-white/70">
                  Au
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(event) => setDateTo(event.target.value)}
                    className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-violet-500/10 bg-[#120a1f]/90 p-8 shadow-[0_40px_100px_rgba(124,58,237,0.12)] backdrop-blur-xl">
          {error ? <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100 mb-6">{error}</div> : null}
          {loading ? (
            <div className="text-center py-12">Chargement des utilisateurs...</div>
          ) : (
            <div className="overflow-x-auto rounded-[1.75rem] border border-white/10 bg-[#09070f]/80">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-white/5 text-white/70">
                  <tr>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Rôle</th>
                    <th className="px-4 py-3">Créé le</th>
                    <th className="px-4 py-3">Confirmé</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-sm text-white/60">
                        Aucun utilisateur ne correspond à cette recherche.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((account) => (
                      <tr key={account.id} className="transition-colors hover:bg-white/5">
                        <td className="px-4 py-4">{account.email || "(sans email)"}</td>
                        <td className="px-4 py-4 capitalize">{account.role}</td>
                        <td className="px-4 py-4">{account.created_at ? new Date(account.created_at).toLocaleString() : "-"}</td>
                        <td className="px-4 py-4">{account.confirmed ? "Oui" : "Non"}</td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => {
                              setPendingUser(account);
                              setPendingRole(account.role as "user" | "admin" | "week" | "month" | "year");
                              setIsModalOpen(true);
                            }}
                            className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/10 hover:brightness-105 transition"
                          >
                            Modifier le rôle
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-[2rem] border border-violet-500/10 bg-[#120a1f]/90 p-8 shadow-[0_40px_100px_rgba(124,58,237,0.12)] backdrop-blur-xl">
          <h2 className="text-2xl font-semibold mb-4">Infos clés</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70 mb-2">Administration</p>
              <p className="text-white/80">Seul l'administrateur a l'accès à ce dashboard.</p>
            </div>
            <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70 mb-2">Rôles</p>
              <p className="text-white/80">Vous pouvez attribuer les rôles <strong>user</strong>, <strong>1 semaine</strong>, <strong>1 mois</strong>, <strong>1 an</strong> ou <strong>admin</strong> à chaque compte.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70 mb-2">Nouveaux (7 jours)</p>
              <p className="text-3xl font-semibold">{newUsersThisWeek}</p>
            </div>
            <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70 mb-2">Filtrés</p>
              <p className="text-3xl font-semibold">{filteredUsers.length}</p>
            </div>
            <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70 mb-2">Dernière mise à jour</p>
              <p className="text-sm text-white/80">{lastUpdate || "Jamais"}</p>
            </div>
          </div>
        </section>
      </div>

      {isModalOpen && pendingUser ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
          <div className="w-full max-w-2xl rounded-[2rem] border border-violet-500/20 bg-[#110816] p-8 shadow-2xl shadow-violet-900/30">
            <h2 className="text-3xl font-semibold text-white mb-4">Confirmation du rôle</h2>
            <p className="text-sm text-violet-200/80 mb-6">Vous êtes sur le point de modifier le rôle de <strong>{pendingUser.email || "(sans email)"}</strong>.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70 mb-3">Rôle actuel</p>
                <p className="text-lg font-semibold capitalize">{pendingUser.role}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70 mb-3">Nouveau rôle</p>
                <select
                  value={pendingRole}
                  onChange={(event) => setPendingRole(event.target.value as "admin" | "user" | "week" | "month" | "year")}
                  className="w-full rounded-3xl border border-white/10 bg-[#09070f] px-4 py-3 text-sm text-white outline-none"
                >
                  <option value="user">user</option>
                  <option value="week">1 semaine</option>
                  <option value="month">1 mois</option>
                  <option value="year">1 an</option>
                  <option value="admin">admin</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Annuler
              </button>
              <button
                onClick={async () => {
                  if (!pendingUser) return;
                  setIsModalOpen(false);
                  await handleRoleChange(pendingUser.id, pendingRole);
                  setPendingUser(null);
                }}
                disabled={savingId === pendingUser?.id}
                className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:brightness-105 transition disabled:opacity-50"
              >
                {savingId === pendingUser?.id ? "Enregistrement..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
    </>
  );
}
