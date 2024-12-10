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
            sign in to your account
          </router-link>
        </p>
      </div>
      <Form :validation-schema="schema" @submit="handleRegister" class="space-y-6" v-slot="{ errors }">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="name" class="sr-only">Name</label>
            <Field
              id="name"
              name="name"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Name"
            />
            <span v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name }}</span>
          </div>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <Field
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
            <Field
              id="password"
              name="password"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Password"
            />
            <span v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password }}</span>
          </div>
          <div>
            <label for="confirmPassword" class="sr-only">Confirm Password</label>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Confirm Password"
            />
            <span v-if="errors.confirmPassword" class="text-sm text-red-500 mt-1">{{ errors.confirmPassword }}</span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
          >
            <span v-if="loading">Registering...</span>
            <span v-else>Create Account</span>
          </button>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { authService } from '@/services/authService'

const router = useRouter()
const loading = ref(false)
const error = ref(null)

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

const handleRegister = async (formValues) => {
  try {
    loading.value = true
    error.value = null
    
    await authService.register({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    })
    
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
