import { describe, expect, it } from 'vitest';
import {
  countDistinct,
  describeRandomness,
  generateRound,
  RANDOMNESS,
  SENTENCES_PER_ROUND,
} from './model';

describe('randomness-dial 教學模型', () => {
  it('隨機程度為 0 時，每句都相同', () => {
    const sentences = generateRound(0, 0);
    expect(sentences).toHaveLength(SENTENCES_PER_ROUND);
    expect(countDistinct(sentences)).toBe(1);
    expect(sentences[0]).toBe('我喜歡吃蘋果。');
    expect(generateRound(0, 7)).toEqual(sentences);
  });

  it('相同設定可重現；不同 round 會改變結果', () => {
    expect(generateRound(1, 3)).toEqual(generateRound(1, 3));
    expect(generateRound(1.5, 1)).not.toEqual(generateRound(1.5, 2));
  });

  it('隨機程度高時，句子的種類平均比低時多', () => {
    const average = (randomness: number) =>
      Array.from({ length: 30 }, (_, round) =>
        countDistinct(generateRound(randomness, round)),
      ).reduce((sum, value) => sum + value, 0) / 30;
    expect(average(2)).toBeGreaterThan(average(0.25));
    expect(average(2)).toBeGreaterThan(4);
  });

  it('每個刻度都有說明文字', () => {
    for (let value = RANDOMNESS.min; value <= RANDOMNESS.max; value += RANDOMNESS.step) {
      expect(describeRandomness(value)).not.toBe('');
    }
  });
});
