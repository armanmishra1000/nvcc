<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
      {{ error }}
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>

    <div v-else>
      <!-- No Plan Warning -->
      <div v-if="hasCheckedPlan && !subscription?.plan" class="mb-8 p-4 bg-yellow-100 text-yellow-700 rounded-lg">
        You don't have an active subscription plan. Please subscribe to create virtual cards.
      </div>

      <!-- Cards Section -->
      <div v-else class="space-y-8">
        <!-- Plan Info -->
        <div v-if="subscription" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-semibold mb-4">Your Plan: {{ subscription.plan }}</h2>
          <p class="text-gray-600">Cards Remaining: {{ subscription.cardsRemaining }}</p>
        </div>

        <!-- Add New Card Button -->
        <div class="flex justify-end">
          <button
            @click="openNewCardModal"
            :disabled="!subscription?.cardsRemaining"
            :class="[
              'inline-flex items-center px-4 py-2 rounded-md text-sm font-medium',
              subscription?.cardsRemaining
                ? 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            <PlusIcon class="h-5 w-5 mr-2" />
            Add New Card
          </button>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="card in cards"
            :key="card.id"
            class="bg-white rounded-lg shadow-md p-6 relative"
            :class="{ 'opacity-75': card.frozen }"
          >
            <!-- Card Status Badge -->
            <div
              v-if="card.frozen"
              class="absolute top-4 right-4 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded"
            >
              Frozen
            </div>

            <!-- Card Details -->
            <div class="space-y-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-semibold">{{ card.type }}</h3>
                  <p class="text-gray-600">**** **** **** {{ card.lastFour }}</p>
                </div>
              </div>

              <div class="space-y-2">
                <p class="text-sm text-gray-600">
                  <span class="font-medium">Cardholder:</span> {{ card.cardHolder }}
                </p>
                <p class="text-sm text-gray-600">
                  <span class="font-medium">Expires:</span> {{ card.expiry }}
                </p>
              </div>

              <!-- Card Actions -->
              <div class="mt-4 flex justify-end space-x-2">
                <button
                  @click="toggleFreeze(card)"
                  class="text-gray-600 hover:text-gray-900"
                  :title="card.frozen ? 'Unfreeze Card' : 'Freeze Card'"
                >
                  <component
                    :is="card.frozen ? LockClosedIcon : LockOpenIcon"
                    class="h-6 w-6"
                  />
                </button>
                <button
                  @click="openTerminateModal(card)"
                  class="text-red-600 hover:text-red-900"
                  title="Terminate Card"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
                  Create New Card
                </DialogTitle>

                <div class="mt-4">
                  <div class="space-y-4">
                    <div>
                      <label for="cardHolder" class="block text-sm font-medium text-gray-700">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardHolder"
                        v-model="newCard.cardHolder"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    @click="closeNewCardModal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    :disabled="!newCard.cardHolder || loading"
                    class="inline-flex justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    @click="createCard"
                  >
                    Create Card
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

                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    @click="closeTerminateModal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    :disabled="loading"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
import { useRouter } from 'vue-router'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { LockClosedIcon, LockOpenIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/24/solid'
import axiosInstance from '@/services/axiosConfig'

const router = useRouter()
const loading = ref(false)
const error = ref(null)
const cards = ref([])
const subscription = ref(null)
const hasCheckedPlan = ref(false)
const isNewCardModalOpen = ref(false)
const cardToTerminate = ref(null)
const isTerminateModalOpen = ref(false)

const newCard = ref({
  cardHolder: '',
  type: 'virtual'
})

const fetchUserData = async () => {
  try {
    loading.value = true
    const [subResponse, cardsResponse] = await Promise.all([
      axiosInstance.get('/api/users/subscription'),
      axiosInstance.get('/api/users/cards')
    ])
    
    subscription.value = subResponse.data
    cards.value = cardsResponse.data
    hasCheckedPlan.value = true
  } catch (err) {
    console.error('Error fetching user data:', err)
    error.value = err.response?.data?.message || 'Error fetching user data'
    if (err.response?.status === 401) {
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}

const createCard = async () => {
  if (!newCard.value.cardHolder) return

  try {
    loading.value = true
    error.value = null // Clear any previous errors
    
    const response = await axiosInstance.post('/api/users/cards', {
      name: newCard.value.cardHolder,
      type: newCard.value.type
    })
    
    // Add the new card to the list
    cards.value.push(response.data)
    
    // Update subscription count
    if (subscription.value) {
      subscription.value.cardsRemaining--
    }
    
    closeNewCardModal()
  } catch (err) {
    console.error('Error creating card:', err)
    error.value = err.response?.data?.message || 'Error creating card'
  } finally {
    loading.value = false
  }
}

const terminateCard = async () => {
  if (!cardToTerminate.value) return
  
  try {
    loading.value = true
    error.value = null // Clear any previous errors
    
    await axiosInstance.delete(`/api/users/cards/${cardToTerminate.value.id}`)
    
    // Remove card from list
    const index = cards.value.findIndex(c => c.id === cardToTerminate.value.id)
    if (index !== -1) {
      cards.value.splice(index, 1)
    }
    
    closeTerminateModal()
  } catch (err) {
    console.error('Error terminating card:', err)
    error.value = err.response?.data?.message || 'Error terminating card'
  } finally {
    loading.value = false
  }
}

const toggleFreeze = async (card) => {
  try {
    loading.value = true
    error.value = null // Clear any previous errors
    
    const response = await axiosInstance.post(`/api/users/cards/${card.id}/toggle-freeze`)
    card.frozen = response.data.frozen // Use server response to update state
  } catch (err) {
    console.error('Error toggling freeze state:', err)
    error.value = err.response?.data?.message || 'Error toggling freeze state'
  } finally {
    loading.value = false
  }
}

const openNewCardModal = () => {
  if (!subscription.value?.cardsRemaining) {
    error.value = 'No cards remaining in your plan'
    return
  }
  isNewCardModalOpen.value = true
}

const closeNewCardModal = () => {
  isNewCardModalOpen.value = false
  newCard.value = {
    cardHolder: '',
    type: 'virtual'
  }
}

const openTerminateModal = (card) => {
  cardToTerminate.value = card
  isTerminateModalOpen.value = true
}

const closeTerminateModal = () => {
  cardToTerminate.value = null
  isTerminateModalOpen.value = false
}

onMounted(async () => {
  await fetchUserData()
})
</script>
