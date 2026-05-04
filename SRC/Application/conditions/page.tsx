import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";

export default function ConditionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20 px-4 cosmic-bg relative overflow-hidden">
        <div className="stars" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Conditions Générales</h1>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-muted-foreground text-lg mb-8">Texte des conditions générales d'utilisation. Remplacez ce paragraphe par le contenu légal définitif.</p>
          </FadeIn>

          <div className="text-left bg-card/50 border border-border rounded-2xl p-6 text-muted-foreground">
            <h2 className="text-lg font-semibold text-white mb-2">1. Introduction</h2>
            <p className="mb-4">Ces conditions régissent l'utilisation du service. En utilisant le service, vous acceptez ces conditions.</p>

            <h2 className="text-lg font-semibold text-white mb-2">2. Utilisation</h2>
            <p className="mb-4">Présentation des règles d'utilisation, limites et responsabilités.</p>

            <h2 className="text-lg font-semibold text-white mb-2">3. Paiement</h2>
            <p className="mb-4">Informations sur la facturation et la politique de remboursement.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
