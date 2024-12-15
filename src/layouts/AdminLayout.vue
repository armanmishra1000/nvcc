<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <!-- Sidebar -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <div class="flex flex-col h-0 flex-1">
          <div class="flex items-center h-16 flex-shrink-0 px-4 bg-orange-600">
            <span class="text-xl font-semibold text-white">NVCC Admin</span>
          </div>
          <div class="flex-1 flex flex-col overflow-y-auto bg-orange-700">
            <nav class="flex-1 px-2 py-4 space-y-1">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  $route.path === item.href
                    ? 'bg-orange-800 text-white'
                    : 'text-orange-100 hover:bg-orange-600',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    $route.path === item.href ? 'text-orange-100' : 'text-orange-200',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </router-link>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <!-- Top header -->
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex items-center">
            <h1 class="text-2xl font-semibold text-gray-900">
              {{ currentPageTitle }}
            </h1>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <button
                @click="isUserMenuOpen = !isUserMenuOpen"
                class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <span class="sr-only">Open user menu</span>
                <div class="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  A
                </div>
              </button>

              <!-- Dropdown menu -->
              <div
                v-show="isUserMenuOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
              >
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main content area -->
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <slot></slot>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  InboxStackIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'AdminLayout',
  components: {
    HomeIcon,
    UsersIcon,
    CreditCardIcon,
    ClipboardDocumentListIcon,
    CurrencyDollarIcon,
    InboxStackIcon
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const isUserMenuOpen = ref(false)

    const navigation = [
      {
        name: 'Dashboard',
        href: '/admin',
        icon: HomeIcon
      },
      {
        name: 'Users',
        href: '/admin/users',
        icon: UsersIcon
      },
      {
        name: 'Subscription Requests',
        href: '/admin/subscription-requests',
        icon: InboxStackIcon
      },
      {
        name: 'Subscriptions',
        href: '/admin/subscriptions',
        icon: CreditCardIcon
      },
      {
        name: 'Cards',
        href: '/admin/cards',
        icon: CreditCardIcon
      },
      {
        name: 'Wallets',
        href: '/admin/wallets',
        icon: CurrencyDollarIcon
      }
    ]

    const currentPageTitle = computed(() => {
      const currentRoute = navigation.find(item => item.href === route.path)
      return currentRoute ? currentRoute.name : 'Admin Dashboard'
    })

    const logout = () => {
      localStorage.removeItem('isAdmin')
      router.push('/admin/login')
    }

    return {
      navigation,
      isUserMenuOpen,
      currentPageTitle,
      logout
    }
  }
}
</script>
