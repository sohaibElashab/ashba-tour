import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.routes": "Routes",
      "nav.fleet": "Fleet",
      "nav.whyUs": "Why Us",
      "nav.reviews": "Reviews",
      "nav.faq": "FAQ",

      // Hero Section
      "hero.title": "Discover Marrakech",
      "hero.subtitle": "Your Way",
      "hero.description":
        "Premium private transfers and guided tours through the enchanting streets and landscapes of Marrakech.",

      // Buttons
      "button.whatsapp": "WhatsApp",
      "button.bookNow": "Book Now",
      "button.contactUs": "Contact Us",
      "button.learnMore": "Learn More",
      "button.viewAll": "View All Routes",
      "button.getQuote": "Get a Quote",

      // Reservation Form
      "form.title": "Book Your Transfer",
      "form.pickup": "Pickup Location",
      "form.dropoff": "Drop-off Location",
      "form.date": "Date",
      "form.time": "Time",
      "form.passengers": "Passengers",
      "form.vehicleType": "Vehicle Type",
      "form.name": "Full Name",
      "form.email": "Email",
      "form.phone": "Phone Number",
      "form.submit": "Book Now",
      "form.selectDate": "Select date",
      "form.selectVehicle": "Select vehicle type",

      // Popular Routes
      "routes.title": "Popular Routes",
      "routes.subtitle": "Explore our most requested destinations",
      "routes.from": "From",

      // Fleet Section
      "fleet.title": "Our Premium Fleet",
      "fleet.subtitle": "Choose from our range of luxury vehicles",
      "fleet.passengers": "passengers",
      "fleet.luggage": "luggage",

      // Why Us Section
      "whyUs.title": "Why Choose Us",
      "whyUs.subtitle": "Your trusted partner for premium transfers",
      "whyUs.professional": "Professional Drivers",
      "whyUs.professionalDesc":
        "Experienced, licensed drivers with local knowledge",
      "whyUs.comfort": "Luxury Comfort",
      "whyUs.comfortDesc": "Modern, well-maintained vehicles with AC",
      "whyUs.punctual": "Always Punctual",
      "whyUs.punctualDesc": "We value your time and guarantee timely service",
      "whyUs.support": "24/7 Support",
      "whyUs.supportDesc":
        "Round-the-clock customer service in multiple languages",

      // Reviews Section
      "reviews.title": "What Our Clients Say",
      "reviews.subtitle": "Real experiences from travelers like you",

      // FAQ Section
      "faq.title": "Frequently Asked Questions",
      "faq.subtitle": "Find answers to common questions",

      // Footer
      "footer.description":
        "Premium private transfers and guided tours across Marrakech since 2015.",
      "footer.quickLinks": "Quick Links",
      "footer.contact": "Contact",
      "footer.quickBooking": "Quick Booking",
      "footer.rights": "All rights reserved.",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",

      // Locale Selector
      "locale.settings": "Settings",
      "locale.language": "Language",
      "locale.currency": "Currency",
      "locale.selected": "Selected",
      "locale.button": "Lang/Currency",
    },
  },
  fr: {
    translation: {
      // Navigation
      "nav.home": "Accueil",
      "nav.routes": "Itinéraires",
      "nav.fleet": "Flotte",
      "nav.whyUs": "Pourquoi Nous",
      "nav.reviews": "Avis",
      "nav.faq": "FAQ",

      // Hero Section
      "hero.title": "Découvrez Marrakech",
      "hero.subtitle": "À Votre Façon",
      "hero.description":
        "Transferts privés premium et visites guidées à travers les rues et paysages enchanteurs de Marrakech.",

      // Buttons
      "button.whatsapp": "WhatsApp",
      "button.bookNow": "Réserver",
      "button.contactUs": "Contactez-nous",
      "button.learnMore": "En savoir plus",
      "button.viewAll": "Voir tous les itinéraires",
      "button.getQuote": "Obtenir un devis",

      // Reservation Form
      "form.title": "Réservez votre transfert",
      "form.pickup": "Lieu de prise en charge",
      "form.dropoff": "Lieu de dépose",
      "form.date": "Date",
      "form.time": "Heure",
      "form.passengers": "Passagers",
      "form.vehicleType": "Type de véhicule",
      "form.name": "Nom complet",
      "form.email": "Email",
      "form.phone": "Numéro de téléphone",
      "form.submit": "Réserver maintenant",
      "form.selectDate": "Sélectionner la date",
      "form.selectVehicle": "Sélectionner le type de véhicule",

      // Popular Routes
      "routes.title": "Itinéraires populaires",
      "routes.subtitle": "Explorez nos destinations les plus demandées",
      "routes.from": "Depuis",

      // Fleet Section
      "fleet.title": "Notre flotte premium",
      "fleet.subtitle": "Choisissez parmi notre gamme de véhicules de luxe",
      "fleet.passengers": "passagers",
      "fleet.luggage": "bagages",

      // Why Us Section
      "whyUs.title": "Pourquoi nous choisir",
      "whyUs.subtitle":
        "Votre partenaire de confiance pour les transferts premium",
      "whyUs.professional": "Chauffeurs professionnels",
      "whyUs.professionalDesc":
        "Chauffeurs expérimentés et agréés avec connaissance locale",
      "whyUs.comfort": "Confort de luxe",
      "whyUs.comfortDesc":
        "Véhicules modernes et bien entretenus avec climatisation",
      "whyUs.punctual": "Toujours ponctuel",
      "whyUs.punctualDesc":
        "Nous valorisons votre temps et garantissons un service ponctuel",
      "whyUs.support": "Support 24/7",
      "whyUs.supportDesc": "Service client 24h/24 en plusieurs langues",

      // Reviews Section
      "reviews.title": "Ce que disent nos clients",
      "reviews.subtitle": "Expériences réelles de voyageurs comme vous",

      // FAQ Section
      "faq.title": "Questions fréquemment posées",
      "faq.subtitle": "Trouvez des réponses aux questions courantes",

      // Footer
      "footer.description":
        "Transferts privés premium et visites guidées à travers Marrakech depuis 2015.",
      "footer.quickLinks": "Liens rapides",
      "footer.contact": "Contact",
      "footer.quickBooking": "Réservation rapide",
      "footer.rights": "Tous droits réservés.",
      "footer.privacy": "Politique de confidentialité",
      "footer.terms": "Conditions d'utilisation",

      // Locale Selector
      "locale.settings": "Paramètres",
      "locale.language": "Langue",
      "locale.currency": "Devise",
      "locale.selected": "Sélectionné",
      "locale.button": "Langue/Devise",
    },
  },
  ar: {
    translation: {
      // Navigation
      "nav.home": "الرئيسية",
      "nav.routes": "المسارات",
      "nav.fleet": "الأسطول",
      "nav.whyUs": "لماذا نحن",
      "nav.reviews": "التقييمات",
      "nav.faq": "الأسئلة الشائعة",

      // Hero Section
      "hero.title": "اكتشف مراكش",
      "hero.subtitle": "بطريقتك",
      "hero.description":
        "خدمات نقل خاصة متميزة وجولات سياحية عبر شوارع ومناظر مراكش الساحرة.",

      // Buttons
      "button.whatsapp": "واتساب",
      "button.bookNow": "احجز الآن",
      "button.contactUs": "اتصل بنا",
      "button.learnMore": "اعرف المزيد",
      "button.viewAll": "عرض جميع المسارات",
      "button.getQuote": "احصل على عرض سعر",

      // Reservation Form
      "form.title": "احجز خدمة النقل الخاصة بك",
      "form.pickup": "موقع الاستلام",
      "form.dropoff": "موقع التسليم",
      "form.date": "التاريخ",
      "form.time": "الوقت",
      "form.passengers": "الركاب",
      "form.vehicleType": "نوع المركبة",
      "form.name": "الاسم الكامل",
      "form.email": "البريد الإلكتروني",
      "form.phone": "رقم الهاتف",
      "form.submit": "احجز الآن",
      "form.selectDate": "اختر التاريخ",
      "form.selectVehicle": "اختر نوع المركبة",

      // Popular Routes
      "routes.title": "المسارات الشائعة",
      "routes.subtitle": "استكشف وجهاتنا الأكثر طلبًا",
      "routes.from": "من",

      // Fleet Section
      "fleet.title": "أسطولنا المتميز",
      "fleet.subtitle": "اختر من مجموعتنا من المركبات الفاخرة",
      "fleet.passengers": "ركاب",
      "fleet.luggage": "أمتعة",

      // Why Us Section
      "whyUs.title": "لماذا تختارنا",
      "whyUs.subtitle": "شريكك الموثوق للنقل المتميز",
      "whyUs.professional": "سائقون محترفون",
      "whyUs.professionalDesc": "سائقون ذوو خبرة ومرخصون بمعرفة محلية",
      "whyUs.comfort": "راحة فاخرة",
      "whyUs.comfortDesc": "مركبات حديثة ومصانة جيدًا مع تكييف",
      "whyUs.punctual": "دائمًا في الموعد",
      "whyUs.punctualDesc": "نحن نقدر وقتك ونضمن خدمة في الوقت المحدد",
      "whyUs.support": "دعم 24/7",
      "whyUs.supportDesc": "خدمة عملاء على مدار الساعة بعدة لغات",

      // Reviews Section
      "reviews.title": "ماذا يقول عملاؤنا",
      "reviews.subtitle": "تجارب حقيقية من مسافرين مثلك",

      // FAQ Section
      "faq.title": "الأسئلة الشائعة",
      "faq.subtitle": "ابحث عن إجابات للأسئلة الشائعة",

      // Footer
      "footer.description":
        "خدمات نقل خاصة متميزة وجولات سياحية عبر مراكش منذ 2015.",
      "footer.quickLinks": "روابط سريعة",
      "footer.contact": "اتصل",
      "footer.quickBooking": "حجز سريع",
      "footer.rights": "جميع الحقوق محفوظة.",
      "footer.privacy": "سياسة الخصوصية",
      "footer.terms": "شروط الخدمة",

      // Locale Selector
      "locale.settings": "الإعدادات",
      "locale.language": "اللغة",
      "locale.currency": "العملة",
      "locale.selected": "المحدد",
      "locale.button": "اللغة/العملة",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
