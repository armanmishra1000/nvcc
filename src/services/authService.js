import { eventBus } from '@/utils/eventBus';

const API_URL = 'http://localhost:5001/api/auth';

export const authService = {
  async register(userData) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    
    // Store token and user data
    localStorage.setItem('token', data.token);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', data.user.name);
    localStorage.setItem('isAdmin', data.user.isAdmin);
    
    // Emit auth change event
    eventBus.emit('auth-change', {
      isAuthenticated: true,
      userName: data.user.name,
      isAdmin: data.user.isAdmin
    });
    
    return data;
  },

  async login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    // Store token and user data
    localStorage.setItem('token', data.token);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', data.user.name);
    localStorage.setItem('isAdmin', data.user.isAdmin);
    
    // Emit auth change event
    eventBus.emit('auth-change', {
      isAuthenticated: true,
      userName: data.user.name,
      isAdmin: data.user.isAdmin
    });
    
    return data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    
    // Emit auth change event
    eventBus.emit('auth-change', {
      isAuthenticated: false,
      userName: null,
      isAdmin: false
    });
  }
};
