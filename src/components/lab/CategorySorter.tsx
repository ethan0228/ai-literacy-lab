'use client';

import { useState } from 'react';
import { buttonPrimary, buttonSecondary } from '@/components/ui/styles';
import {
  type Answers,
  isCorrect,
  nextUnanswered,
  scoreAnswers,
  type SortCategory,
  type SortItem,
} from '@/lib/sorting';

interface CategorySorterProps<C extends string> {
  items: readonly SortItem<C>[];
  categories: readonly SortCategory<C>[];
  /** 每張卡片的提問，例如「你覺得它是哪一種？」 */
  question: string;
  /** 全部完成後的引導文字 */
  finishedHint: string;
}

/** 共用的卡片分類遊戲：一次一張，作答後立即回饋。 */
export function CategorySorter<C extends string>({
  items,
  categories,
  question,
  finishedHint,
}: CategorySorterProps<C>) {
  const firstId = items[0]?.id ?? '';
  const [answers, setAnswers] = useState<Answers<C>>({});
  const [currentId, setCurrentId] = useState(firstId);

  const score = scoreAnswers(items, answers);
  const current = items.find((item) => item.id === currentId);

  if (!current) {
    return (
      <div className="animate-reveal text-center" aria-live="polite">
        <p className="text-2xl font-bold">
          你答對了 {score.correct} / {score.total} 張卡片
        </p>
        <p className="text-ink-muted mt-2">{finishedHint}</p>
        <button
          type="button"
          className={`${buttonSecondary} mt-6`}
          onClick={() => {
            setAnswers({});
            setCurrentId(firstId);
          }}
        >
          再玩一次
        </button>
      </div>
    );
  }

  const answer = answers[current.id];
  const answered = answer !== undefined;
  const correctLabel = categories.find((category) => category.id === current.category)?.label;

  return (
    <div>
      <div className="text-ink-muted flex items-center justify-between gap-4 text-sm font-medium">
        <p>
          第 {items.indexOf(current) + 1} / {score.total} 張
        </p>
        <p>答對 {score.correct} 張</p>
      </div>
      <div
        role="progressbar"
        aria-label="作答進度"
        aria-valuemin={0}
        aria-valuemax={score.total}
        aria-valuenow={score.answered}
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className="bg-brand-700 h-full rounded-full transition-[width] duration-300"
          style={{ width: `${(score.answered / score.total) * 100}%` }}
        />
      </div>

      <div className="border-line bg-canvas mt-5 rounded-xl border p-5">
        <h3 className="text-2xl font-bold">{current.name}</h3>
        <p className="text-ink-muted mt-1 text-lg">{current.description}</p>
      </div>

      <fieldset className="mt-5">
        <legend className="font-semibold">{question}</legend>
        <div
          className={`mt-3 grid gap-3 ${categories.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${buttonSecondary} flex-col gap-0`}
              aria-pressed={answer === category.id}
              // 作答後以 aria-disabled 鎖定（而非 disabled），鍵盤焦點才不會遺失
              aria-disabled={answered}
              onClick={() => {
                if (answered) return;
                setAnswers((previous) => ({ ...previous, [current.id]: category.id }));
              }}
            >
              <span>{category.label}</span>
              {category.hint && (
                <span className="text-ink-muted text-sm font-normal">{category.hint}</span>
              )}
            </button>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" className="mt-5 min-h-6">
        {answered && (
          <div
            data-testid="sort-feedback"
            className={`animate-reveal rounded-xl p-4 ${
              isCorrect(current, answer)
                ? 'bg-success-50 text-success-800'
                : 'bg-accent-50 text-accent-800'
            }`}
          >
            <p className="font-bold">
              {isCorrect(current, answer)
                ? '答對了！'
                : `再想想：這張比較接近「${correctLabel}」。`}
            </p>
            <p className="mt-1">{current.explanation}</p>
          </div>
        )}
      </div>

      {answered && (
        <button
          type="button"
          className={`${buttonPrimary} mt-4`}
          onClick={() => setCurrentId(nextUnanswered(items, answers)?.id ?? '')}
        >
          {score.answered === score.total ? '看結果' : '下一張'}
        </button>
      )}
    </div>
  );
}
