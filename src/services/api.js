import axios from 'axios';
import { mockAuthAPI } from './mockAuth.js';

// Base API URL - you can configure this in environment variables
const API_BASE_URL = 'http://localhost:5000/api'; // Adjust this to your backend URL
const USE_MOCK_API = true; // Set to false when backend is available

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API functions
export const authAPI = {
  // Login user
  login: async (email, password) => {
    if (USE_MOCK_API) {
      return await mockAuthAPI.login(email, password);
    }
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      // Fallback to mock if backend is not available
      console.warn('Backend not available, using mock API');
      return await mockAuthAPI.login(email, password);
    }
  },

  // Register user
  register: async (email, name, password) => {
    if (USE_MOCK_API) {
      return await mockAuthAPI.register(email, name, password);
    }
    try {
      const response = await api.post('/auth/register', { 
        email, 
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ')[1] || '',
        password 
      });
      return response.data;
    } catch (error) {
      // Fallback to mock if backend is not available
      console.warn('Backend not available, using mock API');
      return await mockAuthAPI.register(email, name, password);
    }
  },

  // Logout user
  logout: async () => {
    if (USE_MOCK_API) {
      return await mockAuthAPI.logout();
    }
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      // Fallback to mock if backend is not available
      console.warn('Backend not available, using mock API');
      return await mockAuthAPI.logout();
    }
  },

  // Get current user
  getCurrentUser: async () => {
    if (USE_MOCK_API) {
      return { success: true, data: JSON.parse(localStorage.getItem('user') || '{}') };
    }
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.warn('Backend not available for user data');
      return { success: true, data: JSON.parse(localStorage.getItem('user') || '{}') };
    }
  }
};

export default api;