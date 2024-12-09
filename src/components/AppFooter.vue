<template>
  <footer class="bg-gradient-to-b from-[#1C1E21] to-[#121417] text-gray-400">
    <!-- Newsletter Section -->
    <div class="border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="max-w-md">
            <h2 class="text-2xl font-bold text-white mb-2">Stay updated with NVCC</h2>
            <p class="text-gray-400">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
          </div>
          <div class="flex w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-orange-500 flex-grow md:w-64"
            >
            <button class="px-6 py-3 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors duration-200 font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        <!-- Logo and Social Links -->
        <div class="space-y-8">
          <div class="flex items-center space-x-3">
            <div class="flex space-x-1">
              <span class="w-5 h-5 rounded bg-orange-500 transform hover:rotate-12 transition-transform duration-300"></span>
              <span class="w-5 h-5 rounded bg-orange-400 transform hover:-rotate-12 transition-transform duration-300"></span>
              <span class="w-5 h-5 rounded bg-orange-300 transform hover:rotate-12 transition-transform duration-300"></span>
            </div>
            <span class="text-2xl font-bold text-white ml-2">NVCC</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Experience the future of digital payments with NVCC. Fast, secure, and reliable transactions at your fingertips.
          </p>
          <div class="flex flex-wrap gap-3">
            <a href="#" class="social-link group">
              <span class="sr-only">Reviews</span>
              <div class="social-icon-container">
                <span class="text-sm">Reviews</span>
                <div class="social-icon-badge">4.9★</div>
              </div>
            </a>
            <a href="#" class="social-link group">
              <span class="sr-only">Telegram</span>
              <div class="social-icon-container">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.27-.48.74-.74 2.87-1.25 4.79-2.08 5.76-2.5 2.73-1.18 3.3-1.39 3.67-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
                </svg>
                <div class="social-icon-badge">12k</div>
              </div>
            </a>
            <a href="#" class="social-link group">
              <span class="sr-only">X (Twitter)</span>
              <div class="social-icon-container">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <div class="social-icon-badge">45k</div>
              </div>
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="footer-links-column">
          <h3 class="footer-heading text-lg font-semibold text-white mb-6">Private</h3>
          <ul class="footer-links space-y-4">
            <li><a href="#" class="footer-link text-gray-400 hover:text-white transition-colors duration-200 block">PST Pulse</a></li>
            <li><a href="#" class="footer-link text-gray-400 hover:text-white transition-colors duration-200 block">For partners</a></li>
            <li><a href="#" class="footer-link text-gray-400 hover:text-white transition-colors duration-200 block">Blog</a></li>
            <li><a href="#" class="footer-link text-gray-400 hover:text-white transition-colors duration-200 block">Support</a></li>
          </ul>
        </div>

        <div class="footer-links-column">
          <h3 class="footer-heading text-lg font-semibold text-white mb-6">Legal</h3>
          <ul class="footer-links space-y-4">
            <li><a href="#" class="footer-link text-gray-400 hover:text-white transition-colors duration-200 block">Terms of Service</a></li>
            <li><a href="#" class="footer-link text-gray-400 hover:text-white transition-colors duration-200 block">Privacy Policy</a></li>
            <li><a href="#" class="footer-link text-gray-400 hover:text-white transition-colors duration-200 block">Security</a></li>
            <li><a href="#" class="footer-link text-gray-400 hover:text-white transition-colors duration-200 block">FAQ</a></li>
          </ul>
        </div>

        <!-- Language and App Links -->
        <div class="space-y-8">
          <div>
            <h3 class="footer-heading text-lg font-semibold text-white mb-6">Language</h3>
            <button class="mt-3 w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-700 hover:border-orange-500 hover:bg-gray-800/50 transition-all duration-200 group">
              <div class="flex items-center space-x-3">
                <img src="@/assets/us-flag.png" alt="US Flag" class="w-5 h-5 rounded-sm" />
                <span class="text-gray-300 group-hover:text-white">English</span>
              </div>
              <svg class="w-4 h-4 text-gray-500 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar with Time -->
    <div class="border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-sm text-gray-500 max-w-3xl">
            Facebook and the Facebook logo are trademarks of Meta Platforms, Inc. registered in the U.S. and other countries and regions.
          </p>
          <div class="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg font-mono text-sm border border-gray-700/50 shadow-lg">
            <span class="text-orange-500">PST</span>
            <span class="text-gray-400 ml-2">TIME</span>
            <span class="ml-2 text-white">02:44:56</span>
            <span class="ml-2 text-gray-500">MON DEC 09</span>
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
