"use client";

import { useParams } from "next/navigation";
import { getVehicleBySlug } from "@/lib/data";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Users, Briefcase, Check, ArrowLeft, Car, Fuel, Gauge } from "lucide-react";
import Link from "next/link";
import ReservationForm from "@/components/reservation-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function VehicleDetails() {
  const params = useParams();
  const slug = params.slug as string;
  
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar scrolled={true} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
            <Link href="/#fleet" className="text-primary hover:underline">
              Back to Fleet
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar scrolled={true} />
      
      {/* Hero / Header */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img 
          src={vehicle.images?.[0] || "/placeholder.svg"} 
          alt={vehicle.model}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">{vehicle.model}</h1>
            <div className="flex items-center justify-center gap-4 text-sm md:text-base">
               <span className="bg-primary px-3 py-1 rounded-full">{vehicle.status}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/#fleet" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={20} />
          Back to Fleet
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery if multiple images exist */}
            
            <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
               <h2 className="text-2xl font-bold mb-4 text-foreground">{vehicle.model} Overview</h2>
               <p className="text-muted-foreground text-lg leading-relaxed">
                 Experience comfort and reliability with our {vehicle.model}. Perfect for {vehicle.places > 4 ? "groups and families" : "couples and business travelers"}, offering ample space and premium features for your journey in Morocco.
               </p>
               {vehicle.images && vehicle.images.length > 1 && (
                <Carousel className="w-full max-w-xl mx-auto">
                  <CarouselContent>
                    {vehicle.images.map((img : any, index : any) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <div className="overflow-hidden rounded-xl aspect-video relative">
                            <img 
                              src={img} 
                              alt={`${vehicle.model} view ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
            )}
            </section>

            <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
               <h2 className="text-2xl font-bold mb-6 text-foreground">Specifications & Amenities</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Users size={32} className="text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Passengers</p>
                      <p className="font-semibold text-lg">{vehicle.places} Seats</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Briefcase size={32} className="text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Luggage Capacity</p>
                      <p className="font-semibold text-lg">{vehicle.luggage}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Car size={32} className="text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Vehicle Type</p>
                      <p className="font-semibold text-lg">{vehicle.model.includes('Mercedes') ? 'Luxury Van/Sedan' : 'Standard Transport'}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Fuel size={32} className="text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Condition</p>
                      <p className="font-semibold text-lg">Excellent</p>
                    </div>
                 </div>
               </div>
            </section>
          </div>

          {/* Sidebar / Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card p-6 rounded-xl border border-border shadow-lg">
                <h3 className="text-xl font-bold mb-4">Book This Vehicle</h3>
                <div className="mb-6 pb-6 border-b border-border">
                    <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-primary">{vehicle.price}</p>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">
                  Click the button below to reserve <strong>{vehicle.model}</strong>.
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full text-lg py-6">Book Now</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Book {vehicle.model}</DialogTitle>
                      <DialogDescription>
                        Fill out the form below to complete your reservation request.
                      </DialogDescription>
                    </DialogHeader>
                    <ReservationForm type="fleet" defaultVehicleId={vehicle.id} />
                  </DialogContent>
                </Dialog> 
              </div>
              
              <div className="mt-6 bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
                 <h4 className="font-semibold mb-2 text-foreground">Need Help?</h4>
                 <p className="text-sm text-muted-foreground mb-4">
                   Contact us directly via WhatsApp for immediate assistance.
                 </p>
                 <a 
                   href="https://wa.me/212600000000" 
                   target="_blank"
                   rel="noreferrer"
                   className="w-full block text-center py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                 >
                   Chat on WhatsApp
                 </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
