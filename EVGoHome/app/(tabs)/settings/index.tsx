import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Switch, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { useTheme } from '@/utils/context/ThemeContext';
import { useCars } from '@/utils/context/CarsContext';
import { getThemeColors } from '@/utils/theme';
import { Button } from '@/components/Button';
import { router } from 'expo-router';
import CarListItem from '@/components/CarListItem';
import { Plus, Moon, User, Lock, Bell, CircleHelp as HelpCircle } from 'lucide-react-native';
import CarForm from '@/components/CarForm';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { cars, addCar, removeCar } = useCars();
  const colors = getThemeColors(theme);
  
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleAddCar = (car: any) => {
    addCar(car);
    setShowAddCarForm(false);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        </View>
        
        {/* User Profile Section */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.profileHeader}>
            <View style={[styles.profileAvatar, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.avatarText, { color: colors.primary }]}>JS</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>John Smith</Text>
              <Text style={[styles.profileEmail, { color: colors.secondaryText }]}>john.smith@example.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={[styles.profileButtonText, { color: colors.primary }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        {/* Cars Section */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Vehicles</Text>
          
          {cars.length === 0 ? (
            <Text style={[styles.emptyCarsText, { color: colors.secondaryText }]}>
              No vehicles added yet
            </Text>
          ) : (
            cars.map((car) => (
              <CarListItem 
                key={car.id} 
                car={car} 
                onRemove={() => removeCar(car.id)}
              />
            ))
          )}
          
          {showAddCarForm ? (
            <View style={styles.addCarForm}>
              <Text style={[styles.formTitle, { color: colors.text }]}>Add New Vehicle</Text>
              <CarForm onSubmit={handleAddCar} />
              <Button 
                title="Cancel" 
                onPress={() => setShowAddCarForm(false)} 
                variant="secondary"
                style={{ marginTop: 8 }}
              />
            </View>
          ) : (
            <Button 
              title="Add Vehicle" 
              icon={<Plus size={20} color="#fff" />}
              onPress={() => setShowAddCarForm(true)}
              style={{ marginTop: 16 }}
            />
          )}
        </View>
        
        {/* Preferences Section */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Moon size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.inputBackground, true: colors.primaryLight }}
              thumbColor={theme === 'dark' ? colors.primary : colors.secondaryText}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.inputBackground, true: colors.primaryLight }}
              thumbColor={notificationsEnabled ? colors.primary : colors.secondaryText}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Lock size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Two-Factor Authentication</Text>
            </View>
            <Switch
              value={twoFaEnabled}
              onValueChange={setTwoFaEnabled}
              trackColor={{ false: colors.inputBackground, true: colors.primaryLight }}
              thumbColor={twoFaEnabled ? colors.primary : colors.secondaryText}
            />
          </View>
        </View>
        
        {/* Help Section */}
        <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          
          <TouchableOpacity style={styles.helpItem}>
            <HelpCircle size={20} color={colors.text} />
            <Text style={[styles.helpText, { color: colors.text }]}>Help Center</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.helpItem}>
            <Text style={[styles.helpText, { color: colors.text }]}>Contact Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.helpItem}>
            <Text style={[styles.helpText, { color: colors.text }]}>Privacy Policy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.helpItem}>
            <Text style={[styles.helpText, { color: colors.text }]}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.version}>
          <Text style={[styles.versionText, { color: colors.secondaryText }]}>
            PlugSpot v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    marginBottom: 8,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  profileButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  profileButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  emptyCarsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  addCarForm: {
    marginTop: 16,
  },
  formTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 12,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  helpText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 12,
  },
  version: {
    alignItems: 'center',
    padding: 24,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});