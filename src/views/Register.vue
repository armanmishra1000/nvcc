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
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Full name"
            />
            <span v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name }}</span>
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
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg v-if="!loading" class="h-5 w-5 text-orange-400 group-hover:text-orange-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Creating account...' : 'Create account' }}
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
  name: 'AppRegister',
  setup() {
    const router = useRouter()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const acceptTerms = ref(false)
    const loading = ref(false)
    const errors = ref({})

    const schema = yup.object({
      name: yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
      email: yup.string().required('Email is required').email('Must be a valid email'),
      password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter'),
      confirmPassword: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
      acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions')
    })

    const handleSubmit = async () => {
      try {
        loading.value = true
        errors.value = {}
        
        await schema.validate({
          name: name.value,
          email: email.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
          acceptTerms: acceptTerms.value
        }, { abortEarly: false })
        
        // Here you would typically make an API call to your backend
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
        
        console.log('Registration successful', {
          name: name.value,
          email: email.value,
          password: password.value
        })
        
        // Redirect to login page after successful registration
        router.push('/login')
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
      name,
      email,
      password,
      confirmPassword,
      acceptTerms,
      loading,
      errors,
      handleSubmit
    }
  }
}
</script>
