<template>
  <div class="container mx-auto p-4">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-100">
        <h1 class="text-xl font-semibold text-gray-900">Get Your Card</h1>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Left Column - Card Configuration -->
        <div class="p-6 space-y-6">
          <!-- Card Type Selection -->
          <div>
            <h2 class="text-sm font-medium text-gray-700 mb-3">Select Plan</h2>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="plan in plans"
                :key="plan.type"
                @click="selectedPlan = plan.type"
                :class="[
                  'px-4 py-3 rounded-lg text-center transition-all',
                  selectedPlan === plan.type
                    ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                    : 'border border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                ]"
              >
                <div class="text-sm font-medium">{{ plan.type }}</div>
                <div class="text-lg font-bold">${{ plan.price }}</div>
                <div v-if="plan.badge" class="text-xs text-purple-600 bg-purple-50 rounded-full px-2 py-0.5 mt-1 inline-block">
                  {{ plan.badge }}
                </div>
              </button>
            </div>
          </div>

          <!-- Payment Method -->
          <div>
            <h2 class="text-sm font-medium text-gray-700 mb-3">Payment System</h2>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="method in ['visa', 'mastercard']"
                :key="method"
                @click="paymentSystem = method"
                :class="[
                  'p-3 rounded-lg border transition-all flex items-center justify-center gap-2',
                  paymentSystem === method
                    ? 'border-2 border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                ]"
              >
                <img :src="require(`@/assets/${method}-logo.png`)" :alt="method" class="h-6">
                <span class="capitalize font-medium">{{ method }}</span>
              </button>
            </div>
          </div>

          <!-- Amount Input -->
          <div>
            <h2 class="text-sm font-medium text-gray-700 mb-3">Card Balance</h2>
            <div class="relative">
              <input
                v-model="cardBalance"
                type="number"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter amount"
              >
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">USD</span>
            </div>
            <div class="grid grid-cols-4 gap-2 mt-2">
              <button
                v-for="amount in predefinedAmounts"
                :key="amount"
                @click="cardBalance = amount"
                class="px-2 py-1.5 text-sm bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                ${{ amount }}
              </button>
            </div>
          </div>

          <!-- 3D Secure -->
          <div class="bg-blue-50 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <div>
                  <span class="font-medium text-blue-900">3D Secure</span>
                  <p class="text-xs text-blue-700 mt-0.5">Enhanced security for your transactions</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="secure3d" class="sr-only peer">
                <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Right Column - Preview and Summary -->
        <div class="bg-gray-50 p-6 space-y-6">
          <!-- Card Preview -->
          <div>
            <h2 class="text-sm font-medium text-gray-700 mb-3">Card Preview</h2>
            <div class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
              <div class="flex justify-between items-start mb-8">
                <div class="space-y-1">
                  <p class="text-xs opacity-80">Virtual Card</p>
                  <p class="font-medium">{{ selectedPlan }} Plan</p>
                </div>
                <img :src="require(`@/assets/${paymentSystem}-logo.png`)" :alt="paymentSystem" class="h-8">
              </div>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <p class="text-lg font-medium">${{ cardBalance }}</p>
                  <div class="flex items-center gap-1">
                    <span class="text-xs opacity-80">Secure</span>
                    <svg v-if="secure3d" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div>
            <h2 class="text-sm font-medium text-gray-700 mb-3">Summary</h2>
            <div class="bg-white rounded-lg p-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Card fee</span>
                <span class="font-medium">${{ getSelectedPlan.price }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Balance</span>
                <span class="font-medium">${{ cardBalance }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Top-up fee ({{ topUpFee }}%)</span>
                <span class="font-medium">${{ getFee }}</span>
              </div>
              <div class="border-t pt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>${{ totalAmount }}</span>
              </div>
            </div>
          </div>

          <!-- Terms and Action -->
          <div class="space-y-4">
            <label class="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                v-model="acceptedTerms"
                class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              >
              <span class="text-xs text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </span>
            </label>

            <button
              @click="generateCard"
              :disabled="!isFormValid"
              :class="[
                'w-full py-3 rounded-lg font-medium transition-colors',
                isFormValid
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              ]"
            >
              Get Card
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Form state
const selectedPlan = ref('Monthly')
const paymentSystem = ref('mastercard')
const cardBalance = ref(50)
const secure3d = ref(true)
const acceptedTerms = ref(false)

// Predefined values
const predefinedAmounts = [50, 100, 250, 500]
const topUpFee = 8

const plans = [
  { type: 'Weekly', price: 7.00, badge: 'New!' },
  { type: 'Monthly', price: 15.00 },
  { type: 'Yearly', price: 99.00 }
]

// Computed properties
const getSelectedPlan = computed(() => {
  return plans.find(plan => plan.type === selectedPlan.value)
})

const getFee = computed(() => {
  const balance = parseFloat(cardBalance.value) || 0
  return ((balance * topUpFee) / 100).toFixed(2)
})

const totalAmount = computed(() => {
  const balance = parseFloat(cardBalance.value) || 0
  const fee = parseFloat(getFee.value)
  const planPrice = getSelectedPlan.value.price
  return (balance + fee + planPrice).toFixed(2)
})

const isFormValid = computed(() => {
  return selectedPlan.value && 
         paymentSystem.value && 
         cardBalance.value > 0 && 
         acceptedTerms.value
})

// Methods
const generateCard = async () => {
  if (!isFormValid.value) return

  try {
    console.log('Generating card with:', {
      plan: selectedPlan.value,
      paymentSystem: paymentSystem.value,
      balance: cardBalance.value,
      secure3d: secure3d.value
    })
  } catch (error) {
    console.error('Error generating card:', error)
  }
}
</script>
