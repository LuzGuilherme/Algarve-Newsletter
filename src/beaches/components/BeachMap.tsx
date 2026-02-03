import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issue in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface BeachMapProps {
  lat: number;
  lng: number;
  name: string;
  zoom?: number;
}

// Component to fix map container size detection
function InvalidateSize() {
  const map = useMap();
  useEffect(() => {
    // Invalidate immediately
    map.invalidateSize();

    // Also invalidate after a short delay to catch late renders
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // And again after images/fonts load
    const timer2 = setTimeout(() => {
      map.invalidateSize();
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [map]);
  return null;
}

const BeachMap: React.FC<BeachMapProps> = ({ lat, lng, name, zoom = 14 }) => {
  const position: [number, number] = [lat, lng];

  return (
    <>
      <style>{`
        .leaflet-container {
          background: transparent !important;
        }
        .leaflet-container img.leaflet-tile {
          mix-blend-mode: normal !important;
        }
        .leaflet-tile {
          visibility: visible !important;
        }
        .leaflet-tile-container {
          background: transparent !important;
        }
      `}</style>
      <div className="rounded-2xl overflow-hidden h-64 md:h-80 bg-slate-100">
        <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <InvalidateSize />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <strong className="text-lg">{name}</strong>
              <br />
              <span className="text-sm text-slate-500">
                {lat.toFixed(4)}, {lng.toFixed(4)}
              </span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      </div>
    </>
  );
};

export default BeachMap;
