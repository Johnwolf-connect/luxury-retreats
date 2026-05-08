import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import { properties as ALL_PROPERTIES } from "@/data/properties";
import PropertyFilters, { DEFAULT_FILTERS, type Filters } from "./PropertyFilters";

const PropertyGrid = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  // Real filtering logic
  const filteredProperties = ALL_PROPERTIES.filter(property => {
    // Bedroom filter
    if (filters.bedrooms !== "Any") {
      const minBeds = parseInt(filters.bedrooms) || 0;
      if (property.beds < minBeds) return false;
    }

    // Bathroom filter
    if (filters.bathrooms !== "Any") {
      const minBaths = parseInt(filters.bathrooms) || 0;
      if (property.baths < minBaths) return false;
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      return filters.amenities.every(amenity =>
        property.amenities?.includes(amenity)
      );
    }

    return true;
  });

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-semibold tracking-tight">
          Homes worth coming home to.
        </h1>
        <p className="text-neutral-500 mt-2">Exceptional luxury homes in Atlanta and beyond</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-72 flex-shrink-0">
          <PropertyFilters />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex justify-between items-baseline mb-8">
            <p className="text-sm font-medium text-neutral-500">
              SHOWING {filteredProperties.length} OF {ALL_PROPERTIES.length} HOMES
            </p>
          </div>

          {/* Property grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;
