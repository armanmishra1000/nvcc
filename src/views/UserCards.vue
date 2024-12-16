<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-bold text-gray-900">Virtual Cards</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div v-if="error" class="mb-3 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
        {{ error }}
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-48">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>

      <div v-else>
        <!-- No Plan Warning -->
        <div v-if="hasCheckedPlan && !subscription?.plan && !pendingSubscription" class="mb-6">
          <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg overflow-hidden">
            <div class="px-6 py-8">
              <div class="md:flex items-center justify-between">
                <div class="md:w-1/2 mb-6 md:mb-0">
                  <h2 class="text-3xl font-bold text-white mb-3">
                    Unlock Premium Virtual Cards 🚀
                  </h2>
                  <p class="text-blue-100 text-base mb-4">
                    Elevate your financial management with our premium virtual cards. Create multiple cards, track expenses, and enjoy exclusive benefits.
                  </p>
                  <ul class="space-y-2 mb-6">
                    <li class="flex items-center text-blue-100 text-sm">
                      <svg class="h-5 w-5 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Create up to 50 virtual cards
                    </li>
                    <li class="flex items-center text-blue-100 text-sm">
                      <svg class="h-5 w-5 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Instant card generation
                    </li>
                    <li class="flex items-center text-blue-100 text-sm">
                      <svg class="h-5 w-5 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Enhanced security features
                    </li>
                  </ul>
                  <RouterLink 
                    to="/plans" 
                    class="inline-flex items-center px-6 py-2 bg-white text-blue-600 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-50 transition duration-200"
                  >
                    Get Started Now
                    <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </RouterLink>
                </div>
                <div class="md:w-1/2 md:pl-8">
                  <div class="relative">
                    <!-- Card Stack Effect -->
                    <div class="absolute top-0 right-0 w-full h-full">
                      <div class="absolute top-2 right-2 w-full h-full bg-white/20 rounded-lg transform rotate-3"></div>
                      <div class="absolute top-4 right-4 w-full h-full bg-white/10 rounded-lg transform -rotate-2"></div>
                    </div>
                    <!-- Main Card -->
                    <div class="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg">
                      <div class="flex justify-between items-start mb-6">
                        <div>
                          <h3 class="text-lg font-semibold text-white">Premium Virtual Card</h3>
                          <p class="text-gray-400 text-sm">NVCC Plus</p>
                        </div>
                        <div class="text-white opacity-75">
                          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="text-gray-400 text-sm mb-4">
                        **** **** **** 1234
                      </div>
                      <div class="flex justify-between items-end text-sm">
                        <div>
                          <p class="text-gray-500 mb-1">Card Holder</p>
                          <p class="text-white">PREMIUM USER</p>
                        </div>
                        <div>
                          <p class="text-gray-500 mb-1">Expires</p>
                          <p class="text-white">12/25</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Subscription Message -->
        <div v-if="pendingSubscription" class="mb-6">
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-base font-medium text-yellow-800">Subscription Request Pending</h3>
                <div class="mt-1 text-sm text-yellow-700">
                  <p>We've received your subscription request and our team is reviewing it.</p>
                  <p class="mt-1">You'll receive a notification once your subscription is approved. This usually takes 1-2 business days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cards Section -->
        <div v-else class="space-y-6">
          <!-- Plan Info -->
          <div v-if="subscription" class="bg-white rounded-lg shadow-sm p-4">
            <h2 class="text-xl font-semibold mb-2">Your Plan: {{ subscription.plan }}</h2>
            <p class="text-gray-600 text-sm">Cards Remaining: {{ subscription.cardsRemaining }}</p>
          </div>

          <!-- Add New Card Button -->
          <div class="flex justify-end">
            <button
              @click="openNewCardModal"
              :disabled="!subscription?.cardsRemaining"
              :class="[
                'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium',
                subscription?.cardsRemaining
                  ? 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              <PlusIcon class="h-4 w-4 mr-1" />
              Add New Card
            </button>
          </div>

          <!-- Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="card in cards"
              :key="card.id"
              class="bg-white rounded-lg shadow-sm p-4 relative"
              :class="{ 'opacity-75': card.frozen }"
            >
              <!-- Card Status Badge -->
              <div
                v-if="card.frozen"
                class="absolute top-3 right-3 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded"
              >
                Frozen
              </div>

              <!-- Card Details -->
              <div class="space-y-3">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-base font-semibold">{{ card.type }}</h3>
                    <p class="text-gray-600 text-sm">**** **** **** {{ card.lastFour }}</p>
                  </div>
                </div>

                <div class="space-y-1">
                  <p class="text-xs text-gray-600">
                    <span class="font-medium">Cardholder:</span> {{ card?.cardHolder || 'N/A' }}
                  </p>
                  <p class="text-xs text-gray-600">
                    <span class="font-medium">Expires:</span> {{ card?.expiry || 'N/A' }}
                  </p>
                </div>

                <!-- Card Actions -->
                <div class="mt-3 flex justify-end space-x-2">
                  <button
                    @click="toggleFreeze(card)"
                    class="text-gray-600 hover:text-gray-900"
                    :title="card.frozen ? 'Unfreeze Card' : 'Freeze Card'"
                  >
                    <component
                      :is="card.frozen ? LockClosedIcon : LockOpenIcon"
                      class="h-5 w-5"
                    />
                  </button>
                  <button
                    @click="openTerminateModal(card)"
                    class="text-red-600 hover:text-red-900"
                    title="Terminate Card"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- New Card Modal -->
    <TransitionRoot appear :show="isNewCardModalOpen" as="div">
      <Dialog as="div" @close="closeNewCardModal" class="relative z-10">
        <TransitionChild
          as="div"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="div"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Request New Card
                </DialogTitle>

                <div v-if="newCardError" class="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm">
                  {{ newCardError }}
                </div>

                <div class="mt-4">
                  <div v-if="loadingAvailableCards" class="flex justify-center py-4">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                  </div>
                  
                  <div v-else-if="availableCards.length === 0" class="text-center py-4">
                    <p class="text-gray-500">No cards are available at the moment.</p>
                    <p class="text-sm text-gray-400 mt-1">Please try again later or contact support.</p>
                  </div>
                  
                  <div v-else class="space-y-4">
                    <p class="text-sm text-gray-500">Select a card to request:</p>
                    
                    <div class="space-y-2">
                      <div
                        v-for="card in availableCards"
                        :key="card._id"
                        class="border rounded-lg p-4 hover:border-orange-500 cursor-pointer"
                        :class="{'border-orange-500 bg-orange-50': selectedCard?._id === card._id}"
                        @click="selectedCard = card"
                      >
                        <div class="flex justify-between items-center">
                          <div>
                            <p class="font-medium text-gray-900">{{ card.type }} Card</p>
                            <p class="text-sm text-gray-500">**** **** **** {{ card.number.slice(-4) }}</p>
                          </div>
                          <div v-if="selectedCard?._id === card._id" class="text-orange-500">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    @click="closeNewCardModal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    :disabled="!selectedCard || requestingCard"
                    @click="requestCard"
                  >
                    <span v-if="requestingCard" class="inline-flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                    <span v-else>Request Card</span>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Terminate Card Modal -->
    <TransitionRoot appear :show="isTerminateModalOpen" as="div">
      <Dialog as="div" @close="closeTerminateModal" class="relative z-10">
        <TransitionChild
          as="div"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="div"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Terminate Card
                </DialogTitle>
                
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to terminate this card? This action cannot be undone.
                  </p>
                </div>

                <div class="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    @click="closeTerminateModal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    :disabled="loading"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    @click="terminateCard"
                  >
                    Terminate Card
                  </button>
                </div>
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
import { RouterLink } from 'vue-router'
import axios from '@/services/axiosConfig'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PlusIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/vue/24/outline'

const loading = ref(false)
const error = ref(null)
const cards = ref([])
const user = ref(null)
const subscription = ref(null)
const hasCheckedPlan = ref(false)
const pendingSubscription = ref(null)

const isNewCardModalOpen = ref(false)
const isTerminateModalOpen = ref(false)
const cardToTerminate = ref(null)
const availableCards = ref([])
const selectedCard = ref(null)
const loadingAvailableCards = ref(false)
const requestingCard = ref(false)
const newCardError = ref(null)

// Ensure each card has all required properties
const processCard = (card) => {
  if (!card) return card
  return {
    ...card,
    status: card.status || 'active',
    frozen: card.frozen || false
  }
}

// Fetch user data including cards
const fetchUserData = async () => {
  loading.value = true
  error.value = null
  try {
    // Get user data with cards
    const userResponse = await axios.get('/api/users/me')
    user.value = userResponse.data
    cards.value = userResponse.data.cards?.map(processCard) || []
    
    // Get subscription status
    const subscriptionResponse = await axios.get('/api/subscription-requests/subscription-status')
    subscription.value = subscriptionResponse.data
    hasCheckedPlan.value = true

    // Only check for pending subscription if no active subscription
    if (!subscription.value?.status || subscription.value.status === 'inactive') {
      const pendingResponse = await axios.get('/api/subscription-requests/pending')
      pendingSubscription.value = pendingResponse.data.length > 0 ? pendingResponse.data[0] : null
    } else {
      pendingSubscription.value = null
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load user data'
  } finally {
    loading.value = false
  }
}

const toggleFreeze = async (card) => {
  try {
    const response = await axios.put(`/api/cards/${card._id}`, {
      frozen: !card.frozen
    })
    const updatedCard = processCard(response.data)
    const index = cards.value.findIndex(c => c._id === card._id)
    if (index !== -1) {
      cards.value[index] = updatedCard
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update card'
  }
}

const openNewCardModal = async () => {
  if (!subscription.value?.cardsRemaining) {
    error.value = 'No cards remaining in your plan'
    return
  }
  isNewCardModalOpen.value = true
  selectedCard.value = null
  await fetchAvailableCards()
}

const closeNewCardModal = () => {
  isNewCardModalOpen.value = false
}

const openTerminateModal = (card) => {
  cardToTerminate.value = card
  isTerminateModalOpen.value = true
}

const closeTerminateModal = () => {
  isTerminateModalOpen.value = false
  cardToTerminate.value = null
}

const fetchAvailableCards = async () => {
  loadingAvailableCards.value = true
  newCardError.value = ''
  try {
    const response = await axios.get('/api/cards/available')
    availableCards.value = response.data
  } catch (error) {
    newCardError.value = error.response?.data?.message || 'Failed to fetch available cards'
  } finally {
    loadingAvailableCards.value = false
  }
}

const requestCard = async () => {
  if (!selectedCard.value) return
  
  requestingCard.value = true
  newCardError.value = ''
  
  try {
    await axios.post(`/api/cards/${selectedCard.value._id}/assign`, {
      userId: user.value._id
    })
    
    // Refresh user data to show the new card
    await fetchUserData()
    closeNewCardModal()
  } catch (error) {
    newCardError.value = error.response?.data?.message || 'Failed to request card'
  } finally {
    requestingCard.value = false
  }
}

onMounted(async () => {
  await fetchUserData()
})
</script>

<style scoped>
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
