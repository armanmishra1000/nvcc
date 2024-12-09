import { createRouter, createWebHistory } from 'vue-router'
import AppHome from '../views/Home.vue'
import AppLogin from '../views/Login.vue'
import AppRegister from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppHome
  },
  {
    path: '/login',
    name: 'Login',
    component: AppLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: AppRegister
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
