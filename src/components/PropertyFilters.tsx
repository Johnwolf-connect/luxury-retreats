import React, { useState } from "react";

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
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  return (
    <div className="space-y-8 pr-4">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500">FEATURES</p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-6 border-2 border-dashed border-amber-400 rounded-3xl text-amber-600 font-medium text-lg"
        >
          + Add Features
        </button>

        {selectedAmenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedAmenities.map((item, i) => (
              <div key={i} className="bg-amber-100 text-amber-800 px-4 py-2 rounded-3xl text-sm">
                {item} ×
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Select Features</h3>
            <p>Modal coming soon...</p>
            <button onClick={() => setIsModalOpen(false)} className="mt-6 px-6 py-3 bg-black text-white rounded-2xl">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
