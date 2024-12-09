<template>
  <div class="min-h-screen bg-gray-100 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg">
        <!-- Header -->
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Account Settings</h3>
          <p class="mt-1 text-sm text-gray-500">Manage your account information and settings.</p>
        </div>

        <!-- Form -->
        <div class="px-4 py-5 sm:p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Profile Information -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-4">Profile Information</h4>
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                  <div class="mt-1">
                    <input 
                      type="text" 
                      id="username" 
                      v-model="formData.username"
                      class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <div class="mt-1">
                    <input 
                      type="email" 
                      id="email" 
                      v-model="formData.email"
                      class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                      readonly
                    />
                  </div>
                </div>

                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
                  <div class="mt-1">
                    <input 
                      type="text" 
                      id="firstName" 
                      v-model="formData.firstName"
                      class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
                  <div class="mt-1">
                    <input 
                      type="text" 
                      id="lastName" 
                      v-model="formData.lastName"
                      class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Change Password -->
            <div class="pt-6 border-t border-gray-200">
              <h4 class="text-md font-medium text-gray-900 mb-4">Change Password</h4>
              <div class="space-y-4">
                <div>
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700">Current Password</label>
                  <div class="mt-1">
                    <input 
                      type="password" 
                      id="currentPassword" 
                      v-model="formData.currentPassword"
                      class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
                  <div class="mt-1">
                    <input 
                      type="password" 
                      id="newPassword" 
                      v-model="formData.newPassword"
                      class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <div class="mt-1">
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      v-model="formData.confirmPassword"
                      class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Save Button -->
            <div class="pt-6 border-t border-gray-200">
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  :disabled="loading"
                >
                  <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'AccountSettings',
  setup() {
    const loading = ref(false)
    const formData = ref({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    onMounted(() => {
      // Load user data from localStorage or your auth store
      const userData = JSON.parse(localStorage.getItem('userData') || '{}')
      formData.value = {
        ...formData.value,
        username: userData.username || '',
        email: userData.email || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || ''
      }
    })

    const handleSubmit = async () => {
      loading.value = true
      try {
        // Validate passwords match
        if (formData.value.newPassword && formData.value.newPassword !== formData.value.confirmPassword) {
          alert('New passwords do not match')
          return
        }

        // Here you would typically make an API call to update the user's information
        // For now, we'll just update localStorage
        const userData = {
          username: formData.value.username,
          email: formData.value.email,
          firstName: formData.value.firstName,
          lastName: formData.value.lastName
        }
        localStorage.setItem('userData', JSON.stringify(userData))
        localStorage.setItem('userName', formData.value.username)

        alert('Settings updated successfully')
        
        // Clear password fields
        formData.value.currentPassword = ''
        formData.value.newPassword = ''
        formData.value.confirmPassword = ''
      } catch (error) {
        alert('Error updating settings')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    return {
      formData,
      loading,
      handleSubmit
    }
  }
}
</script>
