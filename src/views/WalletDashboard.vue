<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex">
      <div class="w-64 flex-shrink-0">
        <AppSidebar />
      </div>
      <div class="flex-1">
        <main class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Wallets Section -->
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div v-for="wallet in wallets" :key="wallet.type" class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <h3 class="text-lg font-medium text-gray-900">{{ wallet.type }}</h3>
                      <p class="mt-1 text-2xl font-semibold text-orange-600">{{ wallet.balance }}</p>
                      <p class="mt-1 text-sm text-gray-500">{{ wallet.currency }}</p>
                    </div>
                    <div class="flex-shrink-0">
                      <component :is="wallet.icon" class="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                  <div class="text-sm">
                    <button @click="openTopUpModal(wallet.type)" class="font-medium text-orange-600 hover:text-orange-500">
                      Top Up Wallet <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Transactions -->
            <div class="mt-8">
              <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                  <h2 class="text-lg font-medium text-gray-900">Recent Transactions</h2>
                  <p class="mt-2 text-sm text-gray-700">A list of your recent transactions across all wallets.</p>
                </div>
              </div>
              <div class="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
                <ul role="list" class="divide-y divide-gray-200">
                  <li v-for="transaction in recentTransactions" :key="transaction.id" class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div :class="[
                          transaction.type === 'received' ? 'bg-green-100' : 'bg-red-100',
                          'rounded-full p-2'
                        ]">
                          <component 
                            :is="transaction.type === 'received' ? 'ArrowDownIcon' : 'ArrowUpIcon'"
                            class="h-5 w-5"
                            :class="transaction.type === 'received' ? 'text-green-600' : 'text-red-600'"
                          />
                        </div>
                        <div class="ml-4">
                          <p class="text-sm font-medium text-gray-900">{{ transaction.description }}</p>
                          <p class="text-sm text-gray-500">{{ transaction.date }}</p>
                        </div>
                      </div>
                      <div class="ml-4">
                        <p :class="[
                          transaction.type === 'received' ? 'text-green-600' : 'text-red-600',
                          'text-sm font-semibold'
                        ]">
                          {{ transaction.type === 'received' ? '+' : '-' }}{{ transaction.amount }}
                        </p>
                        <p class="text-sm text-gray-500">{{ transaction.wallet }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- Top Up Modal -->
      <WalletTopUpModal
        :is-open="isTopUpModalOpen"
        :wallet-type="selectedWallet"
        @close="closeTopUpModal"
        @top-up="handleTopUp"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import WalletTopUpModal from '@/components/WalletTopUpModal.vue'
import { 
  CurrencyDollarIcon, 
  CurrencyEuroIcon, 
  CurrencyPoundIcon, 
  CubeTransparentIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'WalletDashboard',
  components: {
    AppSidebar,
    WalletTopUpModal,
    CurrencyDollarIcon,
    CurrencyEuroIcon,
    CurrencyPoundIcon,
    CubeTransparentIcon,
    ArrowUpIcon,
    ArrowDownIcon
  },
  setup() {
    const wallets = ref([
      {
        type: 'USD Wallet',
        balance: '$2,456.78',
        currency: 'US Dollar',
        icon: 'CurrencyDollarIcon'
      },
      {
        type: 'Euro Wallet',
        balance: '€1,892.34',
        currency: 'Euro',
        icon: 'CurrencyEuroIcon'
      },
      {
        type: 'GBP Wallet',
        balance: '£1,234.56',
        currency: 'British Pound',
        icon: 'CurrencyPoundIcon'
      },
      {
        type: 'Crypto Wallet',
        balance: '₿0.0456',
        currency: 'Bitcoin',
        icon: 'CubeTransparentIcon'
      }
    ])

    const recentTransactions = ref([
      {
        id: 1,
        type: 'received',
        description: 'Received from John Doe',
        amount: '$250.00',
        wallet: 'USD Wallet',
        date: '2024-12-09 18:30'
      },
      {
        id: 2,
        type: 'sent',
        description: 'Sent to Alice Smith',
        amount: '€180.00',
        wallet: 'Euro Wallet',
        date: '2024-12-09 17:45'
      },
      {
        id: 3,
        type: 'received',
        description: 'Crypto Transfer',
        amount: '₿0.0025',
        wallet: 'Crypto Wallet',
        date: '2024-12-09 16:20'
      },
      {
        id: 4,
        type: 'sent',
        description: 'Payment to Vendor',
        amount: '£145.99',
        wallet: 'GBP Wallet',
        date: '2024-12-09 15:10'
      }
    ])

    const isTopUpModalOpen = ref(false)
    const selectedWallet = ref('')

    const openTopUpModal = (walletType) => {
      selectedWallet.value = walletType
      isTopUpModalOpen.value = true
    }

    const closeTopUpModal = () => {
      isTopUpModalOpen.value = false
      selectedWallet.value = ''
    }

    const handleTopUp = ({ amount, paymentMethod, walletType }) => {
      // TODO: Implement actual top-up functionality
      console.log(`Top up ${amount} to ${walletType} using ${paymentMethod}`)
      
      // Add to recent transactions
      recentTransactions.value.unshift({
        id: Date.now(),
        type: 'received',
        description: `Top Up via ${paymentMethod}`,
        amount: `${amount}`,
        wallet: walletType,
        date: new Date().toLocaleString()
      })

      closeTopUpModal()
    }

    return {
      wallets,
      recentTransactions,
      isTopUpModalOpen,
      selectedWallet,
      openTopUpModal,
      closeTopUpModal,
      handleTopUp
    }
  }
}
</script>
