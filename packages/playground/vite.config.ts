import vue2 from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue2()],
  server: {
    host: '0.0.0.0',
    port: 9002,
  },
})
