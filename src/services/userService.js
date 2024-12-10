import axios from 'axios';

const API_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:5002';

export const userService = {
  async getAllUsers() {
    try {
      console.log('Making request to:', `${API_URL}/api/users`);
      console.log('Token:', localStorage.getItem('token'));
      
      const response = await axios.get(`${API_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log('Response received:', response);
      return response;  // Return the full response object
    } catch (error) {
      console.error('Error in getAllUsers:', error.response || error);
      throw error.response?.data?.message || error.message || 'Failed to fetch users';
    }
  },

  async updateUser(userId, userData) {
    try {
      console.log('Updating user:', userId, userData);
      const response = await axios.put(`${API_URL}/api/users/${userId}`, userData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Update response:', response);
      return response.data;
    } catch (error) {
      console.error('Error in updateUser:', error.response || error);
      throw error.response?.data?.message || error.message || 'Failed to update user';
    }
  },

  async updateUserStatus(userId, status) {
    try {
      console.log('Making request to:', `${API_URL}/api/users/${userId}/status`);
      console.log('Token:', localStorage.getItem('token'));
      console.log('Status:', status);
      
      const response = await axios.patch(
        `${API_URL}/api/users/${userId}/status`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      console.log('Response received:', response);
      return response.data;
    } catch (error) {
      console.error('Error in updateUserStatus:', error.response || error);
      throw error.response?.data?.message || error.message || 'Failed to update user status';
    }
  },

  async deleteUser(userId) {
    try {
      console.log('Making request to:', `${API_URL}/api/users/${userId}`);
      console.log('Token:', localStorage.getItem('token'));
      
      await axios.delete(`${API_URL}/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error in deleteUser:', error.response || error);
      throw error.response?.data?.message || error.message || 'Failed to delete user';
    }
  }
};
