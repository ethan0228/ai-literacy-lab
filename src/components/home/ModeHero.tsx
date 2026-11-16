'use client';

import Link from 'next/link';
import { buttonPrimary } from '@/components/ui/styles';
import { type Mode, useMode } from '@/lib/mode';

const COPY: Record<Mode, { eyebrow: string; title: string; body: string; cta: string }> = {
  student: {
    eyebrow: '學生探索模式',
    title: '動手做實驗，看懂 AI 怎麼運作',
    body: '不用背定義。動手玩，自己發現 AI 能做什麼、不能做什麼。',
    cta: '開始探索',
  },
  teacher: {
    eyebrow: '教師教學模式',
    title: '把 AI 素養帶進你的教室',
    body: '每個實驗都附教學流程與討論提問，可切換投影模式帶全班操作。',
    cta: '瀏覽教學模組',
  },
};

export function ModeHero() {
  const copy = COPY[useMode()];

  return (
    <div>
      <p className="text-accent-700 font-semibold">{copy.eyebrow}</p>
      <h1 className="text-ink mt-2 text-3xl leading-tight font-bold sm:text-5xl sm:leading-tight">
        {/* 以逗號分段，換行只發生在語句之間 */}
        {copy.title.split(/(?<=，)/).map((part) => (
          <span key={part} className="inline-block">
            {part}
          </span>
        ))}
      </h1>
      <p className="text-ink-muted mt-4 text-lg">{copy.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/modules" className={buttonPrimary}>
          {copy.cta}
        </Link>
      </div>
    </div>
  );
}
