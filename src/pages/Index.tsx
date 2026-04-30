import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import MapView from "@/components/MapView";
import HostSection from "@/components/HostSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import PropertyDetail from "@/components/PropertyDetail";
import type { Property } from "@/data/properties";

const Index = () => {
  const [selected, setSelected] = useState<Property | null>(null);

  useEffect(() => {
    document.title = "Maison — Curated luxury vacation rentals";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Maison is a privately curated collection of luxury vacation rentals — architectural villas, alpine chalets, and island retreats around the world.");
    document.body.style.overflow = selected ? "hidden" : "";
  }, [selected]);

  return (
    <main>
      <Navbar />
      <Hero />
      <PropertyGrid onSelect={setSelected} />
      <MapView />
      <HostSection />
      <Testimonials />
      <Footer />
      {selected && <PropertyDetail property={selected} onClose={() => setSelected(null)} />}
    </main>
  );
};

export default Index;
