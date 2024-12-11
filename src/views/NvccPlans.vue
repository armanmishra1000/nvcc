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
            @click="selectedPlanType = 'single'"
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
            @click="selectedPlanType = 'subscription'"
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
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 flex items-center justify-center bg-orange-100 rounded-full">
                  <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <div class="font-medium">3D-Secure</div>
                  <div class="text-sm text-gray-500">Receive confirmation codes in your Profile or Telegram</div>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="secure3d" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>

          <!-- Summary and Total -->
          <div class="mt-8 space-y-4 border-t pt-6">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Card duration</span>
              <span class="font-medium">{{ selectedDuration?.period || 'Not selected' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Card balance</span>
              <span class="font-medium">${{ desiredBalance }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Top-up fee (8%)</span>
              <span class="font-medium">${{ topUpFee }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span class="text-orange-600">${{ total }}</span>
            </div>
          </div>

          <!-- Get Card Button -->
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
        <!-- Coming Soon Message -->
        <div class="lg:col-span-3 text-center">
          <div class="bg-orange-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <svg class="w-16 h-16 text-orange-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Subscription Plans Coming Soon!</h2>
            <p class="text-gray-600">We're working on exciting subscription plans with amazing benefits. Stay tuned!</p>
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
      desiredBalance: 50,
      secure3d: true,
      durations: [
        {
          period: '1 Month',
          price: '1.99',
          description: 'Perfect for short-term needs'
        },
        {
          period: '3 Months',
          price: '3.99',
          description: 'Most popular choice'
        },
        {
          period: '1 Year',
          price: '10.99',
          description: 'Best value for money'
        }
      ],
      quickAmounts: [50, 100, 250, 500]
    }
  },
  computed: {
    topUpFee() {
      return this.desiredBalance ? (this.desiredBalance * 0.08).toFixed(2) : 0
    },
    total() {
      const balance = parseFloat(this.desiredBalance) || 0
      const fee = parseFloat(this.topUpFee)
      const durationPrice = this.selectedDuration ? parseFloat(this.selectedDuration.price) : 0
      return (balance + fee + durationPrice).toFixed(2)
    },
    isValidOrder() {
      return this.selectedDuration && this.desiredBalance >= 10
    }
  },
  methods: {
    getCard() {
      // Implement card purchase logic here
      console.log('Getting card with:', {
        duration: this.selectedDuration,
        balance: this.desiredBalance,
        secure3d: this.secure3d,
        total: this.total
      })
    }
  }
}
</script>
