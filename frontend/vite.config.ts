import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/create-payment-intent': 'http://localhost:4242',
      '/health': 'http://localhost:4242'
    }
  }
});