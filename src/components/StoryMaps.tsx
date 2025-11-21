"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for missing default Leaflet icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface StoryMapProps {
  route?: { lat: number; lng: number; label?: string }[];
}

export default function StoryMap({ route }: StoryMapProps) {
  const path =
    route && route.length > 0
      ? route
      : [
          { lat: 45.4375, lng: -75.689, label: "Start - Ottawa" },
          { lat: 45.5, lng: -75.8, label: "Checkpoint" },
          { lat: 45.45, lng: -75.7, label: "End Point" },
        ];

  useEffect(() => {
    const mapContainer = document.querySelector(".leaflet-container");
    if (mapContainer) mapContainer.classList.add("rounded-xl", "shadow-md");
  }, []);

  return (
    <div className="w-full h-[400px] mt-4">
      <MapContainer
        center={[path[0].lat, path[0].lng]}
        zoom={10}
        scrollWheelZoom={false}
        className="h-full w-full rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={path.map((p) => [p.lat, p.lng])} color="green" />
        {path.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>{p.label || `Point ${i + 1}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
