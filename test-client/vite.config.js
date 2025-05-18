import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5001,
    strictPort: true,
    hmr: {
      clientPort: 443
    },
    // Allow all Replit domains
    cors: true,
    allowedHosts: ['8ba45fb7-2afe-44ce-adb7-da5450c1b479-00-an4cz8zd1ufv.picard.replit.dev', '.replit.dev', '.repl.co', 'localhost', 'all']
  }
})