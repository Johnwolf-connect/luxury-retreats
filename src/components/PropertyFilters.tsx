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
  "Furnished", "Rooftop Terrace", "Private Elevator", "Waterfront"
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
      {/* Bedrooms */}
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

      {/* Bathrooms */}
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

      {/* FEATURES - Your Photoshop Style */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500">FEATURES</p>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center gap-3 py-6 border-2 border-dashed border-amber-400 rounded-3xl hover:bg-amber-50 text-amber-600 font-medium text-lg transition"
        >
          <span className="text-4xl leading-none">+</span> Add Features
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Select Features</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-3xl text-gray-400 hover:text-gray-600">×</button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 max-h-[420px] overflow-y-auto">
              {AMENITY_OPTIONS.map(amenity => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    selectedAmenities.includes(amenity) 
                      ? 'border-amber-500 bg-amber-50 font-medium' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 border rounded-2xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-semibold"
              >
                Done ({selectedAmenities.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
