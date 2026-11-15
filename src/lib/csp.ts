/**
 * 內容安全政策：只允許載入本站自己的資源，也不允許連線到其他網站。
 * 靜態產生的頁面含有 Next.js 的行內指令碼，因此 script-src 需要 'unsafe-inline'；
 * 本站沒有任何使用者產生的內容會被當成 HTML 輸出。
 *
 * forMeta：以 <meta> 標籤送出時（靜態主機無法設定 HTTP 標頭），
 * 瀏覽器會忽略 frame-ancestors，因此不列入。
 */
export function buildCsp({ dev, forMeta }: { dev: boolean; forMeta: boolean }): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src 'self'${dev ? ' ws:' : ''}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    ...(forMeta ? [] : ["frame-ancestors 'self'"]),
  ].join('; ');
}

/** 建置目標：預設為 Node 伺服器；設為 github-pages 時輸出純靜態檔案。 */
export const IS_STATIC_EXPORT = process.env.DEPLOY_TARGET === 'github-pages';
