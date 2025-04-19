import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, Image, Platform } from 'react-native';
import { useCars } from '@/utils/context/CarsContext';
import { useTheme } from '@/utils/context/ThemeContext';
import { router } from 'expo-router';
import CarForm from '@/components/CarForm';
import { Button } from '@/components/Button';
import { getThemeColors } from '@/utils/theme';

export default function OnboardingScreen() {
  const { addCar, cars } = useCars();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  // Skip onboarding if a car is already added
  useEffect(() => {
    if (cars.length > 0) {
      router.replace('/(tabs)');
    }
  }, [cars]);

  // Handle car form submission
  const handleAddCar = (car: any) => {
    addCar(car);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3043646/pexels-photo-3043646.jpeg?auto=compress&cs=tinysrgb&w=600' }}
            style={styles.headerImage}
          />
          <View style={[styles.logoOverlay, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.logoText, { color: colors.primary }]}>PlugSpot</Text>
            <Text style={[styles.tagline, { color: colors.text }]}>
              Find, charge, go.
            </Text>
          </View>
        </View>
        
        <View style={[styles.formContainer, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome to PlugSpot</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
            Let's set up your EV details to find compatible chargers
          </Text>
          
          <CarForm onSubmit={handleAddCar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  logoOverlay: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    marginBottom: 4,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    marginTop: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
});