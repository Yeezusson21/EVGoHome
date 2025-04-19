import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChargerContext, Charger } from '../context/ChargerContext';
import { CarContext } from '../context/CarContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Zap, Battery, MapPin, DollarSign, Check, X } from 'lucide-react';
import Button from '../components/ui/Button';

const ChargerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getChargerById, updateChargerStatus } = useContext(ChargerContext);
  const { getSelectedCar } = useContext(CarContext);
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const [charger, setCharger] = useState<Charger | null>(null);
  const [loading, setLoading] = useState(true);
  
  const selectedCar = getSelectedCar();
  
  useEffect(() => {
    if (id) {
      const chargerData = getChargerById(id);
      if (chargerData) {
        setCharger(chargerData);
      }
      setLoading(false);
    }
  }, [id, getChargerById]);
  
  const handleBack = () => {
    navigate('/map');
  };
  
  const isCompatible = selectedCar && charger?.compatibleWith.some(
    model => model.toLowerCase().includes(selectedCar.model.toLowerCase())
  );
  
  const toggleStatus = () => {
    if (charger && id) {
      const newStatus = charger.status === 'ONLINE' ? 'OFFLINE' : 'ONLINE';
      updateChargerStatus(id, newStatus);
      setCharger({...charger, status: newStatus});
    }
  };
  
  const handleStartCharging = () => {
    // In a real app, this would start a charging session
    alert('Charging session would start now! This would connect to a backend API in a real app.');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (!charger) {
    return (
      <div className={`min-h-screen p-5 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-md mx-auto text-center mt-12">
          <h1 className="text-2xl font-bold mb-4">Charger Not Found</h1>
          <p className="mb-6">Sorry, the charger you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleBack}>
            Back to Map
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen pb-16 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="max-w-md mx-auto px-4 py-3 flex items-center">
          <button 
            onClick={handleBack}
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold ml-2">Charger Details</h1>
        </div>
      </div>
      
      {/* Charger details */}
      <div className="max-w-md mx-auto p-4">
        {/* Charger name */}
        <h2 className="text-2xl font-bold mb-2">{charger.name}</h2>
        
        {/* Status badge */}
        <div className="flex mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            charger.status === 'ONLINE' 
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {charger.status === 'ONLINE' ? '● Online' : '● Offline'}
          </span>
          
          <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
            charger.speed === 'FAST'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {charger.speed === 'FAST' ? 'Fast' : 'Slow'} Charger
          </span>
        </div>
        
        {/* Info card */}
        <div className={`rounded-lg p-4 mb-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          {/* Address */}
          <div className="flex items-start mb-4">
            <MapPin className="w-5 h-5 mr-3 mt-1 text-green-500" />
            <span>{charger.address}</span>
          </div>
          
          {/* Charger speed */}
          <div className="flex items-center mb-4">
            {charger.speed === 'FAST' ? (
              <Zap className="w-5 h-5 mr-3 text-blue-500" />
            ) : (
              <Battery className="w-5 h-5 mr-3 text-yellow-500" />
            )}
            <span>
              {charger.speed === 'FAST' 
                ? 'Fast Charging (50-150 kW)' 
                : 'Standard Charging (3-22 kW)'}
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center mb-4">
            <DollarSign className="w-5 h-5 mr-3 text-green-500" />
            <span>
              ${charger.price} {charger.priceType === 'hourly' ? 'per hour' : 'flat rate'}
            </span>
          </div>
          
          {/* Compatibility */}
          <div className="flex items-center">
            {isCompatible ? (
              <>
                <Check className="w-5 h-5 mr-3 text-green-500" />
                <span>Compatible with your {selectedCar?.make} {selectedCar?.model}</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 mr-3 text-red-500" />
                <span>Not compatible with your vehicle</span>
              </>
            )}
          </div>
        </div>
        
        {/* Compatible with */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Compatible With</h3>
          <div className="flex flex-wrap gap-2">
            {charger.compatibleWith.map((model, index) => (
              <span key={index} className={`px-3 py-1 rounded-full text-sm ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                {model}
              </span>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="space-y-3">
          <Button 
            onClick={handleStartCharging}
            disabled={charger.status !== 'ONLINE' || !isCompatible}
            fullWidth
          >
            Start Charging
          </Button>
          
          {/* Only for demo purposes - would be admin only in real app */}
          <Button 
            variant="outline"
            onClick={toggleStatus}
            fullWidth
          >
            Mark as {charger.status === 'ONLINE' ? 'Offline' : 'Online'}
          </Button>
        </div>
        
        {(charger.status !== 'ONLINE' || !isCompatible) && (
          <p className="mt-2 text-sm text-center text-red-500">
            {!isCompatible ? 'Your vehicle is not compatible with this charger.' : ''}
            {!isCompatible && charger.status !== 'ONLINE' ? ' Additionally, the ' : ''}
            {charger.status !== 'ONLINE' ? 'This charger is currently offline.' : ''}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChargerDetails;