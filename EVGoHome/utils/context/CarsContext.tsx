import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { mockCars } from '../mockData';

interface Car {
  id: string;
  year: string;
  make: string;
  model: string;
  imageUrl?: string;
}

interface CarsContextType {
  cars: Car[];
  addCar: (car: Omit<Car, 'id'>) => void;
  removeCar: (id: string) => void;
  updateCar: (id: string, updates: Partial<Car>) => void;
}

const CarsContext = createContext<CarsContextType>({
  cars: [],
  addCar: () => {},
  removeCar: () => {},
  updateCar: () => {},
});

export const useCars = () => useContext(CarsContext);

export const CarsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  
  const addCar = (car: Omit<Car, 'id'>) => {
    const newCar = {
      ...car,
      id: Date.now().toString(),
    };
    
    setCars(prevCars => [...prevCars, newCar]);
  };
  
  const removeCar = (id: string) => {
    Alert.alert(
      'Remove Vehicle',
      'Are you sure you want to remove this vehicle?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setCars(prevCars => prevCars.filter(car => car.id !== id));
          },
        },
      ]
    );
  };
  
  const updateCar = (id: string, updates: Partial<Car>) => {
    setCars(prevCars =>
      prevCars.map(car => (car.id === id ? { ...car, ...updates } : car))
    );
  };
  
  return (
    <CarsContext.Provider value={{ cars, addCar, removeCar, updateCar }}>
      {children}
    </CarsContext.Provider>
  );
};