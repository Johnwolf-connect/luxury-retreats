import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Home, BedDouble, Minus, Plus, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { properties } from "@/data/properties";
import { useSearch, type SearchState } from "@/context/SearchContext";
import { cn } from "@/lib/utils";

type Suggestion = {
  label: string;
  sub: string;
  icon: string;
  kind: "neighborhood" | "city" | "property";
};

const POPULAR: Suggestion[] = [
  { label: "Buckhead", sub: "Atlanta, GA", icon: "🏛️", kind: "neighborhood" },
  { label: "Alpharetta", sub: "North Fulton, GA", icon: "🌳", kind: "city" },
  { label: "Milton", sub: "North Fulton, GA", icon: "🐎", kind: "city" },
  { label: "Sandy Springs", sub: "North Atlanta, GA", icon: "🏞️", kind: "city" },
  { label: "Inman Park", sub: "Intown Atlanta, GA", icon: "🌿", kind: "neighborhood" },
  { label: "Virginia-Highland", sub: "Intown Atlanta, GA", icon: "🌳", kind: "neighborhood" },
  { label: "Midtown", sub: "Atlanta, GA", icon: "🏙️", kind: "neighborhood" },
  { label: "Johns Creek", sub: "North Fulton, GA", icon: "⛳" , kind: "city" },
  { label: "Decatur", sub: "DeKalb County, GA", icon: "🏘️", kind: "city" },
  { label: "Marietta", sub: "Cobb County, GA", icon: "🌲", kind: "city" },
];

const PROPERTY_TYPES = ["Any", "Single Family", "Estate", "Condo", "Townhome", "New Construction", "Investment"] as const;

const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="font-medium text-primary">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
};

const HeroSearch = () => {
  const { search, setSearch, apply } = useSearch();
  const [locOpen, setLocOpen] = useState(false);
  const [locInput, setLocInput] = useState(search.location);
  const [activeIdx, setActiveIdx] = useState(0);
  const [propType, setPropType] = useState<(typeof PROPERTY_TYPES)[number]>("Any");
  const [listingType, setListingType] = useState<"Sale" | "Rent">("Sale");
  const locRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setLocInput(search.location), [search.location]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (locRef.current && !locRef.current.contains(e.target as Node)) setLocOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const suggestions = useMemo<Suggestion[]>(() => {
    const propSuggestions: Suggestion[] = properties.map((p) => ({
      label: p.name,
      sub: `${p.location}, ${p.country}`,
      icon: "🏠",
      kind: "property",
    }));
    const all = [...POPULAR, ...propSuggestions];
    if (!locInput.trim()) return POPULAR.slice(0, 8);
    const q = locInput.toLowerCase();
    return all
      .filter((s) => s.label.toLowerCase().includes(q) || s.sub.toLowerCase().includes(q))
      .slice(0, 8);
  }, [locInput]);

  useEffect(() => setActiveIdx(0), [locInput, locOpen]);

  const selectSuggestion = (s: Suggestion) => {
    setLocInput(s.label);
    const next: SearchState = { ...search, location: s.label };
    setSearch(next);
    apply(next);
    setLocOpen(false);
    setTimeout(() => {
      document.getElementById("listings")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSearch = () => {
    const next: SearchState = { ...search, location: locInput };
    apply(next);
    setLocOpen(false);
    setTimeout(() => {
      document.getElementById("listings")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const onLocKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setLocOpen(true);
      setActiveIdx((i) => Math.min(suggestions.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (locOpen && suggestions[activeIdx]) selectSuggestion(suggestions[activeIdx]);
      else handleSearch();
    } else if (e.key === "Escape") {
      setLocOpen(false);
    }
  };

  return (
    <div className="rounded-sm border border-border/50 bg-card/70 p-3 shadow-elegant backdrop-blur-2xl">
      {/* For Sale / For Rent toggle */}
      <div className="mb-3 inline-flex gap-px overflow-hidden rounded-full bg-border/50 p-px">
        {(["Sale", "Rent"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setListingType(t)}
            className={cn(
              "rounded-full px-5 py-1.5 text-[11px] uppercase tracking-wider transition-smooth",
              listingType === t ? "bg-primary text-primary-foreground" : "bg-card text-foreground/70 hover:bg-muted"
            )}
          >
            For {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-border/50 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_auto]">
        {/* Location */}
        <div
          ref={locRef}
          className="relative flex items-center gap-3 bg-card px-5 py-4 transition-smooth hover:bg-muted"
          onClick={() => {
            setLocOpen(true);
            inputRef.current?.focus();
          }}
        >
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Where</p>
            <input
              ref={inputRef}
              value={locInput}
              onChange={(e) => {
                setLocInput(e.target.value);
                setLocOpen(true);
              }}
              onFocus={() => setLocOpen(true)}
              onKeyDown={onLocKeyDown}
              placeholder="Buckhead, Alpharetta, Inman Park…"
              autoComplete="off"
              role="combobox"
              aria-expanded={locOpen}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/50 focus:outline-none"
            />
          </div>
          {locInput && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLocInput("");
                const next = { ...search, location: "" };
                setSearch(next);
                apply(next);
                inputRef.current?.focus();
              }}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Clear location"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <AnimatePresence>
            {locOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-sm border border-border/60 bg-card shadow-elegant"
              >
                <p className="border-b border-border/40 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {locInput ? "Suggestions" : "Popular Atlanta neighborhoods"}
                </p>
                <ul className="max-h-72 overflow-y-auto py-1" role="listbox">
                  {suggestions.length === 0 && (
                    <li className="px-4 py-3 text-sm text-muted-foreground">
                      No matches — our team can source off-market.
                    </li>
                  )}
                  {suggestions.map((s, i) => (
                    <li key={`${s.kind}-${s.label}`}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIdx(i)}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectSuggestion(s);
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-smooth",
                          activeIdx === i ? "bg-muted" : "hover:bg-muted"
                        )}
                      >
                        <span className="text-base">{s.icon}</span>
                        <span className="flex-1 truncate text-foreground">
                          <Highlight text={s.label} query={locInput} />
                        </span>
                        <span className="truncate pl-2 text-xs text-muted-foreground">{s.sub}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Property type */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center gap-3 bg-card px-5 py-4 text-left transition-smooth hover:bg-muted"
            >
              <Home className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Type</p>
                <p className="truncate text-sm text-foreground">{propType === "Any" ? "All types" : propType}</p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="start">
            <div className="grid gap-1">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setPropType(t)}
                  className={cn(
                    "rounded-sm px-3 py-2 text-left text-sm transition-smooth",
                    propType === t ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  )}
                >
                  {t === "Any" ? "All types" : t}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Bedrooms */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center gap-3 bg-card px-5 py-4 text-left transition-smooth hover:bg-muted"
            >
              <BedDouble className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Bedrooms</p>
                <p
                  className={cn(
                    "truncate text-sm",
                    search.guests > 0 ? "text-foreground" : "text-foreground/50"
                  )}
                >
                  {search.guests > 0 ? `${search.guests}+ bed${search.guests === 1 ? "" : "s"}` : "Any"}
                </p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="start">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Minimum bedrooms</p>
                <p className="text-xs text-muted-foreground">Filter by size</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSearch({ ...search, guests: Math.max(0, search.guests - 1) })}
                  disabled={search.guests <= 0}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 transition-smooth hover:border-primary disabled:opacity-40"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-6 text-center tabular-nums">{search.guests}</span>
                <button
                  type="button"
                  onClick={() => setSearch({ ...search, guests: Math.min(8, search.guests + 1) })}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 transition-smooth hover:border-primary"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[2, 3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSearch({ ...search, guests: n })}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-smooth",
                    search.guests === n
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/60 hover:border-primary/50"
                  )}
                >
                  {n}+
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <button
          type="button"
          onClick={handleSearch}
          className="group flex items-center justify-center gap-2 bg-gradient-warm px-8 py-5 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-smooth hover:opacity-90"
        >
          <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSearch;
