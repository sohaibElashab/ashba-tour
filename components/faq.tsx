"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const faqKeys = [
  { questionKey: "faq.q1", answerKey: "faq.a1" },
  { questionKey: "faq.q2", answerKey: "faq.a2" },
  { questionKey: "faq.q3", answerKey: "faq.a3" },
  { questionKey: "faq.q4", answerKey: "faq.a4" },
  { questionKey: "faq.q5", answerKey: "faq.a5" },
  { questionKey: "faq.q6", answerKey: "faq.a6" },
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
          {faqKeys.map((faq, idx) => (
            <div
              key={idx}
              className="slide-up bg-white rounded-lg border border-border hover:border-primary/50 transition-all overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-background/50 transition-colors"
              >
                <span className="text-left font-semibold text-foreground">
                  {t(faq.questionKey)}
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
                  {t(faq.answerKey)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
