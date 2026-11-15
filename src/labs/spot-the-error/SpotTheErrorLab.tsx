'use client';

import { useState } from 'react';
import { buttonPrimary, buttonSecondary } from '@/components/ui/styles';
import { CLAIMS, countFound, ISSUE_COUNT, QUESTION, RESULT_LABELS, resultFor } from './model';

const RESULT_STYLES = {
  found: 'border-success-700 bg-success-50',
  missed: 'border-accent-600 bg-accent-50',
  'checked-accurate': 'border-brand-500 bg-brand-50',
  accurate: 'border-line bg-white',
} as const;

export default function SpotTheErrorLab() {
  const [flagged, setFlagged] = useState<ReadonlySet<string>>(new Set());
  const [revealed, setRevealed] = useState(false);

  function toggle(id: string) {
    if (revealed) return;
    setFlagged((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div>
      <div className="bg-canvas rounded-xl border border-dashed border-slate-400 p-4">
        <p className="text-ink-muted text-sm font-semibold">
          示範用的 AI 回答（事先寫好，並刻意放入錯誤，不是 AI 即時產生）
        </p>
        <p className="mt-1">
          <span className="font-semibold">提問：</span>
          {QUESTION}
        </p>
      </div>

      <p className="mt-4 font-semibold">
        {revealed
          ? '查證結果：'
          : '下面是回答中的六個句子。你覺得哪些需要查證？點一下把它標記起來。'}
      </p>

      <ol className="mt-3 grid gap-2">
        {CLAIMS.map((claim) => {
          const isFlagged = flagged.has(claim.id);
          const result = resultFor(claim, isFlagged);
          return (
            <li key={claim.id}>
              <button
                type="button"
                aria-pressed={isFlagged}
                aria-disabled={revealed}
                onClick={() => toggle(claim.id)}
                className={`flex min-h-12 w-full items-start gap-3 rounded-xl border-2 p-3 text-left transition-colors ${
                  revealed
                    ? RESULT_STYLES[result]
                    : isFlagged
                      ? 'border-accent-600 bg-accent-50'
                      : 'border-line hover:border-brand-500 bg-white'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 text-sm font-bold ${
                    isFlagged
                      ? 'border-accent-700 bg-accent-700 text-white'
                      : 'border-slate-400 text-transparent'
                  }`}
                >
                  ？
                </span>
                <span>
                  <span className="text-lg">{claim.text}</span>
                  <span className="sr-only">{isFlagged ? '（已標記為需要查證）' : ''}</span>
                </span>
              </button>
              {revealed && (
                <div className="animate-reveal mt-1 mb-2 pl-4" data-testid={`result-${claim.id}`}>
                  <p className="font-bold">{RESULT_LABELS[result]}</p>
                  <p>{claim.explanation}</p>
                  <p className="text-ink-muted">怎麼查：{claim.howToCheck}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div aria-live="polite" className="mt-4">
        {revealed ? (
          <p className="bg-canvas rounded-xl p-4 text-lg font-semibold" data-testid="spot-summary">
            {ISSUE_COUNT} 個有問題的句子中，你找到了 {countFound(flagged)} 個。
          </p>
        ) : (
          <p className="text-ink-muted">已標記 {flagged.size} 個句子。</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {revealed ? (
          <button
            type="button"
            className={buttonSecondary}
            onClick={() => {
              setFlagged(new Set());
              setRevealed(false);
            }}
          >
            再試一次
          </button>
        ) : (
          <button type="button" className={buttonPrimary} onClick={() => setRevealed(true)}>
            查看查證結果
          </button>
        )}
      </div>
    </div>
  );
}
