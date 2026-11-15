import type { NextConfig } from 'next';
import { buildCsp, IS_STATIC_EXPORT } from './src/lib/csp';

const isDev = process.env.NODE_ENV !== 'production';

const securityHeaders = [
  { key: 'Content-Security-Policy', value: buildCsp({ dev: isDev, forMeta: false }) },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
];

/** 預設：以 Node 伺服器執行（next start），由伺服器送出安全標頭。 */
const serverConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

/**
 * DEPLOY_TARGET=github-pages：輸出純靜態檔案到 out/。
 * - 靜態主機無法送出自訂標頭，CSP 改由 layout 的 <meta> 標籤提供。
 * - trailingSlash：每頁輸出為 <路徑>/index.html，避免 GitHub Pages 對同名資料夾轉址後 404。
 * - PAGES_BASE_PATH：專案網站（帳號.github.io/儲存庫）的子路徑，例如 /ai-lab；
 *   部署流程會自動帶入，自訂網域時為空字串。
 */
const staticConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.PAGES_BASE_PATH || undefined,
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(IS_STATIC_EXPORT ? staticConfig : serverConfig),
};

export default nextConfig;
