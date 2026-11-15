'use client';

export interface ProbabilityItem {
  word: string;
  probability: number;
  count?: number;
}

interface ProbabilityBarsProps {
  items: readonly ProbabilityItem[];
  /** 提供時每一列是可以選擇的按鈕 */
  onSelect?: (word: string) => void;
  /** 清單的無障礙名稱 */
  label: string;
}

function percent(probability: number): string {
  return `${Math.round(probability * 100)}%`;
}

/** 候選詞的機率長條圖。數值一律以文字顯示，長條為視覺輔助。 */
export function ProbabilityBars({ items, onSelect, label }: ProbabilityBarsProps) {
  return (
    <ul aria-label={label} className="grid gap-2">
      {items.map((item) => {
        const detail =
          item.count === undefined
            ? percent(item.probability)
            : `出現 ${item.count} 次，${percent(item.probability)}`;
        const row = (
          <>
            <span className="w-16 shrink-0 text-left text-lg font-bold">{item.word}</span>
            <span
              aria-hidden="true"
              className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200"
            >
              <span
                className="bg-brand-700 block h-full rounded-full transition-[width] duration-300"
                style={{ width: `${item.probability * 100}%` }}
              />
            </span>
            <span className="text-ink-muted w-28 shrink-0 text-right text-sm tabular-nums">
              {detail}
            </span>
          </>
        );
        return (
          <li key={item.word}>
            {onSelect ? (
              <button
                type="button"
                aria-label={`選「${item.word}」：${detail}`}
                onClick={() => onSelect(item.word)}
                className="border-line hover:border-brand-600 hover:bg-brand-50 flex min-h-11 w-full items-center gap-3 rounded-lg border bg-white px-3 py-2 transition-colors"
              >
                {row}
              </button>
            ) : (
              <div className="flex min-h-9 items-center gap-3 px-3">{row}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
