'use client';

import { buttonPrimary, container } from '@/components/ui/styles';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className={`${container} py-20 text-center`}>
      <h1 className="text-3xl font-bold">這個頁面出了一點問題</h1>
      <p className="text-ink-muted mt-3">你的學習進度不受影響。可以再試一次，或回到首頁。</p>
      <button type="button" className={`${buttonPrimary} mt-8`} onClick={reset}>
        再試一次
      </button>
    </div>
  );
}
