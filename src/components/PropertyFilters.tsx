import React from "react";

export const DEFAULT_FILTERS = {
  price: [500000, 5000000],
  bedrooms: 0,
  bathrooms: 0,
  amenities: [],
  propertyType: "Any",
  listingType: "Any",
};

const PropertyFilters = () => {
  return (
    <div className="space-y-8 pr-4">
      <div>
        <p className="mb-3 text-sm font-medium">BEDROOMS</p>
        <div className="flex flex-wrap gap-2">
          {["Any", "2+", "3+", "4+", "5+", "6+"].map(b => (
            <button key={b} className="px-5 py-2.5 rounded-full border text-sm hover:bg-gray-100">{b}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">BATHROOMS</p>
        <div className="flex flex-wrap gap-2">
          {["Any", "2+", "3+", "4+", "5+"].map(b => (
            <button key={b} className="px-5 py-2.5 rounded-full border text-sm hover:bg-gray-100">{b}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">FEATURES</p>
        <button 
          onClick={() => alert("Add Features clicked!\n\nWe'll improve this next.")}
          className="w-full py-6 border-2 border-dashed border-amber-400 rounded-3xl text-amber-600 font-medium hover:bg-amber-50 flex items-center justify-center gap-3 text-lg"
        >
          <span className="text-4xl">+</span> Add Features
        </button>
      </div>
    </div>
  );
};

export default PropertyFilters;
