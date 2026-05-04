"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/Lib/supabaseClient";
import { Navbar } from "@/components/ui/Navbar";

const ADMIN_EMAIL = "ffef8191@gmail.com";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session?.user) {
        setLoading(false);
        setUser(null);
        return;
      }
      setUser(data.session.user);
      setLoading(false);
    };

    load();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/connexion");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background bg-[url('/25e45cf3153f5d88e4833a5133ffd821.jpg')] bg-center bg-cover bg-fixed text-white flex items-center justify-center px-4 py-12">
        <div className="rounded-[2rem] border border-violet-500/10 bg-white/5 p-10 shadow-[0_40px_120px_rgba(124,58,237,0.18)] backdrop-blur-xl">
          <p>Chargement du profil...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background bg-[url('/25e45cf3153f5d88e4833a5133ffd821.jpg')] bg-center bg-cover bg-fixed text-white px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-violet-500/10 bg-white/5 p-10 shadow-[0_40px_120px_rgba(124,58,237,0.18)] backdrop-blur-xl text-center">
          <h1 className="text-3xl font-semibold mb-4">Vous n’êtes pas connecté</h1>
          <p className="text-violet-200 mb-6">Connectez-vous pour accéder à votre espace personnel.</p>
          <Link href="/connexion" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:brightness-110 transition">
            Se connecter
          </Link>
        </div>
      </main>
    );
  }

  const role = user.user_metadata?.role ?? "user";
  const isAdmin = user.email === ADMIN_EMAIL;

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-background bg-[url('/25e45cf3153f5d88e4833a5133ffd821.jpg')] bg-center bg-cover bg-fixed text-white pt-24">
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.25),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.16),_transparent_32%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 space-y-10">
        <section className="rounded-[2rem] border border-violet-500/15 bg-[#110c1f]/90 p-8 shadow-[0_40px_120px_rgba(109,40,217,0.18)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/70">Mon profil</p>
              <h1 className="mt-4 text-5xl font-semibold text-white">Bienvenue sur votre espace</h1>
              <p className="mt-4 max-w-xl text-sm text-violet-200/90">Vous pouvez gérer vos informations, vous déconnecter, et accéder au dashboard admin si vous êtes l’utilisateur autorisé.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:brightness-110 transition"
                >
                  Dashboard admin
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white border border-white/10 hover:bg-white/15 transition"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6 rounded-[2rem] border border-violet-500/10 bg-[#120a1f]/80 p-8 shadow-[0_40px_90px_rgba(124,58,237,0.14)] backdrop-blur-xl">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-inner shadow-violet-500/5">
              <p className="text-sm uppercase tracking-[0.24em] text-violet-200/70 mb-4">Info de compte</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-violet-300/70 mb-2">Email</p>
                  <p className="text-base font-semibold text-white break-all">{user.email || "Non renseigné"}</p>
                </div>
                <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-violet-300/70 mb-2">Rôle</p>
                  <p className="text-base font-semibold text-white">{role}</p>
                </div>
                <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-violet-300/70 mb-2">Connexion</p>
                  <p className="text-base font-semibold text-white">{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "Aucune donnée"}</p>
                </div>
                <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-violet-300/70 mb-2">Admin réel</p>
                  <p className={`text-base font-semibold ${isAdmin ? "text-emerald-300" : "text-rose-300"}`}>{isAdmin ? "Oui" : "Non"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-violet-500/10 bg-white/5 p-6 shadow-inner shadow-violet-500/5">
              <p className="text-sm uppercase tracking-[0.24em] text-violet-200/70 mb-4">Résumé</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-[#130a21]/80 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-violet-300/70">Compte</p>
                  <p className="mt-2 text-lg font-semibold text-white">{user.email ? "Actif" : "Inconnu"}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#130a21]/80 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-violet-300/70">Accès admin</p>
                  <p className="mt-2 text-lg font-semibold text-white">{isAdmin ? "Autorisé" : "Restreint"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 rounded-[2rem] border border-violet-500/10 bg-[#120a1f]/80 p-8 shadow-[0_40px_90px_rgba(124,58,237,0.14)] backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Actions rapides</h2>
            <div className="space-y-4">
              <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-violet-300/70 mb-2">Recherche</p>
                <Link href="/" className="text-violet-200 underline hover:text-violet-100">Retour à l’accueil</Link>
              </div>
              <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-violet-300/70 mb-2">Connexion</p>
                <Link href="/connexion" className="text-violet-200 underline hover:text-violet-100">Changer de session</Link>
              </div>
              <div className="rounded-3xl border border-violet-500/10 bg-[#130a21]/80 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-violet-300/70 mb-2">Admin</p>
                <p className="text-sm text-white/80">Seul l’email {ADMIN_EMAIL} a l’accès admin réel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
