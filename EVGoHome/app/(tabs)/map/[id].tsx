import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useChargers } from '@/utils/context/ChargersContext';
import { useCars } from '@/utils/context/CarsContext';
import { useTheme } from '@/utils/context/ThemeContext';
import { getThemeColors } from '@/utils/theme';
import { Button } from '@/components/Button';
import { Zap, Clock, MapPin, DollarSign, Car } from 'lucide-react-native';

// Import CircleCheck and Circle conditionally based on platform
let CircleCheck, Circle;
if (Platform.OS === 'web') {
  // For web, import directly from lucide-react-native
  import('lucide-react-native').then(module => {
    CircleCheck = module.CircleCheck;
    Circle = module.Circle;
  });
} else {
  // For native, import from lucide-react-native
  const { CircleCheck: NativeCircleCheck, Circle: NativeCircle } = require('lucide-react-native');
  CircleCheck = NativeCircleCheck;
  Circle = NativeCircle;
}

export default function ChargerDetailScreen() {
  const { id } = useLocalSearchParams();
  const { chargers } = useChargers();
  const { cars } = useCars();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();
  
  // Find the charger by ID
  const charger = chargers.find(c => c.id === id);
  
  if (!charger) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Charger not found</Text>
        <Button 
          title="Go Back" 
          onPress={() => navigation.goBack()} 
          style={{ marginTop: 20 }}
        />
      </SafeAreaView>
    );
  }

  // Check if the charger is compatible with the user's car
  const isCompatible = () => {
    if (cars.length === 0) return false;
    const userCar = cars[0]; // For simplicity, use the first car
    return charger.compatibleWith.includes(userCar.make) || 
           charger.compatibleWith.includes('All');
  };

  // For web, use a simplified version of the CheckCircle2 and XCircle components
  const renderStatusIcon = (isOnline) => {
    if (Platform.OS === 'web') {
      return (
        <View style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: isOnline ? colors.success : colors.error
        }} />
      );
    }
    
    return isOnline ? (
      <CircleCheck size={20} color={colors.success} />
    ) : (
      <Circle size={20} color={colors.error} />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: charger.imageUrl }}
          style={styles.image}
        />
        
        <View style={[styles.contentContainer, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.title, { color: colors.text }]}>{charger.name}</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <MapPin size={20} color={colors.primary} />
              <Text style={[styles.infoText, { color: colors.text }]}>{charger.address}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Zap size={20} color={charger.speed === 'FAST' ? colors.success : colors.warning} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {charger.speed === 'FAST' ? 'Fast Charging' : 'Standard Charging'} 
                ({charger.kw} kW)
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              {renderStatusIcon(charger.isOnline)}
              <Text style={[styles.infoText, { color: colors.text }]}>
                {charger.isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <DollarSign size={20} color={colors.accent} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {charger.price.type === 'hourly' 
                  ? `$${charger.price.amount}/hour` 
                  : `$${charger.price.amount} flat fee`}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Car size={20} color={isCompatible() ? colors.success : colors.error} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {isCompatible() 
                  ? 'Compatible with your vehicle' 
                  : 'Not compatible with your vehicle'}
              </Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About this charger</Text>
          <Text style={[styles.description, { color: colors.secondaryText }]}>
            {charger.description}
          </Text>

          <View style={styles.availabilityContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Availability</Text>
            <View style={[styles.statusIndicator, { 
              backgroundColor: charger.isAvailable ? colors.successLight : colors.errorLight 
            }]}>
              <Text style={[styles.statusText, { 
                color: charger.isAvailable ? colors.success : colors.error 
              }]}>
                {charger.isAvailable ? 'Available Now' : 'Currently In Use'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { backgroundColor: colors.cardBackground }]}>
        <Button 
          title="Start Charging" 
          onPress={() => {}} 
          disabled={!charger.isAvailable || !charger.isOnline || !isCompatible()}
          style={{ width: '100%' }}
        />
      </View>
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
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  availabilityContainer: {
    marginBottom: 16,
  },
  statusIndicator: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});