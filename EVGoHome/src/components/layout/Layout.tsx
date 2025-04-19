import React from 'react';
import { Outlet } from 'react-router-dom';
import TabNavigation from './TabNavigation';
import { useTheme } from '../../context/ThemeContext';

const Layout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 z-10">
        <TabNavigation />
      </footer>
    </div>
  );
};

export default Layout;