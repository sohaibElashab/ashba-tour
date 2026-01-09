"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import i18n from "@/lib/i18n";

export type Language = "en" | "fr" | "ar";
export type Currency = "USD" | "EUR" | "MAD";

interface LocaleContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    // Change i18n language when language changes
    i18n.changeLanguage(language);

    // Update document direction for Arabic
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang);
    }
  };

  const handleSetCurrency = (curr: Currency) => {
    setCurrency(curr);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-currency", curr);
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("preferred-language") as Language;
      const savedCurr = localStorage.getItem("preferred-currency") as Currency;

      if (savedLang && ["en", "fr", "ar"].includes(savedLang)) {
        setLanguage(savedLang);
      }
      if (savedCurr && ["USD", "EUR", "MAD"].includes(savedCurr)) {
        setCurrency(savedCurr);
      }
    }
  }, []);

  return (
    <LocaleContext.Provider
      value={{
        language,
        currency,
        setLanguage: handleSetLanguage,
        setCurrency: handleSetCurrency,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

// Language and currency configurations
export const languages = {
  en: { name: "English" },
  fr: { name: "Français" },
  ar: { name: "العربية" },
};

export const currencies = {
  USD: { name: "US Dollar", symbol: "$" },
  EUR: { name: "Euro", symbol: "€" },
  MAD: { name: "Moroccan Dirham", symbol: "MAD" },
};
