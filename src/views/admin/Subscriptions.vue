<template>
  <admin-layout>
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Subscription Management</h3>
        <button class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
          Add Plan
        </button>
      </div>

      <!-- Plans Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Users</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="plan in plans" :key="plan.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ plan.name }}</div>
                <div class="text-sm text-gray-500">{{ plan.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${{ plan.price }}/month</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ plan.activeUsers }}</div>
                <div class="text-xs text-gray-500">Active subscribers</div>
              </td>
              <td class="px-6 py-4">
                <ul class="text-sm text-gray-500">
                  <li v-for="(feature, index) in plan.features" :key="index">
                    • {{ feature }}
                  </li>
                </ul>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]">
                  {{ plan.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-orange-600 hover:text-orange-900 mr-3">Edit</button>
                <button class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Recent Subscriptions -->
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Subscriptions</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="subscription in recentSubscriptions" :key="subscription.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <span class="text-orange-600 font-medium">{{ subscription.user.name.charAt(0) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ subscription.user.name }}</div>
                    <div class="text-sm text-gray-500">{{ subscription.user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ subscription.plan }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ subscription.startDate }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ subscription.endDate }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]">
                  {{ subscription.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </admin-layout>
</template>

<script>
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

export default {
  name: 'AdminSubscriptions',
  components: {
    AdminLayout
  },
  setup() {
    const plans = ref([
      {
        id: 1,
        name: 'Basic Plan',
        description: 'For individual users',
        price: 9.99,
        activeUsers: 245,
        features: [
          'Up to 5 cards',
          'Basic wallet features',
          'Email support'
        ],
        status: 'active'
      },
      {
        id: 2,
        name: 'Premium Plan',
        description: 'For power users',
        price: 19.99,
        activeUsers: 583,
        features: [
          'Unlimited cards',
          'Advanced wallet features',
          'Priority support',
          'Custom branding'
        ],
        status: 'active'
      },
      {
        id: 3,
        name: 'Enterprise Plan',
        description: 'For large organizations',
        price: 49.99,
        activeUsers: 127,
        features: [
          'Unlimited everything',
          'Dedicated support',
          'API access',
          'Custom integration'
        ],
        status: 'active'
      }
    ])

    const recentSubscriptions = ref([
      {
        id: 1,
        user: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        plan: 'Premium Plan',
        startDate: 'Jan 1, 2024',
        endDate: 'Dec 31, 2024',
        status: 'active'
      },
      {
        id: 2,
        user: {
          name: 'Jane Smith',
          email: 'jane@example.com'
        },
        plan: 'Basic Plan',
        startDate: 'Jan 5, 2024',
        endDate: 'Jan 4, 2025',
        status: 'active'
      },
      {
        id: 3,
        user: {
          name: 'Bob Johnson',
          email: 'bob@example.com'
        },
        plan: 'Enterprise Plan',
        startDate: 'Jan 10, 2024',
        endDate: 'Jan 9, 2025',
        status: 'active'
      }
    ])

    return {
      plans,
      recentSubscriptions
    }
  }
}
</script>
