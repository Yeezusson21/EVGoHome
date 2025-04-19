import React, { createContext, useState, ReactNode, useEffect } from 'react';

export type ChargerSpeed = 'FAST' | 'SLOW';
export type ChargerStatus = 'ONLINE' | 'OFFLINE';

export interface Charger {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  speed: ChargerSpeed;
  status: ChargerStatus;
  price: number;
  priceType: 'hourly' | 'flat';
  compatibleWith: string[]; // List of compatible car models
  createdAt: string;
  hostId?: string; // In a real app, this would reference a user ID
}

interface ChargerContextType {
  chargers: Charger[];
  addCharger: (charger: Omit<Charger, 'id' | 'createdAt'>) => void;
  updateChargerStatus: (id: string, status: ChargerStatus) => void;
  getChargerById: (id: string) => Charger | undefined;
  deleteCharger: (id: string) => void;
  getCompatibleChargers: (carModel: string) => Charger[];
}

export const ChargerContext = createContext<ChargerContextType>({
  chargers: [],
  addCharger: () => {},
  updateChargerStatus: () => {},
  getChargerById: () => undefined,
  deleteCharger: () => {},
  getCompatibleChargers: () => [],
});

interface ChargerProviderProps {
  children: ReactNode;
}

export const ChargerProvider: React.FC<ChargerProviderProps> = ({ children }) => {
  // Initialize with mock data or from localStorage
  const [chargers, setChargers] = useState<Charger[]>(() => {
    const savedChargers = localStorage.getItem('chargers');
    
    if (savedChargers) {
      return JSON.parse(savedChargers);
    }
    
    // Default mock data
    return [
      {
        id: '1',
        name: 'Downtown Fast Charger',
        latitude: 37.7749,
        longitude: -122.4194,
        address: '123 Market St, San Francisco, CA',
        speed: 'FAST',
        status: 'ONLINE',
        price: 0.45,
        priceType: 'hourly',
        compatibleWith: ['Tesla Model 3', 'Tesla Model Y', 'Nissan Leaf'],
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'EcoCharge Station',
        latitude: 37.7833,
        longitude: -122.4167,
        address: '456 Powell St, San Francisco, CA',
        speed: 'SLOW',
        status: 'ONLINE',
        price: 0.30,
        priceType: 'hourly',
        compatibleWith: ['Chevy Bolt', 'Nissan Leaf', 'Hyundai Kona'],
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Tech District Supercharger',
        latitude: 37.7833,
        longitude: -122.4300,
        address: '789 Howard St, San Francisco, CA',
        speed: 'FAST',
        status: 'OFFLINE',
        price: 15,
        priceType: 'flat',
        compatibleWith: ['Tesla Model S', 'Tesla Model X', 'Tesla Model 3'],
        createdAt: new Date().toISOString(),
      },
    ];
  });

  // Save chargers to localStorage when they change
  useEffect(() => {
    localStorage.setItem('chargers', JSON.stringify(chargers));
  }, [chargers]);

  const addCharger = (chargerData: Omit<Charger, 'id' | 'createdAt'>) => {
    const newCharger: Charger = {
      ...chargerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setChargers(prev => [...prev, newCharger]);
  };

  const updateChargerStatus = (id: string, status: ChargerStatus) => {
    setChargers(prev => 
      prev.map(charger => 
        charger.id === id ? { ...charger, status } : charger
      )
    );
  };

  const getChargerById = (id: string): Charger | undefined => {
    return chargers.find(charger => charger.id === id);
  };

  const deleteCharger = (id: string) => {
    setChargers(prev => prev.filter(charger => charger.id !== id));
  };
  
  const getCompatibleChargers = (carModel: string): Charger[] => {
    return chargers.filter(charger => 
      charger.compatibleWith.some(model => model.toLowerCase().includes(carModel.toLowerCase()))
    );
  };

  return (
    <ChargerContext.Provider 
      value={{ 
        chargers, 
        addCharger, 
        updateChargerStatus, 
        getChargerById, 
        deleteCharger,
        getCompatibleChargers
      }}
    >
      {children}
    </ChargerContext.Provider>
  );
};