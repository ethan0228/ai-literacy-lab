import Link from 'next/link';
import { buttonPrimary, container } from '@/components/ui/styles';

export default function NotFound() {
  return (
    <div className={`${container} py-20 text-center`}>
      <p className="text-accent-700 font-semibold">404</p>
      <h1 className="mt-2 text-3xl font-bold">找不到這個頁面</h1>
      <p className="text-ink-muted mt-3">這個頁面可能還在規劃中，或是網址打錯了。</p>
      <Link href="/modules" className={`${buttonPrimary} mt-8`}>
        回到學習模組
      </Link>
    </div>
  );
}
