import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Hospital } from '@/data/mockData';

// Fix default icon paths for Vite builds
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export type LatLng = { lat: number; lng: number };

interface HospitalMapProps {
  hospitals: Pick<Hospital, 'id' | 'name' | 'lat' | 'lng' | 'city' | 'location' | 'rating'>[];
  userPosition?: LatLng | null;
  className?: string;
}

const FitBounds: React.FC<{
  points: LatLng[];
  fallbackCenter: LatLng;
}> = ({ points, fallbackCenter }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (points.length === 0) {
      map.setView([fallbackCenter.lat, fallbackCenter.lng], 3); // world view
      return;
    }

    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 13);
      return;
    }

    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds.pad(0.25));
  }, [map, points, fallbackCenter]);

  return null;
};

const AnyMapContainer = MapContainer as unknown as React.ComponentType<any>;

const HospitalMap: React.FC<HospitalMapProps> = ({ hospitals, userPosition, className }) => {
  const points = useMemo(() => {
    const arr: LatLng[] = hospitals.map((h) => ({ lat: h.lat, lng: h.lng }));
    if (userPosition) arr.push(userPosition);
    return arr;
  }, [hospitals, userPosition]);

  const fallbackCenter = userPosition ?? hospitals[0] ?? { lat: 20, lng: 0 };
  const center: LatLng = 'lat' in fallbackCenter ? (fallbackCenter as any) : { lat: 20, lng: 0 };

  return (
    <div className={className ?? 'h-96'}>
      <AnyMapContainer
        center={[center.lat, center.lng]}
        zoom={5}
        minZoom={2}
        style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          {...({ attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors" } as any)}
        />

        {/* Adjust view to include all markers */}
        <FitBounds points={points} fallbackCenter={center} />

        {userPosition && (
          <Marker position={[userPosition.lat, userPosition.lng]}>
            <Popup>
              <div>
                <strong>Your location</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {hospitals.map((h) => (
          <Marker key={h.id} position={[h.lat, h.lng]}>
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">{h.name}</div>
                <div className="text-sm text-gray-600">{h.location}, {h.city}</div>
                <div className="text-sm">Rating: {h.rating} ⭐</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </AnyMapContainer>
    </div>
  );
};

export default HospitalMap;
