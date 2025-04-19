import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MapPin, Plus, Settings } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const TabNavigation: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  
  // Don't show tab navigation on onboarding
  if (location.pathname === '/') {
    return null;
  }
  
  const isDark = theme === 'dark';
  
  const baseClasses = "flex flex-col items-center justify-center py-2 px-4 flex-1";
  const activeClasses = isDark 
    ? "text-green-400 border-t-2 border-green-400" 
    : "text-green-600 border-t-2 border-green-600";
  const inactiveClasses = isDark 
    ? "text-gray-400 hover:text-green-400 transition-colors" 
    : "text-gray-500 hover:text-green-600 transition-colors";

  return (
    <nav className={`
      grid grid-cols-3 w-full 
      ${isDark ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'} 
      shadow-lg
    `}>
      <NavLink 
        to="/map" 
        className={({ isActive }) => 
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        <MapPin className="w-6 h-6" />
        <span className="text-xs mt-1">Map</span>
      </NavLink>
      
      <NavLink 
        to="/host" 
        className={({ isActive }) => 
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        <Plus className="w-6 h-6" />
        <span className="text-xs mt-1">Host</span>
      </NavLink>
      
      <NavLink 
        to="/settings" 
        className={({ isActive }) => 
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        <Settings className="w-6 h-6" />
        <span className="text-xs mt-1">Settings</span>
      </NavLink>
    </nav>
  );
};

export default TabNavigation;