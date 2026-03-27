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
      "button.viewDetails": "View Details",
      "button.chatWhatsapp": "Chat on WhatsApp",
      "button.sendAnother": "Send another request",

      // Reservation Form
      "form.title": "Book Your Transfer",
      "form.bookTrip": "Book Your Trip",
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
      "form.selectTour": "Select Tour",
      "form.selectTourPlaceholder": "Select a tour...",
      "form.namePlaceholder": "Your full name",
      "form.emailPlaceholder": "you@example.com",
      "form.phonePlaceholder": "+212 6XX XXX XXX",
      "form.pickupPlaceholder": "Airport, Hotel, or specific location",
      "form.dropoffPlaceholder": "Destination",
      "form.notesPlaceholder":
        "Any special requests? (Flight number, excess luggage, etc.)",
      "form.transfer": "Transfer",
      "form.tour": "Tour",
      "form.addExtras": "+ Add Extras (Child Seat, Wi-Fi...)",
      "form.extraChildSeat": "Child Seat",
      "form.extraWifi": "Wi-Fi",
      "form.extraWater": "Water & Snacks",
      "form.estimatedTotal": "Estimated Total",
      "form.quoteRequest": "Quote Request",
      "form.onDemand": "On Demand",
      "form.sending": "Sending...",
      "form.requestQuote": "Request Quote & Availability",
      "form.requestSent": "Request Sent!",
      "form.requestSentMessage":
        "Thank you for your booking request. Our team will review it and contact you via WhatsApp shortly to confirm availability and price.",
      "form.submitError":
        "Could not send your reservation. Please try again or contact us via WhatsApp.",
      "form.disclaimer":
        "Free cancellation up to 24 hours before pickup. Instant confirmation via WhatsApp.",
      "form.pax": "Pax",
      "form.seats": "Seats",

      // Popular Routes
      "routes.title": "Popular Routes",
      "routes.subtitle": "Explore our most requested destinations",
      "routes.from": "From",
      "routes.duration": "Varies",

      // Fleet Section
      "fleet.title": "Our Premium Fleet",
      "fleet.subtitle": "Choose from our range of luxury vehicles",
      "fleet.passengers": "passengers",
      "fleet.luggage": "luggage",
      "fleet.features": "Features",
      "fleet.airConditioning": "Air Conditioning",
      "fleet.usbCharger": "USB Charger",
      "fleet.comfortableSeats": "Comfortable Seats",

      // Why Us Section
      "whyUs.title": "Why Choose Us",
      "whyUs.subtitle": "Your trusted partner for premium transfers",
      "whyUs.punctual": "Punctual Service",
      "whyUs.punctualDesc":
        "Always on time, every time. We respect your schedule.",
      "whyUs.licensed": "Licensed & Insured",
      "whyUs.licensedDesc":
        "Full insurance coverage and professional credentials",
      "whyUs.professional": "Professional Drivers",
      "whyUs.professionalDesc":
        "Courteous, experienced drivers fluent in multiple languages",
      "whyUs.doorToDoor": "Door-to-Door Service",
      "whyUs.doorToDoorDesc":
        "Pickup and drop-off at any location in Marrakech",
      "whyUs.support": "24/7 Support",
      "whyUs.supportDesc":
        "Round-the-clock customer service via WhatsApp and phone",
      "whyUs.cleanVehicles": "Clean Vehicles",
      "whyUs.cleanVehiclesDesc":
        "Spotless interiors and well-maintained modern cars",

      // Reviews Section
      "reviews.title": "What Our Clients Say",
      "reviews.subtitle": "Real experiences from travelers like you",
      "reviews.review1":
        "Exceptional service! Our driver was knowledgeable, courteous, and made our trip to the desert unforgettable.",
      "reviews.review2":
        "Professional, clean car, and very comfortable. Highly recommend for anyone visiting Marrakech!",
      "reviews.review3":
        "Best transport service in Marrakech. Reliable, affordable, and they go above and beyond to help.",

      // FAQ Section
      "faq.title": "Frequently Asked Questions",
      "faq.subtitle": "Find answers to common questions",
      "faq.q1": "How far in advance should I book?",
      "faq.a1":
        "We recommend booking at least 24 hours in advance. However, we accept last-minute bookings subject to vehicle availability. Contact us via WhatsApp for urgent requests.",
      "faq.q2": "What is your cancellation policy?",
      "faq.a2":
        "Free cancellation up to 24 hours before your scheduled pickup. Cancellations within 24 hours may incur a 50% charge.",
      "faq.q3": "Do you offer airport pickups?",
      "faq.a3":
        "Yes, we specialize in airport transfers. We offer fixed rates from Marrakech Airport to any location in the city. Meet-and-greet service is available upon request.",
      "faq.q4": "Are your drivers multilingual?",
      "faq.a4":
        "Our drivers speak Arabic, French, English, and Spanish. We can arrange guides for specialized tours and excursions.",
      "faq.q5": "Can I bring luggage?",
      "faq.a5":
        "Absolutely. Our vehicles are equipped with spacious trunks. Standard luggage is included; oversized items may incur an additional charge.",
      "faq.q6": "Do you offer child seats?",
      "faq.a6":
        "Yes, child seats are available for an additional $15. Please specify your child's age when booking.",

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

      // Tours Page
      "tours.pageTitle": "All Tours & Transfers",
      "tours.pageSubtitle":
        "Explore our wide range of services, from airport transfers to desert excursions.",
      "tours.notFound": "Tour Not Found",
      "tours.backToAll": "Back to all tours",
      "tours.overview": "Overview",
      "tours.keyFeatures": "Key Features & Amenities",
      "tours.noFeatures": "No specific features listed.",
      "tours.vehicleInfo": "Vehicle Information",
      "tours.capacity": "Capacity",
      "tours.vehicleType": "Vehicle Type",
      "tours.bookThisTour": "Book This Tour",
      "tours.clickToReserve": "Click the button below to reserve",
      "tours.fillForm":
        "Fill out the form below to complete your reservation request.",
      "tours.needHelp": "Need Help?",
      "tours.contactWhatsapp":
        "Contact us directly via WhatsApp for immediate assistance.",

      // Fleet Detail Page
      "fleetDetail.notFound": "Vehicle Not Found",
      "fleetDetail.backToFleet": "Back to Fleet",
      "fleetDetail.overview": "Overview",
      "fleetDetail.overviewText":
        "Experience comfort and reliability with our {{model}}. Perfect for {{audience}}, offering ample space and premium features for your journey in Morocco.",
      "fleetDetail.groupsAndFamilies": "groups and families",
      "fleetDetail.couplesAndBusiness": "couples and business travelers",
      "fleetDetail.specs": "Specifications & Amenities",
      "fleetDetail.passengers": "Passengers",
      "fleetDetail.luggageCapacity": "Luggage Capacity",
      "fleetDetail.vehicleType": "Vehicle Type",
      "fleetDetail.luxuryVan": "Luxury Van/Sedan",
      "fleetDetail.standardTransport": "Standard Transport",
      "fleetDetail.condition": "Condition",
      "fleetDetail.excellent": "Excellent",
      "fleetDetail.bookThisVehicle": "Book This Vehicle",
      "fleetDetail.startingFrom": "Starting from",
      "fleetDetail.clickToReserve": "Click the button below to reserve",
      "fleetDetail.fillForm":
        "Fill out the form below to complete your reservation request.",
      "fleetDetail.needHelp": "Need Help?",
      "fleetDetail.contactWhatsapp":
        "Contact us directly via WhatsApp for immediate assistance.",
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
      "button.viewDetails": "Voir les détails",
      "button.chatWhatsapp": "Discuter sur WhatsApp",
      "button.sendAnother": "Envoyer une autre demande",

      // Reservation Form
      "form.title": "Réservez votre transfert",
      "form.bookTrip": "Réservez votre voyage",
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
      "form.selectTour": "Sélectionner un circuit",
      "form.selectTourPlaceholder": "Sélectionner un circuit...",
      "form.namePlaceholder": "Votre nom complet",
      "form.emailPlaceholder": "vous@exemple.com",
      "form.phonePlaceholder": "+212 6XX XXX XXX",
      "form.pickupPlaceholder": "Aéroport, hôtel ou lieu précis",
      "form.dropoffPlaceholder": "Destination",
      "form.notesPlaceholder":
        "Demandes spéciales ? (Numéro de vol, excédent de bagages, etc.)",
      "form.transfer": "Transfert",
      "form.tour": "Circuit",
      "form.addExtras": "+ Ajouter des extras (Siège enfant, Wi-Fi...)",
      "form.extraChildSeat": "Siège enfant",
      "form.extraWifi": "Wi-Fi",
      "form.extraWater": "Eau & Snacks",
      "form.estimatedTotal": "Total estimé",
      "form.quoteRequest": "Demande de devis",
      "form.onDemand": "Sur demande",
      "form.sending": "Envoi en cours...",
      "form.requestQuote": "Demander un devis & disponibilité",
      "form.requestSent": "Demande envoyée !",
      "form.requestSentMessage":
        "Merci pour votre demande de réservation. Notre équipe l'examinera et vous contactera via WhatsApp pour confirmer la disponibilité et le prix.",
      "form.submitError":
        "Impossible d'envoyer votre réservation. Veuillez réessayer ou nous contacter via WhatsApp.",
      "form.disclaimer":
        "Annulation gratuite jusqu'à 24 heures avant la prise en charge. Confirmation instantanée via WhatsApp.",
      "form.pax": "Pax",
      "form.seats": "Places",

      // Popular Routes
      "routes.title": "Itinéraires populaires",
      "routes.subtitle": "Explorez nos destinations les plus demandées",
      "routes.from": "Depuis",
      "routes.duration": "Variable",

      // Fleet Section
      "fleet.title": "Notre flotte premium",
      "fleet.subtitle": "Choisissez parmi notre gamme de véhicules de luxe",
      "fleet.passengers": "passagers",
      "fleet.luggage": "bagages",
      "fleet.features": "Caractéristiques",
      "fleet.airConditioning": "Climatisation",
      "fleet.usbCharger": "Chargeur USB",
      "fleet.comfortableSeats": "Sièges confortables",

      // Why Us Section
      "whyUs.title": "Pourquoi nous choisir",
      "whyUs.subtitle":
        "Votre partenaire de confiance pour les transferts premium",
      "whyUs.punctual": "Service ponctuel",
      "whyUs.punctualDesc":
        "Toujours à l'heure, à chaque fois. Nous respectons votre emploi du temps.",
      "whyUs.licensed": "Agréé & Assuré",
      "whyUs.licensedDesc":
        "Couverture d'assurance complète et accréditations professionnelles",
      "whyUs.professional": "Chauffeurs professionnels",
      "whyUs.professionalDesc":
        "Chauffeurs courtois et expérimentés parlant plusieurs langues",
      "whyUs.doorToDoor": "Service porte-à-porte",
      "whyUs.doorToDoorDesc":
        "Prise en charge et dépose à n'importe quel endroit à Marrakech",
      "whyUs.support": "Support 24/7",
      "whyUs.supportDesc": "Service client 24h/24 via WhatsApp et téléphone",
      "whyUs.cleanVehicles": "Véhicules propres",
      "whyUs.cleanVehiclesDesc":
        "Intérieurs impeccables et voitures modernes bien entretenues",

      // Reviews Section
      "reviews.title": "Ce que disent nos clients",
      "reviews.subtitle": "Expériences réelles de voyageurs comme vous",
      "reviews.review1":
        "Service exceptionnel ! Notre chauffeur était compétent, courtois et a rendu notre voyage dans le désert inoubliable.",
      "reviews.review2":
        "Professionnel, voiture propre et très confortable. Je recommande vivement pour tous ceux qui visitent Marrakech !",
      "reviews.review3":
        "Le meilleur service de transport à Marrakech. Fiable, abordable, et ils font tout pour vous aider.",

      // FAQ Section
      "faq.title": "Questions fréquemment posées",
      "faq.subtitle": "Trouvez des réponses aux questions courantes",
      "faq.q1": "Combien de temps à l'avance dois-je réserver ?",
      "faq.a1":
        "Nous recommandons de réserver au moins 24 heures à l'avance. Cependant, nous acceptons les réservations de dernière minute sous réserve de disponibilité. Contactez-nous via WhatsApp pour les demandes urgentes.",
      "faq.q2": "Quelle est votre politique d'annulation ?",
      "faq.a2":
        "Annulation gratuite jusqu'à 24 heures avant votre prise en charge. Les annulations dans les 24 heures peuvent entraîner des frais de 50%.",
      "faq.q3": "Proposez-vous des transferts aéroport ?",
      "faq.a3":
        "Oui, nous sommes spécialisés dans les transferts aéroport. Nous proposons des tarifs fixes depuis l'aéroport de Marrakech vers n'importe quel endroit de la ville. Un service d'accueil est disponible sur demande.",
      "faq.q4": "Vos chauffeurs sont-ils multilingues ?",
      "faq.a4":
        "Nos chauffeurs parlent arabe, français, anglais et espagnol. Nous pouvons organiser des guides pour des circuits et excursions spécialisés.",
      "faq.q5": "Puis-je apporter des bagages ?",
      "faq.a5":
        "Absolument. Nos véhicules sont équipés de coffres spacieux. Les bagages standards sont inclus ; les articles surdimensionnés peuvent entraîner un supplément.",
      "faq.q6": "Proposez-vous des sièges enfants ?",
      "faq.a6":
        "Oui, des sièges enfants sont disponibles moyennant un supplément de 15$. Veuillez préciser l'âge de votre enfant lors de la réservation.",

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

      // Tours Page
      "tours.pageTitle": "Tous les circuits & transferts",
      "tours.pageSubtitle":
        "Découvrez notre large gamme de services, des transferts aéroport aux excursions dans le désert.",
      "tours.notFound": "Circuit introuvable",
      "tours.backToAll": "Retour à tous les circuits",
      "tours.overview": "Aperçu",
      "tours.keyFeatures": "Caractéristiques & Équipements",
      "tours.noFeatures": "Aucune caractéristique spécifique listée.",
      "tours.vehicleInfo": "Informations sur le véhicule",
      "tours.capacity": "Capacité",
      "tours.vehicleType": "Type de véhicule",
      "tours.bookThisTour": "Réserver ce circuit",
      "tours.clickToReserve": "Cliquez sur le bouton ci-dessous pour réserver",
      "tours.fillForm":
        "Remplissez le formulaire ci-dessous pour compléter votre demande de réservation.",
      "tours.needHelp": "Besoin d'aide ?",
      "tours.contactWhatsapp":
        "Contactez-nous directement via WhatsApp pour une assistance immédiate.",

      // Fleet Detail Page
      "fleetDetail.notFound": "Véhicule introuvable",
      "fleetDetail.backToFleet": "Retour à la flotte",
      "fleetDetail.overview": "Aperçu",
      "fleetDetail.overviewText":
        "Découvrez le confort et la fiabilité avec notre {{model}}. Idéal pour {{audience}}, offrant un espace généreux et des équipements premium pour votre voyage au Maroc.",
      "fleetDetail.groupsAndFamilies": "les groupes et les familles",
      "fleetDetail.couplesAndBusiness":
        "les couples et les voyageurs d'affaires",
      "fleetDetail.specs": "Spécifications & Équipements",
      "fleetDetail.passengers": "Passagers",
      "fleetDetail.luggageCapacity": "Capacité bagages",
      "fleetDetail.vehicleType": "Type de véhicule",
      "fleetDetail.luxuryVan": "Van/Berline de luxe",
      "fleetDetail.standardTransport": "Transport standard",
      "fleetDetail.condition": "État",
      "fleetDetail.excellent": "Excellent",
      "fleetDetail.bookThisVehicle": "Réserver ce véhicule",
      "fleetDetail.startingFrom": "À partir de",
      "fleetDetail.clickToReserve":
        "Cliquez sur le bouton ci-dessous pour réserver",
      "fleetDetail.fillForm":
        "Remplissez le formulaire ci-dessous pour compléter votre demande de réservation.",
      "fleetDetail.needHelp": "Besoin d'aide ?",
      "fleetDetail.contactWhatsapp":
        "Contactez-nous directement via WhatsApp pour une assistance immédiate.",
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
