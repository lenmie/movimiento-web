/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // En `npm run dev` las Functions no corren: se usan las de `wrangler pages dev` (puerto 8788).
    proxy: {
      '/descargar': 'http://localhost:8788',
      '/api': 'http://localhost:8788',
      '/aporte': 'http://localhost:8788',
    },
  },
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/functions/**/*.test.ts'],
    environment: 'node',
  },
})
