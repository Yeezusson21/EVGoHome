import { Platform } from 'react-native';

// Theme colors
export const lightTheme = {
  primary: '#34D399', // Green
  primaryLight: '#A7F3D0',
  secondary: '#38BDF8', // Blue
  secondaryLight: '#BAE6FD',
  accent: '#A78BFA', // Purple
  accentLight: '#DDD6FE',
  success: '#22C55E',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  text: '#1F2937',
  secondaryText: '#6B7280',
  background: '#F9FAFB',
  cardBackground: '#FFFFFF',
  border: '#E5E7EB',
  inputBackground: '#F3F4F6',
  placeholderText: '#9CA3AF',
};

export const darkTheme = {
  primary: '#34D399', // Keep the same primary color for brand recognition
  primaryLight: '#065F46',
  secondary: '#38BDF8',
  secondaryLight: '#075985',
  accent: '#A78BFA',
  accentLight: '#5B21B6',
  success: '#22C55E',
  successLight: '#064E3B',
  warning: '#F59E0B',
  warningLight: '#78350F',
  error: '#EF4444',
  errorLight: '#7F1D1D',
  text: '#F9FAFB',
  secondaryText: '#9CA3AF',
  background: '#111827',
  cardBackground: '#1F2937',
  border: '#374151',
  inputBackground: '#374151',
  placeholderText: '#6B7280',
};

export const getThemeColors = (theme: 'light' | 'dark') => {
  return theme === 'light' ? lightTheme : darkTheme;
};

// Function to get shadow styles based on platform and theme
export const getShadow = (theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';
  
  if (Platform.OS === 'ios') {
    return {
      shadowColor: isDark ? '#000' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 3,
    };
  } else {
    return {
      elevation: isDark ? 4 : 2,
    };
  }
};