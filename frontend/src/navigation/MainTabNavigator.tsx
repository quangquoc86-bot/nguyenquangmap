import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Main/HomeScreen';
import FamilyTreeScreen from '../screens/Main/FamilyTreeScreen';
import QRScannerScreen from '../screens/Main/QRScannerScreen';
import AdminScreen from '../screens/Main/AdminScreen';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const user = useAuthStore((state) => state.user);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTintColor: COLORS.white,
        headerStyle: { backgroundColor: COLORS.primary },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'map';

          if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Family Tree') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Scan QR') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
          } else if (route.name === 'Admin') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Map" component={HomeScreen} />
      <Tab.Screen name="Family Tree" component={FamilyTreeScreen} />
      <Tab.Screen name="Scan QR" component={QRScannerScreen} />
      {user?.role === 'ADMIN' && (
        <Tab.Screen name="Admin" component={AdminScreen} />
      )}
    </Tab.Navigator>
  );
}
