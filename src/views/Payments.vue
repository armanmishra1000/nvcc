<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Payments</h1>
      <div class="flex items-center space-x-4">
        <div class="flex items-center">
          <span class="mr-2">PRO mode</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="proMode" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div class="flex space-x-2">
          <button @click="exportData('csv')" class="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
            CSV
          </button>
          <button @click="exportData('xlsx')" class="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
            XLSX
          </button>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex space-x-4 mb-6">
      <div class="relative">
        <button @click="toggleDropdown('view')" class="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center">
          View Payments
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      <div class="relative">
        <button @click="toggleDropdown('date')" class="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center">
          Date
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      <div class="relative">
        <button @click="toggleDropdown('status')" class="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center">
          Status
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      <div class="relative">
        <button @click="toggleDropdown('cards')" class="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center">
          Cards
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="p-4 bg-green-50 rounded-lg">
        <h3 class="text-green-600 mb-2">Success</h3>
        <p class="text-xl font-semibold">{{ stats.success.amount }}$</p>
      </div>
      <div class="p-4 bg-red-50 rounded-lg">
        <h3 class="text-red-600 mb-2">Declined</h3>
        <p class="text-xl font-semibold">{{ stats.declined.amount }}$</p>
      </div>
      <div class="p-4 bg-blue-50 rounded-lg">
        <h3 class="text-blue-600 mb-2">Refund</h3>
        <p class="text-xl font-semibold">{{ stats.refund.amount }}$</p>
      </div>
      <div class="p-4 bg-yellow-50 rounded-lg">
        <h3 class="text-yellow-600 mb-2">Potential cashback</h3>
        <p class="text-xl font-semibold">{{ stats.potentialCashback.amount }}$</p>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden" v-if="!loading">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="payments.length === 0">
            <td colspan="6" class="px-6 py-4 text-center text-gray-500">
              Payments not found
            </td>
          </tr>
          <tr v-for="payment in payments" :key="payment.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ payment.date }}</td>
            <td class="px-6 py-4">{{ payment.description }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ payment.card }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ payment.payment }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ payment.amount }}$</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="{
                'px-2 py-1 text-sm rounded-full': true,
                'bg-green-100 text-green-800': payment.status === 'Success',
                'bg-red-100 text-red-800': payment.status === 'Declined',
                'bg-blue-100 text-blue-800': payment.status === 'Refund'
              }">
                {{ payment.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { paymentService } from '@/services/paymentService';

export default {
  name: 'Payments',
  setup() {
    const payments = ref([]);
    const loading = ref(true);
    const proMode = ref(false);
    const stats = ref({
      success: { amount: '0.00' },
      declined: { amount: '0.00' },
      refund: { amount: '0.00' },
      potentialCashback: { amount: '0.00' }
    });

    const fetchPayments = async () => {
      try {
        loading.value = true;
        payments.value = await paymentService.getAllPayments();
        const paymentStats = await paymentService.getPaymentStats();
        stats.value = paymentStats;
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        loading.value = false;
      }
    };

    const toggleDropdown = (type) => {
      // Implement dropdown toggle logic
      console.log('Toggle dropdown:', type);
    };

    const exportData = (format) => {
      // Implement export logic
      console.log('Export data as:', format);
    };

    onMounted(() => {
      fetchPayments();
    });

    return {
      payments,
      loading,
      proMode,
      stats,
      toggleDropdown,
      exportData
    };
  }
};
</script>
