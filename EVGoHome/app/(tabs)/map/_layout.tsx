import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '@/utils/context/ThemeContext';
import { getThemeColors } from '@/utils/theme';

export default function MapLayout() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.cardBackground,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Charger Details",
          presentation: "modal",
          animation: "slide_from_bottom",
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
    </Stack>
  );
}