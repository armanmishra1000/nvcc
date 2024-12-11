<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">NVCC Plans</span>
        </h1>
        <p class="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Choose between a single card or subscription plans
        </p>
      </div>

      <!-- Plan Type Selector -->
      <div class="flex justify-center mb-12">
        <div class="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
          <button 
            @click="selectPlan('single'); selectedPlanType = 'single'"
            :class="[
              selectedPlanType === 'single' 
                ? 'bg-orange-500 text-white' 
                : 'text-gray-500 hover:text-gray-700',
              'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200'
            ]"
          >
            Single Card
          </button>
          <button 
            @click="selectPlan('subscription'); selectedPlanType = 'subscription'"
            :class="[
              selectedPlanType === 'subscription' 
                ? 'bg-orange-500 text-white' 
                : 'text-gray-500 hover:text-gray-700',
              'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200'
            ]"
          >
            Subscription Plans
          </button>
        </div>
      </div>

      <!-- Single Card Section -->
      <div v-if="selectedPlanType === 'single'" class="space-y-8">
        <!-- Duration Selection -->
        <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Select Card Duration</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              v-for="duration in durations" 
              :key="duration.period"
              @click="selectedDuration = duration"
              :class="[
                'cursor-pointer p-4 rounded-xl border-2 transition-all duration-200',
                selectedDuration === duration 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-orange-200'
              ]"
            >
              <div class="text-lg font-semibold text-gray-900">{{ duration.period }}</div>
              <div class="text-2xl font-bold text-orange-600">€{{ duration.price }}</div>
              <div class="text-sm text-gray-500">{{ duration.description }}</div>
            </div>
          </div>
        </div>

        <!-- Balance Selection -->
        <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Select Card Balance</h2>
          <div class="space-y-6">
            <!-- Balance Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Desired card balance</label>
              <div class="relative rounded-md shadow-sm">
                <input
                  type="number"
                  v-model="desiredBalance"
                  class="block w-full pr-16 sm:text-sm border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter amount"
                  min="10"
                  step="0.01"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span class="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
            </div>

            <!-- Quick Select Buttons -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                v-for="amount in quickAmounts"
                :key="amount"
                @click="desiredBalance = amount"
                class="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-all duration-200"
              >
                {{ amount }}$
              </button>
            </div>

            <!-- 3D Secure Toggle -->
            <div class="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <h3 class="text-sm font-medium text-gray-900">3D Secure</h3>
                <p class="text-sm text-gray-500">Enable additional security for your card</p>
              </div>
              <button 
                @click="secure3d = !secure3d"
                :class="[
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500',
                  secure3d ? 'bg-orange-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                    secure3d ? 'translate-x-5' : 'translate-x-0'
                  ]"
                ></span>
              </button>
            </div>

            <!-- Order Summary -->
            <div class="border-t border-gray-200 pt-4 space-y-2">
              <div class="flex justify-between text-sm text-gray-600">
                <span>Top-up fee ({{ topUpFee }}%)</span>
                <span>€{{ (desiredBalance * topUpFee / 100).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>€{{ total }}</span>
              </div>
            </div>
          </div>

          <button 
            @click="getCard"
            class="mt-6 w-full py-4 px-8 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:-translate-y-1"
            :disabled="!isValidOrder"
          >
            Get Your Card Now
          </button>
        </div>
      </div>

      <!-- Subscription Plans Section -->
      <div v-else class="grid lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
        <!-- Nvcc Plus Plan -->
        <div class="relative flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
          <!-- Popular Badge -->
          <div class="absolute top-0 right-0 bg-gradient-to-r from-orange-600 to-orange-400 text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
            Most Popular
          </div>
          
          <!-- Plan Header -->
          <div class="p-8 bg-gradient-to-b from-orange-50 to-white">
            <h3 class="text-2xl font-bold text-gray-900">Nvcc Plus</h3>
            <div class="mt-4 flex items-baseline">
              <div class="relative">
                <span class="absolute -top-3 left-0 w-full h-px bg-gray-400 transform rotate-12"></span>
                <span class="text-xl text-gray-400">€40</span>
              </div>
              <span class="ml-2 text-4xl font-bold text-orange-600">€29.99</span>
              <span class="ml-2 text-gray-500">/month</span>
            </div>
          </div>

          <!-- Plan Features -->
          <div class="flex-1 p-8 space-y-6">
            <!-- Main Feature -->
            <div class="flex items-center">
              <div class="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-semibold text-gray-900">20 Cards</h4>
                <p class="text-gray-500">Per month</p>
              </div>
            </div>

            <!-- Other Features -->
            <ul class="space-y-4">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="ml-3 text-gray-700">6% Deposit Fees</span>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-orange-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="ml-3 text-gray-700">1% Cashback unlimited<br><span class="text-sm text-gray-500">(on purchases over $100)</span></span>
              </li>
            </ul>
          </div>

          <!-- CTA Button -->
          <div class="p-8 bg-gray-50">
            <button 
              @click="selectPlan('plus')"
              class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-lg font-medium text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform hover:-translate-y-1 transition-all duration-200"
            >
              Get Started Now
              <svg class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Placeholder for future plans -->
        <div class="lg:col-span-2 flex items-center justify-center p-12 bg-gray-50 rounded-2xl">
          <div class="text-center">
            <h3 class="text-xl font-medium text-gray-900">More plans coming soon!</h3>
            <p class="mt-2 text-gray-500">We're working on additional subscription options to better serve your needs.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'NvccPlans',
  data() {
    return {
      selectedPlanType: 'single',
      selectedDuration: null,
      desiredBalance: null,
      secure3d: true,
      durations: [
        {
          period: '1 Month',
          price: 4.99,
          description: 'Perfect for one-time use'
        },
        {
          period: '3 Months',
          price: 12.99,
          description: 'Most popular choice'
        },
        {
          period: '6 Months',
          price: 19.99,
          description: 'Best value for money'
        }
      ],
      quickAmounts: [50, 100, 200, 500]
    }
  },
  computed: {
    topUpFee() {
      return this.desiredBalance >= 200 ? 4.5 : 6
    },
    total() {
      if (!this.desiredBalance) return 0
      const fee = (this.desiredBalance * this.topUpFee / 100)
      return (Number(this.desiredBalance) + fee).toFixed(2)
    },
    isValidOrder() {
      return this.selectedDuration && this.desiredBalance >= 10
    }
  },
  methods: {
    getCard() {
      // Handle card purchase
      console.log('Purchasing card with:', {
        duration: this.selectedDuration,
        balance: this.desiredBalance,
        secure3d: this.secure3d,
        total: this.total
      })
    },
    selectPlan(planType) {
      // Handle plan selection
      console.log('Selected plan:', planType);
      // TODO: Implement plan purchase logic
    }
  }
}
</script>
