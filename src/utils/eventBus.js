import { ref } from 'vue'

const bus = {}

export const eventBus = {
  emit(event, data) {
    if (bus[event]) {
      bus[event].forEach(callback => callback(data))
    }
  },

  on(event, callback) {
    if (!bus[event]) {
      bus[event] = []
    }
    bus[event].push(callback)
  },

  off(event, callback) {
    if (!bus[event]) return
    bus[event] = bus[event].filter(cb => cb !== callback)
  }
}
