'use client';

import { useState } from 'react';
import { RoundNav } from '@/components/lab/RoundNav';
import { DILEMMAS, type Tone, TONE_LABELS } from './model';

const TONES: readonly Tone[] = ['benefit', 'risk'];

export default function DilemmaCardsLab() {
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState<Readonly<Record<string, string>>>({});

  const dilemma = DILEMMAS[index];
  if (!dilemma) return null;
  const chosen = dilemma.choices.find((choice) => choice.id === choices[dilemma.id]);

  return (
    <div>
      <div className="text-ink-muted flex flex-wrap items-center justify-between gap-2 text-sm font-medium">
        <p>
          第 {index + 1} / {DILEMMAS.length} 個情境
        </p>
        <p>這些情境沒有標準答案</p>
      </div>

      <h3 className="mt-3 text-2xl font-bold">{dilemma.title}</h3>
      <p className="border-line bg-canvas mt-2 rounded-xl border p-4 text-lg">
        {dilemma.situation}
      </p>

      <fieldset className="mt-5">
        <legend className="font-semibold">
          你會怎麼做？選一個，看看會影響到誰。可以換選項比較。
        </legend>
        <div className="mt-3 grid gap-2 lg:grid-cols-3">
          {dilemma.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              aria-pressed={chosen?.id === choice.id}
              onClick={() => setChoices((previous) => ({ ...previous, [dilemma.id]: choice.id }))}
              className="border-line hover:border-brand-500 aria-pressed:border-brand-700 aria-pressed:bg-brand-50 min-h-12 rounded-xl border-2 bg-white p-3 text-left font-semibold transition-colors"
            >
              {choice.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" className="mt-5 min-h-6">
        {chosen && (
          <div key={chosen.id} className="animate-reveal" data-testid="dilemma-impacts">
            <p className="font-semibold">選擇「{chosen.label}」，可能會……</p>
            <div className="mt-3 grid gap-4 lg:grid-cols-2">
              {TONES.map((tone) => (
                <div
                  key={tone}
                  className={`rounded-xl p-4 ${
                    tone === 'benefit'
                      ? 'bg-brand-50 text-brand-900'
                      : 'bg-accent-50 text-accent-800'
                  }`}
                >
                  <h4 className="font-bold">{TONE_LABELS[tone]}</h4>
                  <ul className="mt-2 space-y-2">
                    {chosen.impacts
                      .filter((impact) => impact.tone === tone)
                      .map((impact) => (
                        <li key={impact.who + impact.effect}>
                          <strong>{impact.who}：</strong>
                          {impact.effect}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="border-brand-500 mt-4 rounded-xl border-2 border-dashed p-4 text-lg font-medium">
              想一想：{chosen.followUp}
            </p>
          </div>
        )}
      </div>

      <RoundNav index={index} total={DILEMMAS.length} onChange={setIndex} unit="個情境" />
    </div>
  );
}
