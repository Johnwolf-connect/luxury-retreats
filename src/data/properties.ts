export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  status: "Active" | "New" | "Coming Soon";
  lat: number;
  lng: number;
  amenities?: string[];
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Estate in Tuxedo Park",
    price: 4250000,
    location: "Buckhead",
    address: "1180 Tuxedo Park NW, Atlanta, GA 30327",
    beds: 7,
    baths: 8,
    sqft: 13800,
    image: "https://picsum.photos/id/1015/800/600",
    status: "Active",
    lat: 33.8123,
    lng: -84.3948,
    amenities: ["Pool", "Kitchen Island", "Guest House", "Gym"]
  },
  {
    id: "2",
    title: "Luxury Contemporary in Garden Hills",
    price: 1895000,
    location: "Virginia-Highland",
    address: "861 Greenwood Ave NE, Atlanta, GA 30306",
    beds: 5,
    baths: 6,
    sqft: 4200,
    image: "https://picsum.photos/id/1016/800/600",
    status: "Active",
    lat: 33.7789,
    lng: -84.3732,
    amenities: ["Kitchen Island", "Balcony", "Laundry Room"]
  },
  {
    id: "3",
    title: "Estate on the Chattahoochee",
    price: 6450000,
    location: "Buckhead",
    address: "1180 Tuxedo Park NW, Atlanta, GA 30327",
    beds: 6,
    baths: 7,
    sqft: 11200,
    image: "https://picsum.photos/id/201/800/600",
    status: "New",
    lat: 33.8105,
    lng: -84.3891,
    amenities: ["Pool", "Guest House", "Basement"]
  },
  {
    id: "4",
    title: "Modern Mansion in Alpharetta",
    price: 2850000,
    location: "Alpharetta",
    address: "9525 Colonnade Trail, Alpharetta, GA 30022",
    beds: 6,
    baths: 7,
    sqft: 9200,
    image: "https://picsum.photos/id/251/800/600",
    status: "Active",
    lat: 34.0702,
    lng: -84.2945,
    amenities: ["Pool", "Kitchen Island", "Smart Home"]
  },
  {
    id: "5",
    title: "Historic Renovation in Milton",
    price: 1795000,
    location: "Milton",
    address: "15555 Birmingham Hwy, Milton, GA 30004",
    beds: 5,
    baths: 5,
    sqft: 6800,
    image: "https://picsum.photos/id/301/800/600",
    status: "Active",
    lat: 34.1321,
    lng: -84.3668,
    amenities: ["Guest House", "Laundry Room", "Balcony"]
  },
  {
    id: "6",
    title: "Sandy Springs Contemporary",
    price: 1245000,
    location: "Sandy Springs",
    address: "1234 Glenridge Ave, Sandy Springs, GA 30328",
    beds: 4,
    baths: 5,
    sqft: 5100,
    image: "https://picsum.photos/id/401/800/600",
    status: "Active",
    lat: 33.9245,
    lng: -84.3789,
    amenities: ["Kitchen Island", "Pool"]
  }
];

export default properties;
