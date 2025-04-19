import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useChargers } from '@/utils/context/ChargersContext';
import { useTheme } from '@/utils/context/ThemeContext';
import { getThemeColors } from '@/utils/theme';
import { Button } from '@/components/Button';
import { router } from 'expo-router';
import ChargerListItem from '@/components/ChargerListItem';
import { Plus } from 'lucide-react-native';

export default function HostScreen() {
  const { chargers, userOwnedChargers } = useChargers();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  // Navigate to add charger screen
  const handleAddCharger = () => {
    router.push('/host/add-charger');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Host Dashboard</Text>
        <Button 
          icon={<Plus size={20} color="#fff" />}
          title="Add Charger" 
          onPress={handleAddCharger}
        />
      </View>

      {userOwnedChargers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No Chargers Yet
          </Text>
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
            Start hosting by adding your first EV charger
          </Text>
          <Button 
            title="Add Your First Charger" 
            onPress={handleAddCharger}
            style={{ marginTop: 24 }}
          />
        </View>
      ) : (
        <FlatList
          data={userOwnedChargers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChargerListItem charger={item} isOwner />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
});