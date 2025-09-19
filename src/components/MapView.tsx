// src/components/MapView.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface Tourist {
  id: string;
  name: string;
  lastSeen: string;
  location: [number, number];
  riskScore: number;
}

// Dynamically import the heatmap layer to avoid SSR issues
const HeatmapLayer = dynamic(() => import('react-leaflet-heatmap-layer'), { ssr: false });

export default function MapView({ tourists, center }: { tourists: Tourist[]; center?: LatLngExpression }) {
  const defaultCenter: LatLngExpression = center ?? [20.5937, 78.9629]; // India centroid
  const [map, setMap] = useState<L.Map | null>(null);

  // Create heatmap dataset [lat, lng, intensity]
  const heatPoints = useMemo(
    () =>
      tourists.map((t) => [
        t.location[0],
        t.location[1],
        Math.max(0.2, Math.min(1, t.riskScore)),
      ]) as [number, number, number][],
    [tourists]
  );

  // Fix default marker icon path for Leaflet in Next.js (client-only)
  useEffect(() => {
    let mounted = true;
    (async () => {
      const L = (await import('leaflet')).default;
      if (!mounted) return;
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Add/remove heat layer when map and points are ready
  useEffect(() => {
    if (!map || heatPoints.length === 0) return;
    let heat: any | null = null;
    let isCancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet.heat');
      if (isCancelled) return;
      heat = L.heatLayer(heatPoints, { radius: 25, blur: 15, maxZoom: 17 });
      heat.addTo(map);
    })();
    return () => {
      isCancelled = true;
      if (map && heat) {
        map.removeLayer(heat);
      }
    };
  }, [map, heatPoints]);

  return (
    <div className="w-full h-[520px] rounded-md overflow-hidden border border-black/10 dark:border-white/15">
      <MapContainer whenCreated={setMap} center={defaultCenter} zoom={6} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {tourists.map((t) => (
          <Marker key={t.id} position={[t.location[0], t.location[1]]}>
            <Popup>
              <div className="text-sm">
                <div className="font-medium">{t.name}</div>
                <div className="opacity-70">Last seen: {new Date(t.lastSeen).toLocaleString()}</div>
                <div className="opacity-70">Risk: {t.riskScore.toFixed(2)}</div>
              </div>
            </Popup>
          </Marker>
        ))}
        <HeatmapLayer points={heatPoints} />
      </MapContainer>
    </div>
  );
}
