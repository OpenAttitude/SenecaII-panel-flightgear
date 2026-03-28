import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: rootDir,
  /** CI sets `BASE_URL=/` for https://senecaii.openattitude.org/; use `/repo-name/` only for subpath hosting. */
  base: process.env.BASE_URL ?? '/',
  publicDir: 'public',
  plugins: [vue()],
  // Limit dependency pre-bundling to this app’s entry (not instrument testbed HTML under node_modules).
  optimizeDeps: {
    entries: [fileURLToPath(new URL('./index.html', import.meta.url))],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    cssCodeSplit: false,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        chunkFileNames: 'js/[name].min.js',
        entryFileNames: 'js/[name].min.js',
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name ?? '')) {
            return 'css/style.min.css'
          }
          return 'assets/[name].min[extname]'
        },
      },
    },
    target: 'esnext',
    reportCompressedSize: true,
    chunkSizeWarningLimit: 2000,
  },
})
