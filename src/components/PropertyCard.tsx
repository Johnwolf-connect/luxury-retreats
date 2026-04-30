import { Star, BedDouble, Bath } from "lucide-react";
import type { Property } from "@/data/properties";

const PropertyCard = ({ property, onSelect }: { property: Property; onSelect: (p: Property) => void }) => {
  return (
    <article
      onClick={() => onSelect(property)}
      className="group relative cursor-pointer overflow-hidden rounded-sm bg-card shadow-card transition-smooth hover:shadow-elegant"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={property.cover}
          alt={`${property.name} in ${property.location}`}
          width={1280}
          height={960}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-card opacity-90" />
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/40 px-3 py-1 text-xs backdrop-blur-md">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="font-medium">{property.rating}</span>
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
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
