<template>
  <footer class="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-400">
    <!-- Newsletter Section with Trust Signals -->
    <div class="border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="max-w-md">
            <h2 class="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">Join 50,000+ Successful Marketers</h2>
            <p class="text-gray-400">Get exclusive strategies, instant updates, and early access to new features. Don't miss out!</p>
            <div class="flex items-center mt-4 space-x-4 text-sm">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                <span>No spam, ever</span>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                </svg>
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </div>
          <div class="flex w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-l-lg focus:outline-none focus:border-orange-500 flex-grow md:w-64 placeholder-gray-500"
            >
            <button class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-r-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium group">
              Subscribe
              <span class="hidden sm:inline-block ml-1 group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        <!-- Logo and Social Proof -->
        <div class="space-y-8">
          <div class="flex items-center space-x-3">
            <div class="flex space-x-1">
              <span class="w-5 h-5 rounded bg-gradient-to-br from-orange-500 to-orange-600 transform hover:rotate-12 transition-transform duration-300"></span>
              <span class="w-5 h-5 rounded bg-gradient-to-br from-orange-400 to-orange-500 transform hover:-rotate-12 transition-transform duration-300"></span>
              <span class="w-5 h-5 rounded bg-gradient-to-br from-orange-300 to-orange-400 transform hover:rotate-12 transition-transform duration-300"></span>
            </div>
            <span class="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">NVCC</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Trusted by over 100,000 marketers worldwide. Our 99.9% uptime and 24/7 support ensure your success in digital advertising.
          </p>
          <div class="flex flex-wrap gap-3">
            <a href="#" class="group bg-gray-800/50 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 border border-gray-700/50">
              <div class="flex items-center space-x-2">
                <span class="text-orange-500">★ 4.9</span>
                <span class="text-sm text-gray-400 group-hover:text-white">500+ Reviews</span>
              </div>
            </a>
            <a href="#" class="group bg-gray-800/50 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 border border-gray-700/50">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.27-.48.74-.74 2.87-1.25 4.79-2.08 5.76-2.5 2.73-1.18 3.3-1.39 3.67-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
                </svg>
                <span class="text-sm text-gray-400 group-hover:text-white">25k+ Members</span>
              </div>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-links-column">
          <h3 class="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">Resources</h3>
          <ul class="space-y-4">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 block hover:translate-x-1 transform transition-transform">Success Stories</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 block hover:translate-x-1 transform transition-transform">ROI Calculator</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 block hover:translate-x-1 transform transition-transform">Knowledge Base</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 block hover:translate-x-1 transform transition-transform">API Documentation</a></li>
          </ul>
        </div>

        <div class="footer-links-column">
          <h3 class="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">Company</h3>
          <ul class="space-y-4">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 block hover:translate-x-1 transform transition-transform">About Us</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 block hover:translate-x-1 transform transition-transform">Security</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 block hover:translate-x-1 transform transition-transform">Terms of Service</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 block hover:translate-x-1 transform transition-transform">Privacy Policy</a></li>
          </ul>
        </div>

        <!-- Support and Language -->
        <div class="space-y-8">
          <div>
            <h3 class="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">24/7 Support</h3>
            <a href="#" class="group flex items-center space-x-3 bg-gray-800/50 px-4 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 border border-gray-700/50">
              <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
              </svg>
              <div class="flex-1">
                <div class="text-sm font-medium text-white group-hover:text-orange-500">Live Chat Support</div>
                <p class="text-xs text-gray-400">Average response time: 2 mins</p>
              </div>
              <svg class="w-5 h-5 text-gray-500 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div>
            <h3 class="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">Language</h3>
            <button class="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-700 hover:border-orange-500 bg-gray-800/50 hover:bg-gray-800 transition-all duration-200 group">
              <div class="flex items-center space-x-3">
                <img src="https://flagcdn.com/w20/us.png" alt="English" class="w-5 h-5 rounded-sm shadow-sm" />
                <span class="text-gray-300 group-hover:text-white">English (US)</span>
              </div>
              <svg class="w-4 h-4 text-gray-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar with Trust Signals -->
    <div class="border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span> 2024 NVCC. All rights reserved.</span>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>SOC2 Type II Certified</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>
