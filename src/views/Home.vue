<template>
  <div class="min-h-screen bg-gradient-to-b from-[#1C1E21] to-[#121417] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to NVCC
        </h1>
        <p class="mt-5 max-w-xl mx-auto text-xl text-gray-400">
          Your modern Vue.js application with a beautiful design
        </p>
        <div class="mt-8 flex justify-center space-x-4">
          <router-link
            to="/login"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600"
          >
            Sign in
          </router-link>
          <router-link
            to="/register"
            class="inline-flex items-center px-6 py-3 border border-orange-500 text-base font-medium rounded-lg text-orange-500 hover:bg-orange-500 hover:text-white"
          >
            Create account
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHome'
}
</script>
