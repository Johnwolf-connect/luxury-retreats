import React from "react";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full">
          {property.status || "FOR SALE"}
        </div>

        <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-red-50 transition">
          ❤️
        </button>
      </div>

      {/* Content - Much more readable */}
      <div className="p-6">
        <div className="text-3xl font-semibold text-gray-900 mb-1">
          {property.price}
        </div>
        
        <div className="text-gray-600 mb-4 font-medium line-clamp-1">
          {property.location}
        </div>

        <div className="flex gap-5 text-sm text-gray-600 mb-5">
          <span><strong>{property.beds}</strong> beds</span>
          <span><strong>{property.baths}</strong> baths</span>
          {property.sqft && <span><strong>{property.sqft}</strong> sf</span>}
        </div>

        <div className="text-xs text-gray-500 border-t pt-4">
          {property.address}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
