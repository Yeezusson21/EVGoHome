import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { CarContext } from '../context/CarContext';

// Screens
import Onboarding from '../screens/Onboarding';
import MapScreen from '../screens/MapScreen';
import ChargerDetails from '../screens/ChargerDetails';
import AddChargerScreen from '../screens/AddChargerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotFound from '../screens/NotFound';

const AppRoutes: React.FC = () => {
  const { userCars } = useContext(CarContext);
  const location = useLocation();
  
  // Check if user has added a car to determine if they can skip onboarding
  const hasAddedCar = userCars && userCars.length > 0;
  
  // Don't redirect to onboarding if already there or adding a charger
  const shouldRedirectToOnboarding = 
    !hasAddedCar && 
    location.pathname !== '/' && 
    !location.pathname.includes('/host');

  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      
      <Route element={<Layout />}>
        <Route path="/map" element={
          hasAddedCar ? <MapScreen /> : <Navigate to="/" />
        } />
        <Route path="/charger/:id" element={<ChargerDetails />} />
        <Route path="/host" element={<AddChargerScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;