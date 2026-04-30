import { properties, type Property } from "@/data/properties";
import PropertyCard from "./PropertyCard";

const PropertyGrid = ({ onSelect }: { onSelect: (p: Property) => void }) => {
  return (
    <section id="stays" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">The Collection</p>
          <h2 className="max-w-2xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Quietly remarkable places to stay.
          </h2>
        </div>
        <div className="flex gap-2 text-xs uppercase tracking-wider">
          {["All", "Coastal", "Mountain", "Countryside", "Urban"].map((t, i) => (
            <button
              key={t}
              className={`rounded-full border px-4 py-2 transition-smooth ${
                i === 0
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-foreground/60 hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
};

export default PropertyGrid;
