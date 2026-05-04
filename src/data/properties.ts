import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import p4 from "@/assets/property-4.jpg";
import p5 from "@/assets/property-5.jpg";
import p6 from "@/assets/property-6.jpg";
import int1 from "@/assets/interior-1.jpg";
import int2 from "@/assets/interior-2.jpg";
import host1 from "@/assets/host-1.jpg";

export type ListingType = "Sale" | "Rent";

export type Property = {
  id: string;
  name: string;
  location: string; // neighborhood, e.g. "Buckhead"
  country: string; // e.g. "Atlanta, GA"
  price: number; // sale price OR monthly rent
  listingType: ListingType;
  status: "Active" | "Pending" | "New" | "Coming Soon";
  rating: number;
  reviews: number; // repurposed as "days on market"
  bedrooms: number;
  bathrooms: number;
  guests: number; // garage spaces
  sqft: number;
  lotAcres: number;
  yearBuilt: number;
  address: string;
  cover: string;
  gallery: string[];
  description: string;
  amenities: string[];
  host: { name: string; avatar: string; since: string; superhost: boolean };
  coords: { x: number; y: number };
  lat: number;
  lng: number;
  category: "Buckhead" | "Alpharetta" | "Milton" | "Sandy Springs" | "Midtown" | "Virginia-Highland" | "Inman Park";
  propertyType: "Single Family" | "Estate" | "Condo" | "Investment" | "New Construction" | "Townhome";
  schools: { name: string; rating: number; level: string }[];
  nearby: { name: string; distance: string }[];
  investment?: { capRate: number; monthlyRent: number; appreciation: number };
};

const HOST = { name: "Alexandra Whitfield", avatar: host1, since: "2014", superhost: true };

export const properties: Property[] = [
  {
    id: "buckhead-skyline-estate",
    name: "Skyline Estate at Tuxedo Park",
    location: "Buckhead",
    country: "Atlanta, GA",
    price: 6450000,
    listingType: "Sale",
    status: "New",
    rating: 5.0,
    reviews: 4,
    bedrooms: 6,
    bathrooms: 7,
    guests: 4,
    sqft: 11200,
    lotAcres: 1.4,
    yearBuilt: 2024,
    address: "1180 Tuxedo Park NW, Atlanta, GA 30327",
    cover: p1,
    gallery: [p1, int1, int2],
    description:
      "A new-build modern estate set on 1.4 manicured acres in Tuxedo Park, with sweeping views of the Atlanta skyline. Floor-to-ceiling glass, a heated infinity pool, smart-home automation, and a chef's kitchen with dual islands.",
    amenities: ["Infinity pool", "Chef kitchen", "Wine cellar", "Smart home", "Elevator", "4-car garage", "Theater", "Outdoor kitchen"],
    host: HOST,
    coords: { x: 38, y: 48 },
    lat: 33.8651, lng: -84.3858,
    category: "Buckhead",
    propertyType: "Estate",
    schools: [
      { name: "Jackson Primary", rating: 9, level: "Elementary" },
      { name: "Sutton Middle", rating: 8, level: "Middle" },
      { name: "North Atlanta High", rating: 8, level: "High" },
    ],
    nearby: [
      { name: "Phipps Plaza", distance: "6 min drive" },
      { name: "Chastain Park", distance: "4 min drive" },
      { name: "Atlanta History Center", distance: "5 min drive" },
    ],
  },
  {
    id: "alpharetta-manor",
    name: "Manor at Country Club of the South",
    location: "Alpharetta",
    country: "Atlanta, GA",
    price: 4250000,
    listingType: "Sale",
    status: "Active",
    rating: 4.9,
    reviews: 21,
    bedrooms: 7,
    bathrooms: 8,
    guests: 5,
    sqft: 13800,
    lotAcres: 2.1,
    yearBuilt: 2008,
    address: "9525 Colonnade Trail, Alpharetta, GA 30022",
    cover: p2,
    gallery: [p2, int1, int2],
    description:
      "A timeless brick-and-limestone manor inside the gates of Country Club of the South. Grand circular drive, formal gardens, full guest wing, resort pool, and a private golf cart path to the course.",
    amenities: ["Gated community", "Golf access", "Pool & spa", "Wine cellar", "Library", "Guest suite", "5-car garage", "Generator"],
    host: HOST,
    coords: { x: 52, y: 28 },
    lat: 34.0754, lng: -84.2941,
    category: "Alpharetta",
    propertyType: "Estate",
    schools: [
      { name: "Barnwell Elementary", rating: 9, level: "Elementary" },
      { name: "Autrey Mill Middle", rating: 9, level: "Middle" },
      { name: "Johns Creek High", rating: 10, level: "High" },
    ],
    nearby: [
      { name: "Avalon", distance: "12 min drive" },
      { name: "Halcyon", distance: "15 min drive" },
      { name: "GA-400", distance: "5 min drive" },
    ],
  },
  {
    id: "vahi-craftsman",
    name: "Restored 1912 Craftsman",
    location: "Virginia-Highland",
    country: "Atlanta, GA",
    price: 1895000,
    listingType: "Sale",
    status: "Active",
    rating: 4.8,
    reviews: 14,
    bedrooms: 4,
    bathrooms: 4,
    guests: 2,
    sqft: 4200,
    lotAcres: 0.3,
    yearBuilt: 1912,
    address: "861 Greenwood Ave NE, Atlanta, GA 30306",
    cover: p3,
    gallery: [p3, int1, int2],
    description:
      "A meticulously restored Craftsman bungalow on one of Virginia-Highland's most coveted blocks. Original heart-pine floors, deep wraparound porch, chef's kitchen, and a detached carriage house studio.",
    amenities: ["Wraparound porch", "Carriage house", "Chef kitchen", "Original millwork", "Walkable", "Garden", "Fenced yard", "Wine room"],
    host: HOST,
    coords: { x: 42, y: 52 },
    lat: 33.7831, lng: -84.3525,
    category: "Virginia-Highland",
    propertyType: "Single Family",
    schools: [
      { name: "Springdale Park Elem", rating: 10, level: "Elementary" },
      { name: "Inman Middle", rating: 8, level: "Middle" },
      { name: "Midtown High", rating: 7, level: "High" },
    ],
    nearby: [
      { name: "Ponce City Market", distance: "5 min drive" },
      { name: "Piedmont Park", distance: "6 min drive" },
      { name: "BeltLine Eastside Trail", distance: "8 min walk" },
    ],
  },
  {
    id: "milton-equestrian",
    name: "Birmingham Falls Equestrian Estate",
    location: "Milton",
    country: "Atlanta, GA",
    price: 12500,
    listingType: "Rent",
    status: "Active",
    rating: 4.95,
    reviews: 9,
    bedrooms: 5,
    bathrooms: 6,
    guests: 4,
    sqft: 8600,
    lotAcres: 14.2,
    yearBuilt: 2016,
    address: "15555 Birmingham Hwy, Milton, GA 30004",
    cover: p4,
    gallery: [p4, int2, int1],
    description:
      "A 14-acre equestrian estate in Milton's horse country. Modern farmhouse main residence, six-stall barn, riding arena, fenced pastures, and direct access to the Birmingham Falls trail system. Available furnished, long-term lease.",
    amenities: ["14 acres", "Barn & stables", "Riding arena", "Pool", "Guest cottage", "Whole-house generator", "Furnished", "Pet friendly"],
    host: HOST,
    coords: { x: 56, y: 24 },
    lat: 34.1620, lng: -84.3349,
    category: "Milton",
    propertyType: "Investment",
    schools: [
      { name: "Birmingham Falls Elem", rating: 9, level: "Elementary" },
      { name: "Northwestern Middle", rating: 9, level: "Middle" },
      { name: "Cambridge High", rating: 10, level: "High" },
    ],
    nearby: [
      { name: "Crabapple Market", distance: "8 min drive" },
      { name: "Avalon", distance: "20 min drive" },
      { name: "Downtown Alpharetta", distance: "18 min drive" },
    ],
    investment: { capRate: 4.6, monthlyRent: 12500, appreciation: 6.2 },
  },
  {
    id: "midtown-skyhouse",
    name: "SkyHouse Penthouse 4501",
    location: "Midtown",
    country: "Atlanta, GA",
    price: 2150000,
    listingType: "Sale",
    status: "Active",
    rating: 4.85,
    reviews: 32,
    bedrooms: 3,
    bathrooms: 4,
    guests: 2,
    sqft: 3450,
    lotAcres: 0,
    yearBuilt: 2019,
    address: "98 14th St NE, Unit 4501, Atlanta, GA 30309",
    cover: p5,
    gallery: [p5, int1, int2],
    description:
      "A corner penthouse on the 45th floor with 270° views of the Midtown skyline and Piedmont Park. Floor-to-ceiling windows, two private terraces, full-building concierge, and direct elevator entry.",
    amenities: ["Skyline views", "Two terraces", "Concierge", "Valet parking", "Resident pool", "Sky lounge", "Smart home", "Pet friendly"],
    host: HOST,
    coords: { x: 40, y: 50 },
    lat: 33.7851, lng: -84.3819,
    category: "Midtown",
    propertyType: "Condo",
    schools: [
      { name: "Springdale Park Elem", rating: 10, level: "Elementary" },
      { name: "Inman Middle", rating: 8, level: "Middle" },
      { name: "Midtown High", rating: 7, level: "High" },
    ],
    nearby: [
      { name: "Piedmont Park", distance: "3 min walk" },
      { name: "The High Museum", distance: "5 min walk" },
      { name: "MARTA Arts Center", distance: "4 min walk" },
    ],
  },
  {
    id: "sandy-springs-modern",
    name: "Riverside Modern by Glenridge",
    location: "Sandy Springs",
    country: "Atlanta, GA",
    price: 3275000,
    listingType: "Sale",
    status: "Coming Soon",
    rating: 4.92,
    reviews: 2,
    bedrooms: 5,
    bathrooms: 6,
    guests: 3,
    sqft: 7800,
    lotAcres: 0.9,
    yearBuilt: 2025,
    address: "5340 Long Island Dr, Sandy Springs, GA 30327",
    cover: p6,
    gallery: [p6, int2, int1],
    description:
      "A contemporary architectural new-build backing to a private wooded reserve. Glass and cedar volumes, a 60-foot lap pool, in-law suite, and a glass-walled wine display anchoring the great room.",
    amenities: ["Lap pool", "Wine display", "In-law suite", "Smart home", "Solar ready", "EV charging", "Outdoor lounge", "Office wing"],
    host: HOST,
    coords: { x: 36, y: 44 },
    lat: 33.9304, lng: -84.3733,
    category: "Sandy Springs",
    propertyType: "New Construction",
    schools: [
      { name: "Heards Ferry Elem", rating: 10, level: "Elementary" },
      { name: "Ridgeview Charter", rating: 9, level: "Middle" },
      { name: "Riverwood IB High", rating: 9, level: "High" },
    ],
    nearby: [
      { name: "Chattahoochee River NRA", distance: "5 min drive" },
      { name: "City Springs", distance: "8 min drive" },
      { name: "Buckhead", distance: "12 min drive" },
    ],
  },
];

export const testimonials = [
  {
    name: "Eleanor Whitfield",
    place: "Buyer · Buckhead",
    quote: "Alexandra negotiated a price that exceeded our expectations and made the entire close feel effortless. She knows every street north of I-285.",
    rating: 5,
    avatar: host1,
  },
  {
    name: "Marcus Aldright",
    place: "Seller · Alpharetta",
    quote: "Listed Friday, under contract Tuesday — at full ask. The marketing package was the most polished we've seen in twenty years of buying and selling.",
    rating: 5,
    avatar: host1,
  },
  {
    name: "Priya Naveen",
    place: "Investor · Milton",
    quote: "They sourced a turnkey rental off-market and underwrote the cap rate to the dollar. Year one cash flow came in 8% over projection.",
    rating: 5,
    avatar: host1,
  },
  {
    name: "Henrik Sørensen",
    place: "Relocation · Sandy Springs",
    quote: "We moved from Copenhagen sight-unseen. Their team handled schools, lenders, and design — we walked into a finished home on day one.",
    rating: 5,
    avatar: host1,
  },
];
