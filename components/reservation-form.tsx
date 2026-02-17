"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Zap, Briefcase, Calculator, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/contexts/locale-context";
import { convertAndFormat } from "@/lib/currency";
import { getAllTours, getFleet, type Tour, type Vehicle } from "@/lib/data";

interface ReservationFormProps {
  type?: 'general' | 'fleet' | 'tour';
  defaultVehicleId?: string;
  defaultTourId?: string;
}

export default function ReservationForm({ 
  type = 'general',
  defaultVehicleId,
  defaultTourId 
}: ReservationFormProps) {
  const { t } = useTranslation();
  const { currency } = useLocale();
  const fleet = getFleet();
  const tours = getAllTours();

  // If in a modal (fleet/tour), reduce padding and shadow
  const containerClasses = type === 'general' 
      ? "bg-white rounded-2xl shadow-2xl p-6 md:p-8 fade-in" 
      : "bg-white fade-in";

  const [formData, setFormData] = useState({
    serviceType: "transfer", // transfer, tour, disposal
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: "1",
    vehicle: defaultVehicleId || "",
    tour: defaultTourId || "",
    extras: [] as string[],
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // If specific props are passed, lock the service type
  useEffect(() => {
    if (type === 'fleet' && defaultVehicleId) {
       setFormData(prev => ({ ...prev, vehicle: defaultVehicleId, serviceType: 'transfer' }));
    }
    if (type === 'tour' && defaultTourId) {
       setFormData(prev => ({ ...prev, tour: defaultTourId, serviceType: 'tour' }));
    }
  }, [type, defaultVehicleId, defaultTourId]);

  const extrasOptions = [
    { id: "child-seat", name: "Child Seat", price: 15 },
    { id: "wifi", name: "Wi-Fi", price: 5 },
    { id: "water", name: "Water & Snacks", price: 10 },
  ];

  // Simple price estimation logic (can be made more complex)
  const calculateEstimatedTotal = () => {
    let basePrice = 0;
    
    if (formData.serviceType === 'tour' && formData.tour) {
        // Find tour price logic if available, or just base fallback
        // Since tours don't have explicit price in JSON currently, we'll suggest "Quote"
        return null; 
    }

    if (formData.vehicle) {
        const v = fleet.find(f => f.id === formData.vehicle);
        // Extract number from price string "a partir 80 euro" -> 80
        const priceMatch = v?.price?.match(/\d+/);
        if (priceMatch) {
            basePrice = parseInt(priceMatch[0]);
        }
    }

    if (basePrice === 0) return null;

    const extrasPrice = formData.extras.reduce((sum, extra) => {
      const extraOption = extrasOptions.find((e) => e.id === extra);
      return sum + (extraOption?.price || 0);
    }, 0);

    return basePrice + extrasPrice;
  };

  const handleExtraChange = (extraId: string) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter((e) => e !== extraId)
        : [...prev.extras, extraId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    
    // Construct WhatsApp message
    const total = calculateEstimatedTotal();
    const serviceName = formData.serviceType === 'tour' 
        ? tours.find(t => t.id === formData.tour)?.title || "Tour"
        : "Transfer/Service";
    
    const vehicleName = fleet.find(v => v.id === formData.vehicle)?.model || "Not selected";
    
    const message = `
*New Reservation Request*
Type: ${serviceName}
Vehicle: ${vehicleName}
Pick-up: ${formData.pickup}
Drop-off: ${formData.dropoff}
Date: ${formData.date} ${formData.time}
Pax: ${formData.passengers}
Extras: ${formData.extras.join(', ')}
Notes: ${formData.notes}
${total ? `Est. Total: ${total} EUR` : 'Price: Quote Request'}
    `.trim();
    
    console.log("Form submitted:", formData);
    // In a real app, you might redirect to WhatsApp API here
    // window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const estimatedTotal = calculateEstimatedTotal();

  return (
    <div className={containerClasses}>
      {submitted ? (
        <div className="text-center p-8 space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Request Sent!</h3>
          <p className="text-gray-600">
            Thank you for your booking request. Our team will review it and contact you via WhatsApp shortly to confirm availability and price.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-primary font-medium hover:underline mt-4"
          >
            Send another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            {type === 'general' && (
                <h3 className="text-xl font-bold text-gray-800">
                    Book Your Trip
                </h3>
            )}
            {type === 'general' && (
                <div className="flex space-x-2 mt-2 md:mt-0">
                    <button 
                        type="button"
                        onClick={() => setFormData({...formData, serviceType: 'transfer'})}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${formData.serviceType === 'transfer' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Transfer
                    </button>
                    <button 
                        type="button"
                        onClick={() => setFormData({...formData, serviceType: 'tour'})}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${formData.serviceType === 'tour' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Tour
                    </button>
                </div>
            )}
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                {t("form.pickup")}
              </label>
              <input
                required
                type="text"
                value={formData.pickup}
                onChange={(e) =>
                  setFormData({ ...formData, pickup: e.target.value })
                }
                placeholder="Airport, Hotel, or specific location"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            
            {(formData.serviceType === 'transfer' || formData.serviceType === 'disposal') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    {t("form.dropoff")}
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.dropoff}
                    onChange={(e) =>
                      setFormData({ ...formData, dropoff: e.target.value })
                    }
                    placeholder="Destination"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
            )}
            
            {formData.serviceType === 'tour' && (
                <div className="space-y-2">
                   <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    Select Tour
                  </label>
                  <select
                    value={formData.tour}
                    onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                    disabled={type === 'tour'} // Lock if on tour page
                    className={`w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${type === 'tour' ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50 focus:bg-white'}`}
                  >
                    <option value="">Select a tour...</option>
                    {tours.map(tour => (
                        <option key={tour.id} value={tour.id}>{tour.title}</option>
                    ))}
                  </select>
                </div>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                {t("form.date")}
              </label>
              <input
                required
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {t("form.time")}
              </label>
              <input
                required
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Users size={16} className="text-primary" />
                {t("form.passengers")}
              </label>
              <select
                value={formData.passengers}
                onChange={(e) =>
                  setFormData({ ...formData, passengers: e.target.value })
                }
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-gray-50 focus:bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Pax" : "Pax"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Vehicle Selection - Only show if not a tour (tours usually include vehicle) OR if we want to allow override */}
          {formData.serviceType !== 'tour' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Zap size={16} className="text-primary" />
                {t("form.vehicleType")}
              </label>
              
              {/* If type is fleet, we just show the selected one, or maybe allow changing if they want? 
                  User said "match fleet/tour popup", implying context awareness. 
                  Let's allow changing but default to the selected one. 
              */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {fleet.map((vehicle) => (
                  <label key={vehicle.id} className={`relative cursor-pointer group h-24 sm:h-32 overflow-hidden rounded-xl ${type === 'fleet' && formData.vehicle !== vehicle.id ? 'hidden' : ''} ${type === 'fleet' ? 'col-span-full h-48' : ''}`}>
                    <input
                      type="radio"
                      name="vehicle"
                      value={vehicle.id}
                      checked={formData.vehicle === vehicle.id}
                      onChange={(e) =>
                        setFormData({ ...formData, vehicle: e.target.value })
                      }
                      disabled={type === 'fleet'} // Lock if specifically booking this vehicle
                      className="sr-only"
                    />
                    {/* Background Image */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${vehicle.images?.[0] || '/placeholder.svg'})` }}
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 transition-colors ${
                        formData.vehicle === vehicle.id 
                            ? 'bg-primary/80' 
                            : 'bg-black/60 group-hover:bg-black/50'
                    }`} />
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center text-white p-2 text-center">
                      <div className="font-bold text-base sm:text-lg leading-tight mb-1">{vehicle.model}</div>
                      <div className="text-xs sm:text-sm opacity-90 font-medium bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                        {vehicle.places} Seats
                      </div>
                      {formData.vehicle === vehicle.id && (
                          <div className="absolute top-2 right-2 bg-white text-primary rounded-full p-0.5">
                              <Check size={12} strokeWidth={4} />
                          </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          <div className="space-y-3">
            <button 
                type="button" 
                className="text-sm font-medium text-primary flex items-center gap-1 hover:underline"
                onClick={(e) => {
                    const el = e.currentTarget.nextElementSibling;
                    el?.classList.toggle('hidden');
                }}
            >
                + Add Extras (Child Seat, Wi-Fi...)
            </button>
            <div className="hidden space-y-2 bg-gray-50 p-3 rounded-lg transition-all">
              {extrasOptions.map((extra) => (
                <label
                  key={extra.id}
                  className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={formData.extras.includes(extra.id)}
                    onChange={() => handleExtraChange(extra.id)}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm flex-1">{extra.name}</span>
                  <span className="text-sm text-muted-foreground">
                    +{convertAndFormat(extra.price, "USD", currency)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Any special requests? (Flight number, excess luggage, etc.)"
              rows={2}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Price Summary */}
          <div className="bg-linear-to-r from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Calculator size={18} className="text-primary" />
                {estimatedTotal ? "Estimated Total" : "Quote Request"}
              </span>
              <span className="text-2xl font-bold text-primary">
                {estimatedTotal ? convertAndFormat(estimatedTotal, "USD", currency) : "On Demand"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
             {formData.serviceType === 'tour' || !estimatedTotal ? 'Request Quote & Availability' : 'Book Now'}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            Free cancellation up to 24 hours before pickup. Instant confirmation via WhatsApp.
          </p>
        </form>
      )}
    </div>
  );
}
