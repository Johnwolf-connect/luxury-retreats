import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { properties } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import PropertyFilters, { DEFAULT_FILTERS, type Filters } from "./PropertyFilters";
import { Search, X } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

const CATEGORIES = ["All", "Buckhead", "Alpharetta", "Milton", "Sandy Springs", "Midtown", "Virginia-Highland"] as const;
type Category = (typeof CATEGORIES)[number];

const PropertyGrid = () => {
  const [category, setCategory] = useState<Category>("All");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { applied, apply } = useSearch();

  const list = useMemo(() => {
    return properties.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (filters.listingType !== "Any" && p.listingType !== filters.listingType) return false;
      if (filters.propertyType !== "Any" && p.propertyType !== filters.propertyType) return false;
      // For rent: convert to annualized comparable -- simpler: only filter price for sale listings
      if (p.listingType === "Sale") {
        if (p.price < filters.price[0] || p.price > filters.price[1]) return false;
      }
      if (filters.bedrooms > 0 && p.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms > 0 && p.bathrooms < filters.bathrooms) return false;
      if (filters.amenities.length > 0) {
        const propAmen = p.amenities.map((a) => a.toLowerCase());
        const allMatch = filters.amenities.every((a) =>
          propAmen.some((pa) => pa.includes(a.toLowerCase()))
        );
        if (!allMatch) return false;
      }
      if (applied.location.trim()) {
        const q = applied.location.toLowerCase();
        if (
          !p.location.toLowerCase().includes(q) &&
          !p.country.toLowerCase().includes(q) &&
          !p.name.toLowerCase().includes(q) &&
          !p.address.toLowerCase().includes(q)
        ) return false;
      }
      if (applied.guests > 0 && p.bedrooms < applied.guests) return false;
      return true;
    });
  }, [category, filters, applied]);

  const hasSearchPills = applied.location || applied.guests > 0;

  const clearAll = () => {
    setFilters(DEFAULT_FILTERS);
    setCategory("All");
  };

  const clearSearch = () => apply({ location: "", dates: undefined, guests: 0 });

  return (
    <section id="listings" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
      >
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Featured Listings</p>
          <h2 className="max-w-2xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Homes worth coming home to.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider">
          {CATEGORIES.map((t) => (
            <button
              key={t}
              onClick={() => setCategory(t)}
              className={`rounded-full border px-4 py-2 transition-smooth ${
                category === t
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-foreground/60 hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <PropertyFilters
          filters={filters}
          onChange={setFilters}
          resultCount={list.length}
          onClear={clearAll}
          mobileOpen={mobileFiltersOpen}
          setMobileOpen={setMobileFiltersOpen}
        />

        <div className="flex-1 min-w-0">
          {hasSearchPills && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Searching</span>
              {applied.location && (
                <SearchPill onClear={() => apply({ ...applied, location: "" })}>{applied.location}</SearchPill>
              )}
              {applied.guests > 0 && (
                <SearchPill onClear={() => apply({ ...applied, guests: 0 })}>
                  {applied.guests}+ bed{applied.guests === 1 ? "" : "s"}
                </SearchPill>
              )}
              <button onClick={clearSearch} className="text-[10px] uppercase tracking-wider text-primary hover:underline">
                Clear search
              </button>
            </div>
          )}
          <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
            <p>
              Showing <span className="text-primary">{list.length}</span> of {properties.length} {list.length === 1 ? "home" : "homes"}
            </p>
          </div>

          {list.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center rounded-sm border border-dashed border-border/60 bg-card/30 px-6 py-24 text-center"
            >
              <Search className="mb-4 h-8 w-8 text-primary/60" />
              <h3 className="font-display text-2xl">No homes match — yet.</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Adjust a filter or two. Our team can also share off-market opportunities you won't see on MLS.
              </p>
              <button
                onClick={clearAll}
                className="mt-6 rounded-full border border-primary px-5 py-2 text-xs uppercase tracking-wider text-primary transition-smooth hover:bg-primary hover:text-primary-foreground"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PropertyCard property={p} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

const SearchPill = ({ children, onClear }: { children: React.ReactNode; onClear: () => void }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary">
    {children}
    <button onClick={onClear} className="opacity-70 hover:opacity-100">
      <X className="h-3 w-3" />
    </button>
  </span>
);

export default PropertyGrid;
