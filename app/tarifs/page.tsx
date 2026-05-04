import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { MessageCircle, Zap, Smile } from "lucide-react";

export default function TarifsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4 cosmic-bg relative overflow-hidden">
        <div className="stars" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-violet-500 rounded-full" />
              <span className="text-xs font-medium tracking-wider text-muted-foreground">
                TARIFS EN DÉVELOPPEMENT
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Les tarifs ? <span className="gradient-text italic">c’est secret</span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              On pouvait afficher des chiffres ici, mais le vrai tarif dépend de ton besoin.
              Tu veux du sérieux ? Viens nous contacter directement, on t’explique tout sans blabla.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="btn-primary px-6 py-3 rounded-lg text-white font-medium"
              >
                Contact direct
              </a>
              <a
                href="/inscription"
                className="btn-secondary px-6 py-3 rounded-lg text-white font-medium"
              >
                Je veux tester quand même
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Plan Mystère",
                text: "Tu donnes ton besoin, on te donne une proposition. C’est un peu comme une surprise, mais utile.",
                icon: Zap,
              },
              {
                title: "Plan ‘On a pas encore décidé’",
                text: "Ce n’est pas une erreur, c’est une stratégie. Le meilleur tarif se négocie en direct.",
                icon: MessageCircle,
              },
              {
                title: "Plan Contact Direct",
                text: "Tu veux un prix fiable ? Viens nous écrire. Ici, on préfère te répondre plutôt que de te faire choisir entre trois colonnes.",
                icon: Smile,
              },
            ].map(({ title, text, icon: Icon }) => (
              <FadeIn key={title}>
                <div className="card-glow rounded-3xl p-8 border border-border">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-500/10 text-violet-300 mb-5">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-7">{text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Petit disclaimer amusant</h2>
            <p className="text-muted-foreground mb-4">
              Ici, on ne vend pas des prix en carton. On vend une vraie solution.
              Si tu veux un tarif sérieux, envoie-nous un message, on te répondra plus vite que ce formulaire.
            </p>
            <p className="text-sm text-violet-300/80">
              Oui, c’est un peu indécis. Non, ce n’est pas un bug. C’est juste plus simple comme ça.
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
