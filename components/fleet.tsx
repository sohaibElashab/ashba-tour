"use client";

import { Users, Briefcase, Wifi } from "lucide-react";
import { useTranslation } from "react-i18next";

const vehicles = [
  {
    id: 1,
    name: "Economy Sedan",
    capacity: 4,
    luggage: 3,
    image: "/luxury-sedan-car.jpg",
    amenities: ["Air Conditioning", "WiFi", "USB Charger", "Bottled Water"],
    description: "Perfect for solo travelers and couples",
  },
  {
    id: 2,
    name: "Premium SUV",
    capacity: 5,
    luggage: 4,
    image: "/premium-suv-luxury.jpg",
    amenities: ["Air Conditioning", "WiFi", "USB Charger", "Mini Bar"],
    description: "Ideal for families and small groups",
  },
  {
    id: 3,
    name: "Luxury Minivan",
    capacity: 7,
    luggage: 6,
    image: "/luxury-minivan-van.jpg",
    amenities: [
      "Air Conditioning",
      "WiFi",
      "USB Charger",
      "Entertainment System",
    ],
    description: "Best for larger groups and tours",
  },
];

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
              <div className="bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Vehicle Image */}
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {vehicle.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {vehicle.description}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {t("fleet.passengers")}
                        </p>
                        <p className="font-semibold text-foreground">
                          {vehicle.capacity}
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

                  {/* Amenities */}
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      Amenities
                    </p>
                    <ul className="space-y-2">
                      {vehicle.amenities.map((amenity, idx) => (
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
