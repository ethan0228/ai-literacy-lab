'use client';

import Link from 'next/link';
import { buttonPrimary, buttonSecondary } from '@/components/ui/styles';
import { type Mode, useMode } from '@/lib/mode';

const COPY: Record<Mode, { eyebrow: string; title: string; body: string; cta: string }> = {
  student: {
    eyebrow: '學生探索模式',
    title: '動手做實驗，看懂 AI 怎麼運作',
    body: '不用背定義。透過小實驗和挑戰，自己發現 AI 能做什麼、不能做什麼，以及該怎麼聰明又負責地使用它。',
    cta: '開始探索',
  },
  teacher: {
    eyebrow: '教師教學模式',
    title: '把 AI 素養帶進你的教室',
    body: '每個實驗都附教學流程、討論提問與常見迷思，並可切換投影模式直接在課堂上帶著全班操作。',
    cta: '瀏覽教學模組',
  },
};

export function ModeHero() {
  const copy = COPY[useMode()];

  return (
    <div className="max-w-3xl">
      <p className="text-accent-700 font-semibold">{copy.eyebrow}</p>
      <h1 className="text-ink mt-2 text-3xl leading-tight font-bold sm:text-5xl sm:leading-tight">
        {copy.title}
      </h1>
      <p className="text-ink-muted mt-4 text-lg">{copy.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/modules" className={buttonPrimary}>
          {copy.cta}
        </Link>
        <Link href="/modules/ai-basics/labs/ai-or-not" className={buttonSecondary}>
          先玩第一個實驗
        </Link>
      </div>
    </div>
  );
}
