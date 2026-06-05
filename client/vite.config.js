import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { config as dotenvConfig } from 'dotenv'
dotenvConfig()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
    '/api': process.env.VITE_BACKENDURL
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
