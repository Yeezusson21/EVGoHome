import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChargerContext, ChargerSpeed } from '../context/ChargerContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import { MapPin, Zap, Battery } from 'lucide-react';

const MOCK_CAR_MODELS = [
  'Tesla Model 3',
  'Tesla Model Y',
  'Tesla Model S',
  'Tesla Model X',
  'Nissan Leaf',
  'Chevy Bolt',
  'Ford Mustang Mach-E',
  'Hyundai Kona',
  'Kia EV6',
  'Volkswagen ID.4',
  'Audi e-tron',
  'BMW i4',
  'Rivian R1T',
];

const AddChargerScreen: React.FC = () => {
  const { addCharger } = useContext(ChargerContext);
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: 37.7749,  // Default to San Francisco
    longitude: -122.4194,
    speed: 'FAST' as ChargerSpeed,
    price: 0,
    priceType: 'hourly' as ('hourly' | 'flat'),
    status: 'ONLINE' as ('ONLINE' | 'OFFLINE'),
    compatibleWith: [] as string[],
  });
  
  const [touched, setTouched] = useState({
    name: false,
    address: false,
    compatibleWith: false,
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (name === 'price') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  const handleCheckboxChange = (model: string) => {
    setFormData(prev => {
      const compatibleWith = [...prev.compatibleWith];
      
      if (compatibleWith.includes(model)) {
        return {
          ...prev,
          compatibleWith: compatibleWith.filter(m => m !== model),
        };
      } else {
        return {
          ...prev,
          compatibleWith: [...compatibleWith, model],
        };
      }
    });
    
    setTouched(prev => ({ ...prev, compatibleWith: true }));
  };
  
  const handleToggleStatus = () => {
    setFormData(prev => ({
      ...prev,
      status: prev.status === 'ONLINE' ? 'OFFLINE' : 'ONLINE',
    }));
  };
  
  const handleSpeedToggle = () => {
    setFormData(prev => ({
      ...prev,
      speed: prev.speed === 'FAST' ? 'SLOW' : 'FAST',
    }));
  };
  
  const handlePriceTypeToggle = () => {
    setFormData(prev => ({
      ...prev,
      priceType: prev.priceType === 'hourly' ? 'flat' : 'hourly',
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    setTouched({
      name: true,
      address: true,
      compatibleWith: true,
    });
    
    // Validate
    if (!formData.name || !formData.address || formData.compatibleWith.length === 0) {
      return;
    }
    
    // Add charger
    addCharger(formData);
    
    // Navigate back to map
    navigate('/map');
  };
  
  const isDark = theme === 'dark';
  
  const inputClasses = `w-full px-4 py-2 rounded-lg border ${
    isDark 
      ? 'bg-gray-800 border-gray-700 text-white' 
      : 'bg-white border-gray-300 text-gray-900'
  } focus:outline-none focus:ring-2 focus:ring-green-500`;
  
  const labelClasses = `block mb-2 font-medium ${
    isDark ? 'text-gray-200' : 'text-gray-700'
  }`;
  
  const errorClasses = 'text-red-500 text-sm mt-1';
  
  return (
    <div className={`min-h-screen pb-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className={`py-4 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <h1 className="text-xl font-bold">Add a Charger</h1>
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          Share your EV charger with other PlugSpot users
        </p>
      </div>
      
      <div className="max-w-md mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Charger name */}
          <div>
            <label htmlFor="name" className={labelClasses}>Charger Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Home Tesla Charger"
              className={inputClasses}
              required
            />
            {touched.name && !formData.name && (
              <p className={errorClasses}>Charger name is required</p>
            )}
          </div>
          
          {/* Address */}
          <div>
            <label htmlFor="address" className={labelClasses}>Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full address of the charger"
              className={`${inputClasses} h-20`}
              required
            />
            {touched.address && !formData.address && (
              <p className={errorClasses}>Address is required</p>
            )}
          </div>
          
          {/* Location (simplified for demo) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className={labelClasses}>Latitude</label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                step="0.0001"
                className={inputClasses}
              />
            </div>
            
            <div>
              <label htmlFor="longitude" className={labelClasses}>Longitude</label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                step="0.0001"
                className={inputClasses}
              />
            </div>
          </div>
          
          {/* Mock map preview */}
          <div className={`h-40 rounded-lg relative overflow-hidden flex items-center justify-center mb-2 ${
            isDark ? 'bg-gray-800' : 'bg-gray-200'
          }`}>
            <MapPin className="w-8 h-8 text-green-500" />
            <div className={`absolute bottom-0 left-0 right-0 text-center py-2 ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            }`}>
              <span className="text-sm">Map preview (mock)</span>
            </div>
          </div>
          
          {/* Charger speed toggle */}
          <div>
            <label className={labelClasses}>Charger Speed</label>
            <div className="flex">
              <button
                type="button"
                onClick={handleSpeedToggle}
                className={`flex-1 py-3 px-4 rounded-l-lg flex items-center justify-center ${
                  formData.speed === 'FAST'
                    ? isDark ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'
                    : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <Zap className="w-5 h-5 mr-2" />
                Fast
              </button>
              
              <button
                type="button"
                onClick={handleSpeedToggle}
                className={`flex-1 py-3 px-4 rounded-r-lg flex items-center justify-center ${
                  formData.speed === 'SLOW'
                    ? isDark ? 'bg-yellow-700 text-white' : 'bg-yellow-600 text-white'
                    : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <Battery className="w-5 h-5 mr-2" />
                Slow
              </button>
            </div>
          </div>
          
          {/* Price */}
          <div>
            <label htmlFor="price" className={labelClasses}>Price (USD)</label>
            <div className="flex">
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`${inputClasses} rounded-r-none`}
              />
              
              <button
                type="button"
                onClick={handlePriceTypeToggle}
                className={`px-4 rounded-r-lg flex items-center ${
                  isDark ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-200 text-gray-800 border border-gray-300'
                }`}
              >
                {formData.priceType === 'hourly' ? 'per hour' : 'flat fee'}
              </button>
            </div>
          </div>
          
          {/* Status toggle */}
          <div>
            <label className={`flex items-center justify-between ${labelClasses}`}>
              <span>Status</span>
              <div 
                onClick={handleToggleStatus}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  formData.status === 'ONLINE'
                    ? 'bg-green-600'
                    : isDark ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    formData.status === 'ONLINE' ? 'left-7' : 'left-1'
                  }`} 
                />
              </div>
            </label>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {formData.status === 'ONLINE' ? 'Charger will be visible and available' : 'Charger will be marked as offline'}
            </p>
          </div>
          
          {/* Compatible models */}
          <div>
            <label className={labelClasses}>Compatible With</label>
            <div className={`p-3 border rounded-lg grid grid-cols-2 gap-2 ${
              isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'
            }`}>
              {MOCK_CAR_MODELS.map(model => (
                <label key={model} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.compatibleWith.includes(model)}
                    onChange={() => handleCheckboxChange(model)}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm">{model}</span>
                </label>
              ))}
            </div>
            {touched.compatibleWith && formData.compatibleWith.length === 0 && (
              <p className={errorClasses}>Select at least one compatible model</p>
            )}
          </div>
          
          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" fullWidth>
              Add Charger
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChargerScreen;