import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.hua.ai.kr',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path
      }
    }
  }
}) 