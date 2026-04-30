import { useState } from "react";
import { motion } from "framer-motion";
import { properties } from "@/data/properties";
import PropertyCard from "./PropertyCard";

const FILTERS = ["All", "Coastal", "Mountain", "Countryside", "Urban"] as const;
type Filter = (typeof FILTERS)[number];

const PropertyGrid = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const list = filter === "All" ? properties : properties.filter((p) => p.category === filter);

  return (
    <section id="stays" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
      >
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">The Collection</p>
          <h2 className="max-w-2xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Quietly remarkable places to stay.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider">
          {FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full border px-4 py-2 transition-smooth ${
                filter === t
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-foreground/60 hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} />
        ))}
      </div>
    </section>
  );
};

export default PropertyGrid;
