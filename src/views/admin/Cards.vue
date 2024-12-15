<template>
  <admin-layout>
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Cards Management</h3>
        <button
          @click="openAddCardModal"
          class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Add Card Type
        </button>
      </div>

      <!-- Search and Filter -->
      <div class="px-4 py-3 border-b border-gray-200 sm:px-6 flex gap-4">
        <div class="flex-1">
          <input
            type="text"
            placeholder="Search cards..."
            class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="flex gap-2">
          <select class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block sm:text-sm border-gray-300 rounded-md">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
          <select class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block sm:text-sm border-gray-300 rounded-md">
            <option value="">All Types</option>
            <option value="virtual">Virtual</option>
            <option value="physical">Physical</option>
          </select>
        </div>
      </div>

      <!-- Cards Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card Details</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="card in cards" :key="card.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md flex items-center justify-center text-white text-xs">
                    {{ card.lastFour }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">**** **** **** {{ card.lastFour }}</div>
                    <div class="text-sm text-gray-500">Expires: {{ card.expiry }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ card.owner?.name || 'Unassigned' }}</div>
                <div class="text-sm text-gray-500">{{ card.owner?.email || 'No email' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  card.type === 'virtual' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                ]">
                  {{ card.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ card.balance.toFixed(2) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  card.status === 'active' ? 'bg-green-100 text-green-800' :
                  card.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                ]">
                  {{ card.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="openEditCardModal(card)"
                  class="text-orange-600 hover:text-orange-900 mr-3"
                >
                  View
                </button>
                <button class="text-red-600 hover:text-red-900">Block</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">45</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Card Modal -->
    <div v-if="showCardModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div class="absolute top-0 right-0 pt-4 pr-4">
            <button
              @click="closeCardModal"
              class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {{ editingCard ? 'Edit Card' : 'Add New Card' }}
              </h3>
              
              <div class="mt-4 space-y-4">
                <!-- Card Number -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    v-model="cardForm.number"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="**** **** **** ****"
                  />
                </div>

                <!-- Card Type -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">Card Type</label>
                  <select
                    v-model="cardForm.type"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="amex">American Express</option>
                  </select>
                </div>

                <!-- Expiry Date -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Expiry Month</label>
                    <select
                      v-model="cardForm.expiryMonth"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    >
                      <option v-for="month in 12" :key="month" :value="month.toString().padStart(2, '0')">
                        {{ month.toString().padStart(2, '0') }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Expiry Year</label>
                    <select
                      v-model="cardForm.expiryYear"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    >
                      <option v-for="year in 10" :key="year" :value="(currentYear + year).toString()">
                        {{ currentYear + year }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- CVV -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    v-model="cardForm.cvv"
                    maxlength="4"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="***"
                  />
                </div>

                <!-- Card Holder -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">Card Holder Name</label>
                  <input
                    type="text"
                    v-model="cardForm.holderName"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>

                <!-- Initial Balance -->
                <div>
                  <label class="block text-sm font-medium text-gray-700">Initial Balance</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      v-model="cardForm.balance"
                      class="pl-7 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="saveCard"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ editingCard ? 'Save Changes' : 'Add Card' }}
            </button>
            <button
              type="button"
              @click="closeCardModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from '@/services/axiosConfig'
import AdminLayout from '@/layouts/AdminLayout.vue'

export default {
  name: 'AdminCards',
  components: {
    AdminLayout
  },
  setup() {
    const showCardModal = ref(false)
    const editingCard = ref(null)
    const currentYear = new Date().getFullYear()
    const cards = ref([])

    const cardForm = ref({
      number: '',
      type: 'visa',
      expiryMonth: '01',
      expiryYear: currentYear.toString(),
      cvv: '',
      holderName: '',
      balance: 0,
    })

    // Fetch cards data
    const fetchCards = async () => {
      try {
        const response = await axios.get('/api/admin/cards')
        cards.value = response.data
      } catch (error) {
        console.error('Error fetching cards:', error)
      }
    }

    // Call fetchCards when component mounts
    onMounted(() => {
      fetchCards()
    })

    const openAddCardModal = () => {
      editingCard.value = null
      cardForm.value = {
        number: '',
        type: 'visa',
        expiryMonth: '01',
        expiryYear: currentYear.toString(),
        cvv: '',
        holderName: '',
        balance: 0,
      }
      showCardModal.value = true
    }

    const openEditCardModal = (card) => {
      editingCard.value = card
      const [expiryMonth, expiryYear] = (card.expiry || '01/24').split('/')
      cardForm.value = {
        number: card.number ? `**** **** **** ${card.lastFour}` : '',
        type: card.type || 'visa',
        expiryMonth: expiryMonth || '01',
        expiryYear: expiryYear ? `20${expiryYear}` : new Date().getFullYear().toString(),
        cvv: '',
        holderName: card.owner?.name || '',
        balance: card.balance || 0,
      }
      showCardModal.value = true
    }

    const closeCardModal = () => {
      showCardModal.value = false
      editingCard.value = null
    }

    const saveCard = async () => {
      try {
        if (editingCard.value) {
          // Update existing card
          await axios.put(`/api/admin/cards/${editingCard.value.id}`, {
            number: cardForm.value.number,
            type: cardForm.value.type,
            expiryMonth: cardForm.value.expiryMonth,
            expiryYear: cardForm.value.expiryYear,
            cvv: cardForm.value.cvv,
            holderName: cardForm.value.holderName,
            balance: parseFloat(cardForm.value.balance)
          })
        } else {
          // Add new card
          await axios.post('/api/admin/cards', {
            number: cardForm.value.number,
            type: cardForm.value.type,
            expiryMonth: cardForm.value.expiryMonth,
            expiryYear: cardForm.value.expiryYear,
            cvv: cardForm.value.cvv,
            holderName: cardForm.value.holderName,
            balance: parseFloat(cardForm.value.balance)
          })
        }
        // Refresh cards list
        await fetchCards()
        closeCardModal()
      } catch (error) {
        console.error('Error saving card:', error)
        // Here you might want to show an error message to the user
      }
    }

    return {
      cards,
      showCardModal,
      editingCard,
      cardForm,
      currentYear,
      openAddCardModal,
      openEditCardModal,
      closeCardModal,
      saveCard
    }
  }
}
</script>
