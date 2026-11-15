'use client';

import { useId, useState } from 'react';
import { buttonPrimary, buttonSecondary } from '@/components/ui/styles';
import { AccuracyBar } from '@/components/viz/AccuracyBar';
import { ClassifierPlot } from '@/components/viz/ClassifierPlot';
import {
  evaluatePets,
  EXAMPLE_TRAINING,
  HEIGHT_DOMAIN,
  type Pet,
  PET_LABELS,
  PETS,
  type PetSample,
  TEST_SET,
  WEIGHT_DOMAIN,
} from '@/labs/shared/pet-data';

const K_OPTIONS = [1, 3, 5] as const;

function countOf(training: readonly PetSample[], label: Pet): number {
  return training.filter((sample) => sample.label === label).length;
}

export default function TrainClassifierLab() {
  const id = useId();
  const [training, setTraining] = useState<readonly PetSample[]>([]);
  const [serial, setSerial] = useState(0);
  const [label, setLabel] = useState<Pet>('dog');
  const [k, setK] = useState<number>(3);
  const [weight, setWeight] = useState(8);
  const [height, setHeight] = useState(30);
  const [showTest, setShowTest] = useState(false);

  const dogs = countOf(training, 'dog');
  const cats = countOf(training, 'cat');
  const result = evaluatePets(training, k);

  function add(newWeight: number, newHeight: number) {
    setTraining((previous) => [
      ...previous,
      { id: `user-${serial}`, weight: newWeight, height: newHeight, label },
    ]);
    setSerial((previous) => previous + 1);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div>
        <ClassifierPlot
          training={training}
          k={k}
          testSet={showTest ? TEST_SET : undefined}
          onAdd={add}
          description={`貓狗分類圖。橫軸是體重，縱軸是身高。目前有 ${dogs} 筆狗、${cats} 筆貓的訓練資料。`}
        />
        <p className="text-ink-muted mt-2 text-sm">
          在圖上點一下可以加入資料；也可以用滑桿設定數字後按「加入」。
        </p>
      </div>

      <div className="space-y-5">
        <fieldset>
          <legend className="font-semibold">1. 加入訓練資料</legend>
          <div className="mt-2 flex gap-2" role="radiogroup" aria-label="要加入的動物">
            {PETS.map((pet) => (
              <label
                key={pet}
                className={`has-focus-visible:outline-accent-600 flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 px-3 font-semibold has-focus-visible:outline-3 has-focus-visible:outline-offset-2 ${
                  label === pet
                    ? pet === 'dog'
                      ? 'border-brand-700 bg-brand-50 text-brand-800'
                      : 'border-accent-700 bg-accent-50 text-accent-800'
                    : 'border-line text-ink-muted bg-white'
                }`}
              >
                <input
                  type="radio"
                  name={`${id}-label`}
                  className="sr-only"
                  checked={label === pet}
                  onChange={() => setLabel(pet)}
                />
                {PET_LABELS[pet]}
              </label>
            ))}
          </div>
          <label className="mt-3 block text-sm font-medium" htmlFor={`${id}-weight`}>
            體重：{weight} 公斤
          </label>
          <input
            id={`${id}-weight`}
            type="range"
            min={WEIGHT_DOMAIN[0] + 0.5}
            max={WEIGHT_DOMAIN[1] - 0.5}
            step={0.5}
            value={weight}
            onChange={(event) => setWeight(Number(event.target.value))}
            className="accent-brand-700 w-full"
          />
          <label className="mt-2 block text-sm font-medium" htmlFor={`${id}-height`}>
            身高：{height} 公分
          </label>
          <input
            id={`${id}-height`}
            type="range"
            min={HEIGHT_DOMAIN[0] + 1}
            max={HEIGHT_DOMAIN[1] - 1}
            step={1}
            value={height}
            onChange={(event) => setHeight(Number(event.target.value))}
            className="accent-brand-700 w-full"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={buttonPrimary} onClick={() => add(weight, height)}>
              加入這筆{PET_LABELS[label]}
            </button>
            <button
              type="button"
              className={buttonSecondary}
              onClick={() => setTraining(EXAMPLE_TRAINING)}
            >
              載入範例資料
            </button>
            <button
              type="button"
              className={buttonSecondary}
              aria-disabled={training.length === 0}
              onClick={() => setTraining((previous) => previous.slice(0, -1))}
            >
              復原
            </button>
            <button
              type="button"
              className={buttonSecondary}
              aria-disabled={training.length === 0}
              onClick={() => setTraining([])}
            >
              全部清除
            </button>
          </div>
        </fieldset>

        <div>
          <label className="font-semibold" htmlFor={`${id}-k`}>
            2. 模型要參考最近的幾筆資料？
          </label>
          <select
            id={`${id}-k`}
            value={k}
            onChange={(event) => setK(Number(event.target.value))}
            className="mt-2 block min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3"
          >
            {K_OPTIONS.map((option) => (
              <option key={option} value={option}>
                最近的 {option} 筆{option === 1 ? '（只看最像的那一筆）' : '（投票決定）'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="font-semibold">3. 用沒看過的動物測試</p>
          <div aria-live="polite" className="mt-2 space-y-3" data-testid="classifier-result">
            <p>
              訓練資料：狗 {dogs} 筆、貓 {cats} 筆。
            </p>
            {training.length === 0 ? (
              <p className="bg-accent-50 text-accent-800 rounded-xl p-4">
                還沒有資料，模型無法預測。先加入幾筆狗和貓的資料吧！
              </p>
            ) : (
              <>
                <p className="font-medium">
                  {result.overall.total} 隻測試動物中，模型答對 {result.overall.correct} 隻。
                </p>
                <AccuracyBar
                  label="狗"
                  tone="brand"
                  {...result.byLabel.dog}
                  testId="accuracy-dog"
                />
                <AccuracyBar
                  label="貓"
                  tone="accent"
                  {...result.byLabel.cat}
                  testId="accuracy-cat"
                />
              </>
            )}
          </div>
          <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={showTest}
              onChange={(event) => setShowTest(event.target.checked)}
              className="accent-brand-700 size-5"
            />
            在圖上顯示測試資料
          </label>
        </div>
      </div>
    </div>
  );
}
