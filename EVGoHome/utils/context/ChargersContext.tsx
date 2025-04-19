import React, { createContext, useContext, useState } from 'react';
import { mockChargers } from '../mockData';

interface Charger {
  id: string;
  name: string;
  address: string;
  description: string;
  speed: 'FAST' | 'SLOW';
  kw: number;
  isOnline: boolean;
  isAvailable: boolean;
  isUserOwned: boolean;
  price: {
    type: 'hourly' | 'flat';
    amount: number;
  };
  compatibleWith: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  imageUrl: string;
}

interface ChargersContextType {
  chargers: Charger[];
  userOwnedChargers: Charger[];
  addCharger: (charger: Charger) => void;
  removeCharger: (id: string) => void;
  updateCharger: (id: string, updates: Partial<Charger>) => void;
}

const ChargersContext = createContext<ChargersContextType>({
  chargers: [],
  userOwnedChargers: [],
  addCharger: () => {},
  removeCharger: () => {},
  updateCharger: () => {},
});

export const useChargers = () => useContext(ChargersContext);

export const ChargersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chargers, setChargers] = useState<Charger[]>(mockChargers);
  
  // Filter for user-owned chargers
  const userOwnedChargers = chargers.filter(charger => charger.isUserOwned);
  
  const addCharger = (charger: Charger) => {
    setChargers(prevChargers => [...prevChargers, charger]);
  };
  
  const removeCharger = (id: string) => {
    setChargers(prevChargers => prevChargers.filter(charger => charger.id !== id));
  };
  
  const updateCharger = (id: string, updates: Partial<Charger>) => {
    setChargers(prevChargers =>
      prevChargers.map(charger => 
        charger.id === id ? { ...charger, ...updates } : charger
      )
    );
  };
  
  return (
    <ChargersContext.Provider 
      value={{ 
        chargers, 
        userOwnedChargers,
        addCharger, 
        removeCharger, 
        updateCharger 
      }}
    >
      {children}
    </ChargersContext.Provider>
  );
};