export const COLORS = {
  primary: '#4F46E5', // Indigo 600
  primaryLight: '#818CF8',
  primaryDark: '#3730A3',
  secondary: '#10B981', // Emerald 500
  background: '#F9FAFB', // Gray 50
  surface: '#FFFFFF',
  text: '#111827', // Gray 900
  textLight: '#6B7280', // Gray 500
  error: '#EF4444',
  border: '#E5E7EB',
  white: '#FFFFFF',
  black: '#000000',
  glass: 'rgba(255, 255, 255, 0.7)',
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  radius: 12,
  buttonRadius: 25,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5.46,
    elevation: 9,
  },
};

export default { COLORS, SIZES, SHADOWS };
