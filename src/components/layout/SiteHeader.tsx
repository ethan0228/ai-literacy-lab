import Link from 'next/link';
import { ModeOnly } from '@/components/ui/ModeOnly';
import { container } from '@/components/ui/styles';
import { ModeSwitch } from './ModeSwitch';

const NAV_LINKS = [
  { href: '/modules', label: '學習模組' },
  { href: '/progress', label: '我的進度' },
];

const navLink = 'rounded px-1 py-2 font-medium text-ink-muted hover:text-brand-800';

export function SiteHeader() {
  return (
    <header className="border-line projection:hidden sticky top-0 z-20 border-b bg-white/95 backdrop-blur print:hidden">
      <div
        className={`${container} flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3`}
      >
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="text-ink flex items-center gap-2 text-lg font-bold">
            <span
              aria-hidden="true"
              className="bg-brand-700 grid size-8 place-items-center rounded-lg text-sm font-bold text-white"
            >
              AI
            </span>
            <span>
              素養實驗室
              <span className="sr-only">（AI Literacy Lab）首頁</span>
            </span>
          </Link>
          <nav aria-label="主要導覽" className="flex flex-wrap gap-x-4 sm:gap-x-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={navLink}>
                {link.label}
              </Link>
            ))}
            <ModeOnly mode="teacher">
              <Link href="/teachers" className={navLink}>
                教師資源
              </Link>
            </ModeOnly>
          </nav>
        </div>
        <ModeSwitch />
      </div>
    </header>
  );
}
