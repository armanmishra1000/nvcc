const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 5003,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true
      },
      '/ws': {
        target: 'ws://localhost:5002',
        ws: true
      }
    },
    client: {
      webSocketURL: 'ws://localhost:5002/ws'
    }
  }
})
