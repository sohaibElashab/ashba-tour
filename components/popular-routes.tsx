"use client";

import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/contexts/locale-context";
import { convertAndFormat } from "@/lib/currency";

const routes = [
  {
    id: 1,
    from: "Marrakech Medina",
    to: "Marrakech Airport",
    duration: "30 min",
    price: 45,
    image: "/marrakech-airport.jpg",
  },
  {
    id: 2,
    from: "Marrakech City",
    to: "Atlas Mountains",
    duration: "2 hours",
    price: 85,
    image: "/atlas-mountains-morocco.jpg",
  },
  {
    id: 3,
    from: "Marrakech",
    to: "Essaouira Beach",
    duration: "3 hours",
    price: 120,
    image: "/essaouira-beach-morocco.jpg",
  },
  {
    id: 4,
    from: "Marrakech",
    to: "Sahara Desert",
    duration: "5 hours",
    price: 200,
    image: "/sahara-desert-dunes.jpg",
  },
];

export default function PopularRoutes() {
  const { t } = useTranslation();
  const { currency } = useLocale();

  return (
    <section id="routes" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 slide-up">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t("routes.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("routes.subtitle")}
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route) => (
            <div
              key={route.id}
              className="group cursor-pointer slide-up transition-all hover:shadow-2xl"
            >
              {/* Route Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={route.image || "/placeholder.svg"}
                    alt={route.to}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <MapPin size={16} className="text-primary" />
                    <span>
                      {t("routes.from")} {route.from}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-foreground">
                        {route.to}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-primary" />
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock size={14} />
                      {route.duration}
                    </div>
                    <div className="font-semibold text-primary">
                      {convertAndFormat(route.price, "USD", currency)}
                    </div>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors">
                    {t("button.bookNow")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
