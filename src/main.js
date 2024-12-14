import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/tailwind.css'
import { websocketService } from './services/websocketService'

const app = createApp(App)
app.config.globalProperties.$ws = websocketService

app.use(router)
app.use(Toast)

app.mount('#app')
