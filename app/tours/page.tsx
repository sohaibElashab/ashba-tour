"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getAllTours, getTourCategories } from "@/lib/data";
import { useTranslation } from "react-i18next";
import { MapPin, Users, Briefcase } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ToursPage() {
  const allTours = getAllTours();
  const categories = getTourCategories();
  const { t } = useTranslation();
  
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTours = selectedCategory === "All" 
    ? allTours 
    : allTours.filter(tour => {
        if (selectedCategory === "Transfers") return tour.title.toLowerCase().includes("transfer") || tour.id.toLowerCase().includes("transfert");
        if (selectedCategory === "Tours & Excursions") return tour.title.toLowerCase().includes("tour") || tour.title.toLowerCase().includes("excursion") || tour.id.toLowerCase().includes("circuit");
        if (selectedCategory === "Private Driver") return tour.title.toLowerCase().includes("dispo") || tour.id.toLowerCase().includes("mise à dispo");
        return !tour.title.toLowerCase().includes("transfer") && !tour.title.toLowerCase().includes("tour") && !tour.title.toLowerCase().includes("excursion") && !tour.title.toLowerCase().includes("dispo");
      });

  return (
    <main className="min-h-screen bg-background">
      <Navbar scrolled={true} />
      
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-display">
            All Tours & Transfers
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of services, from airport transfers to desert excursions.
          </p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary/10 text-secondary hover:bg-secondary/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border flex flex-col">
              <div className="relative h-48 bg-muted">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                   {tour.category || "Service"}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 line-clamp-2" title={tour.title}>
                  {tour.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                  {tour.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pt-4 border-t border-border">
                    {tour.capacity && (
                      <div className="flex items-center gap-1" title="Capacity">
                        <Users size={16} className="text-primary" />
                        <span>{tour.capacity}</span>
                      </div>
                    )}
                    {tour.vehicleType && (
                      <div className="flex items-center gap-1" title="Vehicle Type">
                        <Briefcase size={16} className="text-primary" />
                        <span className="truncate max-w-[120px]">{tour.vehicleType.split(',')[0]}...</span>
                      </div>
                    )}
                  </div>

                  <Link href={`/tours/${tour.slug}`} className="block w-full">
                    <button className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
