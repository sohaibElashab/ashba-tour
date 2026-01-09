import { useLocale, Language } from "@/contexts/locale-context";

type TranslationKeys =
  | "hero.title"
  | "hero.subtitle"
  | "nav.home"
  | "nav.routes"
  | "nav.fleet"
  | "nav.whyUs"
  | "nav.reviews"
  | "nav.faq"
  | "whatsapp"
  | "bookNow"
  | "contactUs"
  | "learnMore";
// Add more keys as needed

const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    "hero.title": "Discover Marrakech",
    "hero.subtitle":
      "Premium private transfers and guided tours through the enchanting streets and landscapes of Marrakech.",
    "nav.home": "Home",
    "nav.routes": "Routes",
    "nav.fleet": "Fleet",
    "nav.whyUs": "Why Us",
    "nav.reviews": "Reviews",
    "nav.faq": "FAQ",
    whatsapp: "WhatsApp",
    bookNow: "Book Now",
    contactUs: "Contact Us",
    learnMore: "Learn More",
  },
  fr: {
    "hero.title": "Découvrez Marrakech",
    "hero.subtitle":
      "Transferts privés premium et visites guidées à travers les rues et paysages enchanteurs de Marrakech.",
    "nav.home": "Accueil",
    "nav.routes": "Itinéraires",
    "nav.fleet": "Flotte",
    "nav.whyUs": "Pourquoi Nous",
    "nav.reviews": "Avis",
    "nav.faq": "FAQ",
    whatsapp: "WhatsApp",
    bookNow: "Réserver",
    contactUs: "Contactez-nous",
    learnMore: "En savoir plus",
  },
  ar: {
    "hero.title": "اكتشف مراكش",
    "hero.subtitle":
      "خدمات نقل خاصة متميزة وجولات سياحية عبر شوارع ومناظر مراكش الساحرة.",
    "nav.home": "الرئيسية",
    "nav.routes": "المسارات",
    "nav.fleet": "الأسطول",
    "nav.whyUs": "لماذا نحن",
    "nav.reviews": "التقييمات",
    "nav.faq": "الأسئلة الشائعة",
    whatsapp: "واتساب",
    bookNow: "احجز الآن",
    contactUs: "اتصل بنا",
    learnMore: "اعرف المزيد",
  },
};

export function useTranslation() {
  const { language } = useLocale();

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return { t, language };
}
