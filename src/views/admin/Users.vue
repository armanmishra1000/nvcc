<template>
  <admin-layout>
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Users Management</h3>
        <button class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
          Add User
        </button>
      </div>
      
      <!-- Search and Filter -->
      <div class="px-4 py-3 border-b border-gray-200 sm:px-6 flex gap-4">
        <div class="flex-1">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search users..."
            class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="flex gap-2">
          <select 
            v-model="selectedStatus"
            class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <select 
            v-model="selectedPlan"
            class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">All Plans</option>
            <option value="Free">Free</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
      </div>

      <!-- Users Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading" class="text-center">
              <td colspan="5" class="px-6 py-4">
                <div class="flex justify-center items-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              </td>
            </tr>
            <tr v-else-if="!users.length" class="text-center">
              <td colspan="5" class="px-6 py-4 text-gray-500">
                No users found
              </td>
            </tr>
            <tr v-else v-for="user in filteredUsers" :key="user._id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <span class="text-orange-600 font-medium text-lg">
                        {{ user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U') }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name || 'Unnamed User' }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                  'bg-green-100 text-green-800': user.status === 'active',
                  'bg-red-100 text-red-800': user.status === 'suspended',
                  'bg-gray-100 text-gray-800': user.status === 'inactive' || !user.status
                }">
                  {{ user.status || 'N/A' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.subscriptionPlan || 'N/A' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(user.createdAt) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button @click="editUser(user)" class="text-orange-600 hover:text-orange-900">Edit</button>
                <button @click="deleteUser(user)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            @click="currentPage > 1 && (currentPage--)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button 
            @click="currentPage < totalPages && (currentPage++)"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ totalUsers }}</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="currentPage > 1 && (currentPage--)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  currentPage === page
                    ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="currentPage < totalPages && (currentPage++)"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <edit-user-modal 
      :show="showEditModal"
      :user="selectedUser"
      @close="closeEditModal"
      @save="saveUser"
    />
  </admin-layout>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { userService } from '@/services/userService'
import EditUserModal from '@/components/EditUserModal.vue'

export default {
  name: 'Users',
  components: {
    AdminLayout,
    EditUserModal
  },
  setup() {
    const users = ref([])  // Initialize as empty array
    const searchQuery = ref('')
    const selectedStatus = ref('')
    const selectedPlan = ref('')
    const currentPage = ref(1)
    const itemsPerPage = 10
    const loading = ref(false)
    const totalItems = ref(0)
    const totalPages = ref(1)
    const showEditModal = ref(false)
    const selectedUser = ref(null)

    const fetchUsers = async () => {
      try {
        loading.value = true
        console.log('Fetching users...');
        const response = await userService.getAllUsers()
        console.log('Response data:', JSON.stringify(response.data, null, 2));
        
        // Set users directly from response.data since it's already an array
        users.value = Array.isArray(response.data) ? response.data : []
        console.log('Users set:', users.value);
        console.log('Users length:', users.value.length);

        // Update pagination data based on actual users length
        totalItems.value = users.value.length
        totalPages.value = Math.ceil(users.value.length / itemsPerPage)
      } catch (error) {
        console.error('Failed to fetch users:', error)
        users.value = []
      } finally {
        loading.value = false
      }
    }

    const filteredUsers = computed(() => {
      console.log('Computing filtered users:', users.value);
      if (!Array.isArray(users.value)) {
        console.log('Users is not an array');
        return []
      }
      
      return users.value
        .filter(user => {
          const matchesSearch = !searchQuery.value || 
            user.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.value.toLowerCase())
          const matchesStatus = !selectedStatus.value || user.status === selectedStatus.value
          const matchesPlan = !selectedPlan.value || user.subscriptionPlan === selectedPlan.value 
          return matchesSearch && matchesStatus && matchesPlan
        })
        .slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
    })

    const totalUsers = computed(() => Array.isArray(users.value) ? users.value.length : 0)
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalUsers.value))

    const formatDate = (date) => {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const editUser = (user) => {
      console.log('Edit user:', user)
      selectedUser.value = user
      showEditModal.value = true
    }

    const closeEditModal = () => {
      showEditModal.value = false
      selectedUser.value = null
    }

    const saveUser = async (userData) => {
      try {
        loading.value = true
        await userService.updateUser(selectedUser.value._id, userData)
        await fetchUsers() // Refresh the users list
        showEditModal.value = false
        selectedUser.value = null
      } catch (error) {
        console.error('Failed to update user:', error)
      } finally {
        loading.value = false
      }
    }

    const deleteUser = async (user) => {
      if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        try {
          await userService.deleteUser(user._id)
          users.value = users.value.filter(u => u._id !== user._id)
        } catch (error) {
          console.error('Failed to delete user:', error)
        }
      }
    }

    onMounted(fetchUsers)

    return {
      users,
      searchQuery,
      selectedStatus,
      selectedPlan,
      currentPage,
      filteredUsers,
      totalUsers,
      totalPages,
      startIndex,
      endIndex,
      formatDate,
      editUser,
      deleteUser,
      loading,
      showEditModal,
      selectedUser,
      closeEditModal,
      saveUser
    }
  }
}
</script>
