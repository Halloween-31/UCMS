import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
      plugins: [
        react(),
        tailwindcss()
    ],
      server: {
          port: parseInt(env.VITE_PORT),
          proxy: {
              '/api': {
                  target: process.env.services__dataService__https__0 ||
                      process.env.services__dataService__http__0,
                  changeOrigin: true,
                  rewrite: (path) => path.replace(/^\/api/, ''),
                  secure: false,
              },
              '/aiApi': {
                  target: process.env.services__aiservice__https__0 ||
                      process.env.services__aiservice__http__0,
                  changeOrigin: true,
                  rewrite: (path) => path.replace(/^\/aiApi/, ''),
                  secure: false,
              }
          },
      },
      build: {
          outDir: 'dist',
          rollupOptions: {
              input: './index.html'
          }
      }
  }
})
