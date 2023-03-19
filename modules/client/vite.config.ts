import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.join(__dirname, '../server/public')
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8083',
      '/rest': 'http://localhost:8083'
    }
  }
})
