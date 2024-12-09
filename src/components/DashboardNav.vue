<template>
  <nav class="bg-white border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex space-x-8 h-14">
        <router-link 
          to="/dashboard" 
          class="border-orange-500 text-gray-900 inline-flex items-center px-1 border-b-2 text-sm font-medium"
          :class="{ 'border-orange-500': $route.path === '/dashboard' }"
        >
          Overview
        </router-link>
        <router-link 
          to="/dashboard/projects" 
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 border-b-2 text-sm font-medium"
          :class="{ 'border-orange-500': $route.path === '/dashboard/projects' }"
        >
          Projects
        </router-link>
        <router-link 
          to="/dashboard/tasks" 
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 border-b-2 text-sm font-medium"
          :class="{ 'border-orange-500': $route.path === '/dashboard/tasks' }"
        >
          Tasks
        </router-link>
        <router-link 
          to="/dashboard/reports" 
          class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 border-b-2 text-sm font-medium"
          :class="{ 'border-orange-500': $route.path === '/dashboard/reports' }"
        >
          Reports
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'DashboardNav'
}
</script>
