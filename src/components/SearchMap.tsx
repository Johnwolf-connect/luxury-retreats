import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo } from "react";
import type { Property } from "@/data/properties";

const fmtPin = (p: Property) =>
  p.listingType === "Rent"
    ? `$${(p.price / 1000).toFixed(1)}k`
    : p.price >= 1_000_000
    ? `$${(p.price / 1_000_000).toFixed(p.price % 1_000_000 === 0 ? 0 : 1)}M`
    : `$${Math.round(p.price / 1000)}K`;

const makeIcon = (label: string, active: boolean, hovered: boolean) => {
  const bg = active ? "hsl(35 65% 58%)" : "hsl(24 12% 8%)";
  const color = active ? "hsl(24 20% 10%)" : "hsl(36 30% 92%)";
  const ring = active ? "hsl(35 65% 58%)" : "hsl(35 65% 58% / 0.6)";
  const scale = hovered ? 1.12 : 1;
  return L.divIcon({
    className: "",
    html: `<div style="
      transform: scale(${scale});
      transform-origin: center bottom;
      transition: transform .25s cubic-bezier(.22,1,.36,1);
      background:${bg};
      color:${color};
      border:1.5px solid ${ring};
      padding:6px 12px;
      border-radius:9999px;
      font-family:Inter,sans-serif;
      font-weight:600;
      font-size:12px;
      letter-spacing:.02em;
      white-space:nowrap;
      box-shadow:0 6px 18px hsl(0 0% 0% / 0.45);
      ">${label}</div>`,
    iconSize: [60, 28],
    iconAnchor: [30, 14],
  });
};

const FitBounds = ({ properties }: { properties: Property[] }) => {
  const map = useMap();
  useEffect(() => {
    if (!properties.length) return;
    const bounds = L.latLngBounds(properties.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 });
  }, [properties, map]);
  return null;
};

const Flyer = ({ property }: { property: Property | null }) => {
  const map = useMap();
  useEffect(() => {
    if (property) map.flyTo([property.lat, property.lng], Math.max(map.getZoom(), 13), { duration: 0.7 });
  }, [property, map]);
  return null;
};

const SearchMap = ({
  properties,
  activeId,
  hoverId,
  onSelect,
  onHover,
}: {
  properties: Property[];
  activeId: string | null;
  hoverId: string | null;
  onSelect: (p: Property) => void;
  onHover: (id: string | null) => void;
}) => {
  const center: [number, number] = [33.815, -84.36]; // Atlanta metro
  const active = useMemo(() => properties.find((p) => p.id === activeId) || null, [activeId, properties]);

  useEffect(() => {
    setTimeout(() => window.dispatchEvent(new Event("resize")), 200);
  }, []);

  return (
    <MapContainer center={center} zoom={11} scrollWheelZoom className="h-full w-full">
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      <FitBounds properties={properties} />
      <Flyer property={active} />
      {properties.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={makeIcon(fmtPin(p), p.id === activeId, p.id === hoverId)}
          eventHandlers={{
            click: () => onSelect(p),
            mouseover: () => onHover(p.id),
            mouseout: () => onHover(null),
          }}
        />
      ))}
    </MapContainer>
  );
};

export default SearchMap;
