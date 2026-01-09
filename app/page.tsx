"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import PopularRoutes from "@/components/popular-routes"
import Fleet from "@/components/fleet"
import WhyUs from "@/components/why-us"
import Reviews from "@/components/reviews"
import Faq from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Navbar scrolled={scrolled} />
      <Hero onScroll={setScrolled} />
      <PopularRoutes />
      <Fleet />
      <WhyUs />
      <Reviews />
      <Faq />
      <Footer />
    </main>
  )
}
