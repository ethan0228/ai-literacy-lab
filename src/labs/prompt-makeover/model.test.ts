import { describe, expect, it } from 'vitest';
import { ROUNDS } from './model';

describe('prompt-makeover 資料', () => {
  it('有三回合，每回合三個改寫，恰有一個最佳改寫', () => {
    expect(ROUNDS).toHaveLength(3);
    for (const round of ROUNDS) {
      expect(round.rewrites).toHaveLength(3);
      expect(round.rewrites.filter((rewrite) => rewrite.isBest)).toHaveLength(1);
    }
  });

  it('代號不重複，且每個改寫都有示範回應與回饋', () => {
    expect(new Set(ROUNDS.map((round) => round.id)).size).toBe(ROUNDS.length);
    for (const round of ROUNDS) {
      expect(new Set(round.rewrites.map((rewrite) => rewrite.id)).size).toBe(3);
      for (const rewrite of round.rewrites) {
        expect(rewrite.response).not.toBe('');
        expect(rewrite.feedback).not.toBe('');
        expect(rewrite.feedback.startsWith('再想想')).toBe(!rewrite.isBest);
      }
    }
  });

  it('最佳改寫不會固定在同一個位置', () => {
    const positions = ROUNDS.map((round) => round.rewrites.findIndex((rewrite) => rewrite.isBest));
    expect(new Set(positions).size).toBeGreaterThan(1);
  });
});
