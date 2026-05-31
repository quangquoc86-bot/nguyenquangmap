import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

export default function FamilyTreeScreen() {
  const { data: persons, isLoading, error } = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await apiClient.get('/persons');
      return response.data;
    }
  });

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
        <Text style={styles.errorText}>Failed to load family tree</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.details}>Gender: {item.gender}</Text>
      {item.dateOfBirth && (
        <Text style={styles.details}>DOB: {new Date(item.dateOfBirth).toLocaleDateString()}</Text>
      )}
      {item.bio && <Text style={styles.bio}>{item.bio}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={persons}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: SIZES.lg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SIZES.md,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.md,
    ...SHADOWS.small,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.xs,
  },
  details: {
    fontSize: 14,
    color: COLORS.text,
  },
  bio: {
    marginTop: SIZES.sm,
    fontSize: 14,
    color: COLORS.textLight,
    fontStyle: 'italic',
  }
});
