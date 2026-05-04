import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20 px-4 cosmic-bg relative overflow-hidden">
        <div className="stars" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Mentions Légales</h1>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-muted-foreground text-lg mb-8">Informations légales de l'entité éditrice du site. À compléter avec vos informations (SIRET, adresse, contact juridique, etc.).</p>
          </FadeIn>

          <div className="text-left bg-card/50 border border-border rounded-2xl p-6 text-muted-foreground">
            <h2 className="text-lg font-semibold text-white mb-2">Editeur</h2>
            <p className="mb-4">Nom de l'éditeur, adresse, coordonnées.</p>

            <h2 className="text-lg font-semibold text-white mb-2">Hébergement</h2>
            <p className="mb-4">Informations sur l'hébergeur du site.</p>

            <h2 className="text-lg font-semibold text-white mb-2">Protection des données</h2>
            <p className="mb-4">Traitement des données personnelles et contact RGPD.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
