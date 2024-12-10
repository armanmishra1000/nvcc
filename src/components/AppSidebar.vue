<template>
  <nav class="flex flex-col h-full bg-white border-r border-gray-200">
    <div class="flex flex-col flex-grow">
      <!-- Navigation Links -->
      <div class="space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="[
            $route.path === item.href
              ? 'bg-gray-50 text-orange-600 border-l-4 border-orange-500'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center px-6 py-3 text-sm font-medium'
          ]"
        >
          <component
            :is="item.icon"
            :class="[
              $route.path === item.href ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
              'h-5 w-5 mr-3'
            ]"
            aria-hidden="true"
          />
          {{ item.name }}
          <span
            v-if="item.badge"
            :class="[
              'ml-auto inline-block py-0.5 px-2 text-xs rounded-full',
              item.badge === 'HOT' ? 'bg-orange-100 text-orange-600' : ''
            ]"
          >
            {{ item.badge }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import {
  HomeIcon,
  UserIcon,
  CreditCardIcon,
  BanknotesIcon,
  LockClosedIcon,
  UsersIcon,
  PlusCircleIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'AppSidebar',
  components: {
    HomeIcon,
    UserIcon,
    CreditCardIcon,
    BanknotesIcon,
    LockClosedIcon,
    UsersIcon,
    PlusCircleIcon
  },
  setup() {
    const navigation = [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
      { name: 'My accounts', href: '/accounts', icon: UserIcon },
      { name: 'My cards', href: '/cards', icon: CreditCardIcon },
      { name: 'Get Card', href: '/get-card', icon: PlusCircleIcon },
      { name: 'Payments', href: '/payments', icon: BanknotesIcon },
      { name: 'NVCC Plans', href: '/plans', icon: LockClosedIcon, badge: 'HOT' },
      { name: 'For friends', href: '/friends', icon: UsersIcon },
    ]

    return {
      navigation
    }
  }
}
</script>
