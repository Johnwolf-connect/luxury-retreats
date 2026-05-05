import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, Map as MapIcon, List, Bookmark, X,
  BedDouble, Bath, Square, Heart, Sparkles, Check,
} from "lucide-react";
import { properties as ALL, type Property } from "@/data/properties";
import Navbar from "@/components/Navbar";
import PropertyFilters, { DEFAULT_FILTERS, type Filters } from "@/components/PropertyFilters";
import SearchMap from "@/components/SearchMap";
import PropertyDetailDrawer from "@/components/PropertyDetailDrawer";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const NEIGHBORHOODS = [
  "Buckhead, Atlanta",
  "Midtown, Atlanta",
  "Virginia-Highland, Atlanta",
  "Inman Park, Atlanta",
  "Sandy Springs",
  "Alpharetta",
  "Milton",
  "Johns Creek",
  "College Park, GA",
  "Druid Hills",
];

const formatPriceShort = (p: Property) =>
  p.listingType === "Rent"
    ? `$${p.price.toLocaleString()}/mo`
    : p.price >= 1_000_000
    ? `$${(p.price / 1_000_000).toFixed(p.price % 1_000_000 === 0 ? 0 : 2)}M`
    : `$${(p.price / 1000).toFixed(0)}K`;

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"split" | "map" | "list">("split");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [drawerProp, setDrawerProp] = useState<Property | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NEIGHBORHOODS.slice(0, 6);
    const hoods = NEIGHBORHOODS.filter((n) => n.toLowerCase().includes(q));
    const props = ALL.filter(
      (p) => p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q)
    ).map((p) => `${p.name} — ${p.location}`);
    return [...hoods, ...props].slice(0, 8);
  }, [query]);

  const filtered = useMemo(() => {
    return ALL.filter((p) => {
      if (filters.listingType !== "Any" && p.listingType !== filters.listingType) return false;
      if (filters.propertyType !== "Any" && p.propertyType !== filters.propertyType) return false;
      if (p.listingType === "Sale" && (p.price < filters.price[0] || p.price > filters.price[1])) return false;
      if (filters.bedrooms > 0 && p.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms > 0 && p.bathrooms < filters.bathrooms) return false;
      if (filters.amenities.length > 0) {
        const propAmen = p.amenities.map((a) => a.toLowerCase());
        if (!filters.amenities.every((a) => propAmen.some((pa) => pa.includes(a.toLowerCase())))) return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !p.location.toLowerCase().includes(q) &&
          !p.country.toLowerCase().includes(q) &&
          !p.name.toLowerCase().includes(q) &&
          !p.address.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [filters, query]);

  // Scroll active card into view
  useEffect(() => {
    if (activeId && cardRefs.current[activeId]) {
      cardRefs.current[activeId]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeId]);

  const toggleFav = (id: string) =>
    setFavorites((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  // Active filter chips
  const chips: { label: string; clear: () => void }[] = [];
  if (filters.listingType !== "Any") chips.push({ label: `For ${filters.listingType}`, clear: () => setFilters({ ...filters, listingType: "Any" }) });
  if (filters.propertyType !== "Any") chips.push({ label: filters.propertyType, clear: () => setFilters({ ...filters, propertyType: "Any" }) });
  if (filters.bedrooms > 0) chips.push({ label: `${filters.bedrooms}+ bd`, clear: () => setFilters({ ...filters, bedrooms: 0 }) });
  if (filters.bathrooms > 0) chips.push({ label: `${filters.bathrooms}+ ba`, clear: () => setFilters({ ...filters, bathrooms: 0 }) });
  if (filters.price[0] !== DEFAULT_FILTERS.price[0] || filters.price[1] !== DEFAULT_FILTERS.price[1])
    chips.push({
      label: `$${(filters.price[0] / 1_000_000).toFixed(1)}M – $${(filters.price[1] / 1_000_000).toFixed(1)}M`,
      clear: () => setFilters({ ...filters, price: DEFAULT_FILTERS.price }),
    });
  filters.amenities.forEach((a) =>
    chips.push({ label: a, clear: () => setFilters({ ...filters, amenities: filters.amenities.filter((x) => x !== a) }) })
  );

  const clearAll = () => {
    setFilters(DEFAULT_FILTERS);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background">
        <Navbar />
      </div>
      {/* Spacer for absolute navbar */}
      <div className="h-20" />

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-40 border-b border-border/40 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-4 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-primary" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggest(true); }}
                onFocus={() => setShowSuggest(true)}
                onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
                placeholder="Buckhead, Atlanta · College Park · 30327"
                className="w-full rounded-full border border-border/60 bg-card px-11 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <AnimatePresence>
                {showSuggest && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-sm border border-border/60 bg-card shadow-elegant"
                  >
                    <p className="px-4 pt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {query ? "Suggestions" : "Popular Atlanta neighborhoods"}
                    </p>
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onMouseDown={(e) => { e.preventDefault(); setQuery(s.split(" — ")[0]); setShowSuggest(false); }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-smooth hover:bg-muted"
                      >
                        <Search className="h-3 w-3 text-primary" /> {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2.5 text-xs uppercase tracking-wider transition-smooth hover:border-primary"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" /> All filters
            </button>

            {/* View toggle */}
            <div className="flex overflow-hidden rounded-full border border-border/60 bg-card">
              {([
                { v: "list", l: "List", icon: List },
                { v: "split", l: "Split", icon: Sparkles },
                { v: "map", l: "Map", icon: MapIcon },
              ] as const).map(({ v, l, icon: Icon }) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2.5 text-[11px] uppercase tracking-wider transition-smooth",
                    view === v ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  <Icon className="h-3 w-3" /> {l}
                </button>
              ))}
            </div>

            <button
              onClick={() => toast.success("Search saved", { description: "We'll notify you of new matches." })}
              className="flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2.5 text-xs uppercase tracking-wider text-primary transition-smooth hover:bg-primary hover:text-primary-foreground"
            >
              <Bookmark className="h-3.5 w-3.5" /> Save search
            </button>
          </div>

          {/* Chips row */}
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-primary">{filtered.length}</span> homes
            </p>
            {chips.length > 0 && <span className="text-muted-foreground/50">·</span>}
            {chips.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] text-primary">
                {c.label}
                <button onClick={c.clear} className="opacity-70 hover:opacity-100"><X className="h-3 w-3" /></button>
              </span>
            ))}
            {chips.length > 0 && (
              <button onClick={clearAll} className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary">
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Split layout */}
      <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
        {/* Map */}
        {view !== "list" && (
          <div className={cn(
            "relative h-[55vh] lg:sticky lg:top-[140px] lg:h-[calc(100vh-140px)]",
            view === "map" ? "w-full" : "lg:w-[62%] xl:w-[65%]"
          )}>
            <SearchMap
              properties={filtered}
              activeId={activeId}
              hoverId={hoverId}
              onSelect={(p) => { setActiveId(p.id); setDrawerProp(p); }}
              onHover={setHoverId}
            />
            {filtered.length === 0 && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="rounded-sm border border-border/60 bg-background/90 px-6 py-4 text-sm backdrop-blur-md">
                  No homes match these filters.
                </div>
              </div>
            )}
          </div>
        )}

        {/* List */}
        {view !== "map" && (
          <div
            ref={listRef}
            className={cn(
              "min-w-0 flex-1 px-4 py-6 lg:px-6",
              view === "split" ? "lg:w-[38%] xl:w-[35%] lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto" : ""
            )}
          >
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-border/60 bg-card/30 px-6 py-24 text-center">
                <Search className="mb-4 h-8 w-8 text-primary/60" />
                <h3 className="font-display text-2xl">No homes match — yet.</h3>
                <button onClick={clearAll} className="mt-6 rounded-full border border-primary px-5 py-2 text-xs uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className={cn(
                "grid gap-5",
                view === "list" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                <AnimatePresence mode="popLayout">
                  {filtered.map((p, i) => (
                    <motion.div
                      key={p.id}
                      layout
                      ref={(el) => (cardRefs.current[p.id] = el)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                      onMouseEnter={() => setHoverId(p.id)}
                      onMouseLeave={() => setHoverId(null)}
                      onClick={() => { setActiveId(p.id); setDrawerProp(p); }}
                      className={cn(
                        "group cursor-pointer overflow-hidden rounded-sm border bg-card transition-smooth hover:shadow-elegant",
                        activeId === p.id ? "border-primary shadow-glow" : "border-border/40 hover:border-primary/40"
                      )}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={p.cover}
                          alt={p.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent" />
                        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {p.status === "New" && (
                              <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] uppercase tracking-wider text-primary-foreground">New</span>
                            )}
                            {p.status === "Coming Soon" && (
                              <span className="rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] uppercase tracking-wider text-amber-950">Coming soon</span>
                            )}
                            {p.investment && (
                              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-primary ring-1 ring-primary/40 backdrop-blur-md">
                                Special offer
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }}
                            className="rounded-full bg-background/60 p-2 backdrop-blur-md transition-smooth hover:bg-background"
                            aria-label="Save"
                          >
                            <Heart className={cn("h-3.5 w-3.5", favorites.has(p.id) ? "fill-primary text-primary" : "text-foreground")} />
                          </button>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <span className="rounded-full bg-background/85 px-3 py-1 font-display text-sm text-primary backdrop-blur-md">
                            {formatPriceShort(p)}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-primary">{p.location} · {p.country}</p>
                        <h3 className="mt-1 font-display text-lg leading-tight">{p.name}</h3>
                        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/40 pt-3 text-[11px] text-foreground/70">
                          <span className="flex items-center gap-1.5"><BedDouble className="h-3 w-3" />{p.bedrooms} bd</span>
                          <span className="flex items-center gap-1.5"><Bath className="h-3 w-3" />{p.bathrooms} ba</span>
                          <span className="flex items-center gap-1.5"><Square className="h-3 w-3" />{p.sqft.toLocaleString()} sf</span>
                          {p.listingType === "Rent" && (
                            <span className="ml-auto inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-400">
                              <Check className="h-3 w-3" /> Available now
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filters drawer (right) */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-background/80 backdrop-blur-md"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[111] w-full max-w-md overflow-y-auto bg-background p-8 shadow-elegant"
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="font-display text-2xl">All filters</p>
                <button onClick={() => setFiltersOpen(false)} className="rounded-full border border-border/60 p-2 hover:border-primary">
                  <X className="h-4 w-4" />
                </button>
              </div>
              {/* Reuse PropertyFilters body via mobileOpen pattern */}
              <PropertyFilters
                filters={filters}
                onChange={setFilters}
                resultCount={filtered.length}
                onClear={() => setFilters(DEFAULT_FILTERS)}
                mobileOpen={false}
                setMobileOpen={() => {}}
              />
              <button
                onClick={() => setFiltersOpen(false)}
                className="mt-6 w-full bg-gradient-warm py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground"
              >
                Show {filtered.length} homes
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <PropertyDetailDrawer
        property={drawerProp}
        open={!!drawerProp}
        onClose={() => setDrawerProp(null)}
      />
    </div>
  );
};

export default SearchPage;
