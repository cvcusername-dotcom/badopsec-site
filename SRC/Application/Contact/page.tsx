"use client";
import { useState } from "react";
import { Mail, MessageSquare, Send, MapPin, Clock, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";   
import { Footer } from "@/components/ui/Footer";
import { FadeIn } from "@/components/ui/FadeIn";     

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",  
    email: "",
    subject: "",
    message: "",
  });   
  const [isSubmitted, setIsSubmitted] = useState(false);  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-background bg-[url('/25e45cf3153f5d88e4833a5133ffd821.jpg')] bg-center bg-cover bg-fixed">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 cosmic-bg relative overflow-hidden">
        <div className="stars" />
        <div className="max-w-6xl mx-auto text-left relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-violet-500 rounded-full" />
              <span className="text-xs font-medium tracking-wider text-muted-foreground">
                NOUS REJOINDRE
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-extrabold mb-6"> 
              <span className="block">Un canal, <span className="gradient-text">une réponse</span></span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-muted-foreground text-lg max-w-3xl mb-8 font-semibold">
              Toute la communication passe par Discord. On vous répond vite, sans formulaire ni email à surveiller.
            </p>
          </FadeIn>

          {/* Contact cards (Discord / Telegram) */}
          <FadeIn delay={300}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="card-glow rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="icon-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-b from-violet-900/30 to-transparent border border-border">
                    <img src="/OIP.png" alt="Discord" className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-1">Discord</h3>
                  <div className="text-violet-300 text-xs mb-3">discord.gg/@hysteriquelovewlh</div>
                  <p className="text-muted-foreground text-sm mb-4 text-left font-semibold">Le canal principal. Support, ventes, annonces et communauté.</p>
                  <ul className="text-muted-foreground text-sm space-y-2 mb-6 text-left font-semibold">
                    <li>• Ticket support</li>
                    <li>• Activation d'un plan</li>
                    <li>• Annonces</li>
                    <li>• Aide utilisateurs</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground tracking-widest uppercase">
                    <span className="text-xs text-muted-foreground">Rejoindre</span>
                    <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/40 border border-border text-violet-300 hover:bg-secondary/60">
                      →
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-glow rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="icon-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-b from-violet-900/30 to-transparent border border-border">
                    <img src="/tOIP.png" alt="Telegram" className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-1">Telegram</h3>
                  <div className="text-violet-300 text-xs mb-3">t.me/worldrdp</div>
                  <p className="text-muted-foreground text-sm mb-4 text-left font-semibold">Canal d'annonces uniquement — mises à jour rapides du service.</p>
                  <ul className="text-muted-foreground text-sm space-y-2 mb-6 text-left font-semibold">
                    <li>• Statut du service</li>
                    <li>• Nouveautés</li>
                    <li>• Alertes de maintenance</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground tracking-widest uppercase">
                    <span className="text-xs text-muted-foreground">Rejoindre</span>
                    <a href="https://t.me/worldrdp" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/40 border border-border text-violet-300 hover:bg-secondary/60">
                      →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="card-glow rounded-2xl p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pas besoin de formulaire compliqué</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Toutes les demandes passent par Discord ou email. C’est plus rapide, plus clair, et surtout plus direct.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Si tu veux un tarif, un accès ou juste une réponse rapide, viens nous parler directement.
            </p>
          </div>
        </div>
      </section>

      <Footer />       
    </main>
  );
}