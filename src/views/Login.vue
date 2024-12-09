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
      <Form @submit="handleLogin" class="space-y-6" v-slot="{ errors }">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
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
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Sign in
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'

export default {
  name: 'AppLogin',
  components: {
    Form
  },
  setup() {
    const router = useRouter()

    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(6)
    })

    const handleLogin = async (values) => {
      try {
        // This should be replaced with actual API call
        console.log('Login values:', values)
        localStorage.setItem('isAuthenticated', 'true')
        router.push('/dashboard')
      } catch (error) {
        console.error('Login error:', error)
      }
    }

    return {
      schema,
      handleLogin
    }
  }
}
</script>
