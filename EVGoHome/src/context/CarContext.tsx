import React, { createContext, useState, ReactNode, useEffect } from 'react';

export interface Car {
  id: string;
  year: number;
  make: string;
  model: string;
  createdAt: string;
}

interface CarContextType {
  userCars: Car[];
  addCar: (car: Omit<Car, 'id' | 'createdAt'>) => void;
  deleteCar: (id: string) => void;
  getSelectedCar: () => Car | null;
  selectCar: (id: string) => void;
  selectedCarId: string | null;
}

export const CarContext = createContext<CarContextType>({
  userCars: [],
  addCar: () => {},
  deleteCar: () => {},
  getSelectedCar: () => null,
  selectCar: () => {},
  selectedCarId: null,
});

interface CarProviderProps {
  children: ReactNode;
}

export const CarProvider: React.FC<CarProviderProps> = ({ children }) => {
  // Load cars from localStorage
  const [userCars, setUserCars] = useState<Car[]>(() => {
    const savedCars = localStorage.getItem('userCars');
    return savedCars ? JSON.parse(savedCars) : [];
  });
  
  const [selectedCarId, setSelectedCarId] = useState<string | null>(() => {
    const savedSelectedCarId = localStorage.getItem('selectedCarId');
    return savedSelectedCarId || (userCars.length > 0 ? userCars[0].id : null);
  });

  // Save cars to localStorage when they change
  useEffect(() => {
    localStorage.setItem('userCars', JSON.stringify(userCars));
  }, [userCars]);
  
  // Save selected car to localStorage
  useEffect(() => {
    if (selectedCarId) {
      localStorage.setItem('selectedCarId', selectedCarId);
    } else {
      localStorage.removeItem('selectedCarId');
    }
  }, [selectedCarId]);

  const addCar = (car: Omit<Car, 'id' | 'createdAt'>) => {
    const newCar: Car = {
      ...car,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setUserCars(prev => [...prev, newCar]);
    
    // If it's the first car, auto-select it
    if (userCars.length === 0) {
      setSelectedCarId(newCar.id);
    }
  };

  const deleteCar = (id: string) => {
    setUserCars(prev => prev.filter(car => car.id !== id));
    
    // If we're deleting the selected car, select another one if available
    if (selectedCarId === id) {
      const remainingCars = userCars.filter(car => car.id !== id);
      setSelectedCarId(remainingCars.length > 0 ? remainingCars[0].id : null);
    }
  };
  
  const selectCar = (id: string) => {
    setSelectedCarId(id);
  };
  
  const getSelectedCar = (): Car | null => {
    if (!selectedCarId) return null;
    return userCars.find(car => car.id === selectedCarId) || null;
  };

  return (
    <CarContext.Provider 
      value={{ 
        userCars, 
        addCar, 
        deleteCar, 
        getSelectedCar, 
        selectCar, 
        selectedCarId 
      }}
    >
      {children}
    </CarContext.Provider>
  );
};