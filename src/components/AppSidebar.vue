<template>
  <div class="flex flex-col h-full bg-white border-r border-gray-200">
    <nav class="mt-5 px-2">
      <router-link to="/dashboard" class="group flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" :class="{ 'bg-gray-50 border-l-4 border-orange-500': $route.path === '/dashboard' }">
        <svg class="mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Dashboard
      </router-link>

      <router-link to="/accounts" class="mt-1 group flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" :class="{ 'bg-gray-50 border-l-4 border-orange-500': $route.path === '/accounts' }">
        <svg class="mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        My accounts
      </router-link>

      <router-link to="/cards" class="mt-1 group flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" :class="{ 'bg-gray-50 border-l-4 border-orange-500': $route.path === '/cards' }">
        <svg class="mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        My cards
      </router-link>

      <router-link to="/payments" class="mt-1 group flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" :class="{ 'bg-gray-50 border-l-4 border-orange-500': $route.path === '/payments' }">
        <svg class="mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Payments
      </router-link>

      <router-link to="/private" class="mt-1 group flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" :class="{ 'bg-gray-50 border-l-4 border-orange-500': $route.path === '/private' }">
        <svg class="mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Private
        <span class="ml-auto inline-block px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-600 rounded">HOT</span>
      </router-link>

      <router-link to="/team" class="mt-1 group flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" :class="{ 'bg-gray-50 border-l-4 border-orange-500': $route.path === '/team' }">
        <svg class="mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Team
      </router-link>

      <router-link to="/friends" class="mt-1 group flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" :class="{ 'bg-gray-50 border-l-4 border-orange-500': $route.path === '/friends' }">
        <svg class="mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        For friends
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar'
}
</script>
