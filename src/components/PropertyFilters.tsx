import React from "react";

export type Filters = {
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
};

export const DEFAULT_FILTERS: Filters = {
  bedrooms: "Any",
  bathrooms: "Any",
  amenities: [],
};

const PropertyFilters = () => {
  return (
    <div className="space-y-8 pr-4">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500">BEDROOMS</p>
        <div className="flex flex-wrap gap-2">
          {["Any", "2+", "3+", "4+", "5+", "6+"].map(b => (
            <button key={b} className="px-6 py-2.5 rounded-3xl text-sm font-medium border bg-white border-neutral-200">
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500">BATHROOMS</p>
        <div className="flex flex-wrap gap-2">
          {["Any", "2+", "3+", "4+", "5+"].map(b => (
            <button key={b} className="px-6 py-2.5 rounded-3xl text-sm font-medium border bg-white border-neutral-200">
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500">FEATURES</p>
        <div className="w-full py-8 border-2 border-dashed border-amber-400 rounded-3xl text-center text-amber-600 font-medium text-lg">
          + Add Features (coming soon)
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
