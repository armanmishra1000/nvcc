<template>
  <footer class="bg-[#1C1E21] text-gray-400">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo and Social Links -->
        <div class="space-y-6">
          <div class="flex items-center space-x-2">
            <div class="flex space-x-1">
              <span class="w-4 h-4 rounded bg-orange-500"></span>
              <span class="w-4 h-4 rounded bg-orange-400"></span>
              <span class="w-4 h-4 rounded bg-orange-300"></span>
            </div>
            <span class="text-xl font-bold text-white ml-2">NVCC</span>
          </div>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <span class="sr-only">Reviews</span>
              <div class="px-3 py-1 border border-gray-700 rounded-md hover:border-gray-500">Reviews</div>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <span class="sr-only">Telegram</span>
              <div class="px-3 py-1 border border-gray-700 rounded-md hover:border-gray-500">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.27-.48.74-.74 2.87-1.25 4.79-2.08 5.76-2.5 2.73-1.18 3.3-1.39 3.67-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
                </svg>
              </div>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <span class="sr-only">X (Twitter)</span>
              <div class="px-3 py-1 border border-gray-700 rounded-md hover:border-gray-500">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <h3 class="text-white font-semibold mb-4">Private</h3>
          <ul class="space-y-3">
            <li><a href="#" class="hover:text-white transition-colors duration-200">PST Pulse</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-200">For partners</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-200">Blog</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-semibold mb-4">Legal</h3>
          <ul class="space-y-3">
            <li><a href="#" class="hover:text-white transition-colors duration-200">Terms of Service</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-200">FAQ</a></li>
          </ul>
        </div>

        <!-- Language Selector -->
        <div>
          <h3 class="text-white font-semibold mb-4">Language</h3>
          <button class="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 transition-all duration-200">
            <img src="@/assets/us-flag.png" alt="US Flag" class="w-5 h-5" />
            <span class="text-gray-300">English</span>
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Bar with Time -->
    <div class="border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <p class="text-sm">
            Facebook and the Facebook logo are trademarks of Meta Platforms, Inc.
          </p>
          <div class="bg-gray-800 px-3 py-1 rounded-md font-mono text-sm">
            <span>PST TIME</span>
            <span class="ml-2">02:44:56</span>
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
