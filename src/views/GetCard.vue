<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Get Your Card</h1>
      
      <div class="flex justify-center">
        <button 
          @click="generateCard" 
          class="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Generate Card
        </button>
      </div>

      <!-- Card generation status -->
      <div v-if="generationStatus" class="mt-8 text-center">
        <p :class="statusClass">{{ generationStatus }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const generationStatus = ref('')
const statusClass = ref('')

const generateCard = async () => {
  try {
    generationStatus.value = 'Generating your card...'
    statusClass.value = 'text-blue-500'
    
    // TODO: Add API call to generate card
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulated API call
    
    generationStatus.value = 'Card generated successfully!'
    statusClass.value = 'text-green-500'
  } catch (error) {
    generationStatus.value = 'Failed to generate card. Please try again.'
    statusClass.value = 'text-red-500'
  }
}
</script>
