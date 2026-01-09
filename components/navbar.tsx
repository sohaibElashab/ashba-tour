"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import LocaleSelector from "./locale-selector";

interface NavbarProps {
  scrolled: boolean;
}

export default function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.routes"), href: "#routes" },
    { label: t("nav.fleet"), href: "#fleet" },
    { label: t("nav.whyUs"), href: "#why-us" },
    { label: t("nav.reviews"), href: "#reviews" },
    { label: t("nav.faq"), href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Ashab Tours Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-primary/80"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <MessageCircle size={16} />
              {t("button.whatsapp")}
            </a>
            <LocaleSelector scrolled={scrolled} />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                scrolled
                  ? "text-secondary hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden pb-4 space-y-2 ${
              scrolled ? "bg-white" : "bg-secondary/95"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  scrolled
                    ? "text-foreground hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="block mx-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium text-center"
            >
              {t("button.whatsapp")}
            </a>
            <div className="mx-4 flex justify-center">
              <LocaleSelector scrolled={scrolled} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
