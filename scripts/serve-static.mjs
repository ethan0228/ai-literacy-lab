#!/usr/bin/env node
/**
 * 本機預覽與測試用的極簡靜態檔案伺服器，行為比照 GitHub Pages：
 * - 資料夾回傳其中的 index.html
 * - 找不到檔案時回傳 404.html 與 404 狀態碼
 * - 可用 --base 指定子路徑（例如 /ai-lab），模擬專案網站
 *
 * 用法：node scripts/serve-static.mjs [--port 3100] [--base /ai-lab] [--dir out]
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';

function option(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : (process.argv[index + 1] ?? fallback);
}

const port = Number(option('port', '3100'));
const base = option('base', '').replace(/\/$/, '');
const root = resolve(option('dir', 'out'));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

if (!existsSync(root)) {
  console.error(`找不到 ${root}，請先執行 npm run build:pages`);
  process.exit(1);
}

function send(response, status, file) {
  response.writeHead(status, {
    'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
  });
  createReadStream(file).pipe(response);
}

function resolveFile(pathname) {
  // normalize 後再確認仍在 root 之內，避免 ../ 讀到資料夾外的檔案
  const target = normalize(join(root, decodeURIComponent(pathname)));
  if (target !== root && !target.startsWith(root + sep)) return null;
  if (existsSync(target) && statSync(target).isFile()) return target;
  const index = join(target, 'index.html');
  if (existsSync(index)) return index;
  if (existsSync(`${target}.html`)) return `${target}.html`;
  return null;
}

createServer((request, response) => {
  const { pathname } = new URL(request.url ?? '/', 'http://localhost');
  const inBase = base === '' || pathname === base || pathname.startsWith(`${base}/`);
  const file = inBase ? resolveFile(pathname.slice(base.length) || '/') : null;
  if (file) return send(response, 200, file);

  const notFound = join(root, '404.html');
  if (existsSync(notFound)) return send(response, 404, notFound);
  response.writeHead(404).end('Not found');
}).listen(port, '127.0.0.1', () => {
  console.log(`靜態預覽：http://127.0.0.1:${port}${base}/`);
});
