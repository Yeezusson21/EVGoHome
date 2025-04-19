import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Animated,
  Platform
} from 'react-native';
import { useTheme } from '@/utils/context/ThemeContext';
import { getThemeColors, getShadow } from '@/utils/theme';
import { Search, FileSliders as Sliders, X } from 'lucide-react-native';

export default function MapHeader() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = () => {
    // Mock search functionality
    console.log('Searching for:', searchQuery);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: searchFocused ? colors.cardBackground : 'transparent' },
      searchFocused && getShadow(theme)
    ]}>
      <View style={[
        styles.searchContainer,
        { backgroundColor: colors.cardBackground },
        getShadow(theme)
      ]}>
        <Search size={20} color={colors.secondaryText} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search for chargers..."
          placeholderTextColor={colors.placeholderText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <X size={16} color={colors.secondaryText} />
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity 
        style={[
          styles.filterButton, 
          { backgroundColor: colors.cardBackground },
          getShadow(theme)
        ]}
      >
        <Sliders size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: searchFocused => searchFocused ? 0 : 12,
    borderBottomRightRadius: searchFocused => searchFocused ? 0 : 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});