import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': 'http://localhost:5000',
      '/login': 'http://localhost:5000',
      '/logout': 'http://localhost:5000',
      '/log_food': 'http://localhost:5000',
      '/log_water': 'http://localhost:5000',
      '/log_exercise': 'http://localhost:5000',
      '/get_nutrition': 'http://localhost:5000',
      '/ai-coach': 'http://localhost:5000',
      '/api': 'http://localhost:5000',
      '/user': 'http://localhost:5000'
    }
  }
})