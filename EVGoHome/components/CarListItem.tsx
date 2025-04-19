import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/utils/context/ThemeContext';
import { getThemeColors, getShadow } from '@/utils/theme';
import { Trash2 } from 'lucide-react-native';

interface CarListItemProps {
  car: any;
  onRemove: () => void;
}

export default function CarListItem({ car, onRemove }: CarListItemProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  
  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.cardBackground,
        borderColor: colors.border 
      },
      getShadow(theme)
    ]}>
      <Image 
        source={{ uri: car.imageUrl }} 
        style={styles.image} 
      />
      
      <View style={styles.details}>
        <Text style={[styles.makeModel, { color: colors.text }]}>
          {car.make} {car.model}
        </Text>
        <Text style={[styles.year, { color: colors.secondaryText }]}>
          {car.year}
        </Text>
      </View>
      
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Trash2 size={20} color={colors.error} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  makeModel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  year: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
  },
});