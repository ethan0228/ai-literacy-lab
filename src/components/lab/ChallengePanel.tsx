'use client';

import { useState } from 'react';
import type { Challenge } from '@/content/types';

/** 單選挑戰題：選擇後立即顯示回饋，可重複作答。 */
export function ChallengePanel({ challenge }: { challenge: Challenge }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = challenge.options.find((option) => option.id === selectedId);
  const promptId = `${challenge.id}-prompt`;

  return (
    <div>
      <p id={promptId} className="text-lg font-semibold">
        {challenge.prompt}
      </p>
      <div role="radiogroup" aria-labelledby={promptId} className="mt-4 grid gap-3">
        {challenge.options.map((option) => {
          const checked = option.id === selectedId;
          return (
            <label
              key={option.id}
              className={`has-focus-visible:outline-accent-600 flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 ${
                checked
                  ? option.isCorrect
                    ? 'border-success-700 bg-success-50'
                    : 'border-accent-600 bg-accent-50'
                  : 'border-line hover:border-brand-500 bg-white'
              }`}
            >
              <input
                type="radio"
                name={challenge.id}
                value={option.id}
                checked={checked}
                onChange={() => setSelectedId(option.id)}
                className="accent-brand-700 size-5 shrink-0 outline-none"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      <div aria-live="polite" className="mt-4 min-h-6">
        {selected && (
          <p
            key={selected.id}
            data-testid="challenge-feedback"
            data-correct={selected.isCorrect}
            className={`animate-reveal rounded-xl p-4 font-medium ${
              selected.isCorrect ? 'bg-success-50 text-success-800' : 'bg-accent-50 text-accent-800'
            }`}
          >
            {selected.feedback}
          </p>
        )}
      </div>
    </div>
  );
}
