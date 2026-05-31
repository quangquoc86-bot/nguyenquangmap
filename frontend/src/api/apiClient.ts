import axios from 'axios';

// Change this to your backend server IP when running on physical device, e.g., 'http://192.168.1.5:3000/api'
// Localhost works for iOS Simulator. For Android Emulator, use 'http://10.0.2.2:3000/api'
const API_URL = 'http://localhost:3000/api'; 

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token if available (we will configure this later with Zustand)
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export default apiClient;
