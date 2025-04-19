import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/utils/context/ThemeContext';
import { getThemeColors } from '@/utils/theme';
import { router } from 'expo-router';

// Only import if not on web
let Marker, Callout, Zap, Battery, CheckCircle, XCircle;
if (Platform.OS !== 'web') {
  // Dynamically import react-native-maps for native platforms
  const MapsModule = require('react-native-maps');
  Marker = MapsModule.Marker;
  Callout = MapsModule.Callout;
  
  // Import icons
  const LucideModule = require('lucide-react-native');
  Zap = LucideModule.Zap;
  Battery = LucideModule.Battery;
  CheckCircle = LucideModule.CircleCheck;
  XCircle = LucideModule.Circle;
}

interface ChargerMarkerProps {
  charger: any;
  isCompatible: boolean;
}

// Create a component that only works on native platforms
const ChargerMarker = Platform.OS !== 'web' 
  ? function ChargerMarker({ charger, isCompatible }: ChargerMarkerProps) {
      const { theme } = useTheme();
      const colors = getThemeColors(theme);
      const [showCallout, setShowCallout] = useState(false);
      
      // Determine pin color based on charger status and compatibility
      const getPinColor = () => {
        if (!charger.isOnline) return colors.error;
        if (!isCompatible) return colors.warning;
        return colors.primary;
      };
      
      // Navigate to charger details page
      const handleNavigateToDetails = () => {
        router.push(`/map/${charger.id}`);
      };
      
      return (
        <Marker
          coordinate={charger.coordinates}
          pinColor={getPinColor()}
          onPress={() => setShowCallout(true)}
        >
          <Callout tooltip onPress={handleNavigateToDetails}>
            <View style={[
              styles.calloutContainer, 
              { backgroundColor: colors.cardBackground }
            ]}>
              <Text style={[styles.calloutTitle, { color: colors.text }]}>
                {charger.name}
              </Text>
              
              <View style={styles.calloutDetails}>
                {/* Speed */}
                <View style={styles.detailRow}>
                  {charger.speed === 'FAST' ? (
                    <Zap size={16} color={colors.success} />
                  ) : (
                    <Battery size={16} color={colors.warning} />
                  )}
                  <Text style={[styles.detailText, { color: colors.secondaryText }]}>
                    {charger.speed === 'FAST' ? 'Fast' : 'Standard'} ({charger.kw} kW)
                  </Text>
                </View>
                
                {/* Status */}
                <View style={styles.detailRow}>
                  {charger.isOnline ? (
                    <CheckCircle size={16} color={colors.success} />
                  ) : (
                    <XCircle size={16} color={colors.error} />
                  )}
                  <Text style={[styles.detailText, { color: colors.secondaryText }]}>
                    {charger.isOnline ? 'Online' : 'Offline'}
                  </Text>
                </View>
                
                {/* Compatibility */}
                <View style={styles.detailRow}>
                  <View style={[
                    styles.compatibilityDot, 
                    { backgroundColor: isCompatible ? colors.success : colors.error }
                  ]} />
                  <Text style={[styles.detailText, { color: colors.secondaryText }]}>
                    {isCompatible ? 'Compatible' : 'Not Compatible'}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={[styles.calloutButton, { backgroundColor: colors.primary }]}
                onPress={handleNavigateToDetails}
              >
                <Text style={styles.calloutButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
            <View style={[
              styles.calloutArrow, 
              { borderTopColor: colors.cardBackground }
            ]} />
          </Callout>
        </Marker>
      );
    }
  : () => null; // On web, return null

export default ChargerMarker;

const styles = StyleSheet.create({
  calloutContainer: {
    width: 220,
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  calloutTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginBottom: 8,
  },
  calloutDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 6,
  },
  compatibilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  calloutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  calloutButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  calloutArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});