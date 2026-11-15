/**
 * k 最近鄰（k-nearest neighbors）分類：教學用的最小實作。
 * 預測方式：找出距離最近的 k 筆訓練資料，由它們投票決定類別。
 */
export interface Point {
  x: number;
  y: number;
}

export interface LabeledPoint<L extends string> extends Point {
  label: L;
}

function squaredDistance(a: Point, b: Point): number {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

/**
 * 回傳預測的類別；沒有訓練資料時回傳 null。
 * 票數相同時，採用其中距離最近那一筆的類別。
 */
export function predictKnn<L extends string>(
  training: readonly LabeledPoint<L>[],
  query: Point,
  k: number,
): L | null {
  if (training.length === 0) return null;
  const neighbors = training
    .map((point) => ({ label: point.label, distance: squaredDistance(point, query) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, Math.max(1, k));

  const votes = new Map<L, number>();
  for (const neighbor of neighbors) votes.set(neighbor.label, (votes.get(neighbor.label) ?? 0) + 1);
  const top = Math.max(...votes.values());
  // neighbors 已依距離排序，第一個達到最高票的就是平手時最近的類別
  return neighbors.find((neighbor) => votes.get(neighbor.label) === top)?.label ?? null;
}

export interface Tally {
  correct: number;
  total: number;
}

export function evaluateKnn<L extends string>(
  training: readonly LabeledPoint<L>[],
  test: readonly LabeledPoint<L>[],
  k: number,
): Tally {
  let correct = 0;
  for (const sample of test) if (predictKnn(training, sample, k) === sample.label) correct += 1;
  return { correct, total: test.length };
}
