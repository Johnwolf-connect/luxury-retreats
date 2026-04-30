import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import p4 from "@/assets/property-4.jpg";
import p5 from "@/assets/property-5.jpg";
import p6 from "@/assets/property-6.jpg";
import int1 from "@/assets/interior-1.jpg";
import int2 from "@/assets/interior-2.jpg";
import host1 from "@/assets/host-1.jpg";

export type Property = {
  id: string;
  name: string;
  location: string;
  country: string;
  price: number;
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  cover: string;
  gallery: string[];
  description: string;
  amenities: string[];
  host: { name: string; avatar: string; since: string; superhost: boolean };
  coords: { x: number; y: number }; // for stylized map
};

export const properties: Property[] = [
  {
    id: "azure-villa",
    name: "Villa Azure",
    location: "Côte d'Azur",
    country: "France",
    price: 1480,
    rating: 4.97,
    reviews: 142,
    bedrooms: 5,
    bathrooms: 4,
    guests: 10,
    cover: p1,
    gallery: [p1, int1, int2],
    description:
      "A sun-drenched architectural villa carved into the Mediterranean cliffside. Floor-to-ceiling glass opens onto a heated infinity pool with uninterrupted sea views. Designed for slow mornings and long evenings.",
    amenities: ["Infinity pool", "Private chef", "Wine cellar", "Sea view", "Wi-Fi", "Air conditioning", "Fireplace", "Parking"],
    host: { name: "Camille Laurent", avatar: host1, since: "2017", superhost: true },
    coords: { x: 58, y: 42 },
  },
  {
    id: "alpine-retreat",
    name: "Alpine Retreat",
    location: "Zermatt",
    country: "Switzerland",
    price: 2150,
    rating: 4.95,
    reviews: 98,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    cover: p2,
    gallery: [p2, int1, int2],
    description:
      "A timber-and-stone chalet hidden in a private alpine valley. Wake to fresh powder, ski out the door, and return to a crackling fireplace and a steaming cedar sauna.",
    amenities: ["Sauna", "Hot tub", "Ski-in/Ski-out", "Fireplace", "Heated floors", "Wi-Fi", "Mountain view", "EV charger"],
    host: { name: "Camille Laurent", avatar: host1, since: "2017", superhost: true },
    coords: { x: 52, y: 38 },
  },
  {
    id: "tuscan-estate",
    name: "Casa del Sole",
    location: "Val d'Orcia",
    country: "Italy",
    price: 980,
    rating: 4.92,
    reviews: 211,
    bedrooms: 6,
    bathrooms: 5,
    guests: 12,
    cover: p3,
    gallery: [p3, int1, int2],
    description:
      "A 17th-century stone estate set among olive groves and vineyards. Long terracotta terraces, a saltwater pool, and a private cellar of estate-bottled Brunello.",
    amenities: ["Vineyard", "Saltwater pool", "Outdoor kitchen", "Wi-Fi", "Pet friendly", "Garden", "Parking", "Fireplace"],
    host: { name: "Camille Laurent", avatar: host1, since: "2017", superhost: true },
    coords: { x: 56, y: 46 },
  },
  {
    id: "desert-haus",
    name: "Mojave Haus",
    location: "Joshua Tree",
    country: "United States",
    price: 720,
    rating: 4.89,
    reviews: 176,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    cover: p4,
    gallery: [p4, int2, int1],
    description:
      "A board-formed concrete sanctuary in the high desert. Sunken lounge, dark-sky stargazing deck, and a quiet pool that mirrors the Joshua trees at dusk.",
    amenities: ["Pool", "Stargazing deck", "Sound system", "Wi-Fi", "Air conditioning", "Outdoor shower", "Fire pit", "Parking"],
    host: { name: "Camille Laurent", avatar: host1, since: "2017", superhost: true },
    coords: { x: 18, y: 50 },
  },
  {
    id: "atoll-bungalow",
    name: "Atoll Bungalow",
    location: "North Malé",
    country: "Maldives",
    price: 1890,
    rating: 4.99,
    reviews: 87,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    cover: p5,
    gallery: [p5, int2, int1],
    description:
      "A private overwater pavilion with a glass-floor lounge and direct lagoon access. Daily housekeeping, a personal butler, and dinners served on your sundeck.",
    amenities: ["Private deck", "Butler", "Snorkeling", "Wi-Fi", "Air conditioning", "Glass floor", "Outdoor shower", "Boat transfer"],
    host: { name: "Camille Laurent", avatar: host1, since: "2017", superhost: true },
    coords: { x: 72, y: 60 },
  },
  {
    id: "skyline-loft",
    name: "Skyline Loft",
    location: "Manhattan",
    country: "United States",
    price: 1340,
    rating: 4.91,
    reviews: 264,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    cover: p6,
    gallery: [p6, int1, int2],
    description:
      "A double-height penthouse loft with 270° skyline views. Walnut floors, a baby grand, and a private rooftop terrace overlooking the Empire State.",
    amenities: ["Skyline view", "Rooftop terrace", "Gym", "Wi-Fi", "Air conditioning", "Concierge", "Elevator", "Workspace"],
    host: { name: "Camille Laurent", avatar: host1, since: "2017", superhost: true },
    coords: { x: 28, y: 44 },
  },
];

export const testimonials = [
  {
    name: "Eleanor Whitfield",
    place: "Stayed at Villa Azure",
    quote: "Every detail was considered. The kind of stay you replay in your mind for weeks.",
  },
  {
    name: "Marcus Aldright",
    place: "Stayed at Alpine Retreat",
    quote: "Effortlessly luxurious. We never wanted to leave the fireplace, except for the sauna.",
  },
  {
    name: "Priya Naveen",
    place: "Stayed at Casa del Sole",
    quote: "Sun, stone, and silence. Maison set a new bar for what a holiday can feel like.",
  },
];
