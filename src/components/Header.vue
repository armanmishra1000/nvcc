<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo and Brand -->
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <div class="flex space-x-1">
              <div class="w-4 h-4 bg-orange-500 rounded-sm"></div>
              <div class="w-4 h-4 bg-orange-500/80 rounded-sm"></div>
              <div class="w-4 h-4 bg-orange-500/60 rounded-sm"></div>
            </div>
            <span class="ml-2 text-xl font-semibold text-gray-900">NVCC</span>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8" v-if="isAuthenticated">
        <!-- Navigation links removed - now handled by sidebar and user dropdown -->
        </div>

        <div v-else class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <router-link 
            to="/" 
            class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          >
            Home
          </router-link>
          <router-link 
            to="/login" 
            class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          >
            Login
          </router-link>
          <router-link 
            to="/register" 
            class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          >
            Register
          </router-link>
        </div>

        <!-- Right side buttons -->
        <div class="flex items-center">
          <!-- Language Selector -->
          <div class="flex items-center space-x-2 mr-4">
            <img src="https://flagcdn.com/w20/us.png" alt="English" class="w-5 h-auto">
            <span class="text-sm text-gray-700">English</span>
          </div>

          <!-- User Menu -->
          <div class="ml-3 relative" v-if="isAuthenticated">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 p-2 hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <div class="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                {{ userData.name.charAt(0).toUpperCase() }}
              </div>
              <span class="text-gray-700 font-medium group-hover:text-gray-900">{{ userData.name }}</span>
              <svg 
                class="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-transform duration-200" 
                :class="{ 'transform rotate-180': isUserMenuOpen }" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              v-show="isUserMenuOpen"
              v-click-outside="closeUserMenu"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 transform opacity-100 scale-100 transition-all duration-200"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <div class="py-1">
                <router-link
                  to="/account/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                  tabindex="-1"
                  @click="closeUserMenu"
                >
                  Account Settings
                </router-link>
              </div>
              <div class="py-1">
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                  tabindex="-1"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Spacer for fixed header -->
  <div class="h-16"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { authService } from '@/services/authService'
import { eventBus } from '@/utils/eventBus'
import { clickOutside } from '@/directives/clickOutside'

const router = useRouter()
const isUserMenuOpen = ref(false)
const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
const userData = ref({
  name: '',
  email: ''
})

const fetchUserData = async () => {
  if (!isAuthenticated.value) return
  
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    userData.value = response.data
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

// Listen for auth changes
const handleAuthChange = async (data) => {
  isAuthenticated.value = data.isAuthenticated;
  if (data.isAuthenticated) {
    await fetchUserData();
  } else {
    userData.value = { name: '', email: '' };
  }
};

onMounted(() => {
  eventBus.on('auth-change', handleAuthChange);
  if (isAuthenticated.value) {
    fetchUserData();
  }
});

onUnmounted(() => {
  eventBus.off('auth-change', handleAuthChange);
});

const logout = () => {
  authService.logout()
  isUserMenuOpen.value = false
  router.push('/login')
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
  isUserMenuOpen.value = false
}

// Register click-outside directive
const vClickOutside = clickOutside
</script>

<style scoped>
.group:hover .group-hover\:text-gray-900 {
  color: rgb(17, 24, 39);
}

.group:hover .group-hover\:text-gray-500 {
  color: rgb(107, 114, 128);
}
</style>
