"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const faqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 24 hours in advance. However, we accept last-minute bookings subject to vehicle availability. Contact us via WhatsApp for urgent requests.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Free cancellation up to 24 hours before your scheduled pickup. Cancellations within 24 hours may incur a 50% charge.",
  },
  {
    question: "Do you offer airport pickups?",
    answer:
      "Yes, we specialize in airport transfers. We offer fixed rates from Marrakech Airport to any location in the city. Meet-and-greet service is available upon request.",
  },
  {
    question: "Are your drivers multilingual?",
    answer:
      "Our drivers speak Arabic, French, English, and Spanish. We can arrange guides for specialized tours and excursions.",
  },
  {
    question: "Can I bring luggage?",
    answer:
      "Absolutely. Our vehicles are equipped with spacious trunks. Standard luggage is included; oversized items may incur an additional charge.",
  },
  {
    question: "Do you offer child seats?",
    answer:
      "Yes, child seats are available for an additional $15. Please specify your child's age when booking.",
  },
];

export default function Faq() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { t } = useTranslation();

  return (
    <section id="faq" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 slide-up">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("faq.subtitle")}</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="slide-up bg-white rounded-lg border border-border hover:border-primary/50 transition-all overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-background/50 transition-colors"
              >
                <span className="text-left font-semibold text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                    expandedId === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === idx && (
                <div className="px-6 py-4 bg-background border-t border-border text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
