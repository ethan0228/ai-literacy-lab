/** DEPLOY_TARGET=github-pages 時，測試的是 out/ 的靜態匯出結果。 */
export const IS_STATIC_EXPORT = process.env.DEPLOY_TARGET === 'github-pages';

/** 比對目前網址的路徑；靜態匯出版的網址會多一個結尾斜線。 */
export function atPath(path: string): RegExp {
  const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^https?://[^/]+${escaped}/?$`);
}
