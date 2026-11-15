/**
 * 「公平檢查站」的教學模型。
 * 情境：一台用說話點餐的機器，測試了 200 位使用者。
 * 所有數字都是為了教學而設計的假想資料，不是任何真實系統的測試結果。
 */
export type Accent = 'common' | 'rare';
export type Age = 'child' | 'adult';
export type Dimension = 'overall' | 'age' | 'accent';

export interface Cell {
  accent: Accent;
  age: Age;
  total: number;
  /** 原本系統辨識正確的人數 */
  correctBefore: number;
  /** 補充少見口音的訓練資料後，辨識正確的人數 */
  correctAfter: number;
}

export const CELLS: readonly Cell[] = [
  { accent: 'common', age: 'child', total: 60, correctBefore: 58, correctAfter: 58 },
  { accent: 'common', age: 'adult', total: 90, correctBefore: 86, correctAfter: 86 },
  { accent: 'rare', age: 'child', total: 20, correctBefore: 12, correctAfter: 18 },
  { accent: 'rare', age: 'adult', total: 30, correctBefore: 20, correctAfter: 28 },
];

export const DIMENSIONS: readonly { id: Dimension; label: string }[] = [
  { id: 'overall', label: '只看整體' },
  { id: 'age', label: '依年齡分組' },
  { id: 'accent', label: '依口音分組' },
];

const GROUP_LABELS: Record<Accent | Age, string> = {
  common: '訓練資料中常見的口音',
  rare: '訓練資料中少見的口音',
  child: '兒童',
  adult: '成人',
};

export interface GroupResult {
  id: string;
  label: string;
  correct: number;
  total: number;
  percent: number;
}

function toResult(
  id: string,
  label: string,
  cells: readonly Cell[],
  improved: boolean,
): GroupResult {
  const total = cells.reduce((sum, cell) => sum + cell.total, 0);
  const correct = cells.reduce(
    (sum, cell) => sum + (improved ? cell.correctAfter : cell.correctBefore),
    0,
  );
  return { id, label, correct, total, percent: Math.round((correct / total) * 100) };
}

export function summarize(dimension: Dimension, improved: boolean): GroupResult[] {
  if (dimension === 'overall') return [toResult('overall', '全部使用者', CELLS, improved)];
  const keys: readonly (Accent | Age)[] =
    dimension === 'age' ? ['child', 'adult'] : ['common', 'rare'];
  return keys.map((key) =>
    toResult(
      key,
      GROUP_LABELS[key],
      CELLS.filter((cell) => cell[dimension] === key),
      improved,
    ),
  );
}

/** 各組辨識正確率的最大差距（百分點）。 */
export function gap(groups: readonly GroupResult[]): number {
  const percents = groups.map((group) => group.percent);
  return Math.max(...percents) - Math.min(...percents);
}

export const GAP_THRESHOLD = 5;

export function describeGap(dimension: Dimension, groups: readonly GroupResult[]): string {
  if (dimension === 'overall') {
    return '只看整體數字，看不出系統對不同的人是否一樣好用。試試看分組檢查。';
  }
  const difference = gap(groups);
  return difference > GAP_THRESHOLD
    ? `兩組的辨識正確率相差 ${difference} 個百分點：這台機器對其中一群人明顯比較不好用。`
    : `兩組的辨識正確率只相差 ${difference} 個百分點，這樣分組看不出明顯的差別。`;
}
