<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">NVCC Plans</span>
        </h1>
        <p class="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your business needs
        </p>
      </div>

      <!-- Plans Grid -->
      <div class="grid lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
        <!-- Basic Plan -->
        <div class="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 group">
          <div class="p-8">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">Basic Plan</h2>
              <span class="inline-flex px-4 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-600">
                Starter
              </span>
            </div>
            <div class="mt-6">
              <div class="flex items-baseline">
                <span class="text-5xl font-extrabold text-gray-900">$9.99</span>
                <span class="ml-2 text-gray-500">/month</span>
              </div>
              <p class="mt-2 text-gray-500">Perfect for small teams getting started</p>
            </div>
            <div class="mt-8">
              <ul class="space-y-4">
                <li class="flex items-center">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-600">Basic NVCC Features</span>
                </li>
                <li class="flex items-center">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-600">5 Team Members</span>
                </li>
                <li class="flex items-center">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-600">Basic Support</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="px-8 pb-8">
            <button class="w-full py-4 px-8 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:-translate-y-1">
              Get Started
            </button>
          </div>
        </div>

        <!-- Pro Plan -->
        <div class="relative bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 group border-2 border-orange-500 lg:scale-110 z-10">
          <div class="absolute top-0 left-0 right-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
          <div class="absolute -top-4 inset-x-0">
            <div class="mx-auto w-32 bg-white text-center py-1 rounded-b-lg shadow-lg border-2 border-orange-500">
              <span class="text-sm font-bold text-orange-600">MOST POPULAR</span>
            </div>
          </div>
          <div class="p-8">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">Pro Plan</h2>
              <span class="inline-flex px-4 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-600">
                Professional
              </span>
            </div>
            <div class="mt-6">
              <div class="flex items-baseline">
                <span class="text-5xl font-extrabold text-gray-900">$24.99</span>
                <span class="ml-2 text-gray-500">/month</span>
              </div>
              <p class="mt-2 text-gray-500">Best for growing businesses</p>
            </div>
            <div class="mt-8">
              <ul class="space-y-4">
                <li class="flex items-center">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-600">All Basic Features</span>
                </li>
                <li class="flex items-center">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-600">15 Team Members</span>
                </li>
                <li class="flex items-center">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-600">Priority Support</span>
                </li>
                <li class="flex items-center">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-600">Advanced Analytics</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="px-8 pb-8">
            <button class="w-full py-4 px-8 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:-translate-y-1">
              Get Pro Access
            </button>
          </div>
        </div>

        <!-- Enterprise Plan -->
        <div class="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 group">
          <div class="p-8">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">Enterprise</h2>
              <span class="inline-flex px-4 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-600">
                Custom
              </span>
            </div>
            <div class="mt-6">
              <div class="flex items-baseline">
                <span class="text-5xl font-extrabold text-gray-900">$49.99</span>
                <span class="ml-2 text-gray-500">/month</span>
              </div>
              <p class="mt-2 text-gray-500">For large-scale enterprises</p>
            </div>
            <div class="mt-8">
              <ul class="space-y-4">
                <li class="flex items-center">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-600">All Pro Features</span>
                </li>
                <li class="flex items-center">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-600">Unlimited Team Members</span>
                </li>
                <li class="flex items-center">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-600">24/7 Dedicated Support</span>
                </li>
                <li class="flex items-center">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="ml-3 text-gray-600">Custom Integration</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="px-8 pb-8">
            <button class="w-full py-4 px-8 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:-translate-y-1">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-20 text-center">
        <h2 class="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <p class="mt-4 text-lg text-gray-600">
          Have questions? We're here to help.
        </p>
        <div class="mt-8 inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold cursor-pointer">
          Contact our support team
          <svg class="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
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
