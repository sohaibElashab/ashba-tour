"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReservationForm from "./reservation-form";

interface HeroProps {
  onScroll: (scrolled: boolean) => void;
}

export default function Hero({ onScroll }: HeroProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      onScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScroll]);

  return (
    <div id="hero" className="relative pt-16 pb-20 md:pb-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/hero-bg.png)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-secondary/60 via-secondary/40 to-background/20" />
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="pt-20 md:pt-32 pb-12 text-center slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 text-balance leading-tight">
              {t("hero.title")}
              <br />
              <span className="text-primary">{t("hero.subtitle")}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              {t("hero.description")}
            </p>
          </div>

          {/* Reservation Form */}
          <div className="max-w-4xl mx-auto px-4">
            <ReservationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
