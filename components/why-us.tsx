"use client";

import { Check, Shield, Clock, Users, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const features = [
  {
    icon: Clock,
    title: "Punctual Service",
    description: "Always on time, every time. We respect your schedule.",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Full insurance coverage and professional credentials",
  },
  {
    icon: Users,
    title: "Professional Drivers",
    description: "Courteous, experienced drivers fluent in multiple languages",
  },
  {
    icon: MapPin,
    title: "Door-to-Door Service",
    description: "Pickup and drop-off at any location in Marrakech",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Round-the-clock customer service via WhatsApp and phone",
  },
  {
    icon: Check,
    title: "Clean Vehicles",
    description: "Spotless interiors and well-maintained modern cars",
  },
];

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <section id="why-us" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 slide-up">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t("whyUs.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("whyUs.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="slide-up p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                      <Icon size={24} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
