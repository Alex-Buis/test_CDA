import React, { useState } from "react";
import { Wrench, Settings, Award, Clock, Mail } from "lucide-react";
import { toast } from "sonner";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Merci ! Vous êtes inscrit à notre newsletter.");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1600)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--vw-blue)]/95 to-[var(--vw-dark-blue)]/85"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-white mb-4">Garage Volkswagen</h1>
          <p className="text-xl mb-8 text-[var(--vw-sky-blue)]">
            Spécialiste Volkswagen - Prestations professionnelles & Location
            d'outils de qualité
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => onNavigate("services")}
              className="bg-[var(--vw-light-blue)] text-white px-8 py-3 rounded-lg hover:bg-white hover:text-[var(--vw-blue)] transition-all transform hover:scale-105"
            >
              Nos Prestations
            </button>
            <button
              onClick={() => onNavigate("rentals")}
              className="bg-white text-[var(--vw-blue)] px-8 py-3 rounded-lg hover:bg-[var(--vw-sky-blue)] hover:text-white transition-all transform hover:scale-105"
            >
              Louer des Outils
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Pourquoi nous choisir ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-white border-2 border-gray-200 hover:border-[var(--vw-light-blue)] transition-colors">
              <div className="bg-[var(--vw-light-blue)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3">Expertise Volkswagen</h3>
              <p className="text-gray-600">
                Plus de 20 ans d'expérience sur tous les modèles Volkswagen,
                classiques et modernes
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-white border-2 border-gray-200 hover:border-[var(--vw-light-blue)] transition-colors">
              <div className="bg-[var(--vw-blue)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3">Outillage Professionnel</h3>
              <p className="text-gray-600">
                Location d'outils de qualité professionnelle pour vos projets de
                maintenance et réparation
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-white border-2 border-gray-200 hover:border-[var(--vw-light-blue)] transition-colors">
              <div className="bg-[var(--vw-sky-blue)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3">Qualité Garantie</h3>
              <p className="text-gray-600">
                Pièces d'origine et travaux garantis. Satisfaction client depuis
                2005
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-16 bg-gradient-to-r from-[var(--vw-light-blue)] to-[var(--vw-sky-blue)]">
        <div className="container mx-auto px-4 text-center text-white">
          <Clock className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-white mb-4">Offres du moment</h2>
          <p className="text-lg mb-6">
            Code promo: <span className="font-bold text-2xl">VWBLUE</span> pour
            -15% sur votre première prestation
          </p>
          <p className="text-sm opacity-90">Valable jusqu'au 31 mars 2025</p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[var(--vw-blue)] text-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Mail className="w-12 h-12 mx-auto mb-4 text-[var(--vw-light-blue)]" />
          <h2 className="text-white mb-4">Newsletter</h2>
          <p className="mb-6 text-[var(--vw-sky-blue)]">
            Restez informé de nos promotions et conseils d'entretien pour votre
            Volkswagen
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              className="flex-1 px-4 py-3 rounded-lg text-[var(--vw-dark-blue)] outline-none focus:ring-2 focus:ring-[var(--vw-light-blue)]"
              required
            />
            <button
              type="submit"
              className="bg-[var(--vw-light-blue)] px-6 py-3 rounded-lg hover:bg-white hover:text-[var(--vw-blue)] transition-colors"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
