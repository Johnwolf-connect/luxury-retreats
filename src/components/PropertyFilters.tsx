import React, { useState } from "react";

const AMENITY_OPTIONS = [
  "Pool", "Chef Kitchen", "Smart Home", "Gated", "Wine Cellar",
  "EV Charging", "Home Theater", "Gym", "Spa", "Tennis Court",
  "Guest House", "Acreage"
];

const PropertyFilters = () => {
  const = useState(false);
  const = useState<string[]>([]);

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities( );
    }
  };

  const clearAll = () => setSelectedAmenities([]);

  return (
    <div className="space-y-8 pr-4">
      <div>
        <p className="mb-3 text-sm font-medium">BEDROOMS</p>
        <div className="flex flex-wrap gap-2">
          { .map(b => (
            <button key={b} className="px-5 py-2.5 rounded-full border text-sm hover:bg-gray-100">{b}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">BATHROOMS</p>
        <div className="flex flex-wrap gap-2">
          { .map(b => (
            <button key={b} className="px-5 py-2.5 rounded-full border text-sm hover:bg-gray-100">{b}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">FEATURES</p>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center gap-3 py-6 border-2 border-dashed border-amber-400 rounded-3xl hover:bg-amber-50 text-amber-600 font-medium text-lg"
        >
          <span className="text-4xl">+</span> Add Features
        </button>

        {selectedAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedAmenities.map((item, i) => (
              <div key={i} className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm flex items-center gap-2">
                {item}
                <button 
                  onClick={() => setSelectedAmenities(prev => prev.filter(x => x !== item))} 
                  className="text-lg leading-none hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
            <button onClick={clearAll} className="text-red-500 text-xs underline ml-2">Clear all</button>
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
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedAmenities.includes(amenity) ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
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
