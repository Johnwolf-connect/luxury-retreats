import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import MapView from "@/components/MapView";
import MarketInsights from "@/components/MarketInsights";
import HostSection from "@/components/HostSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import WhyBookSection from "@/components/WhyBookSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Maison Georgia — Luxury Homes in Atlanta, Buckhead & Beyond";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Maison Georgia is a boutique luxury real estate firm. Discover exceptional homes for sale and investment in Atlanta, Buckhead, Alpharetta, Milton and Sandy Springs.");
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <PropertyGrid />
      <MapView />
      <WhyBookSection />
      <MarketInsights />
      <HostSection />
      <TestimonialsCarousel />
      <Footer />
    </main>
  );
};

export default Index;
