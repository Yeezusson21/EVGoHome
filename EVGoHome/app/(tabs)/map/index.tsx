import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Platform, Text } from 'react-native';
import { useTheme } from '@/utils/context/ThemeContext';
import { useCars } from '@/utils/context/CarsContext';
import { useChargers } from '@/utils/context/ChargersContext';
import { getThemeColors } from '@/utils/theme';
import MapHeader from '@/components/MapHeader';

// Conditionally import MapView and related components
let MapView, PROVIDER_GOOGLE, Region, ChargerMarker;
if (Platform.OS !== 'web') {
  const MapsModule = require('react-native-maps');
  MapView = MapsModule.default;
  PROVIDER_GOOGLE = MapsModule.PROVIDER_GOOGLE;
  const ChargerMarkerModule = require('@/components/ChargerMarker');
  ChargerMarker = ChargerMarkerModule.default;
}

// Import mapStyle only if not on web
const mapStyle = Platform.OS !== 'web' ? require('@/utils/mapStyle').mapStyle : null;

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {
  const { theme } = useTheme();
  const { cars } = useCars();
  const { chargers } = useChargers();
  const colors = getThemeColors(theme);
  const mapRef = useRef(null);
  const [region, setRegion] = useState(INITIAL_REGION);

  // Check if a charger is compatible with the user's car
  const isCompatible = (charger: any) => {
    if (cars.length === 0) return true;
    const userCar = cars[0]; // For simplicity, use the first car
    
    // Mock compatibility check - in reality this would be more complex
    if (charger.compatibleWith.includes(userCar.make) || 
        charger.compatibleWith.includes('All')) {
      return true;
    }
    return false;
  };

  // Render web alternative or native map based on platform
  const renderContent = () => {
    if (Platform.OS === 'web') {
      return (
        <View style={[styles.webAlternative, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.webText, { color: colors.text }]}>
            Maps are only available on mobile devices.
          </Text>
          <Text style={[styles.webSubText, { color: colors.secondaryText }]}>
            Please use the iOS or Android app to view the charger map.
          </Text>
        </View>
      );
    }

    return (
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        showsUserLocation
        showsMyLocationButton
        customMapStyle={theme === 'dark' ? mapStyle.dark : mapStyle.light}
      >
        {chargers.map((charger) => (
          <ChargerMarker
            key={charger.id}
            charger={charger}
            isCompatible={isCompatible(charger)}
          />
        ))}
      </MapView>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderContent()}
      
      <SafeAreaView style={styles.headerContainer}>
        <MapHeader />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  webAlternative: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    margin: 20,
  },
  webText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  webSubText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});