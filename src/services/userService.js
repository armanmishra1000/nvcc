import axios from './axiosConfig';

const API_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:5002';

export const userService = {
  async getUserProfile() {
    try {
      const response = await axios.get(`${API_URL}/api/users/profile`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to fetch user profile';
    }
  },

  async updateUserProfile(profileData) {
    try {
      const response = await axios.put(`${API_URL}/api/users/profile`, profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to update profile';
    }
  },

  async getAllUsers() {
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to fetch users';
    }
  },

  async updateUserStatus(userId, status) {
    try {
      const response = await axios.patch(`${API_URL}/api/users/${userId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to update user status';
    }
  },

  async deleteUser(userId) {
    try {
      await axios.delete(`${API_URL}/api/users/${userId}`);
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to delete user';
    }
  },

  async updateUser(userId, userData) {
    try {
      const response = await axios.put(`${API_URL}/api/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Failed to update user';
    }
  }
};
