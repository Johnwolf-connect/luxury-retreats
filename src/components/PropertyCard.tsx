import { Star, BedDouble, Bath, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Property } from "@/data/properties";

const PropertyCard = ({ property, index = 0 }: { property: Property; index?: number }) => {
  const available = property.id.length % 3 !== 0;
  const totalEstimate = property.price * 5;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <Link
        to={`/property/${property.id}`}
        className="block overflow-hidden rounded-sm bg-card shadow-card transition-shadow duration-500 hover:shadow-elegant"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={property.cover}
            alt={`${property.name} in ${property.location}`}
            width={1280}
            height={1600}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-card opacity-90" />

          {/* Top badges */}
          <div className="absolute inset-x-4 top-4 flex items-start justify-between">
            <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider backdrop-blur-md ${available ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30" : "bg-foreground/10 text-foreground/70 ring-1 ring-border/50"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${available ? "bg-emerald-400 shadow-[0_0_8px_currentColor]" : "bg-foreground/40"}`} />
              {available ? "Available" : "Limited"}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-background/40 px-3 py-1 text-xs backdrop-blur-md">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-foreground/60">({property.reviews})</span>
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/90">
              {property.country}
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">
              {property.name}
            </h3>
            <p className="mt-1 text-sm text-foreground/60">{property.location}</p>

            <div className="mt-5 flex items-end justify-between border-t border-border/40 pt-4">
              <div className="flex gap-4 text-xs text-foreground/60">
                <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5" />{property.bedrooms}</span>
                <span className="flex items-center gap-1.5"><Bath className="h-3.5 w-3.5" />{property.bathrooms}</span>
              </div>
              <p className="text-right">
                <span className="font-display text-xl text-primary">${property.price.toLocaleString()}</span>
                <span className="text-xs text-foreground/50"> /night</span>
                <span className="block text-[10px] uppercase tracking-wider text-foreground/40">
                  ~${totalEstimate.toLocaleString()} / 5 nights
                </span>
              </p>
            </div>

            {/* Hover CTA */}
            <div className="pointer-events-none mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <Sparkles className="h-3 w-3" />
              View details
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PropertyCard;
