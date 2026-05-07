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

const AMENITY_OPTIONS = [
  "Pool", "Kitchen Island", "Smart Home", "Wine Cellar", 
  "Home Theater", "Gym", "Spa", "Guest House", 
  "Furnished", "Rooftop Terrace"
];

const PropertyFilters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const clearAll = () => setSelectedAmenities([]);

  return (
    <div className="space-y-8 pr-4">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500">BEDROOMS</p>
        <div className="flex flex-wrap gap-2">
          {["Any", "2+", "3+", "4+", "5+", "6+"].map(b => (
            <button key={b} className="px-6 py-2.5 rounded-3xl text-sm font-medium border bg-white border-neutral-200 hover:border-neutral-300">
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500">BATHROOMS</p>
        <div className="flex flex-wrap gap-2">
          {["Any", "2+", "3+", "4+", "5+"].map(b => (
            <button key={b} className="px-6 py-2.5 rounded-3xl text-sm font-medium border bg-white border-neutral-200 hover:border-neutral-300">
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500">FEATURES</p>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-6 border-2 border-dashed border-amber-400 rounded-3xl text-amber-600 font-medium text-lg flex items-center justify-center gap-3"
        >
          + Add Features
        </button>

        {selectedAmenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedAmenities.map((item, i) => (
              <div key={i} className="bg-amber-100 text-amber-800 px-4 py-2 rounded-3xl text-sm flex items-center gap-2">
                {item}
                <button onClick={() => setSelectedAmenities(prev => prev.filter(x => x !== item))} className="hover:text-red-500">×</button>
              </div>
            ))}
            <button onClick={clearAll} className="text-red-500 text-sm underline">Clear all</button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-6">Select Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {AMENITY_OPTIONS.map(amenity => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`p-4 rounded-2xl border ${
                    selectedAmenities.includes(amenity) ? 'bg-amber-50 border-amber-500' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border rounded-2xl">Cancel</button>
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-amber-600 text-white rounded-2xl">Done ({selectedAmenities.length})</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
