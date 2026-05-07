import React, { useState, useEffect } from "react";

const PropertyCard = ({ property }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favorites.some(f => f.id === property.id));
  }, [property.id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorited) {
      favorites = favorites.filter(f => f.id !== property.id);
    } else {
      favorites.push(property);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
      <div className="relative h-64">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:bg-red-50 transition"
        >
          {isFavorited ? '❤️' : '♡'}
        </button>
      </div>

      <div className="p-6">
        <div className="text-3xl font-semibold mb-1">{property.price}</div>
        <div className="text-gray-600 mb-3">{property.location}</div>
        
        <div className="text-sm text-gray-600 flex gap-4">
          <span>{property.beds} beds</span>
          <span>{property.baths} baths</span>
          {property.sqft && <span>{property.sqft} sf</span>}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
