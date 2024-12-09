<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-900">My Cards</h1>
        <button
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
      <div v-if="loading" class="mt-8 flex justify-center">
        <svg class="animate-spin h-8 w-8 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <!-- No Cards State -->
      <div v-else-if="!cards.length" class="mt-8 text-center">
        <CreditCardIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No cards</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by adding a new card.</p>
        <div class="mt-6">
          <button
            @click="openNewCardModal"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <PlusIcon class="h-5 w-5 mr-2" />
            Add New Card
          </button>
        </div>
      </div>

      <!-- Cards Grid -->
      <div v-else class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="card in cards" :key="card.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6 space-y-6">
            <!-- Card Design -->
            <div :class="['h-48 rounded-lg p-6 flex flex-col justify-between', card.design]">
              <div class="flex justify-between items-start">
                <div class="text-white">
                  <p class="font-medium">{{ card.type }}</p>
                  <p class="mt-1 text-sm opacity-80">{{ card.bank }}</p>
                </div>
                <component :is="getCardIcon()" class="h-8 w-8 text-white" />
              </div>
              <div class="text-white">
                <p class="text-lg tracking-wider">•••• •••• •••• {{ card.lastFour }}</p>
                <div class="mt-4 flex justify-between items-center">
                  <div>
                    <p class="text-xs opacity-80">Card Holder</p>
                    <p class="font-medium">{{ card.cardHolder }}</p>
                  </div>
                  <div>
                    <p class="text-xs opacity-80">Expires</p>
                    <p class="font-medium">{{ card.expiry }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Actions -->
            <div class="flex justify-between items-center">
              <button
                @click="viewTransactions(card.id)"
                class="text-sm font-medium text-orange-600 hover:text-orange-500"
              >
                View Transactions
              </button>
              <div class="flex space-x-2">
                <button
                  @click="toggleFreeze(card)"
                  :class="[
                    'p-2 rounded-full',
                    card.frozen ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                  ]"
                >
                  <component :is="card.frozen ? 'LockClosedIcon' : 'LockOpenIcon'" class="h-5 w-5" />
                </button>
                <button
                  @click="showCardDetails()"
                  class="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <EllipsisHorizontalIcon class="h-5 w-5" />
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

<script>
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  PlusIcon,
  LockClosedIcon,
  LockOpenIcon,
  EllipsisHorizontalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CreditCardIcon
} from '@heroicons/vue/24/outline'
import { cardService } from '@/services/cardService'

export default {
  name: 'UserCards',
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    PlusIcon,
    LockClosedIcon,
    LockOpenIcon,
    EllipsisHorizontalIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    CreditCardIcon
  },
  setup() {
    const cards = ref([])
    const isNewCardModalOpen = ref(false)
    const expandedCard = ref(null)
    const newCard = ref({
      number: '',
      expiry: '',
      cvv: '',
      cardHolder: ''
    })
    const loading = ref(false)
    const error = ref(null)

    // Fetch cards on component mount
    onMounted(async () => {
      try {
        loading.value = true
        const fetchedCards = await cardService.getAllCards()
        cards.value = fetchedCards
      } catch (err) {
        error.value = 'Failed to load cards. Please try again later.'
        console.error('Error loading cards:', err)
      } finally {
        loading.value = false
      }
    })

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
        const cardData = {
          number: newCard.value.number.replace(/\s/g, ''),
          expiry: newCard.value.expiry,
          cvv: newCard.value.cvv,
          cardHolder: newCard.value.cardHolder.toUpperCase()
        }
        const addedCard = await cardService.addCard(cardData)
        cards.value.push(addedCard)
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
        await cardService.updateCardStatus(card.id, !card.frozen)
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
        const transactions = await cardService.getCardTransactions(cardId)
        const cardIndex = cards.value.findIndex(c => c.id === cardId)
        if (cardIndex !== -1) {
          cards.value[cardIndex].transactions = transactions
        }
        expandedCard.value = cardId
      } catch (err) {
        error.value = 'Failed to load transactions. Please try again.'
        console.error('Error loading transactions:', err)
      } finally {
        loading.value = false
      }
    }

    const showCardDetails = () => {
      // Add card details view logic here
    }

    const getCardIcon = () => {
      // Add logic to return appropriate card network icon
      return CreditCardIcon
    }

    return {
      cards,
      isNewCardModalOpen,
      expandedCard,
      newCard,
      loading,
      error,
      openNewCardModal,
      closeNewCardModal,
      addNewCard,
      toggleFreeze,
      viewTransactions,
      showCardDetails,
      getCardIcon
    }
  }
}
</script>

<style scoped>
.card-gradient-1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.card-gradient-2 {
  background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
}
</style>
