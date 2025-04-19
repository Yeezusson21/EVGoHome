import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { CarContext } from '../context/CarContext';
import Button from '../components/ui/Button';
import CarForm from '../components/car/CarForm';
import { useTheme } from '../context/ThemeContext';

const Onboarding: React.FC = () => {
  const { userCars } = useContext(CarContext);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  
  // If user already has cars, navigate to map
  useEffect(() => {
    if (userCars.length > 0) {
      navigate('/map');
    }
  }, [userCars, navigate]);
  
  const handleContinue = () => {
    setShowForm(true);
  };
  
  const handleFormSubmitted = () => {
    navigate('/map');
  };
  
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-5 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {!showForm ? (
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex justify-center">
            <div className={`p-4 rounded-full ${
              theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
            }`}>
              <Zap className="w-14 h-14 text-green-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold">Welcome to PlugSpot</h1>
          
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Find and share EV charging stations anywhere. Let's start by setting up your vehicle.
          </p>
          
          <div className="mt-8">
            <Button onClick={handleContinue}>
              Get Started
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Add Your Vehicle</h1>
          <p className={`mb-6 text-center ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We'll help you find compatible charging stations for your vehicle.
          </p>
          <CarForm onSubmitted={handleFormSubmitted} />
        </div>
      )}
    </div>
  );
};

export default Onboarding;