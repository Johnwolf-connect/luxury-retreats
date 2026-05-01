import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import type { Property } from "@/data/properties";

// Fix default marker icons (Vite bundling)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = L.divIcon({
  className: "",
  html: `<div style="width:36px;height:36px;border-radius:9999px;background:hsl(35 65% 58%);box-shadow:0 0 0 4px hsl(35 65% 58% / 0.25), 0 6px 20px hsl(0 0% 0% / 0.4);display:flex;align-items:center;justify-content:center;color:hsl(24 20% 10%);font-weight:600;font-size:14px;border:2px solid hsl(24 12% 8%);">★</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const PropertyMap = ({ property }: { property: Property }) => {
  useEffect(() => {
    // Force resize after mount in case the container had no size yet
    setTimeout(() => window.dispatchEvent(new Event("resize")), 200);
  }, []);

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-sm border border-border/60">
      <MapContainer
        center={[property.lat, property.lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker
          center={[property.lat, property.lng]}
          radius={60}
          pathOptions={{ color: "hsl(35 65% 58%)", fillColor: "hsl(35 65% 58%)", fillOpacity: 0.08, weight: 1 }}
        />
        <Marker position={[property.lat, property.lng]} icon={customIcon}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong style={{ fontSize: 14 }}>{property.name}</strong>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
                {property.location}, {property.country}
              </div>
              <a
                href={`https://www.openstreetmap.org/directions?to=${property.lat},${property.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "hsl(35 65% 58%)",
                }}
              >
                Get directions →
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
