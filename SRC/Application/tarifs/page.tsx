import { Check, Zap, Crown, Rocket, Star } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";

const plans = [
  {
    name: "Starter",
    price: "9.99",
    period: "/mois",
    description: "Parfait pour découvrir le service",
    icon: Zap,
    features: [
      "100 requêtes/jour",
      "API REST complète",
      "Support par ticket",
      "Documentation complète",
      "Reset quotidien",
    ],
    popular: false,
    cta: "Commencer",
  },
  {
    name: "Pro",
    price: "24.99",
    period: "/mois",
    description: "Pour les utilisateurs réguliers",
    icon: Star,
    features: [
      "500 requêtes/jour",
      "API REST complète",
      "Support prioritaire",
      "Documentation complète",
      "Reset quotidien",
      "Accès au dashboard avancé",
      "Historique des recherches",
    ],
    popular: true,
    cta: "Choisir Pro",
  },
  {
    name: "Business",
    price: "49.99",
    period: "/mois",
    description: "Pour les professionnels",
    icon: Crown,
    features: [
      "2000 requêtes/jour",
      "API REST complète",
      "Support dédié 24/7",
      "Documentation complète",
      "Reset quotidien",
      "Dashboard avancé",
      "Historique illimité",
      "Webhooks personnalisés",
      "Accès anticipé aux nouveautés",
    ],
    popular: false,
    cta: "Choisir Business",
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    period: "",
    description: "Solutions personnalisées",
    icon: Rocket,
    features: [
      "Requêtes illimitées",
      "API REST + GraphQL",
      "Account manager dédié",
      "SLA garanti 99.9%",
      "Intégration sur mesure",
      "Formation incluse",
      "Infrastructure dédiée",
      "Facturation personnalisée",
    ],
    popular: false,
    cta: "Nous contacter",
  },
];

export default function TarifsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 cosmic-bg relative overflow-hidden">
        <div className="stars" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-violet-500 rounded-full" />
              <span className="text-xs font-medium tracking-wider text-muted-foreground">
                TARIFICATION TRANSPARENTE
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Des <span className="gradient-text italic">tarifs</span> adaptés
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choisissez le plan qui correspond à vos besoins. Tous nos plans incluent l'accès à notre API REST et un support réactif.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <FadeIn key={plan.name} delay={index * 100}>
                <div
                  className={`card-glow rounded-2xl p-6 h-full flex flex-col relative ${
                    plan.popular ? "ring-2 ring-violet-500" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      POPULAIRE
                    </div>
                  )}

                  <div className="icon-bg w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <plan.icon className="w-6 h-6 text-violet-500" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      plan.popular
                        ? "btn-primary text-white"
                        : "btn-secondary text-white"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-violet-500 rounded-full" />
                <span className="text-xs font-medium tracking-wider text-muted-foreground">
                  FAQ
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Questions <span className="gradient-text italic">fréquentes</span>
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                q: "Comment fonctionne le reset quotidien ?",
                a: "Votre quota de requêtes se réinitialise automatiquement chaque nuit à minuit (heure de Paris). Les requêtes non utilisées ne sont pas reportées.",
              },
              {
                q: "Puis-je changer de plan à tout moment ?",
                a: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Le changement prend effet immédiatement et la facturation est ajustée au prorata.",
              },
              {
                q: "Quels moyens de paiement acceptez-vous ?",
                a: "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, et les virements bancaires pour les plans Enterprise.",
              },
              {
                q: "Y a-t-il une période d'essai ?",
                a: "Nous offrons une garantie satisfait ou remboursé de 7 jours sur tous nos plans. Contactez le support pour toute demande.",
              },
            ].map((faq, index) => (
              <FadeIn key={faq.q} delay={index * 100}>
                <div className="card-glow rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
