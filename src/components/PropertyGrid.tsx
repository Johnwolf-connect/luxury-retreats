import React from "react";
import PropertyCard from "./PropertyCard";
import { properties as ALL_PROPERTIES } from "@/data/properties";
import PropertyFilters, { DEFAULT_FILTERS } from "./PropertyFilters";

const PropertyGrid = () => {
  const filters = DEFAULT_FILTERS || { amenities: [] };

  const filteredProperties = ALL_PROPERTIES.filter(() => true); // Show all for now

  return (
    <div className="flex gap-8">
      {/* SIDEBAR */}
      <div className="w-72 flex-shrink-0">
        <PropertyFilters />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-neutral-500">SHOWING {filteredProperties.length} OF {ALL_PROPERTIES.length} HOMES</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;
