import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { ChargerContext, Charger } from '../context/ChargerContext';
import { CarContext } from '../context/CarContext';
import ChargerMarker from '../components/chargers/ChargerMarker';
import { Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Set center position (San Francisco by default)
const DEFAULT_CENTER: [number, number] = [37.7749, -122.4194];
const DEFAULT_ZOOM = 14;

// Component to update map view when selected location changes
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, DEFAULT_ZOOM);
  }, [center, map]);
  
  return null;
};

const MapScreen: React.FC = () => {
  const { chargers, getCompatibleChargers } = useContext(ChargerContext);
  const { getSelectedCar } = useContext(CarContext);
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // State for filtering and searching
  const [filteredChargers, setFilteredChargers] = useState<Charger[]>(chargers);
  const [showOnlyCompatible, setShowOnlyCompatible] = useState(true);
  const [showOnlyOnline, setShowOnlyOnline] = useState(false);
  const [filterSpeed, setFilterSpeed] = useState<'ALL' | 'FAST' | 'SLOW'>('ALL');
  
  // Get the selected car
  const selectedCar = getSelectedCar();
  
  // Apply filters
  useEffect(() => {
    let result = [...chargers];
    
    // Filter by compatibility
    if (showOnlyCompatible && selectedCar) {
      result = getCompatibleChargers(selectedCar.model);
    }
    
    // Filter by status
    if (showOnlyOnline) {
      result = result.filter(charger => charger.status === 'ONLINE');
    }
    
    // Filter by speed
    if (filterSpeed !== 'ALL') {
      result = result.filter(charger => charger.speed === filterSpeed);
    }
    
    setFilteredChargers(result);
  }, [chargers, showOnlyCompatible, showOnlyOnline, filterSpeed, selectedCar, getCompatibleChargers]);
  
  const handleChargerClick = (id: string) => {
    navigate(`/charger/${id}`);
  };
  
  return (
    <div className="h-screen">
      {/* Filter bar */}
      <div className={`fixed top-0 left-0 right-0 z-10 p-3 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } shadow-md flex items-center space-x-3 overflow-x-auto`}>
        <div className={`px-3 py-1 rounded-full flex items-center ${
          theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
        }`}>
          <Zap className="w-4 h-4 mr-1 text-green-500" />
          <span className="text-sm font-medium whitespace-nowrap">
            {selectedCar ? `${selectedCar.make} ${selectedCar.model}` : 'No car selected'}
          </span>
        </div>
        
        <button
          onClick={() => setShowOnlyCompatible(!showOnlyCompatible)}
          className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
            showOnlyCompatible
              ? 'bg-green-600 text-white'
              : theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
          }`}
        >
          Compatible
        </button>
        
        <button
          onClick={() => setShowOnlyOnline(!showOnlyOnline)}
          className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
            showOnlyOnline
              ? 'bg-green-600 text-white'
              : theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
          }`}
        >
          Online
        </button>
        
        <button
          onClick={() => setFilterSpeed(filterSpeed === 'FAST' ? 'ALL' : 'FAST')}
          className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
            filterSpeed === 'FAST'
              ? 'bg-green-600 text-white'
              : theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
          }`}
        >
          Fast Only
        </button>
      </div>
      
      {/* Map */}
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: '100vh', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={DEFAULT_CENTER} />
        
        {/* Charger markers */}
        {filteredChargers.map(charger => (
          <ChargerMarker
            key={charger.id}
            charger={charger}
            onClick={() => handleChargerClick(charger.id)}
            isCompatible={
              selectedCar 
                ? charger.compatibleWith.some(model => 
                    model.toLowerCase().includes(selectedCar.model.toLowerCase())
                  )
                : false
            }
          />
        ))}
        
        {/* User location marker (mock) */}
        <Marker position={[37.7790, -122.4200]}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
      
      {/* Charger count indicator */}
      <div className={`fixed bottom-20 left-0 right-0 z-10 flex justify-center`}>
        <div className={`px-4 py-2 rounded-full ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } shadow-lg`}>
          <span className="text-sm font-medium">
            {filteredChargers.length} {filteredChargers.length === 1 ? 'charger' : 'chargers'} found
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;