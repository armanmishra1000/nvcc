import { eventBus } from '@/utils/eventBus';
import axios from 'axios';

const API_URL = process.env.VUE_APP_API_BASE_URL;

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
        userId: data.user.id
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
        userId: data.user.id
      });
      
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Login failed';
    }
  },

  logout() {
    // Clear auth state
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    
    // Emit auth change event
    eventBus.emit('auth-change', {
      isAuthenticated: false,
      userId: null
    });
  }
};
