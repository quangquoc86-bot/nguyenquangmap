import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';

export default function AdminScreen() {
  const { user } = useAuthStore();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // In a real app, you'd have an admin endpoint to list users
      return [
        { id: '1', email: 'admin@mapmo.com', role: 'ADMIN' },
        { id: '2', email: 'user@family.com', role: 'USER' },
      ];
    }
  });

  if (user?.role !== 'ADMIN') {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Access Denied. Admins only.</Text>
      </View>
    );
  }

  const renderUser = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.role}>Role: {item.role}</Text>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Management</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: SIZES.lg,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    margin: SIZES.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SIZES.md,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.md,
    ...SHADOWS.small,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  role: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: SIZES.xs,
    marginBottom: SIZES.sm,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.md,
    borderRadius: SIZES.buttonRadius,
    marginLeft: SIZES.sm,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 18,
    fontWeight: 'bold',
  }
});
