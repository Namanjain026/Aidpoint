import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { MapContainerProps } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Hospital } from '@/data/mockData';
import { MapPin, Hospital as HospitalIcon } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

// Fix default icon paths for Vite builds
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Create custom hospital marker icon
const createHospitalIcon = () => {
  const html = ReactDOMServer.renderToString(
    <div className="flex items-center justify-center">
      <HospitalIcon size={20} className="text-red-600" />
    </div>
  );
  return L.divIcon({
    html,
    className: 'custom-hospital-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Create custom user location marker icon
const createUserIcon = () => {
  const html = ReactDOMServer.renderToString(
    <div className="flex items-center justify-center">
      <MapPin size={20} className="text-blue-600" />
    </div>
  );
  return L.divIcon({
    html,
    className: 'custom-user-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

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

  const center: LatLng = userPosition
    ? userPosition
    : hospitals[0]
    ? { lat: hospitals[0].lat, lng: hospitals[0].lng }
    : { lat: 20, lng: 0 };

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
          <Marker position={[userPosition.lat, userPosition.lng]} eventHandlers={{ add: (e) => { e.target.setIcon(createUserIcon()); } }}>
            <Popup>
              <div>
                <strong>Your location</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {hospitals.map((h) => (
          <Marker key={h.id} position={[h.lat, h.lng]} eventHandlers={{ add: (e) => { e.target.setIcon(createHospitalIcon()); } }}>
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
