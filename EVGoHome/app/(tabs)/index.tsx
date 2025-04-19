import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to map tab
  return <Redirect href="/(tabs)/map" />;
}