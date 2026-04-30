import { properties } from "@/data/properties";
import { MapPin } from "lucide-react";

const MapView = () => {
  return (
    <section id="destinations" className="border-t border-border/40 bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Destinations</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              From alpine valleys to private atolls.
            </h2>
          </div>
          <p className="max-w-md text-foreground/60 lg:justify-self-end">
            Six continents. Eighty-four destinations. Every property visited and approved by our
            in-house team before it earns a place in the collection.
          </p>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-border/60 bg-muted shadow-elegant">
          {/* Stylized map background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, hsl(35 65% 58% / 0.3), transparent 40%), radial-gradient(circle at 70% 60%, hsl(18 55% 52% / 0.25), transparent 50%)",
            }}
          />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 56" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="hsl(var(--border))" strokeWidth="0.1" />
              </pattern>
            </defs>
            <rect width="100" height="56" fill="url(#grid)" />
            {/* Stylized continent silhouettes */}
            <path
              d="M5,20 Q15,15 25,18 T45,22 Q50,28 45,34 T25,38 Q15,36 8,30 Z"
              fill="hsl(var(--secondary))"
              opacity="0.6"
            />
            <path
              d="M50,15 Q60,12 68,16 T80,20 Q85,25 82,30 T70,35 Q60,33 52,28 Z"
              fill="hsl(var(--secondary))"
              opacity="0.6"
            />
            <path
              d="M65,38 Q72,36 78,40 T85,46 Q82,50 75,49 T68,44 Z"
              fill="hsl(var(--secondary))"
              opacity="0.5"
            />
          </svg>

          {properties.map((p, i) => (
            <button
              key={p.id}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%`, animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                <div className="relative flex items-center gap-2 rounded-full bg-gradient-warm px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-glow">
                  <MapPin className="h-3 w-3" />
                  ${p.price}
                </div>
                <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-popover px-3 py-1.5 text-xs opacity-0 shadow-elegant transition-smooth group-hover:opacity-100">
                  {p.name} · {p.location}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapView;
