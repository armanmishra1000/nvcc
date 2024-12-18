<template>
  <TransitionRoot appear :show="isOpen" as="div">
    <Dialog as="div" @close="$emit('close')" class="relative z-10">
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
                      @click="$emit('update:selectedCard', card)"
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
                  @click="$emit('close')"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  :disabled="!selectedCard || requestingCard"
                  @click="$emit('request-card')"
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
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  availableCards: {
    type: Array,
    required: true
  },
  loadingAvailableCards: {
    type: Boolean,
    required: true
  },
  newCardError: {
    type: String,
    default: ''
  },
  requestingCard: {
    type: Boolean,
    required: true
  },
  selectedCard: {
    type: Object,
    default: null
  }
})

defineEmits(['close', 'request-card', 'update:selectedCard'])
</script>
