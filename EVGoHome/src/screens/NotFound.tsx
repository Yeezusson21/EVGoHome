import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import { MapPin } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-5 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className={`p-5 rounded-full ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      } mb-6`}>
        <MapPin className="w-12 h-12 text-green-500" />
      </div>
      
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl mb-6">Destination Not Found</p>
      
      <p className={`text-center max-w-md mb-8 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Looks like you've ventured off the map. Let's help you get back on route.
      </p>
      
      <div className="space-y-3">
        <Button onClick={() => navigate('/map')}>
          Back to Map
        </Button>
        
        <Button variant="outline" onClick={() => navigate('/')}>
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default NotFound;