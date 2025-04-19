import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/utils/context/ThemeContext';
import { useChargers } from '@/utils/context/ChargersContext';
import { getThemeColors, getShadow } from '@/utils/theme';
import { router } from 'expo-router';
import { MapPin, Zap, Battery, DollarSign, ChevronRight } from 'lucide-react-native';

interface ChargerListItemProps {
  charger: any;
  isOwner?: boolean;
}

export default function ChargerListItem({ charger, isOwner = false }: ChargerListItemProps) {
  const { theme } = useTheme();
  const { updateCharger } = useChargers();
  const colors = getThemeColors(theme);
  
  const handlePress = () => {
    router.push(`/map/${charger.id}`);
  };
  
  const toggleOnlineStatus = () => {
    if (isOwner) {
      updateCharger(charger.id, { isOnline: !charger.isOnline });
    }
  };
  
  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.cardBackground,
          borderColor: colors.border 
        },
        getShadow(theme)
      ]}
    >
      <Image source={{ uri: charger.imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: colors.text }]}>{charger.name}</Text>
          {isOwner && (
            <Switch
              value={charger.isOnline}
              onValueChange={toggleOnlineStatus}
              trackColor={{ false: colors.errorLight, true: colors.successLight }}
              thumbColor={charger.isOnline ? colors.success : colors.error}
            />
          )}
        </View>
        
        <View style={styles.details}>
          <View style={styles.infoRow}>
            <MapPin size={16} color={colors.secondaryText} />
            <Text 
              style={[styles.infoText, { color: colors.secondaryText }]}
              numberOfLines={1}
            >
              {charger.address}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            {charger.speed === 'FAST' ? (
              <Zap size={16} color={colors.success} />
            ) : (
              <Battery size={16} color={colors.warning} />
            )}
            <Text style={[styles.infoText, { color: colors.secondaryText }]}>
              {charger.speed === 'FAST' ? 'Fast' : 'Standard'} ({charger.kw} kW)
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <DollarSign size={16} color={colors.accent} />
            <Text style={[styles.infoText, { color: colors.secondaryText }]}>
              {charger.price.type === 'hourly' 
                ? `$${charger.price.amount}/hour` 
                : `$${charger.price.amount} flat fee`}
            </Text>
          </View>
        </View>
        
        {!isOwner && (
          <ChevronRight 
            size={20} 
            color={colors.secondaryText} 
            style={styles.chevron} 
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    flex: 1,
  },
  details: {
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  chevron: {
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
});