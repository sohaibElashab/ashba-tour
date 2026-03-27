"use client";

import { useParams } from "next/navigation";
import { getAllTours } from "@/lib/data";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { MapPin, Users, Briefcase, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReservationForm from "@/components/reservation-form";
import { Button } from "@/components/ui/button";
import { useLocalizedData } from "@/hooks/use-localized-data";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TourDetails() {
  const params = useParams();
  const slug = params.slug as string;

  // Find tour by slug
  // In a real app with SSG/SSR we would use generateStaticParams or getServerSideProps
  // For client-side finding:
  const tour = getAllTours().find((t: any) => t.slug === slug);
  const { localizedField } = useLocalizedData();
  const { t } = useTranslation();

  if (!tour) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar scrolled={true} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t("tours.notFound")}</h1>
            <Link href="/tours" className="text-primary hover:underline">
              {t("tours.backToAll")}
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
          src={tour.image || "/placeholder.svg"}
          alt={localizedField(tour, "title")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              {localizedField(tour, "title")}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm md:text-base">
              {tour.category && (
                <span className="bg-primary px-3 py-1 rounded-full">
                  {tour.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          {t("tours.backToAll")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                {t("tours.overview")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {localizedField(tour, "description")}
              </p>
            </section>

            <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                {t("tours.keyFeatures")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localizedField(tour, "features") ? (
                  localizedField(tour, "features")
                    .split(/\\r\\n|\r|\n/)
                    .filter((f: string) => f.trim().length > 0)
                    .map((feature: string, idx: number) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="mt-1 bg-primary/10 p-1 rounded-full">
                          <Check size={16} className="text-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))
                ) : (
                  <p className="text-muted-foreground">
                    {t("tours.noFeatures")}
                  </p>
                )}
              </div>
            </section>

            <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                {t("tours.vehicleInfo")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <Users size={32} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("tours.capacity")}
                    </p>
                    <p className="font-semibold text-lg">
                      {tour.capacity || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <Briefcase size={32} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("tours.vehicleType")}
                    </p>
                    <p className="font-semibold text-lg">
                      {tour.vehicleType || "Standard"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card p-6 rounded-xl border border-border shadow-lg">
                <h3 className="text-xl font-bold mb-4">
                  {t("tours.bookThisTour")}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("tours.clickToReserve")}{" "}
                  <strong>{localizedField(tour, "title")}</strong>.
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full text-lg py-6">
                      {t("button.bookNow")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        Book {localizedField(tour, "title")}
                      </DialogTitle>
                      <DialogDescription>
                        {t("tours.fillForm")}
                      </DialogDescription>
                    </DialogHeader>
                    <ReservationForm type="tour" defaultTourId={tour.id} />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mt-6 bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
                <h4 className="font-semibold mb-2 text-foreground">
                  {t("tours.needHelp")}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("tours.contactWhatsapp")}
                </p>
                <a
                  href="https://wa.me/212654155528"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full block text-center py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                >
                  {t("button.chatWhatsapp")}
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
