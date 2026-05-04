import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { ChevronLeft } from "lucide-react";

export default function ConditionsPage() {
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
            <span className="uppercase tracking-[0.35em] text-xs text-violet-300/80">Conditions d'utilisation</span>
          </div>

          <section className="rounded-[2rem] border border-violet-500/20 bg-[#0f0820]/95 p-10 shadow-[0_40px_100px_rgba(124,58,237,0.18)] backdrop-blur-xl">
            <h1 className="text-4xl font-semibold text-white mb-6">Conditions Générales d’Utilisation</h1>
            <p className="text-sm leading-7 text-white/80 mb-6">
              Ces conditions régissent l'utilisation de BadOpsec. En accédant à nos services, vous acceptez de respecter ces règles et de vous conformer aux obligations légales et contractuelles.
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">1. Objet du service</h2>
                <p className="text-sm leading-7 text-white/75">
                  BadOpsec propose un accès sécurisé à des données publiques et des outils d’analyse. L’accès se fait via un compte utilisateur et un système d’authentification sécurisé.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">2. Compte utilisateur</h2>
                <p className="text-sm leading-7 text-white/75 mb-3">
                  Chaque utilisateur est responsable de la confidentialité de ses identifiants. Toute utilisation frauduleuse ou non autorisée devra être signalée immédiatement.
                </p>
                <ul className="list-disc list-inside text-sm text-white/75 space-y-2">
                  <li>Ne partagez jamais votre mot de passe ou votre clé.</li>
                  <li>Informez-nous immédiatement en cas de compromission.</li>
                  <li>Nous pouvons suspendre un accès en cas d’activité anormale.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">3. Utilisation autorisée</h2>
                <p className="text-sm leading-7 text-white/75 mb-3">
                  Vous pouvez utiliser BadOpsec uniquement dans le cadre de son objet légal. Les actions interdites incluent notamment :</p>
                <ul className="list-disc list-inside text-sm text-white/75 space-y-2">
                  <li>L’exploitation de failles ou de services tiers sans accord.</li>
                  <li>La collecte massive de données non autorisée.</li>
                  <li>La diffusion de contenus illicites ou malveillants.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">4. Propriété intellectuelle</h2>
                <p className="text-sm leading-7 text-white/75">
                  Le site, le code et les ressources sont protégés par le droit d’auteur et ne peuvent être reproduits, modifiés ou distribués sans autorisation.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">5. Sécurité et conformité</h2>
                <p className="text-sm leading-7 text-white/75 mb-3">
                  Nous appliquons des mesures de sécurité strictes : authentification Supabase, validation côté serveur, sécurité des API et limitations de l’accès admin.</p>
                <p className="text-sm leading-7 text-white/75">
                  En particulier, toute modification de compte via l’API n'est possible que par l’administrateur identifié et authentifié.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
