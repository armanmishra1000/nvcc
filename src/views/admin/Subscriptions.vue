<template>
  <AdminLayout>
    <div class="p-6">
      <h1 class="text-2xl font-semibold mb-6">Subscription Management</h1>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>

      <!-- Subscription List -->
      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cards Remaining</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Reset</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="sub in subscriptions" :key="sub.userId" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ sub.userName }}</div>
                      <div class="text-sm text-gray-500">{{ sub.userEmail }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': sub.plan === 'Nvcc Pro',
                      'bg-blue-100 text-blue-800': sub.plan === 'Nvcc Plus'
                    }">
                    {{ sub.plan }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(sub.startDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ sub.cardsRemaining }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(sub.lastResetDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="cancelSubscription(sub.userId)"
                    class="text-red-600 hover:text-red-900 mr-4">Cancel</button>
                  <button @click="resetCards(sub.userId)"
                    class="text-indigo-600 hover:text-indigo-900">Reset Cards</button>
                </td>
              </tr>
              <tr v-if="subscriptions.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                  No active subscriptions found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import axios from '@/services/axiosConfig'

export default {
  name: 'AdminSubscriptions',
  components: {
    AdminLayout
  },
  setup() {
    const subscriptions = ref([])
    const loading = ref(false)

    const fetchSubscriptions = async () => {
      try {
        loading.value = true
        const response = await axios.get('/api/users')
        const users = response.data

        // Filter and map users with active subscriptions
        subscriptions.value = users
          .filter(user => user.subscription?.plan)
          .map(user => ({
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            plan: user.subscription.plan,
            startDate: user.subscription.startDate,
            cardsRemaining: user.subscription.cardsRemaining,
            lastResetDate: user.subscription.lastResetDate
          }))
      } catch (error) {
        console.error('Error fetching subscriptions:', error)
      } finally {
        loading.value = false
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const cancelSubscription = async (userId) => {
      try {
        if (!confirm('Are you sure you want to cancel this subscription?')) return
        
        await axios.post(`/api/subscription-requests/${userId}/cancel`)
        await fetchSubscriptions() // Refresh the list
      } catch (error) {
        console.error('Error cancelling subscription:', error)
        alert('Failed to cancel subscription')
      }
    }

    const resetCards = async (userId) => {
      try {
        if (!confirm('Are you sure you want to reset the card count for this user?')) return
        
        await axios.post('/api/users/reset-card-count', { userId })
        await fetchSubscriptions() // Refresh the list
      } catch (error) {
        console.error('Error resetting cards:', error)
        alert('Failed to reset cards')
      }
    }

    onMounted(() => {
      fetchSubscriptions()
    })

    return {
      subscriptions,
      loading,
      formatDate,
      cancelSubscription,
      resetCards
    }
  }
}
</script>
