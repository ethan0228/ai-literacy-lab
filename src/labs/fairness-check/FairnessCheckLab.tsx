'use client';

import { useId, useState } from 'react';
import { UnitChart } from '@/components/viz/UnitChart';
import { describeGap, type Dimension, DIMENSIONS, summarize } from './model';

export default function FairnessCheckLab() {
  const id = useId();
  const [dimension, setDimension] = useState<Dimension>('overall');
  const [improved, setImproved] = useState(false);

  const groups = summarize(dimension, improved);

  return (
    <div>
      <p className="border-line bg-canvas rounded-xl border p-4 text-lg">
        一家餐廳裝了「說話就能點餐」的機器，並找了 200
        位使用者來測試。廠商說：「辨識正確率很高，可以上線了！」你是檢查員，請檢查它對每一種人是否一樣好用。
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-5">
          <fieldset>
            <legend className="font-semibold">1. 你要怎麼看測試結果？</legend>
            <div className="mt-2 grid gap-2">
              {DIMENSIONS.map((option) => (
                <label
                  key={option.id}
                  className={`has-focus-visible:outline-accent-600 flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border-2 px-3 py-2 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 ${
                    option.id === dimension
                      ? 'border-brand-700 bg-brand-50'
                      : 'border-line bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name={`${id}-dimension`}
                    checked={option.id === dimension}
                    onChange={() => setDimension(option.id)}
                    className="accent-brand-700 size-5 shrink-0 outline-none"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <p className="font-semibold">2. 試著改善</p>
            <label className="border-line has-checked:border-brand-700 has-checked:bg-brand-50 mt-2 flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border-2 bg-white px-3 py-2">
              <input
                type="checkbox"
                checked={improved}
                onChange={(event) => setImproved(event.target.checked)}
                className="accent-brand-700 size-5 shrink-0"
              />
              補充少見口音的訓練資料後，重新測試
            </label>
          </div>
        </div>

        <div aria-live="polite" data-testid="fairness-result" className="space-y-4">
          {groups.map((group) => (
            <div key={group.id} data-testid={`group-${group.id}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="font-bold">{group.label}</p>
                <p className="text-ink-muted tabular-nums">
                  {group.total} 人中 {group.correct} 人辨識正確（{group.percent}%）
                </p>
              </div>
              <div className="mt-2">
                <UnitChart
                  label={`${group.label}：${group.total} 人中 ${group.correct} 人辨識正確`}
                  correct={group.correct}
                  total={group.total}
                />
              </div>
            </div>
          ))}
          <p className="text-ink-muted flex flex-wrap gap-x-5 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="bg-brand-700 inline-block size-3 rounded-full" />
              實心：辨識正確
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="border-accent-600 inline-block size-3 rounded-full border-2 bg-white"
              />
              空心：辨識錯誤
            </span>
          </p>
          <p
            className="bg-accent-50 text-accent-800 rounded-xl p-4 font-medium"
            data-testid="gap-note"
          >
            {describeGap(dimension, groups)}
          </p>
        </div>
      </div>
    </div>
  );
}
