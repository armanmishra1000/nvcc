<!-- src/views/admin/SubscriptionRequests.vue -->
<template>
  <admin-layout>
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Subscription Requests
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Manage pending subscription requests from users
        </p>
      </div>

      <!-- Request List -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="request in subscriptionRequests" :key="request._id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ request.user.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ request.user.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-purple-100 text-purple-800': request.plan === 'Nvcc Pro',
                    'bg-blue-100 text-blue-800': request.plan === 'Nvcc Plus'
                  }">
                  {{ request.plan }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ request.paymentMethod }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(request.requestDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-yellow-100 text-yellow-800': request.status === 'pending',
                    'bg-green-100 text-green-800': request.status === 'approved',
                    'bg-red-100 text-red-800': request.status === 'rejected',
                    'bg-gray-100 text-gray-800': request.status === 'cancelled'
                  }">
                  {{ request.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  v-if="request.status === 'pending'"
                  @click="approveRequest(request._id)"
                  class="text-green-600 hover:text-green-900 mr-4">
                  Approve
                </button>
                <button
                  v-if="request.status === 'pending'"
                  @click="rejectRequest(request._id)"
                  class="text-red-600 hover:text-red-900">
                  Reject
                </button>
                <button
                  v-if="request.status === 'approved'"
                  @click="cancelSubscription(request.user._id)"
                  class="text-orange-600 hover:text-orange-900">
                  Cancel Subscription
                </button>
                <button
                  v-if="request.status === 'cancelled'"
                  @click="reactivateSubscription(request._id)"
                  class="text-blue-600 hover:text-blue-900">
                  Reactivate Subscription
                </button>
              </td>
            </tr>
            <!-- Empty state -->
            <tr v-if="subscriptionRequests.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                No subscription requests found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </admin-layout>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from '@/services/axiosConfig'
import AdminLayout from '@/layouts/AdminLayout.vue'

export default {
  name: 'SubscriptionRequests',
  components: {
    AdminLayout
  },
  setup() {
    const subscriptionRequests = ref([])

    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/subscription-requests')
        subscriptionRequests.value = response.data
      } catch (error) {
        console.error('Error fetching subscription requests:', error)
      }
    }

    const approveRequest = async (requestId) => {
      try {
        await axios.post(`/api/subscription-requests/${requestId}/approve`)
        await fetchRequests()
      } catch (error) {
        console.error('Error approving request:', error)
        alert(error.response?.data?.message || 'Error approving request')
      }
    }

    const rejectRequest = async (requestId) => {
      try {
        await axios.post(`/api/subscription-requests/${requestId}/reject`)
        await fetchRequests()
      } catch (error) {
        console.error('Error rejecting request:', error)
        alert(error.response?.data?.message || 'Error rejecting request')
      }
    }

    const cancelSubscription = async (userId) => {
      try {
        const response = await axios.post(`/api/subscription-requests/${userId}/cancel`)
        console.log('Cancel subscription response:', response.data)
        // Force an immediate refresh of the data
        await fetchRequests()
        // Show success message
        alert('Subscription cancelled successfully')
      } catch (error) {
        console.error('Error cancelling subscription:', error.response?.data || error)
        alert(error.response?.data?.message || 'Error cancelling subscription')
      }
    }

    const reactivateSubscription = async (requestId) => {
      try {
        const response = await axios.post(`/api/subscription-requests/${requestId}/reactivate`)
        console.log('Reactivate subscription response:', response.data)
        await fetchRequests()
      } catch (error) {
        console.error('Error reactivating subscription:', error.response?.data || error)
        alert(error.response?.data?.message || 'Error reactivating subscription')
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    onMounted(() => {
      fetchRequests()
    })

    return {
      subscriptionRequests,
      approveRequest,
      rejectRequest,
      cancelSubscription,
      reactivateSubscription,
      formatDate
    }
  }
}
</script>
