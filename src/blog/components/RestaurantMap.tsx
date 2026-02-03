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

// Custom red icon for highlighting specific markers
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom orange icon for secondary markers
const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export interface Restaurant {
  name: string;
  lat: number;
  lng: number;
  address: string;
  rating?: string;
  specialty?: string;
  region?: string;
}

interface RestaurantMapProps {
  restaurants: Restaurant[];
  zoom?: number;
  center?: [number, number];
}

// Component to fix map container size detection and fit bounds
function FitBounds({ restaurants }: { restaurants: Restaurant[] }) {
  const map = useMap();

  useEffect(() => {
    // Invalidate size immediately
    map.invalidateSize();

    // Also invalidate after a short delay to catch late renders
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Fit bounds to show all markers
    if (restaurants.length > 0) {
      const bounds = L.latLngBounds(
        restaurants.map(r => [r.lat, r.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    // And again after images/fonts load
    const timer2 = setTimeout(() => {
      map.invalidateSize();
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [map, restaurants]);

  return null;
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({
  restaurants,
  zoom = 11,
  center
}) => {
  // Calculate center from restaurants if not provided
  const mapCenter: [number, number] = center || (
    restaurants.length > 0
      ? [
          restaurants.reduce((sum, r) => sum + r.lat, 0) / restaurants.length,
          restaurants.reduce((sum, r) => sum + r.lng, 0) / restaurants.length,
        ]
      : [37.1, -8.25] // Default to Algarve area
  );

  // Get icon based on region
  const getMarkerIcon = (restaurant: Restaurant) => {
    if (restaurant.region === 'guia') {
      return redIcon;
    }
    return orangeIcon;
  };

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
        .restaurant-popup {
          min-width: 200px;
        }
        .restaurant-popup h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .restaurant-popup p {
          font-size: 0.875rem;
          color: #475569;
          margin: 0.25rem 0;
        }
        .restaurant-popup .rating {
          color: #f59e0b;
          font-weight: 600;
        }
        .restaurant-popup .specialty {
          color: #0891b2;
          font-style: italic;
        }
        .restaurant-popup .directions-link {
          display: inline-block;
          margin-top: 0.5rem;
          color: #0891b2;
          font-weight: 600;
          text-decoration: none;
        }
        .restaurant-popup .directions-link:hover {
          text-decoration: underline;
        }
      `}</style>
      <div className="rounded-2xl overflow-hidden h-80 md:h-96 bg-slate-100 my-8">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <FitBounds restaurants={restaurants} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              position={[restaurant.lat, restaurant.lng]}
              icon={getMarkerIcon(restaurant)}
            >
              <Popup>
                <div className="restaurant-popup">
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.address}</p>
                  {restaurant.rating && (
                    <p className="rating">⭐ {restaurant.rating}</p>
                  )}
                  {restaurant.specialty && (
                    <p className="specialty">{restaurant.specialty}</p>
                  )}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directions-link"
                  >
                    Get Directions →
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <p className="text-sm text-slate-500 text-center mb-6">
        <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span> Guia restaurants
        <span className="mx-3">|</span>
        <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-1"></span> Other locations
      </p>
    </>
  );
};

export default RestaurantMap;
