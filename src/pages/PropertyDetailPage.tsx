import { useEffect, useRef, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BedDouble, Bath, Square, ArrowLeft, Wifi, Wind, Flame, Car, ChefHat, Wine,
  Waves, TreePine, Sparkles, Award, MapPin, Check, ChevronLeft, ChevronRight,
  ShieldCheck, GraduationCap, TrendingUp, Heart, Share2, Calendar, Phone, Mail, Building, Ruler,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { properties } from "@/data/properties";
import PropertyMap from "@/components/PropertyMap";
import Lightbox from "@/components/Lightbox";
import Footer from "@/components/Footer";

const amenityIcon = (a: string) => {
  const k = a.toLowerCase();
  if (k.includes("wi-fi")) return Wifi;
  if (k.includes("air") || k.includes("smart")) return Wind;
  if (k.includes("fire")) return Flame;
  if (k.includes("garage") || k.includes("ev") || k.includes("park")) return Car;
  if (k.includes("chef") || k.includes("kitchen")) return ChefHat;
  if (k.includes("wine") || k.includes("cellar")) return Wine;
  if (k.includes("pool") || k.includes("spa")) return Waves;
  if (k.includes("acre") || k.includes("garden") || k.includes("yard") || k.includes("barn")) return TreePine;
  return Sparkles;
};

const formatPrice = (price: number, type: "Sale" | "Rent") =>
  type === "Rent" ? `$${price.toLocaleString()}/mo` : `$${price.toLocaleString()}`;

const PropertyDetailPage = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  const [activeImg, setActiveImg] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [tourOpen, setTourOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (property) {
      document.title = `${property.name} · ${property.location} — Maison Georgia`;
    }
  }, [property]);

  if (!property) return <Navigate to="/" replace />;

  const pricePerSqft = Math.round(property.price / property.sqft);

  const scrollGallery = (dir: 1 | -1) => {
    const el = galleryRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <main className="bg-background">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center gap-2 text-sm text-foreground/70 transition-smooth hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> All listings
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

      <div className="mx-auto max-w-7xl px-6 pb-28 pt-10 lg:px-10 lg:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-primary">{property.status}</span>
            <span className="rounded-full bg-card px-2.5 py-1 text-[10px] uppercase tracking-wider text-foreground/70">For {property.listingType}</span>
            <span className="rounded-full bg-card px-2.5 py-1 text-[10px] uppercase tracking-wider text-foreground/70">{property.propertyType}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {property.name}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-foreground/70">
            <MapPin className="h-4 w-4 text-primary" /> {property.address}
          </p>
        </motion.div>

        {/* Gallery */}
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
            <div className="grid grid-cols-2 gap-4 border-b border-border/40 pb-8 sm:grid-cols-4">
              <Spec icon={BedDouble} value={property.bedrooms} label="Bedrooms" />
              <Spec icon={Bath} value={property.bathrooms} label="Bathrooms" />
              <Spec icon={Square} value={property.sqft.toLocaleString()} label="Sq ft" />
              <Spec icon={Ruler} value={property.lotAcres > 0 ? `${property.lotAcres} ac` : "—"} label="Lot" />
            </div>

            {/* Quick stats */}
            <div className="border-b border-border/40 py-8">
              <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                <KV k="Year built" v={property.yearBuilt.toString()} />
                <KV k="Garage" v={`${property.guests} car`} />
                <KV k="Price / sqft" v={`$${pricePerSqft.toLocaleString()}`} />
                <KV k="Days on market" v={property.reviews.toString()} />
              </div>
            </div>

            {/* Agent card */}
            <div className="border-b border-border/40 py-8">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <img src={property.host.avatar} alt={property.host.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/30" />
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1 text-primary-foreground" title="Verified Agent">
                    <Check className="h-3 w-3" />
                  </span>
                </div>
                <div className="flex-1 min-w-[180px]">
                  <p className="flex items-center gap-2 font-medium">
                    Listed by {property.host.name}
                    <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                      <ShieldCheck className="h-3 w-3" /> Licensed GA
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">Principal Broker · Hosting since {property.host.since}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Maison Georgia · Buckhead office</p>
                </div>
                <a href="tel:+14045550199" className="rounded-full border border-primary/60 px-5 py-2 text-xs uppercase tracking-wider text-primary transition-smooth hover:bg-primary hover:text-primary-foreground">
                  Call agent
                </a>
              </div>
            </div>

            <div className="border-b border-border/40 py-8">
              <h2 className="mb-4 font-display text-2xl">About this home</h2>
              <p className="leading-relaxed text-foreground/75">{property.description}</p>
            </div>

            {/* Features */}
            <div className="border-b border-border/40 py-8">
              <h2 className="mb-6 font-display text-2xl">Features & finishes</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {property.amenities.map((a) => {
                  const Icon = amenityIcon(a);
                  return (
                    <div key={a} className="group flex items-center gap-3 rounded-sm border border-border/40 bg-card/40 px-4 py-3 text-sm text-foreground/80 transition-smooth hover:border-primary/50 hover:bg-card">
                      <Icon className="h-4 w-4 text-primary transition-smooth group-hover:scale-110" />
                      <span>{a}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Schools */}
            <div className="border-b border-border/40 py-8">
              <h2 className="mb-2 flex items-center gap-2 font-display text-2xl"><GraduationCap className="h-5 w-5 text-primary" /> Schools</h2>
              <p className="mb-6 text-sm text-muted-foreground">Assigned schools and ratings (GreatSchools data).</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {property.schools.map((s) => (
                  <div key={s.name} className="rounded-sm border border-border/40 bg-card/40 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.level}</p>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{s.rating}/10</span>
                    </div>
                    <p className="mt-2 text-sm">{s.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment */}
            {property.investment && (
              <div className="border-b border-border/40 py-8">
                <h2 className="mb-2 flex items-center gap-2 font-display text-2xl"><TrendingUp className="h-5 w-5 text-primary" /> Investment potential</h2>
                <p className="mb-6 text-sm text-muted-foreground">Underwritten by Maison Georgia using comparable sales and rental data.</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Metric label="Cap rate" value={`${property.investment.capRate}%`} />
                  <Metric label="Monthly rent" value={`$${property.investment.monthlyRent.toLocaleString()}`} />
                  <Metric label="3-yr appreciation" value={`+${property.investment.appreciation}%`} />
                </div>
              </div>
            )}

            {/* Map */}
            <div className="py-8">
              <h2 className="mb-2 font-display text-2xl">Location</h2>
              <p className="mb-6 text-sm text-muted-foreground">{property.location}, {property.country}</p>
              <PropertyMap property={property} />
              <div className="mt-8">
                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Neighborhood highlights</p>
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

          {/* Right - sticky */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-sm border border-border/60 bg-card p-7 shadow-elegant">
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary">For {property.listingType}</p>
              <p className="mt-2 font-display text-4xl text-primary">{formatPrice(property.price, property.listingType)}</p>
              {property.listingType === "Sale" && (
                <p className="mt-1 text-xs text-muted-foreground">${pricePerSqft.toLocaleString()}/sqft · Est. mortgage ${(Math.round(property.price * 0.0055)).toLocaleString()}/mo*</p>
              )}

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setTourOpen(true)}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-gradient-warm py-4 text-sm font-medium uppercase tracking-wider text-primary-foreground shadow-elegant transition-opacity hover:opacity-95"
              >
                <Calendar className="h-4 w-4" /> Schedule a tour
              </motion.button>

              <a href="tel:+14045550199" className="mt-3 flex w-full items-center justify-center gap-2 rounded-sm border border-primary/60 py-3 text-xs uppercase tracking-wider text-primary transition-smooth hover:bg-primary hover:text-primary-foreground">
                <Phone className="h-3.5 w-3.5" /> Call agent
              </a>
              <button onClick={() => setTourOpen(true)} className="mt-2 flex w-full items-center justify-center gap-2 rounded-sm border border-border/60 py-3 text-xs uppercase tracking-wider text-foreground/80 transition-smooth hover:border-primary hover:text-primary">
                <Mail className="h-3.5 w-3.5" /> Request info
              </button>

              <ul className="mt-6 space-y-2 border-t border-border/40 pt-5 text-xs text-muted-foreground">
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Private showings 7 days a week</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Local Buckhead-based brokerage</li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Off-market access on request</li>
              </ul>
              <p className="mt-4 text-[10px] text-muted-foreground">*Estimated payment, 20% down, 7.0% APR, 30-yr fixed. Not a quote.</p>
            </div>

            <div className="mt-6 grid gap-3 rounded-sm border border-border/40 bg-card/40 p-5 text-xs text-foreground/70">
              <Trust icon={Award} text="$1.2B+ in career sales volume" />
              <Trust icon={ShieldCheck} text="Fiduciary representation" />
              <Trust icon={Building} text="MLS · FMLS · GAMLS" />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile floating CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg text-primary">{formatPrice(property.price, property.listingType)}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{property.bedrooms}bd · {property.bathrooms}ba · {property.sqft.toLocaleString()}sf</p>
          </div>
          <button onClick={() => setTourOpen(true)} className="bg-gradient-warm px-6 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground">
            Schedule tour
          </button>
        </div>
      </div>

      <Lightbox
        images={property.gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((v) => v === null ? null : (v - 1 + property.gallery.length) % property.gallery.length)}
        onNext={() => setLightboxIndex((v) => v === null ? null : (v + 1) % property.gallery.length)}
      />

      {tourOpen && <TourModal property={property} onClose={() => setTourOpen(false)} />}

      <Footer />
    </main>
  );
};

const Spec = ({ icon: Icon, value, label }: { icon: typeof BedDouble; value: string | number; label: string }) => (
  <div>
    <Icon className="mb-2 h-4 w-4 text-primary" />
    <p className="font-display text-2xl">{value}</p>
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
  </div>
);

const KV = ({ k, v }: { k: string; v: string }) => (
  <div>
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</p>
    <p className="mt-1">{v}</p>
  </div>
);

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-sm border border-border/40 bg-card/40 p-5">
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="mt-2 font-display text-2xl text-primary">{value}</p>
  </div>
);

const Trust = ({ icon: Icon, text }: { icon: typeof Award; text: string }) => (
  <div className="flex items-center gap-3"><Icon className="h-4 w-4 text-primary" /> {text}</div>
);

const TourModal = ({ property, onClose }: { property: typeof properties[number]; onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-background/80 backdrop-blur-md sm:items-center" onClick={onClose}>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-lg border border-border/60 bg-card p-6 shadow-elegant sm:rounded-sm sm:p-8"
      >
        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl">Tour requested</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {property.host.name} will reach out within 2 hours to confirm your showing of {property.name}.
            </p>
            <button onClick={onClose} className="mt-6 text-xs uppercase tracking-wider text-primary hover:underline">Close</button>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-5"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Schedule a Tour</p>
              <h3 className="mt-1 font-display text-2xl">{property.name}</h3>
              <p className="text-sm text-muted-foreground">{property.address}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Preferred date">
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="input-style" />
              </Field>
              <Field label="Preferred time">
                <select required value={time} onChange={(e) => setTime(e.target.value)} className="input-style">
                  <option value="">Select…</option>
                  {["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Full name">
                <input required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} className="input-style" />
              </Field>
              <Field label="Phone">
                <input required type="tel" maxLength={40} value={phone} onChange={(e) => setPhone(e.target.value)} className="input-style" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Email">
                  <input required type="email" maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} className="input-style" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Message (optional)">
                  <textarea rows={3} maxLength={500} value={message} onChange={(e) => setMessage(e.target.value)} className="input-style resize-none" placeholder="Anything you'd like the agent to know?" />
                </Field>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border/40 pt-5">
              <button type="button" onClick={onClose} className="text-xs uppercase tracking-wider text-foreground/60 hover:text-foreground">Cancel</button>
              <button type="submit" className="bg-gradient-warm px-7 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-smooth hover:opacity-90">
                Request showing
              </button>
            </div>
          </form>
        )}
      </motion.div>
      <style>{`.input-style{display:block;width:100%;border:1px solid hsl(var(--border));background:hsl(var(--background));border-radius:2px;padding:0.6rem 0.75rem;font-size:0.875rem;color:hsl(var(--foreground));}.input-style:focus{outline:none;border-color:hsl(var(--primary));}`}</style>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
    {children}
  </label>
);

export default PropertyDetailPage;
