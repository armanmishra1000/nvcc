<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  <div v-if="isOpen" class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
        <div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg font-semibold leading-6 text-gray-900">Top Up {{ walletType }}</h3>
            <div class="mt-4">
              <div class="space-y-4">
                <div>
                  <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span class="text-gray-500 sm:text-sm">{{ currencySymbol }}</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      v-model="amount"
                      class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label for="payment-method" class="block text-sm font-medium text-gray-700">Payment Method</label>
                  <select
                    id="payment-method"
                    name="payment-method"
                    v-model="paymentMethod"
                    class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="bank-transfer">Bank Transfer</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:col-start-2"
            @click="handleTopUp"
          >
            Top Up
          </button>
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'WalletTopUpModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    walletType: {
      type: String,
      required: true
    }
  },
  emits: ['close', 'top-up'],
  setup(props, { emit }) {
    const amount = ref('')
    const paymentMethod = ref('credit-card')

    const currencySymbol = computed(() => {
      switch (props.walletType) {
        case 'USD Wallet':
          return '$'
        case 'Euro Wallet':
          return '€'
        case 'GBP Wallet':
          return '£'
        case 'Crypto Wallet':
          return '₿'
        default:
          return '$'
      }
    })

    const handleTopUp = () => {
      emit('top-up', {
        amount: amount.value,
        paymentMethod: paymentMethod.value,
        walletType: props.walletType
      })
      amount.value = ''
      paymentMethod.value = 'credit-card'
    }

    return {
      amount,
      paymentMethod,
      currencySymbol,
      handleTopUp
    }
  }
}
</script>
