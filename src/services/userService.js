import axios from './axiosConfig';

const API_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:5002';

export const getSubscriptionMessage = (subscriptionStatus) => {
  if (!subscriptionStatus) {
    return {
      title: "Unlock Premium Virtual Card Features! ",
      message: "Level up your financial game with our premium virtual cards. Create multiple cards, track expenses, and enjoy exclusive benefits.",
      benefits: [
        " Create up to 50 virtual cards",
        "Instant card generation",
        "Enhanced security features",
        "Advanced expense tracking",
        "Custom spending limits"
      ],
      cta: "Get Started with Premium",
      ctaLink: "/subscriptions"
    };
  } else if (subscriptionStatus === 'pending') {
    return {
      title: "Your Request is Being Processed! ",
      message: "We've received your subscription request and our team is reviewing it. You can track your request status in the User Cards section.",
      status: "Processing",
      nextSteps: "We'll notify you once your subscription is approved. This usually takes 1-2 business days."
    };
  }
  return null;
};

export const getUserSubscriptionStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/subscription-requests/status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return null;
  }
};

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
