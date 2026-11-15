import { buttonPrimary, buttonSecondary } from '@/components/ui/styles';

interface RoundNavProps {
  index: number;
  total: number;
  onChange: (index: number) => void;
  /** 單位名稱，例如「回合」「情境」 */
  unit?: string;
}

/** 多回合實驗共用的「上一個／下一個」切換。 */
export function RoundNav({ index, total, onChange, unit = '回合' }: RoundNavProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button
        type="button"
        className={buttonSecondary}
        aria-disabled={index === 0}
        onClick={() => onChange(Math.max(0, index - 1))}
      >
        上一{unit}
      </button>
      <button
        type="button"
        className={buttonPrimary}
        aria-disabled={index === total - 1}
        onClick={() => onChange(Math.min(total - 1, index + 1))}
      >
        下一{unit}
      </button>
    </div>
  );
}
