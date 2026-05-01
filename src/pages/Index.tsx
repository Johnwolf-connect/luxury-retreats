import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import MapView from "@/components/MapView";
import HostSection from "@/components/HostSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import WhyBookSection from "@/components/WhyBookSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Maison — Curated Luxury Escapes · Private Retreats";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Maison is a privately curated collection of luxury vacation rentals — architectural villas, alpine chalets, and island retreats. Book your private retreat.");
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <PropertyGrid />
      <WhyBookSection />
      <MapView />
      <HostSection />
      <TestimonialsCarousel />
      <Footer />
    </main>
  );
};

export default Index;
