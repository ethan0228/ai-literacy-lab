import { describe, expect, it } from 'vitest';
import { ROUNDS } from './model';

describe('source-check 資料', () => {
  it('三個回合，較可信的來源確實在選項中，且位置不固定', () => {
    expect(ROUNDS).toHaveLength(3);
    const positions = ROUNDS.map((round) =>
      round.sources.findIndex((source) => source.id === round.betterId),
    );
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(new Set(positions).size).toBe(2);
  });

  it('每個來源都有相同的四個檢查項目與說明', () => {
    for (const round of ROUNDS) {
      for (const source of round.sources) {
        expect(source.fields.map((field) => field.label)).toEqual(['作者', '日期', '根據', '目的']);
        for (const field of source.fields) expect(field.note).not.toBe('');
      }
    }
  });

  it('較可信的來源線索都是正面的，另一個至少有三個需要小心', () => {
    for (const round of ROUNDS) {
      for (const source of round.sources) {
        const cautions = source.fields.filter((field) => field.signal === 'caution').length;
        if (source.id === round.betterId) expect(cautions).toBe(0);
        else expect(cautions).toBeGreaterThanOrEqual(3);
      }
    }
  });
});
