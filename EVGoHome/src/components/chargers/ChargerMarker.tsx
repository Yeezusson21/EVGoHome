import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Charger } from '../../context/ChargerContext';
import { Zap, Battery } from 'lucide-react';

interface ChargerMarkerProps {
  charger: Charger;
  onClick: () => void;
  isCompatible: boolean;
}

// Create custom marker icons for different charger types
const createMarkerIcon = (speed: 'FAST' | 'SLOW', status: 'ONLINE' | 'OFFLINE', isCompatible: boolean) => {
  // Colors
  const backgroundColor = isCompatible 
    ? status === 'ONLINE' ? '#10B981' : '#EF4444'
    : status === 'ONLINE' ? '#3B82F6' : '#71717A';
  
  // Create an SVG icon as a data URI
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
      <path fill="${backgroundColor}" d="M15 2 C21 2, 28 7, 28 15 C28 24, 15 38, 15 38 C15 38, 2 24, 2 15 C2 7, 9 2, 15 2 Z" />
      <circle cx="15" cy="15" r="9" fill="white" />
      ${speed === 'FAST' 
        ? '<path fill="' + backgroundColor + '" d="M12 8 L18 15 L15 15 L15 22 L9 15 L12 15 Z" />'
        : '<path fill="' + backgroundColor + '" d="M11 10 L19 10 L19 12 L11 12 Z M11 14 L19 14 L19 16 L11 16 Z M11 18 L19 18 L19 20 L11 20 Z" />'
      }
    </svg>
  `;
  
  // Convert SVG to data URL
  const svgURL = 'data:image/svg+xml;base64,' + btoa(svgIcon);
  
  return new L.Icon({
    iconUrl: svgURL,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -35],
  });
};

const ChargerMarker: React.FC<ChargerMarkerProps> = ({ charger, onClick, isCompatible }) => {
  const icon = createMarkerIcon(charger.speed, charger.status, isCompatible);
  
  return (
    <Marker 
      position={[charger.latitude, charger.longitude]} 
      icon={icon}
      eventHandlers={{
        click: onClick
      }}
    >
      <Popup>
        <div className="text-center">
          <h3 className="font-bold text-md">{charger.name}</h3>
          <div className="flex items-center justify-center mt-1">
            {charger.speed === 'FAST' ? (
              <Zap className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <Battery className="w-4 h-4 text-blue-500 mr-1" />
            )}
            <span className="text-sm">
              {charger.speed === 'FAST' ? 'Fast Charger' : 'Slow Charger'}
            </span>
          </div>
          <div className="text-sm mt-1">
            {charger.status === 'ONLINE' ? (
              <span className="text-green-600">● Online</span>
            ) : (
              <span className="text-red-600">● Offline</span>
            )}
          </div>
          <div className="text-sm mt-1">
            {isCompatible ? (
              <span className="text-green-600">Compatible</span>
            ) : (
              <span className="text-gray-500">Not compatible</span>
            )}
          </div>
          <button 
            className="mt-2 px-3 py-1 bg-green-600 text-white rounded-md text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default ChargerMarker;