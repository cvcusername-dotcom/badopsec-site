import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAIL = "ffef8191@gmail.com";
const missingSupabaseConfig = !SUPABASE_URL || !SERVICE_ROLE_KEY;

const getAdminClient = () => {
  if (missingSupabaseConfig) {
    throw new Error("Missing SUPABASE configuration. Vérifiez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

const getUserFromToken = async (accessToken: string) => {
  try {
    const adminClient = getAdminClient();
    const { data, error } = await adminClient.auth.getUser(accessToken);
    if (error) {
      console.error("Error getting user from token:", error);
      return null;
    }
    return data?.user || null;
  } catch (err) {
    console.error("Exception in getUserFromToken:", err);
    return null;
  }
};

const isAdminUser = (user: { email?: string | null } | null) => {
  return user?.email === ADMIN_EMAIL;
};

export async function GET(request: Request) {
  if (missingSupabaseConfig) {
    return NextResponse.json({ error: "Configuration Supabase manquante sur le serveur. Ajoutez SUPABASE_SERVICE_ROLE_KEY." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization") || "";
  const accessToken = authHeader.replace("Bearer ", "").trim();
  if (!accessToken) {
    return NextResponse.json({ error: "Token d’authentification manquant." }, { status: 401 });
  }

  const user = await getUserFromToken(accessToken);
  if (!user || !isAdminUser(user)) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const adminClient = getAdminClient();
  const { data, error } = await adminClient.auth.admin.listUsers({ perPage: 200 });
  if (error || !data?.users) {
    return NextResponse.json({ error: "Impossible de récupérer les utilisateurs." }, { status: 500 });
  }

  const users = data.users.map((item) => ({
    id: item.id,
    email: item.email,
    role: item.user_metadata?.role || "user",
    created_at: item.created_at,
    confirmed: !!item.email_confirmed_at,
  }));

  return NextResponse.json({ users });
}

export async function PATCH(request: Request) {
  if (missingSupabaseConfig) {
    return NextResponse.json({ error: "Configuration Supabase manquante sur le serveur. Ajoutez SUPABASE_SERVICE_ROLE_KEY." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization") || "";
  const accessToken = authHeader.replace("Bearer ", "").trim();
  if (!accessToken) {
    return NextResponse.json({ error: "Token d’authentification manquant." }, { status: 401 });
  }

  const user = await getUserFromToken(accessToken);
  if (!user || !isAdminUser(user)) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const userId = typeof body?.userId === "string" ? body.userId.trim() : "";
  const role = typeof body?.role === "string" ? body.role.trim() : "";

  if (!userId || !role) {
    return NextResponse.json({ error: "userId et role sont requis." }, { status: 400 });
  }

  if (!["user", "admin", "week", "month", "year"].includes(role)) {
    return NextResponse.json({ error: "Role invalide. Seuls 'user', 'admin', 'week', 'month' ou 'year' sont autorisés." }, { status: 400 });
  }

  const adminClient = getAdminClient();
  const { data, error } = await adminClient.auth.admin.updateUserById(userId, {
    user_metadata: { role },
  });

  if (error || !data?.user) {
    return NextResponse.json({ error: "Impossible de mettre à jour le rôle." }, { status: 500 });
  }

  return NextResponse.json({ user: { id: data.user.id, email: data.user.email, role: data.user.user_metadata?.role || "user" } });
}
