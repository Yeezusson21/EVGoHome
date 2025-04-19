import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TextInput, 
  Switch, 
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTheme } from '@/utils/context/ThemeContext';
import { useChargers } from '@/utils/context/ChargersContext';
import { getThemeColors } from '@/utils/theme';
import { Button } from '@/components/Button';
import { ChevronLeft, Zap, BatteryMedium } from 'lucide-react-native';
import { router } from 'expo-router';

export default function AddChargerScreen() {
  const { theme } = useTheme();
  const { addCharger } = useChargers();
  const colors = getThemeColors(theme);
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isHourly, setIsHourly] = useState(true);
  const [chargerSpeed, setChargerSpeed] = useState('FAST');
  const [kw, setKw] = useState('50');
  const [isOnline, setIsOnline] = useState(true);
  
  const handleSubmit = () => {
    // Validate inputs
    if (!name || !address || !price || !description) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    if (isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price.');
      return;
    }
    
    if (isNaN(Number(kw)) || Number(kw) <= 0) {
      Alert.alert('Invalid Power', 'Please enter a valid kW value.');
      return;
    }
    
    // Create new charger object
    const newCharger = {
      id: Date.now().toString(),
      name,
      address,
      description,
      price: {
        type: isHourly ? 'hourly' : 'flat',
        amount: Number(price)
      },
      speed: chargerSpeed,
      kw: Number(kw),
      isOnline,
      isAvailable: true,
      isUserOwned: true,
      compatibleWith: ['All'], // For simplicity
      coordinates: {
        latitude: 37.78825 + (Math.random() * 0.02 - 0.01), // Random location near initial region
        longitude: -122.4324 + (Math.random() * 0.02 - 0.01)
      },
      imageUrl: 'https://images.pexels.com/photos/3552085/pexels-photo-3552085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    };
    
    // Add the charger and navigate back
    addCharger(newCharger);
    Alert.alert('Success', 'Your charger has been added!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Add New Charger</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.formContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Basic Information</Text>
          
          <Text style={[styles.label, { color: colors.text }]}>Charger Name</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.inputBackground, 
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="e.g., Home Tesla Charger"
            placeholderTextColor={colors.placeholderText}
            value={name}
            onChangeText={setName}
          />
          
          <Text style={[styles.label, { color: colors.text }]}>Address</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.inputBackground, 
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="Enter the full address"
            placeholderTextColor={colors.placeholderText}
            value={address}
            onChangeText={setAddress}
          />
          
          <Text style={[styles.label, { color: colors.text }]}>Description</Text>
          <TextInput
            style={[styles.textArea, { 
              backgroundColor: colors.inputBackground, 
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="Describe your charger and any special instructions"
            placeholderTextColor={colors.placeholderText}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>Pricing</Text>
          
          <View style={styles.pricingRow}>
            <TextInput
              style={[styles.priceInput, { 
                backgroundColor: colors.inputBackground, 
                color: colors.text,
                borderColor: colors.border
              }]}
              placeholder="0.00"
              placeholderTextColor={colors.placeholderText}
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />
            
            <View style={styles.pricingToggle}>
              <Text style={[styles.toggleLabel, { 
                color: isHourly ? colors.primary : colors.secondaryText 
              }]}>
                Hourly
              </Text>
              <Switch
                value={isHourly}
                onValueChange={setIsHourly}
                trackColor={{ false: colors.inputBackground, true: colors.primaryLight }}
                thumbColor={isHourly ? colors.primary : colors.secondaryText}
              />
              <Text style={[styles.toggleLabel, { 
                color: !isHourly ? colors.primary : colors.secondaryText 
              }]}>
                Flat Fee
              </Text>
            </View>
          </View>
          
          <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>Technical Details</Text>
          
          <Text style={[styles.label, { color: colors.text }]}>Charger Speed</Text>
          <View style={styles.speedOptions}>
            <TouchableOpacity
              style={[
                styles.speedOption,
                chargerSpeed === 'FAST' && { 
                  backgroundColor: colors.primaryLight,
                  borderColor: colors.primary
                },
                { borderColor: colors.border }
              ]}
              onPress={() => setChargerSpeed('FAST')}
            >
              <Zap size={24} color={chargerSpeed === 'FAST' ? colors.primary : colors.secondaryText} />
              <Text style={[
                styles.speedText,
                { color: chargerSpeed === 'FAST' ? colors.primary : colors.secondaryText }
              ]}>
                Fast
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.speedOption,
                chargerSpeed === 'SLOW' && { 
                  backgroundColor: colors.primaryLight,
                  borderColor: colors.primary
                },
                { borderColor: colors.border }
              ]}
              onPress={() => setChargerSpeed('SLOW')}
            >
              <BatteryMedium size={24} color={chargerSpeed === 'SLOW' ? colors.primary : colors.secondaryText} />
              <Text style={[
                styles.speedText,
                { color: chargerSpeed === 'SLOW' ? colors.primary : colors.secondaryText }
              ]}>
                Standard
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.label, { color: colors.text }]}>Power (kW)</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.inputBackground, 
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="e.g., 50"
            placeholderTextColor={colors.placeholderText}
            value={kw}
            onChangeText={setKw}
            keyboardType="number-pad"
          />
          
          <View style={styles.toggleContainer}>
            <Text style={[styles.toggleLabel, { color: colors.text }]}>Online Status</Text>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: colors.errorLight, true: colors.successLight }}
              thumbColor={isOnline ? colors.success : colors.error}
            />
          </View>
          
          <Button 
            title="Add Charger" 
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
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
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    minHeight: 100,
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    flex: 0.3,
  },
  pricingToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.7,
    paddingLeft: 16,
  },
  toggleLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    paddingHorizontal: 8,
  },
  speedOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  speedOption: {
    flex: 0.48,
    height: 80,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginTop: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  submitButton: {
    marginTop: 24,
  },
});