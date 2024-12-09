// Mock data for development
const mockPayments = [
  {
    id: '1',
    date: '2024-12-09',
    description: 'Online Purchase - Amazon',
    card: '**** 1234',
    payment: 'Credit Card',
    amount: 299.99,
    status: 'Success'
  },
  {
    id: '2',
    date: '2024-12-08',
    description: 'Card Top-up',
    card: '**** 5678',
    payment: 'Bank Transfer',
    amount: 1000.00,
    status: 'Success'
  },
  {
    id: '3',
    date: '2024-12-07',
    description: 'Failed Transaction',
    card: '**** 1234',
    payment: 'Credit Card',
    amount: 150.00,
    status: 'Declined'
  },
  {
    id: '4',
    date: '2024-12-06',
    description: 'Refund - Online Store',
    card: '**** 1234',
    payment: 'Refund',
    amount: 50.00,
    status: 'Refund'
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const paymentService = {
  async getAllPayments() {
    try {
      // Simulate API delay
      await delay(1000);
      return mockPayments;
    } catch (error) {
      throw new Error('Failed to fetch payments');
    }
  },

  async getPaymentStats() {
    try {
      await delay(500);
      const stats = {
        success: {
          amount: mockPayments
            .filter(p => p.status === 'Success')
            .reduce((sum, p) => sum + p.amount, 0)
            .toFixed(2)
        },
        declined: {
          amount: mockPayments
            .filter(p => p.status === 'Declined')
            .reduce((sum, p) => sum + p.amount, 0)
            .toFixed(2)
        },
        refund: {
          amount: mockPayments
            .filter(p => p.status === 'Refund')
            .reduce((sum, p) => sum + p.amount, 0)
            .toFixed(2)
        },
        potentialCashback: {
          amount: (mockPayments
            .filter(p => p.status === 'Success')
            .reduce((sum, p) => sum + p.amount, 0) * 0.02)
            .toFixed(2)
        }
      };
      return stats;
    } catch (error) {
      throw new Error('Failed to fetch payment statistics');
    }
  },

  async filterPayments({ startDate, endDate, status, card }) {
    try {
      await delay(500);
      let filtered = [...mockPayments];

      if (startDate && endDate) {
        filtered = filtered.filter(p => {
          const paymentDate = new Date(p.date);
          return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
        });
      }

      if (status) {
        filtered = filtered.filter(p => p.status === status);
      }

      if (card) {
        filtered = filtered.filter(p => p.card === card);
      }

      return filtered;
    } catch (error) {
      throw new Error('Failed to filter payments');
    }
  }
};
