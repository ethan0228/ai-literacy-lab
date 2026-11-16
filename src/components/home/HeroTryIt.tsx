'use client';

import Link from 'next/link';
import { useState } from 'react';
import { buttonPrimary, buttonSecondary } from '@/components/ui/styles';
import { SORT_ITEMS, VERDICTS, type Verdict } from '@/labs/ai-or-not/model';
import { isCorrect } from '@/lib/sorting';

const LAB_HREF = '/modules/ai-basics/labs/ai-or-not';

/** 首頁的迷你實驗：直接作答「是 AI，還是固定規則？」的第一張卡片。 */
export function HeroTryIt() {
  const item = SORT_ITEMS[0];
  const [answer, setAnswer] = useState<Verdict>();
  if (!item) return null;

  const answered = answer !== undefined;
  const correct = answered && isCorrect(item, answer);
  const correctLabel = VERDICTS.find((verdict) => verdict.id === item.category)?.label;

  return (
    <section
      aria-labelledby="try-it-heading"
      className="border-brand-200 bg-brand-50 rounded-3xl border p-5 sm:p-6"
    >
      <h2 id="try-it-heading" className="text-accent-700 text-sm font-semibold">
        先試一題：它是 AI 嗎？
      </h2>
      <div className="border-line bg-surface mt-3 rounded-2xl border p-5 shadow-sm">
        <p className="text-2xl font-bold">{item.name}</p>
        <p className="text-ink-muted mt-1 text-lg">{item.description}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {VERDICTS.map((verdict) => (
          <button
            key={verdict.id}
            type="button"
            className={buttonSecondary}
            aria-pressed={answer === verdict.id}
            // 作答後以 aria-disabled 鎖定（而非 disabled），鍵盤焦點才不會遺失
            aria-disabled={answered}
            onClick={() => {
              if (!answered) setAnswer(verdict.id);
            }}
          >
            {verdict.label}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {answered && (
          <div
            data-testid="try-it-feedback"
            className={`animate-reveal mt-4 rounded-xl p-4 ${
              correct ? 'bg-success-50 text-success-800' : 'bg-accent-50 text-accent-800'
            }`}
          >
            <p className="font-bold">
              {correct ? '答對了！' : `再想想：這張比較接近「${correctLabel}」。`}
            </p>
            <p className="mt-1">{item.explanation}</p>
          </div>
        )}
      </div>

      {answered && (
        <Link href={LAB_HREF} className={`${buttonPrimary} animate-reveal mt-4 w-full`}>
          再玩 {SORT_ITEMS.length - 1} 張 →
        </Link>
      )}
    </section>
  );
}
