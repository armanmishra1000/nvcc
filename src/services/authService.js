import { eventBus } from '@/utils/eventBus';
import axios from './axiosConfig';

const API_URL = process.env.VUE_APP_API_BASE_URL;

// Initialize auth state from localStorage
const initializeAuth = () => {
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (token && isAuthenticated) {
    eventBus.emit('auth-change', { isAuthenticated: true });
  } else {
    // Clear any inconsistent state
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    eventBus.emit('auth-change', { isAuthenticated: false });
  }
};

// Initialize on service import
initializeAuth();

export const authService = {
  async register(userData) {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        userData
      );
      
      const data = response.data;
      
      // Store token and basic auth state
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      
      // Emit auth change event
      eventBus.emit('auth-change', {
        isAuthenticated: true,
        user: data.user
      });
      
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Registration failed';
    }
  },

  async login(credentials) {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        credentials
      );
      
      const data = response.data;
      
      // Store token and basic auth state
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      
      // Emit auth change event
      eventBus.emit('auth-change', {
        isAuthenticated: true,
        user: data.user
      });
      
      return data;
    } catch (error) {
      // Clear any stale auth state on login failure
      this.logout();
      throw error.response?.data?.message || error.message || 'Login failed';
    }
  },

  logout() {
    // Clear auth state
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    
    // Emit auth change event
    eventBus.emit('auth-change', {
      isAuthenticated: false
    });
  },

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  getToken() {
    return localStorage.getItem('token');
  }
};
