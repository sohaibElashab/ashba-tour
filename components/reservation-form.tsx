"use client";

import type React from "react";

import { useState } from "react";
import { Calendar, MapPin, Users, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/contexts/locale-context";
import { convertAndFormat, formatCurrency } from "@/lib/currency";

export default function ReservationForm() {
  const { t } = useTranslation();
  const { currency } = useLocale();

  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: "1",
    vehicle: "economy",
    extras: [] as string[],
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const vehicleTypes = {
    economy: { name: "Economy", price: 45, icon: "🚗" },
    premium: { name: "Premium", price: 65, icon: "🚙" },
    suv: { name: "SUV", price: 85, icon: "🚐" },
    minivan: { name: "Minivan", price: 120, icon: "🚌" },
  };

  const extrasOptions = [
    { id: "child-seat", name: "Child Seat", price: 15 },
    { id: "wifi", name: "Wi-Fi", price: 5 },
    { id: "water", name: "Water & Snacks", price: 10 },
  ];

  const calculatePrice = () => {
    const basePrice =
      vehicleTypes[formData.vehicle as keyof typeof vehicleTypes].price;
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
    setTimeout(() => setSubmitted(false), 3000);
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 fade-in">
      {submitted && (
        <div className="mb-6 p-4 bg-accent/10 border border-accent text-accent rounded-lg">
          ✓ Booking confirmed! We'll contact you shortly via WhatsApp.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              {t("form.pickup")}
            </label>
            <input
              type="text"
              value={formData.pickup}
              onChange={(e) =>
                setFormData({ ...formData, pickup: e.target.value })
              }
              placeholder="e.g., Koutoubia Mosque"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              {t("form.dropoff")}
            </label>
            <input
              type="text"
              value={formData.dropoff}
              onChange={(e) =>
                setFormData({ ...formData, dropoff: e.target.value })
              }
              placeholder="e.g., Marrakech Airport"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              {t("form.date")}
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {t("form.time")}
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Passenger" : "Passengers"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            {t("form.vehicleType")}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(vehicleTypes).map(([key, vehicle]) => (
              <label key={key} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="vehicle"
                  value={key}
                  checked={formData.vehicle === key}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicle: e.target.value })
                  }
                  className="sr-only"
                />
                <div
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    formData.vehicle === key
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{vehicle.icon}</div>
                  <div className="font-medium text-sm">{vehicle.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {convertAndFormat(vehicle.price, "USD", currency)}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Add Extras
          </label>
          <div className="space-y-2">
            {extrasOptions.map((extra) => (
              <label
                key={extra.id}
                className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
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
          <label className="text-sm font-medium text-foreground">
            Special Requests
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            placeholder="Any special requests or requirements..."
            rows={3}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />
        </div>

        {/* Price Summary */}
        <div className="bg-linear-to-r from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/10">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              Estimated Total
            </span>
            <span className="text-2xl font-bold text-primary">
              {convertAndFormat(calculatePrice(), "USD", currency)}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          {t("form.submit")}
        </button>

        <p className="text-xs text-muted-foreground text-center">
          We'll confirm your booking via WhatsApp within 1 hour
        </p>
      </form>
    </div>
  );
}
