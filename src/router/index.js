import { createRouter, createWebHistory } from 'vue-router'
import AppHome from '../views/Home.vue'
import AppLogin from '../views/Login.vue'
import AppRegister from '../views/Register.vue'
import AppDashboard from '../views/AppDashboard.vue'
import AccountSettings from '@/views/AccountSettings.vue'
import UserAccounts from '@/views/UserAccounts.vue'
import UserCards from '@/views/UserCards.vue'
import UserFriends from '@/views/UserFriends.vue'
import UserPayments from '@/views/UserPayments.vue'
import UserPrivate from '@/views/UserPrivate.vue'
import UserTeam from '@/views/UserTeam.vue'

// Simulated auth guard
const isAuthenticated = () => {
  // This should be replaced with actual authentication logic
  return localStorage.getItem('isAuthenticated') === 'true'
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
    component: AppDashboard,
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
    name: 'Accounts',
    component: UserAccounts,
    meta: { requiresAuth: true }
  },
  {
    path: '/cards',
    name: 'Cards',
    component: UserCards,
    meta: { requiresAuth: true }
  },
  {
    path: '/friends',
    name: 'Friends',
    component: UserFriends,
    meta: { requiresAuth: true }
  },
  {
    path: '/payments',
    name: 'Payments',
    component: UserPayments,
    meta: { requiresAuth: true }
  },
  {
    path: '/private',
    name: 'Private',
    component: UserPrivate,
    meta: { requiresAuth: true }
  },
  {
    path: '/team',
    name: 'Team',
    component: UserTeam,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated()

  if (to.meta.requiresAuth && !authenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
