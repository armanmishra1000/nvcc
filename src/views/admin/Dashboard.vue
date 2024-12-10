<template>
  <admin-layout>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Users Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <UsersIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">1,234</div>
                  <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <ArrowUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                    <span class="sr-only">Increased by</span>
                    12%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Subscriptions -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <ClipboardDocumentListIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Active Subscriptions</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">845</div>
                  <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <ArrowUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                    <span class="sr-only">Increased by</span>
                    5.4%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Cards -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <CreditCardIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Cards</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">2,564</div>
                  <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <ArrowUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                    <span class="sr-only">Increased by</span>
                    7.8%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Balance -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <CurrencyDollarIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Balance</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">$1.2M</div>
                  <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <ArrowUpIcon class="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                    <span class="sr-only">Increased by</span>
                    15.3%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="mt-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
        </div>
        <ul class="divide-y divide-gray-200">
          <li v-for="activity in recentActivity" :key="activity.id" class="px-4 py-4 sm:px-6">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <component 
                  :is="activity.icon" 
                  class="h-6 w-6 text-gray-400" 
                  aria-hidden="true" 
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ activity.title }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ activity.description }}
                </p>
              </div>
              <div>
                <span class="text-sm text-gray-500">{{ activity.time }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </admin-layout>
</template>

<script>
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  UsersIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  ArrowUpIcon,
  UserPlusIcon,
  CreditCardIcon as CreditCardIconSolid,
  BanknotesIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'AdminDashboard',
  components: {
    AdminLayout,
    UsersIcon,
    CreditCardIcon,
    CurrencyDollarIcon,
    ClipboardDocumentListIcon,
    ArrowUpIcon
  },
  setup() {
    const recentActivity = ref([
      {
        id: 1,
        title: 'New User Registration',
        description: 'John Doe registered a new account',
        time: '5 minutes ago',
        icon: UserPlusIcon
      },
      {
        id: 2,
        title: 'New Card Added',
        description: 'Alice Smith added a new credit card',
        time: '10 minutes ago',
        icon: CreditCardIconSolid
      },
      {
        id: 3,
        title: 'Wallet Top-up',
        description: 'Bob Johnson topped up wallet with $500',
        time: '15 minutes ago',
        icon: BanknotesIcon
      },
      {
        id: 4,
        title: 'Subscription Upgrade',
        description: 'Emma Wilson upgraded to Premium plan',
        time: '30 minutes ago',
        icon: ClipboardDocumentListIcon
      }
    ])

    return {
      recentActivity
    }
  }
}
</script>
