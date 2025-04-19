import React, { useState, useContext } from 'react';
import { CarContext } from '../../context/CarContext';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

interface CarFormProps {
  onSubmitted: () => void;
  initialData?: {
    year: number;
    make: string;
    model: string;
  };
}

const POPULAR_MAKES = [
  'Tesla', 'Nissan', 'Chevrolet', 'Ford', 'BMW', 'Audi', 
  'Hyundai', 'Kia', 'Volkswagen', 'Toyota', 'Porsche',
];

const CarForm: React.FC<CarFormProps> = ({ onSubmitted, initialData }) => {
  const { theme } = useTheme();
  const { addCar } = useContext(CarContext);
  const currentYear = new Date().getFullYear();
  
  const [formData, setFormData] = useState({
    year: initialData?.year || currentYear,
    make: initialData?.make || '',
    model: initialData?.model || '',
  });
  
  const [touched, setTouched] = useState({
    year: false,
    make: false,
    model: false,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.year || !formData.make || !formData.model) {
      setTouched({
        year: true,
        make: true,
        model: true,
      });
      return;
    }
    
    addCar({
      year: Number(formData.year),
      make: formData.make,
      model: formData.model,
    });
    
    onSubmitted();
  };
  
  const getYears = () => {
    const years = [];
    for (let i = currentYear; i >= currentYear - 15; i--) {
      years.push(i);
    }
    return years;
  };
  
  const inputClasses = `w-full px-4 py-2 rounded-lg border ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-700 text-white' 
      : 'bg-white border-gray-300 text-gray-900'
  } focus:outline-none focus:ring-2 focus:ring-green-500`;
  
  const labelClasses = `block mb-2 font-medium ${
    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
  }`;
  
  const errorClasses = 'text-red-500 text-sm mt-1';
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="year" className={labelClasses}>Year</label>
        <select
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className={inputClasses}
          required
        >
          <option value="">Select Year</option>
          {getYears().map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        {touched.year && !formData.year && (
          <p className={errorClasses}>Year is required</p>
        )}
      </div>
      
      <div>
        <label htmlFor="make" className={labelClasses}>Make</label>
        <select
          id="make"
          name="make"
          value={formData.make}
          onChange={handleChange}
          className={inputClasses}
          required
        >
          <option value="">Select Make</option>
          {POPULAR_MAKES.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
          <option value="Other">Other</option>
        </select>
        {touched.make && !formData.make && (
          <p className={errorClasses}>Make is required</p>
        )}
      </div>
      
      <div>
        <label htmlFor="model" className={labelClasses}>Model</label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="e.g., Model 3, Leaf, Bolt"
          className={inputClasses}
          required
        />
        {touched.model && !formData.model && (
          <p className={errorClasses}>Model is required</p>
        )}
      </div>
      
      <div className="pt-4">
        <Button type="submit" fullWidth>
          Save Vehicle
        </Button>
      </div>
    </form>
  );
};

export default CarForm;