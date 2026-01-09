import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LocaleProvider } from "@/contexts/locale-context";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Marrakech Transfers | Premium Transport & Tours",
  description:
    "Premium private transfers, airport pickups, and guided day trips across Marrakech. Book your reliable, luxury transport service today.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <LocaleProvider>
          {children}
          <Analytics />
        </LocaleProvider>
      </body>
    </html>
  );
}
