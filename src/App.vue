<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-grow flex">
      <AppSidebar v-if="showSidebar" class="w-64 flex-shrink-0" />
      <div class="flex-grow">
        <router-view></router-view>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppFooter from './components/AppFooter.vue'
import AppSidebar from './components/AppSidebar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppSidebar
  },
  setup() {
    const route = useRoute()
    const showSidebar = computed(() => {
      return route.meta.requiresAuth === true
    })

    return {
      showSidebar
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
