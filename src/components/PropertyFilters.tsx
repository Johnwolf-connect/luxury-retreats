import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Waves, ChefHat, Wifi, Car, TreePine, Mountain, Flame, Wind, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export type Filters = {
  price: [number, number];
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  propertyType: string;
  listingType: "Any" | "Sale" | "Rent";
};

export const PROPERTY_TYPES = ["Any", "Single Family", "Estate", "Condo", "Townhome", "New Construction", "Investment"] as const;

export const AMENITY_OPTIONS = [
  { key: "Pool", icon: Waves },
  { key: "Chef kitchen", icon: ChefHat },
  { key: "Smart home", icon: Sparkles },
  { key: "Gated", icon: Mountain },
  { key: "Wine cellar", icon: Flame },
  { key: "Acreage", icon: TreePine },
  { key: "EV charging", icon: Car },
  { key: "Air conditioning", icon: Wind },
  { key: "Wi-Fi", icon: Wifi },
];

export const DEFAULT_FILTERS: Filters = {
  price: [500000, 15000000],
  bedrooms: 0,
  bathrooms: 0,
  amenities: [],
  propertyType: "Any",
  listingType: "Any",
};

const fmtPrice = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M` : `$${(n / 1000).toFixed(0)}K`;

const PropertyFilters = ({
  filters,
  onChange,
  resultCount,
  onClear,
  mobileOpen,
  setMobileOpen,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  resultCount: number;
  onClear: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  variant?: "sidebar" | "inline";
}) => {
  const toggleAmenity = (k: string) => {
    onChange({
      ...filters,
      amenities: filters.amenities.includes(k)
        ? filters.amenities.filter((a) => a !== k)
        : [...filters.amenities, k],
    });
  };

  const Body = (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="font-display text-xl">Refine</p>
        <button
          onClick={onClear}
          className="text-[10px] uppercase tracking-wider text-primary transition-smooth hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* For Sale / For Rent */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Listing</p>
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-sm bg-border/50">
          {(["Any", "Sale", "Rent"] as const).map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...filters, listingType: t })}
              className={cn(
                "py-2 text-xs uppercase tracking-wider transition-smooth",
                filters.listingType === t ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
              )}
            >
              {t === "Any" ? "All" : `For ${t}`}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Price</p>
          <p className="text-sm tabular-nums text-foreground/80">
            {fmtPrice(filters.price[0])} – {fmtPrice(filters.price[1])}
          </p>
        </div>
        <Slider
          min={500000}
          max={15000000}
          step={50000}
          value={filters.price}
          onValueChange={(v) => onChange({ ...filters, price: [v[0], v[1]] as [number, number] })}
          className="py-2"
        />
      </div>

      {/* Property type */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Property type</p>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...filters, propertyType: t })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-smooth",
                filters.propertyType === t
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-foreground/70 hover:border-primary/50"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Bedrooms</p>
        <div className="flex flex-wrap gap-2">
          {[0, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => onChange({ ...filters, bedrooms: n })}
              className={cn(
                "min-w-[44px] rounded-full border px-3 py-1.5 text-xs transition-smooth",
                filters.bedrooms === n
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-foreground/70 hover:border-primary/50"
              )}
            >
              {n === 0 ? "Any" : `${n}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Bathrooms</p>
        <div className="flex flex-wrap gap-2">
          {[0, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => onChange({ ...filters, bathrooms: n })}
              className={cn(
                "min-w-[44px] rounded-full border px-3 py-1.5 text-xs transition-smooth",
                filters.bathrooms === n
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-foreground/70 hover:border-primary/50"
              )}
            >
              {n === 0 ? "Any" : `${n}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Features</p>
        <div className="grid grid-cols-1 gap-2">
          {AMENITY_OPTIONS.map(({ key, icon: Icon }) => {
            const active = filters.amenities.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleAmenity(key)}
                className={cn(
                  "flex items-center gap-3 rounded-sm border px-3 py-2.5 text-sm transition-smooth",
                  active
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border/50 text-foreground/75 hover:border-primary/40 hover:bg-card"
                )}
              >
                <Icon className={cn("h-4 w-4", active ? "text-primary" : "text-foreground/60")} />
                <span className="flex-1 text-left">{key}</span>
                {active && <span className="text-[10px] uppercase tracking-wider">On</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-sm border border-border/40 bg-card/60 px-4 py-3 text-center text-sm">
        <span className="font-display text-lg text-primary">{resultCount}</span>
        <span className="text-muted-foreground"> {resultCount === 1 ? "home" : "homes"} match</span>
      </div>
    </div>
  );

  return (
    <>
      <aside className="sticky top-24 hidden h-fit w-72 shrink-0 rounded-sm border border-border/40 bg-card/40 p-6 lg:block">
        {Body}
      </aside>

      <div className="mb-6 lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-sm border border-border/60 bg-card/40 px-4 py-3 text-xs uppercase tracking-wider transition-smooth hover:border-primary"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filters · {resultCount} homes
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-lg border-t border-border/60 bg-card p-6 pb-24"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-2xl">Filters</p>
                <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-muted">
                  <X className="h-4 w-4" />
                </button>
              </div>
              {Body}
              <div className="fixed inset-x-0 bottom-0 border-t border-border/60 bg-card p-4">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full bg-gradient-warm py-3 text-sm uppercase tracking-wider text-primary-foreground"
                >
                  Show {resultCount} homes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyFilters;
