"use client";

import { useState } from "react";
import { Globe, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  useLocale,
  languages,
  currencies,
  Language,
  Currency,
} from "@/contexts/locale-context";

interface LocaleSelectorProps {
  scrolled: boolean;
}

export default function LocaleSelector({ scrolled }: LocaleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { language, currency, setLanguage, setCurrency } = useLocale();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleCurrencyChange = (curr: Currency) => {
    setCurrency(curr);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
          scrolled
            ? "text-foreground hover:bg-gray-100"
            : "text-white hover:bg-white/10"
        }`}
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{t("locale.button")}</span>
      </button>

      {/* Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup Content */}
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">
                {t("locale.settings")}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Language Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("locale.language")}
              </label>
              <select
                value={language}
                onChange={(e) =>
                  handleLanguageChange(e.target.value as Language)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                {Object.entries(languages).map(([code, { name }]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Currency Select */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("locale.currency")}
              </label>
              <select
                value={currency}
                onChange={(e) =>
                  handleCurrencyChange(e.target.value as Currency)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                {Object.entries(currencies).map(([code, { name, symbol }]) => (
                  <option key={code} value={code}>
                    {symbol} {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Selection Display */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                {t("locale.selected")}: {languages[language].name} •{" "}
                {currencies[currency].symbol}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
