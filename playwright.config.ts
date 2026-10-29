import { defineConfig, devices } from '@playwright/test'

// Corre contra `wrangler pages dev`: sitio + Functions + D1/R2 locales.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:8788',
    acceptDownloads: true,
  },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    {
      name: 'movil',
      use: { ...devices['Desktop Chrome'], viewport: { width: 360, height: 640 }, isMobile: true, hasTouch: true },
    },
  ],
  webServer: {
    command: 'npm run preview:cf',
    url: 'http://localhost:8788',
    reuseExistingServer: true,
    timeout: 180_000,
  },
})
