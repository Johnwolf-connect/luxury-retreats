import { useState } from "react";
import { type Property } from "@/data/properties";
import {
  Star, BedDouble, Bath, Users, X, Wifi, Wind, Flame, Car, ChefHat, Wine,
  Waves, Mountain, Sparkles, Award, MapPin, Check
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

const amenityIcon = (a: string) => {
  const k = a.toLowerCase();
  if (k.includes("wi-fi")) return Wifi;
  if (k.includes("air")) return Wind;
  if (k.includes("fire")) return Flame;
  if (k.includes("park") || k.includes("ev")) return Car;
  if (k.includes("chef") || k.includes("kitchen")) return ChefHat;
  if (k.includes("wine") || k.includes("cellar")) return Wine;
  if (k.includes("pool") || k.includes("hot") || k.includes("sauna") || k.includes("snork")) return Waves;
  if (k.includes("view") || k.includes("ski") || k.includes("star") || k.includes("garden")) return Mountain;
  return Sparkles;
};

const PropertyDetail = ({ property, onClose }: { property: Property; onClose: () => void }) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const [activeImg, setActiveImg] = useState(0);

  const nights =
    range?.from && range?.to
      ? Math.max(1, Math.round((range.to.getTime() - range.from.getTime()) / 86400000))
      : 0;
  const total = nights * property.price;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-background animate-fade-in">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-border/40 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-foreground/70 transition-smooth hover:text-primary"
          >
            <X className="h-4 w-4" /> Close
          </button>
          <p className="font-display text-lg">{property.name}</p>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span>{property.rating}</span>
            <span className="text-muted-foreground">({property.reviews})</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">{property.country}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {property.name}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-foreground/60">
            <MapPin className="h-4 w-4" /> {property.location}
          </p>
        </div>

        {/* Gallery */}
        <div className="mb-12 grid gap-3 sm:grid-cols-4 sm:grid-rows-2">
          <button
            onClick={() => setActiveImg(0)}
            className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-sm sm:aspect-auto"
          >
            <img src={property.gallery[0]} alt={property.name} loading="lazy" className="h-full w-full object-cover transition-smooth hover:scale-105" />
          </button>
          {property.gallery.slice(1, 3).map((src, i) => (
            <button key={i} onClick={() => setActiveImg(i + 1)} className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-sm sm:col-span-1 sm:aspect-auto">
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-smooth hover:scale-105" />
            </button>
          ))}
          <div className="relative col-span-2 row-span-1 aspect-[4/3] overflow-hidden rounded-sm sm:col-span-1 sm:aspect-auto">
            <img src={property.gallery[2]} alt="" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-background/70 text-sm">
              <span>+24 photos</span>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Left */}
          <div>
            <div className="flex flex-wrap items-center gap-6 border-b border-border/40 pb-8">
              <Stat icon={Users} label={`${property.guests} guests`} />
              <Stat icon={BedDouble} label={`${property.bedrooms} bedrooms`} />
              <Stat icon={Bath} label={`${property.bathrooms} bathrooms`} />
            </div>

            <div className="border-b border-border/40 py-8">
              <div className="flex items-center gap-4">
                <img src={property.host.avatar} alt={property.host.name} loading="lazy" className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="flex items-center gap-2 font-medium">
                    Hosted by {property.host.name}
                    {property.host.superhost && <Award className="h-3.5 w-3.5 text-primary" />}
                  </p>
                  <p className="text-sm text-muted-foreground">Superhost · Hosting since {property.host.since}</p>
                </div>
              </div>
            </div>

            <div className="border-b border-border/40 py-8">
              <h2 className="mb-4 font-display text-2xl">About this home</h2>
              <p className="text-foreground/75 leading-relaxed">{property.description}</p>
            </div>

            <div className="border-b border-border/40 py-8">
              <h2 className="mb-6 font-display text-2xl">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((a) => {
                  const Icon = amenityIcon(a);
                  return (
                    <div key={a} className="flex items-center gap-3 text-sm text-foreground/80">
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{a}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="py-8">
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
          </div>

          {/* Right - booking */}
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

              <button className="mt-5 w-full bg-gradient-warm py-4 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-smooth hover:opacity-90">
                Reserve
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">You won't be charged yet</p>

              {nights > 0 && (
                <div className="mt-6 space-y-2 border-t border-border/40 pt-5 text-sm">
                  <Row label={`$${property.price} × ${nights} nights`} value={`$${total.toLocaleString()}`} />
                  <Row label="Cleaning fee" value="$240" />
                  <Row label="Service fee" value={`$${Math.round(total * 0.08).toLocaleString()}`} />
                  <div className="mt-3 border-t border-border/40 pt-3">
                    <Row label="Total" value={`$${(total + 240 + Math.round(total * 0.08)).toLocaleString()}`} bold />
                  </div>
                </div>
              )}

              <ul className="mt-6 space-y-2 border-t border-border/40 pt-5 text-xs text-muted-foreground">
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Free cancellation for 48 hours</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary" /> 24/7 concierge support</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Verified by Maison</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ icon: Icon, label }: { icon: typeof Users; label: string }) => (
  <div className="flex items-center gap-2 text-sm text-foreground/80">
    <Icon className="h-4 w-4 text-primary" /> {label}
  </div>
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

export default PropertyDetail;
