// Static map URL builder using OpenStreetMap's static map service

interface MapMarker {
  lat: number;
  lng: number;
  label?: string;
}

/**
 * Build a static map URL from OpenStreetMap's static map service.
 * Uses staticmap.openstreetmap.de which accepts marker parameters.
 */
export function buildStaticMapUrl(
  markers: MapMarker[],
  width: number = 600,
  height: number = 300,
  zoom?: number,
): string {
  const baseUrl = 'https://staticmap.openstreetmap.de/staticmap.php';

  // Calculate center from markers
  const centerLat = markers.reduce((sum, m) => sum + m.lat, 0) / markers.length;
  const centerLng = markers.reduce((sum, m) => sum + m.lng, 0) / markers.length;

  // Auto-calculate zoom if not provided, based on marker spread
  if (!zoom) {
    const latSpread = Math.max(...markers.map(m => m.lat)) - Math.min(...markers.map(m => m.lat));
    const lngSpread = Math.max(...markers.map(m => m.lng)) - Math.min(...markers.map(m => m.lng));
    const maxSpread = Math.max(latSpread, lngSpread);

    if (maxSpread > 1.5) zoom = 8;
    else if (maxSpread > 0.8) zoom = 9;
    else if (maxSpread > 0.4) zoom = 10;
    else if (maxSpread > 0.2) zoom = 11;
    else zoom = 12;
  }

  // Build marker parameters
  const markerParams = markers
    .map(m => `${m.lat},${m.lng},red-pushpin`)
    .join('|');

  const params = new URLSearchParams({
    center: `${centerLat.toFixed(4)},${centerLng.toFixed(4)}`,
    zoom: String(zoom),
    size: `${width}x${height}`,
    markers: markerParams,
    maptype: 'mapnik',
  });

  return `${baseUrl}?${params.toString()}`;
}
