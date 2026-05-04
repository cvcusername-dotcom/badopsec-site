import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { ChevronLeft } from "lucide-react";

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-background bg-[url('/25e45cf3153f5d88e4833a5133ffd821.jpg')] bg-center bg-cover bg-fixed text-white pt-24">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 space-y-10">
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition">
              <ChevronLeft className="w-4 h-4" /> Retour
            </Link>
            <span className="uppercase tracking-[0.35em] text-xs text-violet-300/80">Politique de confidentialité</span>
          </div>

          <section className="rounded-[2rem] border border-violet-500/20 bg-[#0f0820]/95 p-10 shadow-[0_40px_100px_rgba(124,58,237,0.18)] backdrop-blur-xl">
            <h1 className="text-4xl font-semibold text-white mb-6">Politique de confidentialité</h1>
            <p className="text-sm leading-7 text-white/80 mb-6">
              Votre confiance est essentielle. Cette politique décrit comment nous collectons, utilisons et protégeons vos données personnelles.
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">1. Données collectées</h2>
                <p className="text-sm leading-7 text-white/75 mb-3">
                  Nous collectons uniquement les informations nécessaires à votre authentification et à la gestion de votre compte : adresse email, métadonnées de compte et données d’usage.</p>
                <ul className="list-disc list-inside text-sm text-white/75 space-y-2">
                  <li>Email et mot de passe sécurisé via Supabase.</li>
                  <li>Rôle utilisateur et métadonnées de profil.</li>
                  <li>Logs d’accès et activité pour la sécurité.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">2. Utilisation des données</h2>
                <p className="text-sm leading-7 text-white/75">
                  Les données servent à : authentifier les utilisateurs, sécuriser le service, gérer les droits d’accès, et améliorer la plateforme.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">3. Partage externe</h2>
                <p className="text-sm leading-7 text-white/75 mb-3">
                  Nous ne partageons pas vos données personnelles avec des tiers sauf pour des besoins techniques stricts et avec votre consentement explicite.</p>
                <p className="text-sm leading-7 text-white/75">
                  Les services externes utilisés sont limités à Supabase pour l’authentification et à des fournisseurs d’hébergement sécurisés pour l’infrastructure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">4. Protection et conservation</h2>
                <p className="text-sm leading-7 text-white/75 mb-3">
                  Nous appliquons des contrôles d’accès stricts, un chiffrement des données au repos et une surveillance des activités suspectes.</p>
                <p className="text-sm leading-7 text-white/75">
                  Les données sont conservées aussi longtemps que nécessaire pour le service, puis supprimées ou anonymisées conformément aux exigences légales.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">5. Vos droits</h2>
                <ul className="list-disc list-inside text-sm text-white/75 space-y-2">
                  <li>Droit d’accès, de rectification et de suppression.</li>
                  <li>Droit de portabilité des données.</li>
                  <li>Droit de limiter ou d’opposer le traitement.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
