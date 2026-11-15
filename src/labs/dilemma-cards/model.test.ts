import { describe, expect, it } from 'vitest';
import { DILEMMAS } from './model';

describe('dilemma-cards 資料', () => {
  it('三個情境，每個有三個選擇，代號不重複', () => {
    expect(DILEMMAS).toHaveLength(3);
    for (const dilemma of DILEMMAS) {
      expect(dilemma.choices).toHaveLength(3);
      expect(new Set(dilemma.choices.map((choice) => choice.id)).size).toBe(3);
    }
  });

  it('每個選擇都同時列出好處與風險（沒有標準答案）', () => {
    for (const dilemma of DILEMMAS) {
      for (const choice of dilemma.choices) {
        expect(choice.impacts.some((impact) => impact.tone === 'benefit')).toBe(true);
        expect(choice.impacts.some((impact) => impact.tone === 'risk')).toBe(true);
        expect(choice.followUp.endsWith('？')).toBe(true);
      }
    }
  });
});
