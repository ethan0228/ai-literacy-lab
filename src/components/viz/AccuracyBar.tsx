const TONES = {
  brand: 'bg-brand-700',
  accent: 'bg-accent-600',
  neutral: 'bg-slate-600',
} as const;

interface AccuracyBarProps {
  label: string;
  correct: number;
  total: number;
  tone?: keyof typeof TONES;
  testId?: string;
}

/** 水平長條：顯示「答對幾個／共幾個」。數字以文字呈現，長條僅為視覺輔助。 */
export function AccuracyBar({ label, correct, total, tone = 'neutral', testId }: AccuracyBarProps) {
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);

  return (
    <div data-testid={testId}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-semibold">{label}</span>
        <span className="text-ink-muted tabular-nums">
          答對 {correct} / {total}（{percent}%）
        </span>
      </div>
      <div aria-hidden="true" className="mt-1 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${TONES[tone]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
