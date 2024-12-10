<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-900">My Cards</h1>
        <button
          v-if="hasActivePlan"
          @click="openNewCardModal"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          :disabled="loading"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add New Card
        </button>
      </div>

      <!-- Error Alert -->
      <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading && !hasCheckedPlan" class="mt-8 flex justify-center">
        <div class="text-center">
          <svg class="animate-spin h-12 w-12 text-orange-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-4 text-gray-600">Loading your cards...</p>
        </div>
      </div>

      <!-- Welcome State (No Plan) -->
      <div v-else-if="hasCheckedPlan && !hasActivePlan" class="mt-8 flex flex-col items-center justify-center text-center">
        <div class="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1M3 6h3M3 14h3M3 18h3M21 6h-3M21 14h-3M21 18h-3M3 22h18a2 2 0 002-2V4a2 2 0 00-2-2H3a2 2 0 00-2 2v16a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-3">Welcome to NVCC!</h2>
        <p class="text-gray-600 mb-8 max-w-md">To start managing your cards, you'll need to purchase a plan first. Choose a plan that suits your needs.</p>
        <button
          @click="navigateToPlans"
          class="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
        >
          View Available Plans
        </button>
      </div>

      <!-- Cards Grid -->
      <div v-else class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="card in cards" :key="card.id" class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div class="p-6">
            <!-- Card Design -->
            <div 
              :class="[
                card.type === 'Credit Card' ? 'card-gradient-1' : 'card-gradient-2',
                'h-48 rounded-2xl p-6 flex flex-col justify-between'
              ]"
            >
              <div class="flex justify-between items-start">
                <div class="text-white">
                  <h3 class="text-xl font-semibold">{{ card.type }}</h3>
                  <p class="mt-1 text-sm opacity-80">{{ card.bank }}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              
              <div class="text-white mt-4">
                <p class="text-lg tracking-[0.3em] font-mono">•••• •••• •••• {{ card.lastFour }}</p>
                <div class="mt-4 flex justify-between items-end">
                  <div>
                    <p class="text-xs opacity-80">Card Holder</p>
                    <p class="font-semibold tracking-wide mt-1">{{ card.cardHolder }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs opacity-80">Expires</p>
                    <p class="font-semibold mt-1">{{ card.expiry }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Actions -->
            <div class="flex justify-between items-center mt-4">
              <button
                @click="viewTransactions(card.id)"
                class="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors duration-200"
              >
                View Transactions
              </button>
              <div class="flex space-x-2">
                <button
                  v-if="card.type === 'Credit Card'"
                  @click="toggleFreeze(card)"
                  class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <component :is="card.frozen ? LockClosedIcon : LockOpenIcon" class="h-5 w-5 text-gray-600" />
                </button>
                <button
                  v-if="card.type === 'Debit Card'"
                  class="p-2 rounded-full bg-orange-100"
                >
                  <LockClosedIcon class="h-5 w-5 text-orange-600" />
                </button>
                <button class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                  <EllipsisHorizontalIcon class="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <!-- Card Transactions (Expandable) -->
          <div v-if="expandedCard === card.id" class="border-t border-gray-200">
            <div class="p-4">
              <h3 class="text-lg font-medium text-gray-900">Recent Transactions</h3>
              <ul class="mt-4 space-y-4">
                <li v-for="transaction in card.transactions" :key="transaction.id" class="flex justify-between items-center">
                  <div class="flex items-center">
                    <div :class="[
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100',
                      'rounded-full p-2'
                    ]">
                      <component 
                        :is="transaction.type === 'credit' ? 'ArrowDownIcon' : 'ArrowUpIcon'"
                        class="h-5 w-5"
                        :class="transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'"
                      />
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900">{{ transaction.merchant }}</p>
                      <p class="text-xs text-gray-500">{{ transaction.date }}</p>
                    </div>
                  </div>
                  <p :class="[
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600',
                    'text-sm font-semibold'
                  ]">
                    {{ transaction.type === 'credit' ? '+' : '-' }}${{ transaction.amount }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Card Modal -->
    <TransitionRoot appear :show="isNewCardModalOpen" as="template">
      <Dialog as="div" @close="closeNewCardModal" class="relative z-10">
        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Add New Card
                </DialogTitle>

                <form @submit.prevent="addNewCard" class="mt-4 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      type="text"
                      v-model="newCard.number"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      placeholder="•••• •••• •••• ••••"
                    />
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input
                        type="text"
                        v-model="newCard.expiry"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700">CVV</label>
                      <input
                        type="text"
                        v-model="newCard.cvv"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        placeholder="•••"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Card Holder Name</label>
                    <input
                      type="text"
                      v-model="newCard.cardHolder"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Full Name"
                    />
                  </div>

                  <div class="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="closeNewCardModal"
                      class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-md"
                      :disabled="loading"
                    >
                      <span v-if="loading" class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </span>
                      <span v-else>Add Card</span>
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PlusIcon, LockClosedIcon, LockOpenIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const loading = ref(true)
const hasActivePlan = ref(false)
const hasCheckedPlan = ref(false)
const error = ref(null)
const cards = ref([])
const expandedCard = ref(null)
const isNewCardModalOpen = ref(false)
const newCard = ref({
  number: '',
  expiry: '',
  cvv: '',
  cardHolder: ''
})

onMounted(async () => {
  try {
    // Simulating API call to check plan status
    await new Promise(resolve => setTimeout(resolve, 1000))
    hasActivePlan.value = false // Set to false since no plan is purchased yet
    hasCheckedPlan.value = true
    loading.value = false
  } catch (err) {
    error.value = 'Failed to load card information'
    loading.value = false
  }
})

const navigateToPlans = () => {
  router.push('/plans')
}

const openNewCardModal = () => {
  isNewCardModalOpen.value = true
}

const closeNewCardModal = () => {
  isNewCardModalOpen.value = false
  newCard.value = {
    number: '',
    expiry: '',
    cvv: '',
    cardHolder: ''
  }
}

const addNewCard = async () => {
  try {
    loading.value = true
    // This will be implemented later when we have the cardService
    console.log('Adding new card:', newCard.value)
    closeNewCardModal()
  } catch (err) {
    error.value = 'Failed to add card. Please try again.'
    console.error('Error adding card:', err)
  } finally {
    loading.value = false
  }
}

const toggleFreeze = async (card) => {
  try {
    loading.value = true
    // This will be implemented later when we have the cardService
    console.log('Toggling freeze for card:', card.id)
    card.frozen = !card.frozen
  } catch (err) {
    error.value = 'Failed to update card status. Please try again.'
    console.error('Error updating card status:', err)
  } finally {
    loading.value = false
  }
}

const viewTransactions = async (cardId) => {
  if (expandedCard.value === cardId) {
    expandedCard.value = null
    return
  }

  try {
    loading.value = true
    // This will be implemented later when we have the cardService
    console.log('Viewing transactions for card:', cardId)
    expandedCard.value = cardId
  } catch (err) {
    error.value = 'Failed to load transactions. Please try again.'
    console.error('Error loading transactions:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card-gradient-1 {
  background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
}
.card-gradient-2 {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
}
</style>
