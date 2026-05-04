import {
  Zap,
  Database,
  Shield,
  Code,
  Eye,
  MessageCircle,
  User,
  ShoppingCart,
  Search,
  Star,
  ChevronDown,
  Tag,
  UserPlus,
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-0 pb-12 cosmic-bg overflow-hidden">
      <div className="stars" />

      <div className="relative z-10 -mt-24">
        {/* Badge */}
        <FadeIn className="mb-6">
          <div className="flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-muted-foreground">
              NOUVEAU : INSCRIPTION EN LIGNE SANS DISCORD
            </span>
          </div>
        </FadeIn>

        {/* Main Title */}
        <FadeIn delay={100}>
          <h1 className="text-[56px] md:text-[100px] lg:text-[140px] leading-[0.95] font-extrabold text-white text-center mb-4">
            BadOpsec.
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={200}>
          <p className="text-muted-foreground text-center max-w-2xl px-4 mb-6 text-lg">
            Accédez à des informations publiques via notre API. Recherchez, analysez et obtenez des données en temps réel avec
            <span className="text-white font-semibold"> BadOpsec</span>.
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={300} className="flex flex-wrap justify-center gap-4 mb-10">
          <a
            href="/inscription"
            className="btn-primary flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white"
          >
            <UserPlus className="w-5 h-5" />
            Créer un compte
          </a>
          <a
            href="/tarifs"
            className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white"
          >
            <Tag className="w-5 h-5" />
            Voir les tarifs
          </a>
        </FadeIn>

        {/* Quick Stats */}
        <FadeIn delay={400} className="relative z-10 flex flex-wrap justify-center gap-8 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-violet-500" />
            +900M ligne indexés
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-violet-500" />
            Résultats en &lt; 2s
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-500" />
            Zéro tracking
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}

const StatsSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <FadeIn delay={0}>
        <div className="card-glow rounded-2xl p-8 text-center h-full">
          <div className="icon-bg w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Database className="w-7 h-7 text-violet-500" />
          </div>
          <div className="text-5xl font-bold gradient-text mb-2">+900M</div>
          <div className="text-muted-foreground text-sm tracking-wider">LIGNES INDEXÉS</div>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="card-glow rounded-2xl p-8 text-center h-full">
          <div className="icon-bg w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-7 h-7 text-violet-500" />
          </div>
          <div className="text-5xl font-bold gradient-text mb-2">&lt; 2s</div>
          <div className="text-muted-foreground text-sm tracking-wider">TEMPS DE RÉPONSE MÉDIAN</div>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="card-glow rounded-2xl p-8 text-center h-full">
          <div className="icon-bg w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Star className="w-7 h-7 text-violet-500" />
          </div>
          <div className="text-5xl font-bold gradient-text mb-2">4.7/5</div>
          <div className="text-muted-foreground text-sm tracking-wider">NOTE MOYENNE</div>
        </div>
      </FadeIn>
    </div>
  </section>
);

const features = [
  {
    icon: Zap,
    title: "Latence < 2s",
    description: "Requêtes optimisées, cache intelligent, résultats en moins de deux secondes dans 95% des cas.",
  },
  {
    icon: Shield,
    title: "Sécurité locale",
    description: "Clés API hashées en SHA-256, sessions httpOnly + SameSite=Strict, protection CSRF double-submit.",
  },
  {
    icon: Code,
    title: "API REST simple",
    description: "Endpoints REST facile d'exploitation — JSON propre, documentation claire, intégration en quelques lignes.",
  },
  {
    icon: Database,
    title: "+900M lignes indexés",
    description: "Base de données française de +900 million de records, indexée et interrogeable en temps réel.",
  },
  {
    icon: Eye,
    title: "Zéro tracking",
    description: "Aucun tracker tiers, aucune analytique externe. Vos requêtes ne sont pas persistées.",
  },
  {
    icon: MessageCircle,
    title: "Support réactif",
    description: "Ticket Discord pris en charge en moins de 24h par un humain. Pas de bot, pas d'attente interminable.",
  },
];

const FeaturesSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-violet-500 rounded-full" />
            <span className="text-xs font-medium tracking-wider text-muted-foreground">
              CE QUE VOUS OBTENEZ
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Un produit <span className="gradient-text italic">complet</span>
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-muted-foreground">Six piliers qui font la différence au quotidien.</p>
        </FadeIn>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FadeIn key={feature.title} delay={index * 100}>
            <div className="card-glow rounded-2xl p-6 h-full">
              <div className="icon-bg w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-violet-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const steps = [
  {
    number: "01",
    icon: User,
    title: "Créez un compte",
    description: "Choisissez un nom d'utilisateur. Vous recevez instantanément une clé d'accès affichée une seule fois.",
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Activez un plan",
    description: "Ouvrez un ticket Discord pour activer le plan qui vous convient. Actif en quelques minutes.",
  },
  {
    number: "03",
    icon: Search,
    title: "Lancez vos recherches",
    description: "Utilisez le dashboard ou appelez notre API directement. Votre quota se reset chaque nuit.",
  },
];

const StepsSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-violet-500 rounded-full" />
            <span className="text-xs font-medium tracking-wider text-muted-foreground">
              3 ÉTAPES
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comment ça <span className="gradient-text italic">marche</span>
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-muted-foreground">De la création de compte à la première requête.</p>
        </FadeIn>
      </div>

      {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <FadeIn key={step.number} delay={index * 150}>
                <div className="step-card rounded-2xl relative h-full">
                  <div className="step-icon">
                    <step.icon className="w-5 h-5 text-white/90" />
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground tracking-wider">ÉTAPE</div>
                    <div className="step-number">{step.number}</div>
                  </div>

                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc text-sm">{step.description}</p>

                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 step-arrow z-10">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-20 px-4">
    <div className="max-w-3xl mx-auto">
      <FadeIn>
        <div className="card-glow rounded-3xl p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à <span className="gradient-text italic">commencer</span> ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Inscription en trente secondes. Vous obtenez immédiatement votre clé API et choisissez ensuite le plan qui vous convient.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/inscription"
              className="btn-primary flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white"
            >
              <UserPlus className="w-5 h-5" />
              Créer mon compte
            </a>
            <a
              href="/tarifs"
              className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white"
            >
              <Tag className="w-5 h-5" />
              Voir les plans
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <StepsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
