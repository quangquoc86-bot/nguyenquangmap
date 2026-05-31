import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // In a real app, use react-native-map-clustering
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';
import { COLORS } from '../../constants/theme';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  // Fetch graves from the API
  const { data: graves, isLoading, error } = useQuery({
    queryKey: ['graves'],
    queryFn: async () => {
      const response = await apiClient.get('/graves');
      return response.data;
    }
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load map data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.coords.latitude : 21.0285, // Default to Hanoi
          longitude: location ? location.coords.longitude : 105.8542,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {graves?.map((grave: any) => (
          <Marker
            key={grave.id}
            coordinate={{ latitude: grave.latitude, longitude: grave.longitude }}
            title={grave.person?.firstName + ' ' + grave.person?.lastName}
            description={grave.cemeteryName}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
  }
});
