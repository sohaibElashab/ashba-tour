"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Star,
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Ashab Tours Logo"
                width={150}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/80 text-sm">{t("footer.description")}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors">
                <Phone size={16} />
                +212 654-155528
              </li>
              <li className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors">
                <Mail size={16} />
                Reservationashabtours@gmail.com
              </li>
              <li className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors">
                <MapPin size={16} />
                Marrakech, Morocco
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">
              {t("footer.quickBooking")}
            </h3>
            <a
              href="https://wa.me/212654155528"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-full px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium text-center justify-center mb-3"
            >
              <MessageCircle size={18} />
              {t("button.whatsapp")}
            </a>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/ashabtours"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tripadvisor.fr/Attraction_Review-g293734-d34091930-Reviews-Ashab_Tours_Transport_Touristique-Marrakech_Marrakech_Safi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-primary transition-colors"
              >
                <Star size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/ashab-tours/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-primary transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/70">
          <p>&copy; 2025 Marrakech Transfers. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
