'use client';

import { useState } from 'react';
import { RoundNav } from '@/components/lab/RoundNav';
import { ROUNDS, SIGNAL_LABELS } from './model';

export default function SourceCheckLab() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [choices, setChoices] = useState<Readonly<Record<string, string>>>({});

  const round = ROUNDS[roundIndex];
  if (!round) return null;

  const choice = choices[round.id];
  const answered = choice !== undefined;
  const correct = choice === round.betterId;
  const solved = ROUNDS.filter((candidate) => choices[candidate.id] === candidate.betterId).length;

  return (
    <div>
      <div className="text-ink-muted flex flex-wrap items-center justify-between gap-2 text-sm font-medium">
        <p>
          第 {roundIndex + 1} / {ROUNDS.length} 回合
        </p>
        <p>答對 {solved} 回合</p>
      </div>
      <p className="text-ink-muted mt-1 text-sm">以下來源都是為了練習而虛構的，不是真實的網頁。</p>
      <p className="mt-3 text-lg font-semibold">{round.question}</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {round.sources.map((source, index) => {
          const chosen = choice === source.id;
          return (
            <section
              key={source.id}
              aria-label={`來源 ${index === 0 ? 'A' : 'B'}`}
              className={`flex flex-col rounded-xl border-2 p-4 ${
                chosen ? 'border-brand-700 bg-brand-50' : 'border-line bg-white'
              }`}
            >
              <h3 className="text-lg font-bold">
                <span className="text-brand-800">來源 {index === 0 ? 'A' : 'B'}：</span>
                {source.name}
              </h3>
              <dl className="mt-3 flex-1 space-y-3">
                {source.fields.map((field) => (
                  <div key={field.label}>
                    <dt className="text-ink-muted text-sm font-semibold">{field.label}</dt>
                    <dd>{field.value}</dd>
                    {answered && (
                      <dd
                        className={`animate-reveal mt-1 rounded-lg px-3 py-2 text-sm ${
                          field.signal === 'good'
                            ? 'bg-success-50 text-success-800'
                            : 'bg-accent-50 text-accent-800'
                        }`}
                      >
                        <strong>{SIGNAL_LABELS[field.signal]}：</strong>
                        {field.note}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
              <button
                type="button"
                aria-pressed={chosen}
                onClick={() => setChoices((previous) => ({ ...previous, [round.id]: source.id }))}
                className="border-brand-700 text-brand-800 hover:bg-brand-50 aria-pressed:bg-brand-700 mt-4 min-h-11 rounded-lg border-2 bg-white px-4 font-semibold transition-colors aria-pressed:text-white"
              >
                來源 {index === 0 ? 'A' : 'B'} 比較可信
              </button>
            </section>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-4 min-h-6">
        {answered && (
          <p
            data-testid="source-feedback"
            data-correct={correct}
            className={`animate-reveal rounded-xl p-4 font-medium ${
              correct ? 'bg-success-50 text-success-800' : 'bg-accent-50 text-accent-800'
            }`}
          >
            {correct ? '答對了！' : '再想想：比較看看兩個來源在四個項目上的線索。'}
            {round.takeaway}
          </p>
        )}
      </div>

      <RoundNav index={roundIndex} total={ROUNDS.length} onChange={setRoundIndex} />
    </div>
  );
}
