import { useEffect, useRef, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star, BedDouble, Bath, Users, ArrowLeft, Wifi, Wind, Flame, Car, ChefHat, Wine,
  Waves, Mountain, Sparkles, Award, MapPin, Check, ChevronLeft, ChevronRight,
  ShieldCheck, Headphones, CalendarCheck, Heart, Share2,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";
import { properties } from "@/data/properties";
import PropertyMap from "@/components/PropertyMap";
import Lightbox from "@/components/Lightbox";
import Footer from "@/components/Footer";

const amenityIcon = (a: string) => {
  const k = a.toLowerCase();
  if (k.includes("wi-fi")) return Wifi;
  if (k.includes("air")) return Wind;
  if (k.includes("fire")) return Flame;
  if (k.includes("park") || k.includes("ev")) return Car;
  if (k.includes("chef") || k.includes("kitchen")) return ChefHat;
  if (k.includes("wine") || k.includes("cellar")) return Wine;
  if (k.includes("pool") || k.includes("hot") || k.includes("sauna") || k.includes("snork")) return Waves;
  if (k.includes("view") || k.includes("ski") || k.includes("star") || k.includes("garden") || k.includes("mountain")) return Mountain;
  return Sparkles;
};

const PropertyDetailPage = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  const [range, setRange] = useState<DateRange | undefined>();
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (property) {
      document.title = `${property.name} · ${property.location} — Maison`;
    }
  }, [property]);

  if (!property) return <Navigate to="/" replace />;

  const nights = range?.from && range?.to
    ? Math.max(1, Math.round((range.to.getTime() - range.from.getTime()) / 86400000))
    : 0;
  const subtotal = nights * property.price;
  const cleaning = 240;
  const service = Math.round(subtotal * 0.08);
  const total = subtotal + cleaning + service;

  const scrollGallery = (dir: 1 | -1) => {
    const el = galleryRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <main className="bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center gap-2 text-sm text-foreground/70 transition-smooth hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> All stays
          </Link>
          <p className="hidden font-display text-lg sm:block">{property.name}</p>
          <div className="flex items-center gap-3">
            <button className="rounded-full p-2 text-foreground/70 transition-smooth hover:bg-muted hover:text-primary" aria-label="Save">
              <Heart className="h-4 w-4" />
            </button>
            <button className="rounded-full p-2 text-foreground/70 transition-smooth hover:bg-muted hover:text-primary" aria-label="Share">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary">{property.country}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {property.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/70">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {property.location}</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-primary text-primary" /> {property.rating} <span className="text-muted-foreground">({property.reviews} reviews)</span></span>
            <span className="flex items-center gap-1.5"><Award className="h-4 w-4 text-primary" /> Superhost</span>
          </div>
        </motion.div>

        {/* Horizontal scrolling gallery */}
        <div className="relative mb-4">
          <div
            ref={galleryRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-sm"
          >
            {property.gallery.concat(property.gallery).map((src, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i % property.gallery.length)}
                className="group relative aspect-[16/10] w-[88%] shrink-0 snap-center overflow-hidden rounded-sm sm:w-[60%] lg:w-[55%]"
              >
                <img src={src} alt={`${property.name} ${i + 1}`} loading={i < 2 ? "eager" : "lazy"} className="h-full w-full object-cover transition-smooth duration-700 group-hover:scale-[1.05]" />
                <div className="pointer-events-none absolute inset-0 bg-background/0 transition-smooth group-hover:bg-background/20" />
              </button>
            ))}
          </div>
          <button onClick={() => scrollGallery(-1)} className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-border/60 bg-card/80 p-3 backdrop-blur-md transition-smooth hover:bg-card sm:flex" aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scrollGallery(1)} className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-border/60 bg-card/80 p-3 backdrop-blur-md transition-smooth hover:bg-card sm:flex" aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="mb-12 flex gap-2 overflow-x-auto no-scrollbar">
          {property.gallery.map((src, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveImg(i);
                galleryRef.current?.scrollTo({ left: i * galleryRef.current.clientWidth * 0.6, behavior: "smooth" });
              }}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-sm border transition-smooth",
                activeImg === i ? "border-primary opacity-100" : "border-border/40 opacity-60 hover:opacity-100"
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Left */}
          <div>
            <div className="flex flex-wrap items-center gap-6 border-b border-border/40 pb-8">
              <Stat icon={Users} label={`${property.guests} guests`} />
              <Stat icon={BedDouble} label={`${property.bedrooms} bedrooms`} />
              <Stat icon={Bath} label={`${property.bathrooms} bathrooms`} />
            </div>

            {/* Host card */}
            <div className="border-b border-border/40 py-8">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <img src={property.host.avatar} alt={property.host.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/30" />
                  {property.host.superhost && (
                    <span className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1 text-primary-foreground" title="Verified Superhost">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-[180px]">
                  <p className="flex items-center gap-2 font-medium">
                    Hosted by {property.host.name}
                    <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">Superhost · Hosting since {property.host.since}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Response time: within 1 hour · 4.98 avg rating</p>
                </div>
                <button className="rounded-full border border-primary/60 px-5 py-2 text-xs uppercase tracking-wider text-primary transition-smooth hover:bg-primary hover:text-primary-foreground">
                  Message host
                </button>
              </div>
            </div>

            <div className="border-b border-border/40 py-8">
              <h2 className="mb-4 font-display text-2xl">About this home</h2>
              <p className="leading-relaxed text-foreground/75">{property.description}</p>
            </div>

            {/* Amenities with tooltips */}
            <div className="border-b border-border/40 py-8">
              <h2 className="mb-6 font-display text-2xl">What this place offers</h2>
              <TooltipProvider delayDuration={150}>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {property.amenities.map((a) => {
                    const Icon = amenityIcon(a);
                    return (
                      <Tooltip key={a}>
                        <TooltipTrigger asChild>
                          <div className="group flex items-center gap-3 rounded-sm border border-border/40 bg-card/40 px-4 py-3 text-sm text-foreground/80 transition-smooth hover:border-primary/50 hover:bg-card">
                            <Icon className="h-4 w-4 text-primary transition-smooth group-hover:scale-110" />
                            <span>{a}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Premium {a.toLowerCase()} included</TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>

            {/* Calendar */}
            <div className="border-b border-border/40 py-8">
              <h2 className="mb-6 font-display text-2xl">Availability</h2>
              <div className="rounded-sm border border-border/60 bg-card/40 p-4">
                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={1}
                  className={cn("p-3 pointer-events-auto")}
                />
              </div>
            </div>

            {/* Map */}
            <div className="py-8">
              <h2 className="mb-2 font-display text-2xl">Where you'll be</h2>
              <p className="mb-6 text-sm text-muted-foreground">{property.location}, {property.country}</p>
              <PropertyMap property={property} />
              <div className="mt-8">
                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">What's nearby</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {property.nearby.map((n) => (
                    <div key={n.name} className="rounded-sm border border-border/40 bg-card/40 px-4 py-3 transition-smooth hover:border-primary/40 hover:bg-card">
                      <p className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-primary" /> {n.name}
                      </p>
                      <p className="mt-1 pl-5 text-xs text-muted-foreground">{n.distance}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - sticky booking */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-sm border border-border/60 bg-card p-7 shadow-elegant">
              <div className="mb-6 flex items-baseline justify-between">
                <p>
                  <span className="font-display text-3xl text-primary">${property.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground"> /night</span>
                </p>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span>{property.rating}</span>
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-border/60">
                <BookingField label="Check in" value={range?.from?.toLocaleDateString() || "Add date"} />
                <BookingField label="Check out" value={range?.to?.toLocaleDateString() || "Add date"} />
              </div>
              <BookingField label="Guests" value="2 guests" full />

              <button
                onClick={() => setBookingOpen(true)}
                className="mt-5 w-full bg-gradient-warm py-4 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-smooth hover:opacity-90"
              >
                Reserve
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">You won't be charged yet</p>

              {nights > 0 && (
                <div className="mt-6 space-y-2 border-t border-border/40 pt-5 text-sm">
                  <Row label={`$${property.price} × ${nights} nights`} value={`$${subtotal.toLocaleString()}`} />
                  <Row label="Cleaning fee" value={`$${cleaning}`} />
                  <Row label="Service fee" value={`$${service.toLocaleString()}`} />
                  <div className="mt-3 border-t border-border/40 pt-3">
                    <Row label="Total" value={`$${total.toLocaleString()}`} bold />
                  </div>
                </div>
              )}

              <ul className="mt-6 space-y-2 border-t border-border/40 pt-5 text-xs text-muted-foreground">
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Free cancellation for 48 hours</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary" /> 24/7 concierge support</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Verified by Maison</li>
              </ul>
            </div>

            {/* Trust strip */}
            <div className="mt-6 grid gap-3 rounded-sm border border-border/40 bg-card/40 p-5 text-xs text-foreground/70">
              <Trust icon={ShieldCheck} text="Encrypted, secure payments" />
              <Trust icon={Headphones} text="24/7 concierge service" />
              <Trust icon={CalendarCheck} text="Flexible cancellation" />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile floating Reserve button */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg text-primary">${property.price}<span className="text-xs text-muted-foreground"> /night</span></p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{nights > 0 ? `${nights} nights · $${total.toLocaleString()}` : "Add dates"}</p>
          </div>
          <button onClick={() => setBookingOpen(true)} className="bg-gradient-warm px-6 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground">
            Book now
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={property.gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((v) => v === null ? null : (v - 1 + property.gallery.length) % property.gallery.length)}
        onNext={() => setLightboxIndex((v) => v === null ? null : (v + 1) % property.gallery.length)}
      />

      {/* Booking modal */}
      {bookingOpen && (
        <BookingModal
          property={property}
          initialRange={range}
          onClose={() => setBookingOpen(false)}
        />
      )}

      <Footer />
    </main>
  );
};

const Stat = ({ icon: Icon, label }: { icon: typeof Users; label: string }) => (
  <div className="flex items-center gap-2 text-sm text-foreground/80">
    <Icon className="h-4 w-4 text-primary" /> {label}
  </div>
);

const Trust = ({ icon: Icon, text }: { icon: typeof Users; text: string }) => (
  <div className="flex items-center gap-3"><Icon className="h-4 w-4 text-primary" /> {text}</div>
);

const BookingField = ({ label, value, full }: { label: string; value: string; full?: boolean }) => (
  <div className={cn("bg-card px-4 py-3", full && "col-span-2 mt-px")}>
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="text-sm">{value}</p>
  </div>
);

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className={cn("flex justify-between", bold && "font-medium text-foreground")}>
    <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
    <span>{value}</span>
  </div>
);

const BookingModal = ({
  property, initialRange, onClose,
}: {
  property: typeof properties[number];
  initialRange: DateRange | undefined;
  onClose: () => void;
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [guests, setGuests] = useState(2);

  const nights = range?.from && range?.to
    ? Math.max(1, Math.round((range.to.getTime() - range.from.getTime()) / 86400000))
    : 0;
  const subtotal = nights * property.price;
  const cleaning = 240;
  const service = Math.round(subtotal * 0.08);
  const total = subtotal + cleaning + service;

  const stepGuests = (delta: number) =>
    setGuests((g) => Math.min(property.guests, Math.max(1, g + delta)));

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-background/80 backdrop-blur-md sm:items-center" onClick={onClose}>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-lg border border-border/60 bg-card p-6 shadow-elegant sm:rounded-sm sm:p-8"
      >
        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl">Reservation confirmed</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your concierge will be in touch within 2 hours about {property.name}.
            </p>
            <button onClick={onClose} className="mt-6 text-xs uppercase tracking-wider text-primary hover:underline">Close</button>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-6"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Reserve</p>
              <h3 className="mt-1 font-display text-2xl">{property.name}</h3>
              <p className="text-sm text-muted-foreground">{property.location}, {property.country}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              {/* Calendar */}
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Select dates</p>
                <div className="rounded-sm border border-border/60 bg-background p-2">
                  <Calendar
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    numberOfMonths={1}
                    disabled={{ before: new Date() }}
                    className={cn("p-2 pointer-events-auto")}
                  />
                </div>
              </div>

              {/* Guests + price */}
              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Guests</p>
                  <div className="flex items-center justify-between rounded-sm border border-border/60 bg-background px-4 py-3">
                    <span className="text-sm">{guests} {guests === 1 ? "guest" : "guests"} <span className="text-xs text-muted-foreground">(max {property.guests})</span></span>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => stepGuests(-1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-foreground/70 transition-smooth hover:border-primary hover:text-primary">−</button>
                      <button type="button" onClick={() => stepGuests(1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-foreground/70 transition-smooth hover:border-primary hover:text-primary">+</button>
                    </div>
                  </div>
                </div>

                <div className="rounded-sm border border-border/60 bg-background p-4 text-sm">
                  {nights > 0 ? (
                    <div className="space-y-2">
                      <Row label={`$${property.price} × ${nights} nights`} value={`$${subtotal.toLocaleString()}`} />
                      <Row label="Cleaning fee" value={`$${cleaning}`} />
                      <Row label="Service fee" value={`$${service.toLocaleString()}`} />
                      <div className="mt-3 border-t border-border/40 pt-3">
                        <Row label="Total" value={`$${total.toLocaleString()}`} bold />
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-xs text-muted-foreground">Select dates to see your total</p>
                  )}
                </div>

                <label className="block">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Special requests</span>
                  <textarea rows={3} maxLength={500} className="mt-1 w-full resize-none rounded-sm border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" placeholder="Anniversaries, dietary needs, transfers…" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border/40 pt-5">
              <button type="button" onClick={onClose} className="text-xs uppercase tracking-wider text-foreground/60 hover:text-foreground">Cancel</button>
              <button
                type="submit"
                disabled={nights === 0}
                className="bg-gradient-warm px-7 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-smooth hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm reservation
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default PropertyDetailPage;
