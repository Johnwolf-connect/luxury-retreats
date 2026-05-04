import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar as CalendarIcon, Users, Minus, Plus, X } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { properties } from "@/data/properties";
import { useSearch, type SearchState } from "@/context/SearchContext";
import { cn } from "@/lib/utils";

const POPULAR = [
  { label: "Côte d'Azur", country: "France", flag: "🇫🇷" },
  { label: "Zermatt", country: "Switzerland", flag: "🇨🇭" },
  { label: "Val d'Orcia", country: "Italy", flag: "🇮🇹" },
  { label: "Joshua Tree", country: "United States", flag: "🇺🇸" },
  { label: "North Malé", country: "Maldives", flag: "🇲🇻" },
  { label: "Manhattan", country: "United States", flag: "🇺🇸" },
];

const HeroSearch = () => {
  const { search, setSearch, apply } = useSearch();
  const [locOpen, setLocOpen] = useState(false);
  const [locInput, setLocInput] = useState(search.location);
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

  const suggestions = useMemo(() => {
    const all = [
      ...POPULAR,
      ...properties.map((p) => ({ label: p.location, country: p.country, flag: "📍" })),
    ];
    const seen = new Set<string>();
    const dedup = all.filter((s) => {
      const k = s.label.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    if (!locInput.trim()) return dedup.slice(0, 6);
    const q = locInput.toLowerCase();
    return dedup.filter((s) => s.label.toLowerCase().includes(q) || s.country.toLowerCase().includes(q)).slice(0, 8);
  }, [locInput]);

  const nights = search.dates?.from && search.dates?.to ? differenceInCalendarDays(search.dates.to, search.dates.from) : 0;

  const handleSearch = () => {
    const next: SearchState = { ...search, location: locInput };
    apply(next);
    setLocOpen(false);
    setTimeout(() => {
      document.getElementById("stays")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="rounded-sm border border-border/50 bg-card/70 p-3 shadow-elegant backdrop-blur-2xl">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-border/50 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
                if (e.key === "Escape") setLocOpen(false);
              }}
              placeholder="Anywhere"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/50 focus:outline-none"
            />
          </div>
          {locInput && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLocInput("");
                setSearch({ ...search, location: "" });
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
                  {locInput ? "Suggestions" : "Popular destinations"}
                </p>
                <ul className="max-h-72 overflow-y-auto py-1">
                  {suggestions.length === 0 && (
                    <li className="px-4 py-3 text-sm text-muted-foreground">No matches — our concierge can source it.</li>
                  )}
                  {suggestions.map((s) => (
                    <li key={s.label}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLocInput(s.label);
                          setSearch({ ...search, location: s.label });
                          setLocOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-smooth hover:bg-muted"
                      >
                        <span className="text-base">{s.flag}</span>
                        <span className="flex-1 text-foreground">{s.label}</span>
                        <span className="text-xs text-muted-foreground">{s.country}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dates */}
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="flex w-full items-center gap-3 bg-card px-5 py-4 text-left transition-smooth hover:bg-muted">
              <CalendarIcon className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">When</p>
                <p className={cn("truncate text-sm", search.dates?.from ? "text-foreground" : "text-foreground/50")}>
                  {search.dates?.from
                    ? search.dates.to
                      ? `${format(search.dates.from, "MMM d")} – ${format(search.dates.to, "MMM d")} · ${nights}n`
                      : format(search.dates.from, "MMM d, yyyy")
                    : "Add dates"}
                </p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={search.dates}
              onSelect={(d: DateRange | undefined) => setSearch({ ...search, dates: d })}
              disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              initialFocus
              className="pointer-events-auto p-3"
            />
            <div className="flex items-center justify-between border-t border-border/40 px-4 py-3 text-xs">
              <span className="text-muted-foreground">{nights > 0 ? `${nights} night${nights > 1 ? "s" : ""}` : "Select check-in & check-out"}</span>
              <button
                type="button"
                onClick={() => setSearch({ ...search, dates: undefined })}
                className="uppercase tracking-wider text-primary hover:underline"
              >
                Clear
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Guests */}
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="flex w-full items-center gap-3 bg-card px-5 py-4 text-left transition-smooth hover:bg-muted">
              <Users className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Guests</p>
                <p className={cn("truncate text-sm", search.guests > 0 ? "text-foreground" : "text-foreground/50")}>
                  {search.guests > 0 ? `${search.guests}${search.guests >= 5 ? "+" : ""} guest${search.guests > 1 ? "s" : ""}` : "Add guests"}
                </p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="start">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Guests</p>
                <p className="text-xs text-muted-foreground">Ages 13+</p>
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
                  onClick={() => setSearch({ ...search, guests: Math.min(16, search.guests + 1) })}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 transition-smooth hover:border-primary"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSearch({ ...search, guests: n })}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-smooth",
                    search.guests === n ? "border-primary bg-primary/10 text-primary" : "border-border/60 hover:border-primary/50"
                  )}
                >
                  {n}{n === 5 ? "+" : ""}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Search */}
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
