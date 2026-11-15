interface UnitChartProps {
  /** 圖表的文字摘要（給螢幕報讀器） */
  label: string;
  correct: number;
  total: number;
}

const CELL = 12;
/** 固定欄數，讓不同群組的圓點大小一致、可以直接比較 */
const columns = 20;

/**
 * 單位圖：每個圓點代表一個人。實心藍點＝結果正確，空心橘圈＝結果錯誤。
 * 用形狀（實心／空心）加上顏色區分，不只依賴顏色。
 */
export function UnitChart({ label, correct, total }: UnitChartProps) {
  const rows = Math.ceil(total / columns);

  return (
    <svg
      viewBox={`0 0 ${columns * CELL} ${rows * CELL}`}
      role="img"
      aria-label={label}
      className="w-full"
      style={{ maxWidth: columns * 18 }}
    >
      {Array.from({ length: total }, (_, index) => {
        const cx = (index % columns) * CELL + CELL / 2;
        const cy = Math.floor(index / columns) * CELL + CELL / 2;
        return index < correct ? (
          <circle key={index} cx={cx} cy={cy} r={4} fill="var(--color-brand-700)" />
        ) : (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r={3.25}
            fill="white"
            stroke="var(--color-accent-600)"
            strokeWidth={1.5}
          />
        );
      })}
    </svg>
  );
}
