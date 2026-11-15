'use client';

import { useId, useState } from 'react';
import { buttonPrimary } from '@/components/ui/styles';
import { ProbabilityBars } from '@/components/viz/ProbabilityBars';
import { applyTemperature, candidatesAfter } from '@/lib/ml/bigram';
import { STORY_MODEL } from '@/labs/shared/story-corpus';
import { countDistinct, DEMO_WORD, describeRandomness, generateRound, RANDOMNESS } from './model';

export default function RandomnessDialLab() {
  const id = useId();
  const [randomness, setRandomness] = useState<number>(RANDOMNESS.initial);
  const [round, setRound] = useState(0);

  const sentences = generateRound(randomness, round);
  const distinct = countDistinct(sentences);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <label htmlFor={`${id}-dial`} className="font-semibold">
            隨機程度：{randomness}
          </label>
          <input
            id={`${id}-dial`}
            type="range"
            min={RANDOMNESS.min}
            max={RANDOMNESS.max}
            step={RANDOMNESS.step}
            value={randomness}
            onChange={(event) => setRandomness(Number(event.target.value))}
            aria-describedby={`${id}-dial-text`}
            className="accent-brand-700 mt-2 w-full"
          />
          <div aria-hidden="true" className="text-ink-muted flex justify-between text-sm">
            <span>0 穩定</span>
            <span>2 多變</span>
          </div>
          <p id={`${id}-dial-text`} className="bg-accent-50 text-accent-800 mt-2 rounded-lg p-3">
            {describeRandomness(randomness)}
          </p>
        </div>

        <div>
          <p className="font-semibold">「{DEMO_WORD}」後面每個詞被選到的機會</p>
          <p className="text-ink-muted mt-1 mb-3 text-sm">拉動旋鈕，觀察長條怎麼變化。</p>
          <ProbabilityBars
            items={applyTemperature(candidatesAfter(STORY_MODEL, DEMO_WORD), randomness).map(
              ({ word, probability }) => ({ word, probability }),
            )}
            label={`「${DEMO_WORD}」後面每個詞的機率`}
          />
        </div>
      </div>

      <div>
        <p className="font-semibold">用這個設定產生 5 個句子</p>
        <div aria-live="polite" data-testid="generated">
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-lg">
            {sentences.map((sentence, index) => (
              <li key={index}>{sentence}</li>
            ))}
          </ol>
          <p className="bg-canvas mt-4 rounded-xl p-4 font-medium" data-testid="distinct-count">
            5 句之中有 {distinct} 種不同的句子。
          </p>
        </div>
        <button
          type="button"
          className={`${buttonPrimary} mt-4`}
          onClick={() => setRound((previous) => previous + 1)}
        >
          再產生 5 句
        </button>
      </div>
    </div>
  );
}
