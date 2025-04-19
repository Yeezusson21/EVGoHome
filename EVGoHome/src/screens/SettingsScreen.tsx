import React, { useContext, useState } from 'react';
import { CarContext, Car } from '../context/CarContext';
import { useTheme } from '../context/ThemeContext';
import { PlusCircle, Moon, Sun, Trash2, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import CarForm from '../components/car/CarForm';

const SettingsScreen: React.FC = () => {
  const { userCars, deleteCar, selectedCarId, selectCar } = useContext(CarContext);
  const { theme, toggleTheme } = useTheme();
  
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const isDark = theme === 'dark';
  
  return (
    <div className={`min-h-screen pb-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className={`py-4 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
      
      <div className="max-w-md mx-auto p-4 space-y-8">
        {/* Your Cars Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Your Vehicles</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAddCarForm(true)}
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Add Car
            </Button>
          </div>
          
          {userCars.length === 0 ? (
            <div className={`p-6 rounded-lg text-center ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <p className="mb-4">You haven't added any vehicles yet</p>
              <Button 
                onClick={() => setShowAddCarForm(true)}
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                Add Your First Vehicle
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {userCars.map(car => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  onDelete={() => deleteCar(car.id)} 
                  isSelected={car.id === selectedCarId}
                  onSelect={() => selectCar(car.id)}
                />
              ))}
            </div>
          )}
          
          {showAddCarForm && (
            <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Vehicle</h3>
                <button 
                  onClick={() => setShowAddCarForm(false)}
                  className={`p-1 rounded-full ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <CarForm 
                onSubmitted={() => setShowAddCarForm(false)} 
              />
            </div>
          )}
        </section>
        
        {/* Theme Toggle Section */}
        <section>
          <h2 className="text-lg font-bold mb-4">Appearance</h2>
          
          <div className={`rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className={`flex items-center justify-between p-4 ${
              isDark ? 'border-b border-gray-700' : 'border-b border-gray-200'
            }`}>
              <div className="flex items-center">
                {isDark ? (
                  <Moon className="mr-3 text-blue-400 w-5 h-5" />
                ) : (
                  <Sun className="mr-3 text-yellow-500 w-5 h-5" />
                )}
                <span>Dark Mode</span>
              </div>
              
              <div 
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  isDark ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    isDark ? 'left-7' : 'left-1'
                  }`} 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Security Section (mock) */}
        <section>
          <h2 className="text-lg font-bold mb-4">Security</h2>
          
          <div className={`rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className={`flex items-center justify-between p-4`}>
              <span>Two-Factor Authentication</span>
              
              <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors bg-gray-300`}>
                <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white" />
              </div>
            </div>
          </div>
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            (Non-functional in this demo)
          </p>
        </section>
        
        {/* Account Section */}
        <section>
          <h2 className="text-lg font-bold mb-4">Account</h2>
          
          <div className="space-y-3">
            <button className={`w-full text-left p-4 rounded-lg ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}>
              Edit Profile
            </button>
            
            <button className={`w-full text-left p-4 rounded-lg ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}>
              Privacy Settings
            </button>
            
            <button className={`w-full text-left p-4 rounded-lg ${
              isDark ? 'bg-gray-800 hover:bg-gray-700 text-red-400' : 'bg-gray-100 hover:bg-gray-200 text-red-600'
            } transition-colors`}>
              Sign Out
            </button>
          </div>
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            (Non-functional in this demo)
          </p>
        </section>
        
        {/* App Info */}
        <section className="text-center">
          <h2 className="text-sm font-semibold">PlugSpot v0.1.0</h2>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2025 PlugSpot Inc.
          </p>
        </section>
      </div>
    </div>
  );
};

// Car Card Component
interface CarCardProps {
  car: Car;
  onDelete: () => void;
  isSelected: boolean;
  onSelect: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onDelete, isSelected, onSelect }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className={`rounded-lg p-4 ${
      isSelected
        ? isDark ? 'bg-green-900 border border-green-700' : 'bg-green-50 border border-green-200'
        : isDark ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      <div className="flex justify-between">
        <div>
          <h3 className={`font-semibold ${
            isSelected ? 'text-green-400' : ''
          }`}>
            {car.year} {car.make} {car.model}
          </h3>
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Added {new Date(car.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex space-x-2">
          {!isSelected && (
            <button 
              onClick={onSelect}
              className={`p-1 rounded-full ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            >
              <Check className="w-5 h-5" />
            </button>
          )}
          
          <button 
            onClick={onDelete}
            className={`p-1 rounded-full ${
              isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-200 text-red-500'
            }`}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;