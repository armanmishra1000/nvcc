<template>
  <div class="min-h-screen bg-gradient-to-b from-[#1C1E21] to-[#121417] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-xl shadow-2xl">
      <div>
        <div class="flex justify-center">
          <!-- Logo squares similar to header -->
          <div class="flex space-x-1">
            <div class="w-4 h-4 bg-orange-500 rounded-sm"></div>
            <div class="w-4 h-4 bg-orange-500/80 rounded-sm"></div>
            <div class="w-4 h-4 bg-orange-500/60 rounded-sm"></div>
          </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-400">
          Or
          <router-link to="/register" class="font-medium text-orange-500 hover:text-orange-400">
            create a new account
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Email address"
            />
            <span v-if="errors.email" class="text-sm text-red-500 mt-1">{{ errors.email }}</span>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Password"
            />
            <span v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password }}</span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="rememberMe"
              class="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-700 rounded bg-gray-800"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-400">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-orange-500 hover:text-orange-400">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg v-if="!loading" class="h-5 w-5 text-orange-400 group-hover:text-orange-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

export default {
  name: 'AppLogin',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const loading = ref(false)
    const errors = ref({})

    const schema = yup.object({
      email: yup.string().required('Email is required').email('Must be a valid email'),
      password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
    })

    const handleSubmit = async () => {
      try {
        loading.value = true
        errors.value = {}
        
        await schema.validate({ email: email.value, password: password.value }, { abortEarly: false })
        
        // Here you would typically make an API call to your backend
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
        
        console.log('Login successful', {
          email: email.value,
          password: password.value,
          rememberMe: rememberMe.value
        })
        
        // Redirect to home page after successful login
        router.push('/')
      } catch (err) {
        if (err.inner) {
          err.inner.forEach((error) => {
            errors.value[error.path] = error.message
          })
        }
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      rememberMe,
      loading,
      errors,
      handleSubmit
    }
  }
}
</script>
