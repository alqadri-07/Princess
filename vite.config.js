import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Ganti '/nama-repositori-anda/' dengan nama repository GitHub Anda yang sebenarnya.
  // Contoh: Jika URL GitHub Pages Anda adalah 'username.github.io/birthday-salamah/', 
  // maka tuliskan '/birthday-salamah/'
  base: '/nama-repositori-anda/', 
  
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})