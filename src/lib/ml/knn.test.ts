import { describe, expect, it } from 'vitest';
import { evaluateKnn, type LabeledPoint, predictKnn } from './knn';
import { createNormal, createRandom } from './random';

const TRAINING: LabeledPoint<'a' | 'b'>[] = [
  { x: 0, y: 0, label: 'a' },
  { x: 0.1, y: 0, label: 'a' },
  { x: 0, y: 0.1, label: 'a' },
  { x: 1, y: 1, label: 'b' },
  { x: 0.9, y: 1, label: 'b' },
];

describe('predictKnn', () => {
  it('沒有訓練資料時回傳 null', () => {
    expect(predictKnn([], { x: 0, y: 0 }, 3)).toBeNull();
  });

  it('依最近的鄰居投票', () => {
    expect(predictKnn(TRAINING, { x: 0.05, y: 0.05 }, 3)).toBe('a');
    expect(predictKnn(TRAINING, { x: 0.95, y: 0.95 }, 1)).toBe('b');
  });

  it('k 大於少數類別的資料量時，少數類別會被多數淹沒', () => {
    expect(predictKnn(TRAINING, { x: 1, y: 1 }, 1)).toBe('b');
    expect(predictKnn(TRAINING, { x: 1, y: 1 }, 5)).toBe('a');
  });

  it('平手時採用最近那一筆的類別', () => {
    const tie: LabeledPoint<'a' | 'b'>[] = [
      { x: 0, y: 0, label: 'a' },
      { x: 1, y: 0, label: 'b' },
    ];
    expect(predictKnn(tie, { x: 0.4, y: 0 }, 2)).toBe('a');
    expect(predictKnn(tie, { x: 0.6, y: 0 }, 2)).toBe('b');
  });

  it('k 小於 1 時視為 1', () => {
    expect(predictKnn(TRAINING, { x: 1, y: 1 }, 0)).toBe('b');
  });
});

describe('evaluateKnn', () => {
  it('計算測試資料的答對數', () => {
    const test: LabeledPoint<'a' | 'b'>[] = [
      { x: 0, y: 0.05, label: 'a' },
      { x: 1, y: 0.9, label: 'b' },
      { x: 1, y: 0.9, label: 'a' },
    ];
    expect(evaluateKnn(TRAINING, test, 1)).toEqual({ correct: 2, total: 3 });
  });
});

describe('random', () => {
  it('相同種子產生相同序列，不同種子不同', () => {
    const a = createRandom(1);
    const b = createRandom(1);
    const c = createRandom(2);
    const first = a();
    expect(b()).toBe(first);
    expect(c()).not.toBe(first);
    expect(first).toBeGreaterThanOrEqual(0);
    expect(first).toBeLessThan(1);
  });

  it('常態亂數的平均接近指定值', () => {
    const normal = createNormal(createRandom(7));
    const values = Array.from({ length: 2000 }, () => normal(10, 2));
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    expect(mean).toBeGreaterThan(9.8);
    expect(mean).toBeLessThan(10.2);
  });
});
