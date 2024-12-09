<template>
  <div class="min-h-screen bg-gray-100">
    <DashboardNav />
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
import DashboardNav from '@/components/DashboardNav.vue'

export default defineComponent({
  name: 'AppDashboard',
  components: {
    DashboardNav
  },
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
