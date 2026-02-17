"use client";

import { Users, Briefcase, Wifi } from "lucide-react";
import { useTranslation } from "react-i18next";

import { getFleet } from "@/lib/data";
import Link from "next/link";

const vehicles = getFleet();

export default function Fleet() {
  const { t } = useTranslation();

  return (
    <section id="fleet" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 slide-up">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t("fleet.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("fleet.subtitle")}
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="group slide-up">
              <Link href={`/fleet/${vehicle.slug}`} className="block h-full">
                <div className="bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Vehicle Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    <img
                      src={vehicle.images?.[0] || "/placeholder.svg"}
                      alt={vehicle.model}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
                    <div className="absolute bottom-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      {vehicle.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-2xl font-display font-bold text-foreground">
                          {vehicle.model}
                       </h3>
                       <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{vehicle.status}</span>
                    </div>
                    
                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("fleet.passengers")}
                          </p>
                          <p className="font-semibold text-foreground">
                            {vehicle.places}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={18} className="text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("fleet.luggage")}
                          </p>
                          <p className="font-semibold text-foreground">
                            {vehicle.luggage}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Amenities (Static for now or derived) */}
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-foreground mb-3">
                        Features
                      </p>
                      <ul className="space-y-2">
                        {["Air Conditioning", "USB Charger", "Comfortable Seats"].map((amenity, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <Wifi size={14} className="text-accent" />
                            {amenity}
                          </li>
                        ))}
                      </ul>
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
