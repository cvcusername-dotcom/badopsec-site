import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { ChevronLeft } from "lucide-react";

export default function RgpdPage() {
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
            <span className="uppercase tracking-[0.35em] text-xs text-violet-300/80">RGPD & protection des données</span>
          </div>

          <section className="rounded-[2rem] border border-violet-500/20 bg-[#0f0820]/95 p-10 shadow-[0_40px_100px_rgba(124,58,237,0.18)] backdrop-blur-xl">
            <h1 className="text-4xl font-semibold text-white mb-6">Conformité RGPD</h1>
            <p className="text-sm leading-7 text-white/80 mb-6">
              BadOpsec respecte le règlement général sur la protection des données. Cette page décrit vos droits et la manière dont nous traitons vos informations.
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">Base légale</h2>
                <p className="text-sm leading-7 text-white/75">
                  Nous traitons vos données personnelles uniquement lorsque cela est nécessaire pour fournir le service, respecter une obligation légale ou avec votre consentement explicite.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">Droits des utilisateurs</h2>
                <ul className="list-disc list-inside text-sm text-white/75 space-y-2">
                  <li>Droit d’accès : vous pouvez demander une copie des données que nous détenons.</li>
                  <li>Droit de rectification : vous pouvez corriger des informations inexactes.</li>
                  <li>Droit à l’effacement : vous pouvez demander la suppression de vos données.</li>
                  <li>Droit à la portabilité : vous pouvez récupérer vos données dans un format lisible.</li>
                  <li>Droit d’opposition : vous pouvez demander l’arrêt du traitement de vos données.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">Transparence</h2>
                <p className="text-sm leading-7 text-white/75">
                  Nous vous informons des finalités du traitement, des destinataires des données et de la durée de conservation. Aucune donnée n’est utilisée à des fins commerciales sans votre accord.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">Sécurité des données</h2>
                <p className="text-sm leading-7 text-white/75 mb-3">
                  Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données contre la perte, la modification ou l’accès non autorisé.</p>
                <p className="text-sm leading-7 text-white/75">
                  Ces mesures incluent le chiffrement, les contrôles d’accès et la validation côté serveur pour toutes les requêtes sensibles.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
                <p className="text-sm leading-7 text-white/75">
                  Pour exercer vos droits RGPD ou pour toute question relative à vos données, contactez-nous via le formulaire du site ou par email à l’adresse indiquée dans la politique de confidentialité.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
