import React, { useState, useEffect } from "react";

const PropertyCard = ({ property }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorited(favorites.some(f => f.id === property.id));
  }, [property.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click if any

    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorited) {
      favorites = favorites.filter(f => f.id !== property.id);
    } else {
      favorites.push(property);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-4 left-4 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full">
          {property.status || "FOR SALE"}
        </div>

        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-red-50 transition"
        >
          {isFavorited ? "❤️" : "♡"}
        </button>
      </div>

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
