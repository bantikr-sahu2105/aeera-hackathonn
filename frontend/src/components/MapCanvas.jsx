import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fastestRoute, healthiestRoute } from '../data/mockRoutes';
import L from 'leaflet';

// 🚨 CRUCIAL LEAFLET FIX: This prevents the map markers from showing up as broken images
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapCanvas({ isHealthySelected }) {
  // We determine which route to show based on the slider state
  const activeRoute = isHealthySelected ? healthiestRoute : fastestRoute;
  const routeColor = isHealthySelected ? '#10B981' : '#EF4444'; // Emerald Green vs Red

  return (
    <div className="w-full h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 z-0 relative">
      <MapContainer 
        center={[22.5650, 88.3800]} // Centered between Salt Lake and Park Street
        zoom={13.5} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        {/* Dark Theme Base Map */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* The Route Line */}
        <Polyline 
          positions={activeRoute} 
          color={routeColor} 
          weight={6} 
          opacity={0.8} 
        />

        {/* Start and End Markers */}
        <Marker position={fastestRoute[0]}>
          <Popup>Start: Salt Lake</Popup>
        </Marker>
        <Marker position={fastestRoute[fastestRoute.length - 1]}>
          <Popup>End: Park Street</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}