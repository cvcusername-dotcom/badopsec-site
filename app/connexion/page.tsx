"use client";

import { FormEvent, ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { supabase } from "@/Lib/supabaseClient";

export default function ConnexionPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rateLimitSeconds, setRateLimitSeconds] = useState<number | null>(null);

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getAuthErrorMessage = (error: { message: string; status?: number }) => {
    const message = error?.message?.toLowerCase() ?? "";
    if (error.status === 429 || message.includes("rate limit") || message.includes("too many")) {
      return "Trop de tentatives. Attendez quelques minutes et réessayez.";
    }
    if (error.status === 422) {
      if (message.includes("invalid email") || message.includes("invalid request")) {
        return "Adresse email invalide. Vérifiez votre saisie.";
      }
    }
    if (message.includes("email not confirmed") || message.includes("not confirmed")) {
      return "Email non confirmé. Vérifie ta boîte mail et confirme ton adresse avant de te connecter.";
    }
    if (message.includes("invalid login credentials") || message.includes("invalid login")) {
      return "Identifiants invalides. Vérifie ton email et ton mot de passe.";
    }
    return error.message;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !isEmailValid(formData.email)) {
      setErrorMessage("Veuillez saisir une adresse email valide.");
      return;
    }

    if (!formData.password) {
      setErrorMessage("Veuillez saisir votre mot de passe.");
      return;
    }

    if (rateLimitSeconds) {
      setErrorMessage("Vous devez attendre avant de réessayer.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    const response = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (response.error) {
      const message = getAuthErrorMessage(response.error);
      setErrorMessage(message);
      if (response.error.status === 429 || message.toLowerCase().includes("trop de tentatives") || message.toLowerCase().includes("rate limit")) {
        setRateLimitSeconds(60);
      }
      return;
    }

    setIsSubmitted(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (rateLimitSeconds === null) {
      return;
    }
    if (rateLimitSeconds <= 0) {
      setRateLimitSeconds(null);
      return;
    }
    const timer = window.setTimeout(() => {
      setRateLimitSeconds(rateLimitSeconds - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [rateLimitSeconds]);

  return (
    <main className="h-screen min-h-screen overflow-auto bg-background bg-[url('/25e45cf3153f5d88e4833a5133ffd821.jpg')] bg-center bg-cover bg-fixed text-white">
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative w-full max-w-[420px] py-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm">
              <span className="w-8 h-8 rounded-full bg-violet-500/15 flex items-center justify-center text-violet-200">BS</span>
              BadOpsec
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:border-violet-400 transition-all">
              <ArrowLeft className="w-4 h-4" />
              RETOUR
            </Link>
          </div>

          <FadeIn>
            <div className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(30,10,80,0.5)] backdrop-blur-xl">
              <div className="mb-8 flex flex-col items-center gap-4 text-center">
                <div className="grid place-items-center rounded-3xl bg-violet-500/10 p-5 shadow-[0_20px_60px_rgba(142,92,243,0.18)]">
                  <Lock className="w-8 h-8 text-violet-200" />
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-white/5 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-violet-100">
                  AUTHENTIFICATION SÉCURISÉE
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight">
                  Accès <span className="gradient-text">Client</span>
                </h1>
                <p className="max-w-[420px] text-sm text-muted-foreground">
                  Connectez-vous avec votre clé ou vos identifiants.
                </p>
              </div>

              {isSubmitted ? (
                <div className="space-y-6 text-center py-10">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10 text-violet-200">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-semibold">Connexion réussie !</h2>
                  <p className="text-sm text-muted-foreground">Tu es maintenant connecté. Accède au dashboard.</p>
                  <Link href="/profile" className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-violet-400 px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(142,92,243,0.25)]">
                    Voir mon profil
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="mb-3 block text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                      Email
                    </label>
                    <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner shadow-black/10">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-transparent text-white outline-none placeholder:text-white/40"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-3 block text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                      Mot de passe
                    </label>
                    <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner shadow-black/10">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••••••••"
                        className="w-full bg-transparent text-white outline-none placeholder:text-white/40"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || rateLimitSeconds !== null}
                    className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-violet-400 px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(142,92,243,0.25)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {rateLimitSeconds !== null
                      ? `Réessayez dans ${rateLimitSeconds}s`
                      : isLoading
                      ? "Connexion en cours..."
                      : "Accéder au Dashboard →"}
                  </button>

                  {errorMessage ? (
                    <p className="pt-4 text-center text-sm text-rose-300">{errorMessage}</p>
                  ) : null}

                  <div className="pt-4 text-center text-xs text-muted-foreground">
                    Pas encore de compte ? <Link href="/inscription" className="text-white font-semibold hover:text-violet-200">Créer un compte</Link>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
