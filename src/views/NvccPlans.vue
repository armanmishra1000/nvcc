<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-semibold text-gray-900 mb-8">NVCC Plans</h1>
    
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Basic Plan -->
      <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-orange-500 transition-all duration-300">
        <div class="text-center">
          <h2 class="text-xl font-bold text-gray-900 mb-2">Basic Plan</h2>
          <div class="text-4xl font-bold text-orange-500 mb-4">
            $9.99<span class="text-base font-normal text-gray-600">/month</span>
          </div>
          <div class="border-t border-gray-100 my-4"></div>
          <ul class="text-left space-y-4 mb-8">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Basic NVCC Features
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              5 Team Members
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Basic Support
            </li>
          </ul>
          <button class="w-full bg-orange-500 text-white rounded-lg py-3 font-semibold hover:bg-orange-600 transition-colors duration-300">
            Choose Basic
          </button>
        </div>
      </div>

      <!-- Pro Plan -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-500 transform scale-105 relative">
        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span class="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
        </div>
        <div class="text-center">
          <h2 class="text-xl font-bold text-gray-900 mb-2">Pro Plan</h2>
          <div class="text-4xl font-bold text-orange-500 mb-4">
            $24.99<span class="text-base font-normal text-gray-600">/month</span>
          </div>
          <div class="border-t border-gray-100 my-4"></div>
          <ul class="text-left space-y-4 mb-8">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              All Basic Features
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              15 Team Members
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Priority Support
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Advanced Analytics
            </li>
          </ul>
          <button class="w-full bg-orange-500 text-white rounded-lg py-3 font-semibold hover:bg-orange-600 transition-colors duration-300">
            Choose Pro
          </button>
        </div>
      </div>

      <!-- Enterprise Plan -->
      <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-orange-500 transition-all duration-300">
        <div class="text-center">
          <h2 class="text-xl font-bold text-gray-900 mb-2">Enterprise Plan</h2>
          <div class="text-4xl font-bold text-orange-500 mb-4">
            $49.99<span class="text-base font-normal text-gray-600">/month</span>
          </div>
          <div class="border-t border-gray-100 my-4"></div>
          <ul class="text-left space-y-4 mb-8">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              All Pro Features
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Unlimited Team Members
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              24/7 Dedicated Support
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Custom Integration
            </li>
          </ul>
          <button class="w-full bg-orange-500 text-white rounded-lg py-3 font-semibold hover:bg-orange-600 transition-colors duration-300">
            Choose Enterprise
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NvccPlans'
}
</script>
