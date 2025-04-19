import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import { useTheme } from '@/utils/context/ThemeContext';
import { Button } from './Button';
import { getThemeColors } from '@/utils/theme';

interface CarFormProps {
  onSubmit: (car: any) => void;
}

export default function CarForm({ onSubmit }: CarFormProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [errors, setErrors] = useState<{
    year?: string;
    make?: string;
    model?: string;
  }>({});

  const validate = () => {
    const newErrors: { year?: string; make?: string; model?: string } = {};
    let isValid = true;

    if (!year) {
      newErrors.year = 'Year is required';
      isValid = false;
    } else if (!/^\d{4}$/.test(year)) {
      newErrors.year = 'Please enter a valid 4-digit year';
      isValid = false;
    }

    if (!make) {
      newErrors.make = 'Make is required';
      isValid = false;
    }

    if (!model) {
      newErrors.model = 'Model is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Generate a mock image URL based on the car make
      const carImageMap: { [key: string]: string } = {
        'Tesla': 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Ford': 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Rivian': 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'BMW': 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Audi': 'https://images.pexels.com/photos/1164778/pexels-photo-1164778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Volkswagen': 'https://images.pexels.com/photos/5781961/pexels-photo-5781961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      };

      const imageUrl = carImageMap[make] || 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      
      onSubmit({
        year, 
        make, 
        model,
        imageUrl
      });
      
      // Reset form
      setYear('');
      setMake('');
      setModel('');
      setErrors({});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Year</Text>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: colors.inputBackground, 
              color: colors.text, 
              borderColor: errors.year ? colors.error : colors.border 
            },
          ]}
          placeholder="e.g., 2023"
          placeholderTextColor={colors.placeholderText}
          value={year}
          onChangeText={setYear}
          keyboardType="number-pad"
          maxLength={4}
        />
        {errors.year && (
          <Text style={[styles.errorText, { color: colors.error }]}>
            {errors.year}
          </Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Make</Text>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: colors.inputBackground, 
              color: colors.text, 
              borderColor: errors.make ? colors.error : colors.border 
            },
          ]}
          placeholder="e.g., Tesla"
          placeholderTextColor={colors.placeholderText}
          value={make}
          onChangeText={setMake}
        />
        {errors.make && (
          <Text style={[styles.errorText, { color: colors.error }]}>
            {errors.make}
          </Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Model</Text>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: colors.inputBackground, 
              color: colors.text, 
              borderColor: errors.model ? colors.error : colors.border 
            },
          ]}
          placeholder="e.g., Model 3"
          placeholderTextColor={colors.placeholderText}
          value={model}
          onChangeText={setModel}
        />
        {errors.model && (
          <Text style={[styles.errorText, { color: colors.error }]}>
            {errors.model}
          </Text>
        )}
      </View>

      <Button
        title="Save Vehicle"
        onPress={handleSubmit}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 8,
  },
});