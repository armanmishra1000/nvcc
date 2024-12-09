<template>
  <header class="bg-white shadow-sm fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="flex items-center space-x-2">
              <div class="flex space-x-1">
                <span class="w-6 h-6 rounded bg-orange-500"></span>
                <span class="w-6 h-6 rounded bg-orange-400"></span>
                <span class="w-6 h-6 rounded bg-orange-300"></span>
              </div>
              <span class="text-2xl font-bold text-gray-800 ml-2">NVCC</span>
            </div>
          </div>
        </div>

        <!-- Navigation Items -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#" class="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors duration-200">
            <span class="text-orange-500">3%</span>
            <span>cashback</span>
          </a>
          <a href="#" class="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium">Cards</a>
          <a href="#" class="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium">Extension</a>
          <a href="#" class="flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-200">
            <img src="@/assets/chrome.png" alt="Chrome" class="w-6 h-6 hover:scale-110 transition-transform duration-200" />
          </a>
        </div>

        <!-- Right Side Items -->
        <div class="flex items-center space-x-6">
          <!-- Language Selector -->
          <div class="relative">
            <button class="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-orange-500 hover:text-orange-500 transition-all duration-200">
              <img src="@/assets/us-flag.png" alt="US Flag" class="w-5 h-5" />
              <span class="text-gray-700">English</span>
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <!-- Auth Buttons -->
          <button class="px-6 py-2 text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200">
            Sign in
          </button>
          <button class="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40">
            Sign up
            <span class="ml-1 font-normal">+</span>
          </button>
        </div>
      </div>
    </div>
  </header>
  <!-- Spacer for fixed header -->
  <div class="h-20"></div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
/* Optional: Add smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>
