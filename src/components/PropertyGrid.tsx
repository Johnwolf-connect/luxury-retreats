import React from "react";
import PropertyCard from "./PropertyCard";
import { Filters } from "./PropertyFilters";

// Mock homes data
const allHomes = [
  { id: 1, title: "Alpharetta Estate", price: "$1,200,000", beds: 7, baths: 8, sqft: "13,800", features: ["Pool", "Home Theater"], image: "https://picsum.photos/id/1015/600/400" },
  { id: 2, title: "Virginia-Highland Craftsman", price: "$1,895,000", beds: 5, baths: 6, sqft: "6,200", features: ["Gym", "Gated"], image: "https://picsum.photos/id/1016/600/400" },
  { id: 3, title: "Buckhead Modern", price: "$18,500/mo", beds: 6, baths: 7, sqft: "9,400", features: ["Pool", "Smart Home"], image: "https://picsum.photos/id/133/600/400" },
  { id: 4, title: "Milton Acreage Retreat", price: "$2,495,000", beds: 5, baths: 5, sqft: "8,100", features: ["Acreage", "Tennis Court"], image: "https://picsum.photos/id/201/600/400" },
  { id: 5, title: "Sandy Springs Smart Home", price: "$1,450,000", beds: 4, baths: 5, sqft: "5,900", features: ["Smart Home", "Wine Cellar"], image: "https://picsum.photos/id/251/600/400" },
  { id: 6, title: "Midtown Chef's Kitchen", price: "$875,000", beds: 3, baths: 4, sqft: "3,200", features: ["Chef Kitchen", "Spa"], image: "https://picsum.photos/id/1005/600/400" },
];

type PropertyGridProps = {
  filters: Filters;
};

const PropertyGrid = ({ filters }: PropertyGridProps) => {
  const filteredHomes = allHomes.filter(home => {
    const matchesAmenities = filters.amenities.length === 0 || 
      filters.amenities.some(amenity => home.features.includes(amenity));
    
    return matchesAmenities;
  });

  return (
    <div>
      <p className="text-sm font-medium text-neutral-500 mb-6">
        SHOWING <span className="font-semibold text-neutral-900">{filteredHomes.length}</span> OF {allHomes.length} HOMES
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredHomes.map(home => (
          <PropertyCard key={home.id} home={home} />
        ))}
      </div>

      {filteredHomes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl">No homes match — yet.</p>
          <p className="text-neutral-500 mt-2">Try clearing some filters.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyGrid;
