import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),

  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@config': path.resolve(__dirname, './src/config'),
      '@upcoming': path.resolve(__dirname, './src/Dash')
    }
  },
  server: {
    proxy: {
      // This will proxy requests to '/api' to 'http://localhost:5000'
      '/api': {
        target: 'http://localhost:5000',  // Your backend's URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove '/api' prefix
      },
    },
  },
});
