import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp
} from 'react-native';
import { useTheme } from '@/utils/context/ThemeContext';
import { getThemeColors } from '@/utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon
}: ButtonProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  
  // Get button background color based on variant and state
  const getBackgroundColor = () => {
    if (disabled) return colors.secondaryText;
    
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'outline':
        return 'transparent';
      default:
        return colors.primary;
    }
  };
  
  // Get button text color based on variant and state
  const getTextColor = () => {
    if (disabled) return '#FFFFFF';
    
    switch (variant) {
      case 'primary':
      case 'secondary':
        return '#FFFFFF';
      case 'outline':
        return colors.primary;
      default:
        return '#FFFFFF';
    }
  };
  
  // Get button border color based on variant
  const getBorderColor = () => {
    if (disabled) return colors.secondaryText;
    
    switch (variant) {
      case 'outline':
        return colors.primary;
      default:
        return 'transparent';
    }
  };
  
  // Get button size styles
  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 12,
          paddingVertical: 6,
          minHeight: 32,
        };
      case 'large':
        return {
          paddingHorizontal: 24,
          paddingVertical: 14,
          minHeight: 56,
        };
      default: // medium
        return {
          paddingHorizontal: 16,
          paddingVertical: 10,
          minHeight: 48,
        };
    }
  };
  
  // Get text size based on button size
  const getTextSize = (): TextStyle => {
    switch (size) {
      case 'small':
        return {
          fontSize: 14,
        };
      case 'large':
        return {
          fontSize: 18,
        };
      default: // medium
        return {
          fontSize: 16,
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        getSizeStyles(),
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon && <Text style={styles.iconContainer}>{icon}</Text>}
          <Text
            style={[
              styles.buttonText,
              getTextSize(),
              { color: getTextColor() },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});