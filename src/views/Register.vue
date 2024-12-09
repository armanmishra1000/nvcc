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
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-400">
          Or
          <router-link to="/login" class="font-medium text-orange-500 hover:text-orange-400">
            sign in to your existing account
          </router-link>
        </p>
      </div>
      <Form @submit="handleRegister" class="space-y-6" v-slot="{ errors }">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="fullName" class="sr-only">Full name</label>
            <input
              id="fullName"
              v-model="fullName"
              name="fullName"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Full name"
            />
            <span v-if="errors.fullName" class="text-sm text-red-500 mt-1">{{ errors.fullName }}</span>
          </div>
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
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Password"
            />
            <span v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password }}</span>
          </div>
          <div>
            <label for="confirmPassword" class="sr-only">Confirm password</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Confirm password"
            />
            <span v-if="errors.confirmPassword" class="text-sm text-red-500 mt-1">{{ errors.confirmPassword }}</span>
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            v-model="acceptTerms"
            required
            class="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-700 rounded bg-gray-800"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-400">
            I agree to the
            <a href="#" class="text-orange-500 hover:text-orange-400">Terms of Service</a>
            and
            <a href="#" class="text-orange-500 hover:text-orange-400">Privacy Policy</a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Create account
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
  name: 'AppRegister',
  components: {
    Form
  },
  setup() {
    const router = useRouter()

    const schema = yup.object({
      fullName: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
    })

    const handleRegister = async (values) => {
      try {
        // This should be replaced with actual API call
        console.log('Register values:', values)
        localStorage.setItem('isAuthenticated', 'true')
        router.push('/dashboard')
      } catch (error) {
        console.error('Registration error:', error)
      }
    }

    return {
      schema,
      handleRegister
    }
  }
}
</script>
