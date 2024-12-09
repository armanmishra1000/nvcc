<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Dashboard Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <!-- Logo -->
              <div class="flex space-x-1">
                <div class="w-4 h-4 bg-orange-500 rounded-sm"></div>
                <div class="w-4 h-4 bg-orange-500/80 rounded-sm"></div>
                <div class="w-4 h-4 bg-orange-500/60 rounded-sm"></div>
              </div>
              <span class="ml-2 text-xl font-semibold text-gray-900">Dashboard</span>
            </div>
            <!-- Navigation Links -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" class="border-orange-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Overview
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Projects
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Tasks
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Reports
              </a>
            </div>
          </div>
          <!-- User Menu -->
          <div class="flex items-center">
            <button @click="toggleNotifications" class="p-2 text-gray-500 hover:text-gray-700 relative">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span v-if="notifications.length" class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div class="ml-3 relative">
              <div>
                <button @click="toggleUserMenu" class="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" id="user-menu-button">
                  <img class="h-8 w-8 rounded-full" :src="user.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'" alt="">
                  <span class="ml-2 text-sm text-gray-700">{{ user.name }}</span>
                  <svg class="ml-1 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <!-- Dropdown menu -->
              <div v-if="showUserMenu" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                <div class="py-1">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                </div>
                <div class="py-1">
                  <a href="#" @click.prevent="logout" class="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100">Sign out</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in stats" :key="stat.name" class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <component :is="stat.icon" class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">{{ stat.name }}</dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">{{ stat.value }}</div>
                      <div :class="[stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']">
                        <component :is="stat.changeType === 'increase' ? 'ArrowUpIcon' : 'ArrowDownIcon'" class="self-center flex-shrink-0 h-4 w-4 text-current" />
                        <span class="sr-only">{{ stat.changeType === 'increase' ? 'Increased' : 'Decreased' }} by</span>
                        {{ stat.change }}
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
          <h2 class="text-lg leading-6 font-medium text-gray-900">Recent Activity</h2>
          <div class="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="activity in recentActivity" :key="activity.id">
                <div class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <img :src="activity.userAvatar" alt="" class="h-8 w-8 rounded-full">
                      <p class="ml-4 text-sm font-medium text-orange-600 truncate">{{ activity.user }}</p>
                    </div>
                    <div class="ml-2 flex-shrink-0 flex">
                      <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="activity.typeColor">
                        {{ activity.type }}
                      </p>
                    </div>
                  </div>
                  <div class="mt-2 sm:flex sm:justify-between">
                    <div class="sm:flex">
                      <p class="text-sm text-gray-500">{{ activity.description }}</p>
                    </div>
                    <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ activity.time }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, defineComponent, h } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppDashboard',
  setup() {
    const router = useRouter()
    const showUserMenu = ref(false)
    const notifications = ref([])

    // Simulated user data
    const user = ref({
      name: 'John Doe',
      email: 'john@example.com',
      avatar: null
    })

    // Simulated stats data
    const stats = ref([
      {
        name: 'Total Projects',
        value: '12',
        change: '12%',
        changeType: 'increase',
        icon: () => h('svg', { 
          class: 'w-6 h-6 text-orange-500',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor'
        }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
          })
        ])
      },
      {
        name: 'Active Tasks',
        value: '24',
        change: '5%',
        changeType: 'decrease',
        icon: () => h('svg', {
          class: 'w-6 h-6 text-orange-500',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor'
        }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
          })
        ])
      },
      {
        name: 'Team Members',
        value: '8',
        change: '2',
        changeType: 'increase',
        icon: () => h('svg', {
          class: 'w-6 h-6 text-orange-500',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor'
        }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
          })
        ])
      },
      {
        name: 'Completion Rate',
        value: '89%',
        change: '7%',
        changeType: 'increase',
        icon: () => h('svg', {
          class: 'w-6 h-6 text-orange-500',
          fill: 'none',
          viewBox: '0 0 24 24',
          stroke: 'currentColor'
        }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M9 19v-6a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
          })
        ])
      }
    ])

    // Simulated recent activity
    const recentActivity = ref([
      {
        id: 1,
        user: 'Sarah Wilson',
        userAvatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000001?d=mp&f=y',
        type: 'Completed',
        typeColor: 'bg-green-100 text-green-800',
        description: 'Completed the website redesign project',
        time: '2 hours ago'
      },
      {
        id: 2,
        user: 'Mike Johnson',
        userAvatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000002?d=mp&f=y',
        type: 'In Progress',
        typeColor: 'bg-yellow-100 text-yellow-800',
        description: 'Started working on the new feature implementation',
        time: '4 hours ago'
      },
      {
        id: 3,
        user: 'Emily Brown',
        userAvatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000003?d=mp&f=y',
        type: 'Review',
        typeColor: 'bg-blue-100 text-blue-800',
        description: 'Submitted the quarterly report for review',
        time: '6 hours ago'
      }
    ])

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
    }

    const toggleNotifications = () => {
      // Toggle notifications panel (to be implemented)
    }

    const logout = () => {
      // Implement logout logic here
      router.push('/login')
    }

    return {
      user,
      stats,
      recentActivity,
      showUserMenu,
      notifications,
      toggleUserMenu,
      toggleNotifications,
      logout
    }
  }
})
</script>
