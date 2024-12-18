<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-bold text-gray-900">Virtual Cards</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <!-- Add New Card Button -->
      <div class="flex justify-end mb-6">
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

      <!-- Card List Component -->
      <CardList
        :cards="cards"
        :subscription="subscription"
        :pending-subscription="pendingSubscription"
        :has-checked-plan="hasCheckedPlan"
        :loading="loading"
        :error="error"
        @toggle-freeze="toggleFreeze"
        @terminate-card="terminateCard"
        @open-terminate-modal="openTerminateModal"
      />
    </main>

    <!-- New Card Modal -->
    <NewCardModal
      :is-open="isNewCardModalOpen"
      :available-cards="availableCards"
      :loading-available-cards="loadingAvailableCards"
      :new-card-error="newCardError"
      :requesting-card="requestingCard"
      v-model:selected-card="selectedCard"
      @close="closeNewCardModal"
      @request-card="requestCard"
    />

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
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import CardList from '@/components/CardList.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import axios from '@/services/axiosConfig'

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
    const userResponse = await axios.get('/api/users/me')
    user.value = userResponse.data
    cards.value = userResponse.data.cards?.map(processCard) || []
    
    const subscriptionResponse = await axios.get('/api/subscription-requests/subscription-status')
    subscription.value = subscriptionResponse.data
    hasCheckedPlan.value = true

    if (!subscription.value?.status || subscription.value.status === 'inactive') {
      const pendingResponse = await axios.get('/api/subscription-requests/pending')
      pendingSubscription.value = pendingResponse.data.length > 0 && pendingResponse.data[0].status === 'pending' 
        ? pendingResponse.data[0] 
        : null
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
    await axios.post(`/api/cards/${selectedCard.value._id}/request`)
    await fetchUserData()
    closeNewCardModal()
  } catch (error) {
    newCardError.value = error.response?.data?.message || 'Failed to request card'
  } finally {
    requestingCard.value = false
  }
}

const terminateCard = async () => {
  if (!cardToTerminate.value) return
  
  try {
    await axios.delete(`/api/cards/${cardToTerminate.value._id}`)
    await fetchUserData()
    closeTerminateModal()
  } catch (error) {
    error.value = error.response?.data?.message || 'Failed to terminate card'
  }
}

onMounted(async () => {
  await fetchUserData()
})
</script>