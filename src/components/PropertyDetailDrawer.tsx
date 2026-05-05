import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, BedDouble, Bath, Square, MapPin, ChevronLeft, ChevronRight,
  Heart, Phone, Calendar, Check, Sparkles, ArrowUpRight,
} from "lucide-react";
import type { Property } from "@/data/properties";
import { Link } from "react-router-dom";
import PropertyMap from "./PropertyMap";

const formatPrice = (p: Property) =>
  p.listingType === "Rent" ? `$${p.price.toLocaleString()}/mo` : `$${p.price.toLocaleString()}`;

const PropertyDetailDrawer = ({
  property,
  open,
  onClose,
}: {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}) => {
  const [idx, setIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setIdx(0);
  }, [property?.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (property ? (i + 1) % property.gallery.length : i));
      if (e.key === "ArrowLeft") setIdx((i) => (property ? (i - 1 + property.gallery.length) % property.gallery.length : i));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, property]);

  return (
    <AnimatePresence>
      {open && property && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[121] w-full max-w-[860px] overflow-y-auto bg-background shadow-elegant"
          >
            {/* Top bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/40 bg-background/90 px-6 py-4 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{property.location} · {property.country}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSaved((s) => !s)}
                  className="flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-[10px] uppercase tracking-wider transition-smooth hover:border-primary"
                >
                  <Heart className={`h-3.5 w-3.5 ${saved ? "fill-primary text-primary" : ""}`} />
                  {saved ? "Saved" : "Save"}
                </button>
                <button onClick={onClose} className="rounded-full border border-border/60 p-2 transition-smooth hover:border-primary" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Carousel */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={idx}
                  src={property.gallery[idx]}
                  alt={`${property.name} ${idx + 1}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <button
                onClick={() => setIdx((i) => (i - 1 + property.gallery.length) % property.gallery.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2.5 backdrop-blur-md transition-smooth hover:bg-background"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIdx((i) => (i + 1) % property.gallery.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2.5 backdrop-blur-md transition-smooth hover:bg-background"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {property.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`h-1 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-2 bg-foreground/40"}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <span className="absolute right-4 top-4 rounded-full bg-background/70 px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur-md">
                {idx + 1} / {property.gallery.length}
              </span>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto border-b border-border/40 px-6 py-4 no-scrollbar">
              {property.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-sm transition-all ${i === idx ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"}`}
                >
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="px-6 py-8 lg:px-10">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-3xl leading-tight sm:text-4xl">{property.name}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {property.address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-3xl text-primary">{formatPrice(property)}</p>
                  {property.listingType === "Rent" && (
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">+ utilities · 12 mo lease</p>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/40 bg-border/40 sm:grid-cols-4">
                {[
                  { icon: BedDouble, v: property.bedrooms, l: "Bedrooms" },
                  { icon: Bath, v: property.bathrooms, l: "Bathrooms" },
                  { icon: Square, v: property.sqft.toLocaleString(), l: "Sq ft" },
                  { icon: Sparkles, v: property.yearBuilt, l: "Year built" },
                ].map(({ icon: Icon, v, l }) => (
                  <div key={l} className="flex flex-col items-center justify-center gap-1 bg-card px-4 py-5">
                    <Icon className="h-4 w-4 text-primary" />
                    <p className="font-display text-xl">{v}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-10">
                <h3 className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">About this home</h3>
                <p className="leading-relaxed text-foreground/85">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="mt-10">
                <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Features & amenities</h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {property.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 rounded-sm border border-border/40 bg-card/60 px-4 py-3 text-sm">
                      <Check className="h-4 w-4 text-primary" /> {a}
                    </div>
                  ))}
                </div>
              </div>

              {/* Map snippet */}
              <div className="mt-10">
                <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Location</h3>
                <PropertyMap property={property} />
              </div>

              {/* Spacer for sticky CTA */}
              <div className="h-28" />
            </div>

            {/* Sticky CTA */}
            <div className="sticky bottom-0 border-t border-border/40 bg-background/95 px-6 py-4 backdrop-blur-xl lg:px-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button className="flex-1 bg-gradient-warm py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-smooth hover:opacity-95">
                  {property.listingType === "Rent"
                    ? "File application · $75 fee"
                    : "Schedule a private tour"}
                </button>
                <a
                  href="tel:+14045550199"
                  className="flex items-center justify-center gap-2 rounded-sm border border-border/60 px-5 py-4 text-xs uppercase tracking-wider transition-smooth hover:border-primary hover:text-primary"
                >
                  <Phone className="h-3.5 w-3.5" /> Contact agent
                </a>
                <Link
                  to={`/property/${property.id}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 rounded-sm border border-border/60 px-5 py-4 text-xs uppercase tracking-wider transition-smooth hover:border-primary hover:text-primary"
                >
                  Full page <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default PropertyDetailDrawer;
