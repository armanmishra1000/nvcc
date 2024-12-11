import { createRouter, createWebHistory } from 'vue-router'
import AppHome from '../views/Home.vue'
import AppLogin from '../views/Login.vue'
import AppRegister from '../views/Register.vue'
import WalletDashboard from '../views/WalletDashboard.vue'
import AccountSettings from '@/views/AccountSettings.vue'
import UserAccounts from '@/views/UserAccounts.vue'
import UserCards from '@/views/UserCards.vue'
import UserFriends from '@/views/UserFriends.vue'
import UserTeam from '@/views/UserTeam.vue'
import Payments from '@/views/Payments.vue'
import NvccPlans from '@/views/NvccPlans.vue'
import AdminLogin from '@/views/admin/Login.vue'
import AdminDashboard from '@/views/admin/Dashboard.vue'

// Simulated auth guard
const isAuthenticated = () => {
  // This should be replaced with actual authentication logic
  return localStorage.getItem('isAuthenticated') === 'true'
}

// Admin auth guard
const isAdmin = () => {
  return localStorage.getItem('isAdmin') === 'true'
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppHome
  },
  {
    path: '/login',
    name: 'Login',
    component: AppLogin,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: AppRegister,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: WalletDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/account/settings',
    name: 'AccountSettings',
    component: AccountSettings,
    meta: { requiresAuth: true }
  },
  {
    path: '/accounts',
    name: 'UserAccounts',
    component: UserAccounts,
    meta: { requiresAuth: true }
  },
  {
    path: '/cards',
    name: 'UserCards',
    component: UserCards,
    meta: { requiresAuth: true }
  },
  {
    path: '/friends',
    name: 'UserFriends',
    component: UserFriends,
    meta: { requiresAuth: true }
  },
  {
    path: '/payments',
    name: 'Payments',
    component: Payments,
    meta: { requiresAuth: true }
  },
  {
    path: '/team',
    name: 'UserTeam',
    component: UserTeam,
    meta: { requiresAuth: true }
  },
  {
    path: '/plans',
    name: 'NvccPlans',
    component: NvccPlans,
    meta: { requiresAuth: true }
  },
  // Admin routes
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: { requiresGuest: true }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('@/views/admin/Users.vue'),
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/subscriptions',
    name: 'AdminSubscriptions',
    component: () => import('@/views/admin/Subscriptions.vue'),
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/cards',
    name: 'AdminCards',
    component: () => import('@/views/admin/Cards.vue'),
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/wallets',
    name: 'AdminWallets',
    component: () => import('@/views/admin/Wallets.vue'),
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Check for requiresAdmin meta field
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!isAdmin()) {
      next('/admin/login')
    } else {
      next()
    }
  }
  // Check for requiresAuth meta field
  else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next('/login')
    } else {
      next()
    }
  }
  // Check for requiresGuest meta field
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (to.path === '/admin/login' && isAdmin()) {
      next('/admin')
    } else if (isAuthenticated()) {
      next('/')
    } else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
