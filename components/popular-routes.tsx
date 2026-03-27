"use client";

import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useLocale } from "@/contexts/locale-context";
import { convertAndFormat } from "@/lib/currency";
import { getFeaturedTours } from "@/lib/data";
import { useLocalizedData } from "@/hooks/use-localized-data";

const featuredTours = getFeaturedTours();

export default function PopularRoutes() {
  const { t } = useTranslation();
  const { currency } = useLocale();
  const { localizedField } = useLocalizedData();

  const routes = featuredTours.map((tour) => ({
    id: tour.id,
    slug: tour.slug,
    from: "Marrakech",
    to: localizedField(tour, "title"),
    duration: t("routes.duration"),
    price: 0,
    image: tour.image,
  }));

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
              <Link href={`/tours/${route.slug}`} className="block h-full">
                {/* Route Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
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
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                      <MapPin size={16} className="text-primary" />
                      <span>
                        {t("routes.from")} {route.from}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4 flex-1">
                      <div>
                        <p className="font-semibold text-foreground line-clamp-2">
                          {route.to}
                        </p>
                      </div>
                      <ArrowRight size={16} className="text-primary shrink-0" />
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between pt-3 border-t border-border mb-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock size={14} />
                          {route.duration}
                        </div>
                      </div>

                      <button className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors">
                        {t("button.bookNow")}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
