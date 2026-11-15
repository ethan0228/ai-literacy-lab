'use client';

import { useState } from 'react';
import { RoundNav } from '@/components/lab/RoundNav';
import { RESPONSE_LABEL, ROUNDS } from './model';

function ResponseBox({ children }: { children: string }) {
  return (
    <div className="bg-canvas rounded-xl border border-dashed border-slate-400 p-4">
      <p className="text-ink-muted text-sm font-semibold">{RESPONSE_LABEL}</p>
      <p className="mt-1 whitespace-pre-line">{children}</p>
    </div>
  );
}

export default function PromptMakeoverLab() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [choices, setChoices] = useState<Readonly<Record<string, string>>>({});

  const round = ROUNDS[roundIndex];
  if (!round) return null;

  const chosen = round.rewrites.find((rewrite) => rewrite.id === choices[round.id]);
  const solved = ROUNDS.filter((candidate) =>
    candidate.rewrites.some((rewrite) => rewrite.isBest && choices[candidate.id] === rewrite.id),
  ).length;

  return (
    <div>
      <div className="text-ink-muted flex flex-wrap items-center justify-between gap-2 text-sm font-medium">
        <p>
          第 {roundIndex + 1} / {ROUNDS.length} 回合
        </p>
        <p>已找到 {solved} 個最佳改寫</p>
      </div>

      <p className="mt-3 text-lg font-semibold">{round.situation}</p>

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h3 className="font-bold">原本的提示詞</h3>
          <p className="border-line rounded-xl border bg-white p-4 text-lg font-medium">
            {round.originalPrompt}
          </p>
          <ResponseBox>{round.originalResponse}</ResponseBox>
          <p className="text-ink-muted">
            <strong className="text-ink">問題在哪裡？</strong>
            {round.problem}
          </p>
        </div>

        <div className="space-y-3">
          <fieldset>
            <legend className="font-bold">哪一個改寫最能幫上忙？選一個看看結果</legend>
            <div className="mt-3 grid gap-2">
              {round.rewrites.map((rewrite, index) => (
                <button
                  key={rewrite.id}
                  type="button"
                  aria-pressed={chosen?.id === rewrite.id}
                  onClick={() =>
                    setChoices((previous) => ({ ...previous, [round.id]: rewrite.id }))
                  }
                  className="border-line hover:border-brand-500 aria-pressed:border-brand-700 aria-pressed:bg-brand-50 flex min-h-11 gap-3 rounded-xl border-2 bg-white p-3 text-left transition-colors"
                >
                  <span className="text-brand-800 font-bold">改寫 {index + 1}</span>
                  <span className="whitespace-pre-line">{rewrite.prompt}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div aria-live="polite" className="min-h-6 space-y-3">
            {chosen && (
              <div key={chosen.id} className="animate-reveal space-y-3">
                <ResponseBox>{chosen.response}</ResponseBox>
                <p
                  data-testid="makeover-feedback"
                  data-best={chosen.isBest}
                  className={`rounded-xl p-4 font-medium ${
                    chosen.isBest
                      ? 'bg-success-50 text-success-800'
                      : 'bg-accent-50 text-accent-800'
                  }`}
                >
                  {chosen.isBest && '找到了！'}
                  {chosen.feedback}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <RoundNav index={roundIndex} total={ROUNDS.length} onChange={setRoundIndex} />
    </div>
  );
}
