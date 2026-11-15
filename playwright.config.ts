import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [['list']],
  use: {
    baseURL,
    locale: 'zh-TW',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    // 平板以 WebKit（Safari 的引擎）測試，涵蓋學校常見的 iPad
    { name: 'tablet', use: { ...devices['iPad (gen 7)'] } },
  ],
  webServer: {
    // 以正式建置結果測試；請先執行 npm run build。
    command: `npm run start -- --port ${PORT} --hostname 127.0.0.1`,
    url: baseURL,
    // 不重用既有伺服器：避免測到舊的建置結果。連接埠被占用時會直接報錯。
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
