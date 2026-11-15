'use client';

import { useId, useState } from 'react';
import { AccuracyBar } from '@/components/viz/AccuracyBar';
import { ClassifierPlot } from '@/components/viz/ClassifierPlot';
import { evaluatePets } from '@/labs/shared/pet-data';
import { BIAS_K, BIAS_OPTIONS, buildTrainingSet } from './model';

function explain(catCorrect: number, catTotal: number): string {
  const rate = catCorrect / catTotal;
  if (rate >= 0.85) return '貓和狗的資料都足夠，兩種動物模型都認得不錯。';
  if (rate >= 0.4) return '貓的資料變少後，模型判斷為貓的區域縮小了，有些貓開始被當成狗。';
  return '貓的資料太少：這個模型要看最近的 5 筆資料投票，貓幾乎不可能拿到多數票，所以大部分的貓都被判成狗。';
}

export default function BiasedDataLab() {
  const id = useId();
  const [optionId, setOptionId] = useState(BIAS_OPTIONS[0]?.id ?? '');
  const option = BIAS_OPTIONS.find((candidate) => candidate.id === optionId) ?? BIAS_OPTIONS[0];
  if (!option) return null;

  const training = buildTrainingSet(option);
  const result = evaluatePets(training, BIAS_K);
  const { dog, cat } = result.byLabel;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <ClassifierPlot
        training={training}
        k={BIAS_K}
        description={`貓狗分類圖。訓練資料有 ${option.dogs} 筆狗、${option.cats} 筆貓。`}
      />

      <div className="space-y-5">
        <fieldset>
          <legend className="font-semibold">選擇訓練資料的組成（共 40 筆）</legend>
          <div className="mt-2 grid gap-2">
            {BIAS_OPTIONS.map((candidate) => (
              <label
                key={candidate.id}
                className={`has-focus-visible:outline-accent-600 flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border-2 px-3 py-2 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 ${
                  candidate.id === option.id
                    ? 'border-brand-700 bg-brand-50'
                    : 'border-line bg-white'
                }`}
              >
                <input
                  type="radio"
                  name={`${id}-bias`}
                  checked={candidate.id === option.id}
                  onChange={() => setOptionId(candidate.id)}
                  className="accent-brand-700 size-5 shrink-0 outline-none"
                />
                {candidate.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div aria-live="polite" className="space-y-3" data-testid="bias-result">
          <p className="font-semibold">用 60 隻沒看過的動物測試（狗、貓各 30 隻）</p>
          <AccuracyBar label="狗" tone="brand" {...dog} testId="accuracy-dog" />
          <AccuracyBar label="貓" tone="accent" {...cat} testId="accuracy-cat" />
          <p className="bg-canvas rounded-xl p-4">
            全部合計答對 {result.overall.correct} / {result.overall.total}。
            {explain(cat.correct, cat.total)}
          </p>
        </div>
      </div>
    </div>
  );
}
