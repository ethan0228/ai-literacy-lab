import { describe, expect, it } from 'vitest';
import { clamp, createLinearScale } from './scale';

describe('createLinearScale', () => {
  const scale = createLinearScale([0, 20], [50, 450]);

  it('對應與反向換算', () => {
    expect(scale(0)).toBe(50);
    expect(scale(10)).toBe(250);
    expect(scale.invert(450)).toBe(20);
    expect(scale.invert(scale(7.5))).toBeCloseTo(7.5);
  });

  it('支援反向的範圍（畫面 y 軸向下）', () => {
    const y = createLinearScale([10, 50], [300, 0]);
    expect(y(10)).toBe(300);
    expect(y(50)).toBe(0);
  });

  it('產生刻度', () => {
    expect(scale.ticks(5)).toEqual([0, 5, 10, 15, 20]);
    expect(createLinearScale([10, 50], [0, 1]).ticks(20)).toEqual([20, 40]);
  });
});

describe('clamp', () => {
  it('限制在範圍內', () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0, 3)).toBe(0);
    expect(clamp(2, 0, 3)).toBe(2);
  });
});
