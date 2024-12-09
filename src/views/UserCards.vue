<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-900">My Cards</h1>
        <button
          @click="openNewCardModal"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add New Card
        </button>
      </div>

      <!-- Cards Grid -->
      <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="card in cards" :key="card.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6 space-y-6">
            <!-- Card Design -->
            <div :class="['h-48 rounded-lg p-6 flex flex-col justify-between', card.design]">
              <div class="flex justify-between items-start">
                <div class="text-white">
                  <p class="font-medium">{{ card.type }}</p>
                  <p class="mt-1 text-sm opacity-80">{{ card.bank }}</p>
                </div>
                <component :is="getCardIcon(card.network)" class="h-8 w-8 text-white" />
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
                  @click="showCardDetails(card)"
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
                    >
                      Add Card
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
import { ref } from 'vue'
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
    const cards = ref([
      {
        id: 1,
        type: 'Credit Card',
        bank: 'Universal Bank',
        network: 'visa',
        lastFour: '4567',
        cardHolder: 'JOHN DOE',
        expiry: '12/25',
        frozen: false,
        design: 'bg-gradient-to-r from-purple-500 to-pink-500',
        transactions: [
          {
            id: 1,
            merchant: 'Amazon',
            amount: '299.99',
            type: 'debit',
            date: '2024-12-09'
          },
          {
            id: 2,
            merchant: 'Refund - Nike',
            amount: '89.99',
            type: 'credit',
            date: '2024-12-08'
          }
        ]
      },
      {
        id: 2,
        type: 'Debit Card',
        bank: 'City Bank',
        network: 'mastercard',
        lastFour: '8901',
        cardHolder: 'JOHN DOE',
        expiry: '09/26',
        frozen: true,
        design: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        transactions: [
          {
            id: 1,
            merchant: 'Starbucks',
            amount: '5.99',
            type: 'debit',
            date: '2024-12-09'
          },
          {
            id: 2,
            merchant: 'Target',
            amount: '156.78',
            type: 'debit',
            date: '2024-12-07'
          }
        ]
      }
    ])

    const isNewCardModalOpen = ref(false)
    const expandedCard = ref(null)
    const newCard = ref({
      number: '',
      expiry: '',
      cvv: '',
      cardHolder: ''
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

    const addNewCard = () => {
      // Add validation and card creation logic here
      closeNewCardModal()
    }

    const toggleFreeze = (card) => {
      card.frozen = !card.frozen
    }

    const viewTransactions = (cardId) => {
      expandedCard.value = expandedCard.value === cardId ? null : cardId
    }

    const showCardDetails = (card) => {
      // Add card details view logic here
    }

    const getCardIcon = (network) => {
      // Add logic to return appropriate card network icon
      return CreditCardIcon
    }

    return {
      cards,
      isNewCardModalOpen,
      expandedCard,
      newCard,
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
