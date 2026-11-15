import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ProjectionBar } from '@/components/layout/ProjectionBar';
import { PreferencesSync } from '@/components/layout/PreferencesSync';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { buildCsp, IS_STATIC_EXPORT } from '@/lib/csp';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AI 素養互動實驗室｜AI Literacy Lab',
    template: '%s｜AI 素養互動實驗室',
  },
  description:
    '給國小高年級、國中學生與教師的 AI 素養互動實驗室：透過動手實驗、概念探究、實際應用與倫理反思，認識 AI。',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1d4ed8',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      {IS_STATIC_EXPORT && (
        <head>
          {/* 靜態主機無法送出 HTTP 標頭，改用 meta 標籤提供內容安全政策 */}
          <meta
            httpEquiv="Content-Security-Policy"
            content={buildCsp({ dev: process.env.NODE_ENV !== 'production', forMeta: true })}
          />
          <meta name="referrer" content="strict-origin-when-cross-origin" />
        </head>
      )}
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="focus:text-brand-800 sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:shadow"
        >
          跳到主要內容
        </a>
        <PreferencesSync />
        <ProjectionBar />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
