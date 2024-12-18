<template>
  <!-- Loading State -->
  <div v-if="loading" class="flex justify-center items-center h-48">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
  </div>

  <div v-else>
    <!-- Error Message -->
    <div v-if="error" class="mb-3 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
      {{ error }}
    </div>

    <!-- No Plan Warning -->
    <div v-if="hasCheckedPlan && !subscription?.plan && (!pendingSubscription || pendingSubscription.status !== 'pending')" class="mb-6">
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
    <div v-if="pendingSubscription && pendingSubscription.status === 'pending'" class="mb-6">
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
                @click="$emit('toggle-freeze', card)"
                class="text-gray-600 hover:text-gray-900"
                :title="card.frozen ? 'Unfreeze Card' : 'Freeze Card'"
              >
                <component
                  :is="card.frozen ? LockClosedIcon : LockOpenIcon"
                  class="h-5 w-5"
                />
              </button>
              <button
                @click="$emit('open-terminate-modal', card)"
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
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { LockClosedIcon, LockOpenIcon } from '@heroicons/vue/24/outline'
import { defineProps, defineEmits } from 'vue'

defineProps({
  cards: {
    type: Array,
    required: true
  },
  subscription: {
    type: Object,
    default: null
  },
  pendingSubscription: {
    type: Object,
    default: null
  },
  hasCheckedPlan: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['toggle-freeze', 'terminate-card', 'open-terminate-modal'])
</script>
