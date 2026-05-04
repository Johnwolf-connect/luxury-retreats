import { Square, BedDouble, Bath, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Property } from "@/data/properties";

const formatPrice = (p: Property) =>
  p.listingType === "Rent"
    ? `$${p.price.toLocaleString()}/mo`
    : `$${p.price.toLocaleString()}`;

const statusStyle = (s: Property["status"]) => {
  switch (s) {
    case "New": return "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30";
    case "Coming Soon": return "bg-amber-500/15 text-amber-300 ring-amber-400/30";
    case "Pending": return "bg-foreground/10 text-foreground/70 ring-border/50";
    default: return "bg-primary/15 text-primary ring-primary/30";
  }
};

const PropertyCard = ({ property, index = 0 }: { property: Property; index?: number }) => {
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

          <div className="absolute inset-x-4 top-4 flex items-start justify-between">
            <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider ring-1 backdrop-blur-md ${statusStyle(property.status)}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
              {property.status}
            </span>
            <span className="rounded-full bg-background/40 px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur-md">
              For {property.listingType}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/90">
              {property.location} · {property.country}
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">
              {property.name}
            </h3>
            <p className="mt-1 truncate text-xs text-foreground/55">{property.address}</p>

            <div className="mt-5 flex items-end justify-between border-t border-border/40 pt-4">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/60">
                <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5" />{property.bedrooms} bd</span>
                <span className="flex items-center gap-1.5"><Bath className="h-3.5 w-3.5" />{property.bathrooms} ba</span>
                <span className="flex items-center gap-1.5"><Square className="h-3.5 w-3.5" />{property.sqft.toLocaleString()} sf</span>
              </div>
              <p className="text-right">
                <span className="font-display text-xl text-primary">{formatPrice(property)}</span>
              </p>
            </div>

            <div className="pointer-events-none mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <ArrowUpRight className="h-3 w-3" />
              View listing
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PropertyCard;
