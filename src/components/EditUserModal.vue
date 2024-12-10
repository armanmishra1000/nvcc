<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Edit User</h3>
              <div class="mt-4 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" v-model="formData.name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" v-model="formData.email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Status</label>
                  <select v-model="formData.status" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Plan</label>
                  <select v-model="formData.subscriptionPlan" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                    <option value="Free">Free</option>
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button @click="save" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm">
            Save
          </button>
          <button @click="close" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'EditUserModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const formData = ref({
      name: '',
      email: '',
      status: 'active',
      subscriptionPlan: 'Free'
    })

    // Watch for changes in the user prop and update form data
    watch(() => props.user, (newUser) => {
      if (newUser) {
        formData.value = {
          name: newUser.name || '',
          email: newUser.email || '',
          status: newUser.status || 'active',
          subscriptionPlan: newUser.subscriptionPlan || 'Free'
        }
      }
    }, { immediate: true })

    const save = () => {
      emit('save', { ...formData.value })
    }

    const close = () => {
      emit('close')
    }

    return {
      formData,
      save,
      close
    }
  }
}
</script>
