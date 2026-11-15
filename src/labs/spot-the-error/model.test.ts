import { describe, expect, it } from 'vitest';
import { CLAIMS, countFound, ISSUE_COUNT, resultFor } from './model';

describe('spot-the-error 資料', () => {
  it('有三個有問題的句子，其中包含錯誤與編造來源兩種', () => {
    expect(ISSUE_COUNT).toBe(3);
    expect(CLAIMS.some((claim) => claim.kind === 'wrong')).toBe(true);
    expect(CLAIMS.some((claim) => claim.kind === 'unverifiable')).toBe(true);
    expect(CLAIMS[0]?.kind).toBe('accurate');
  });

  it('每個句子都有說明與查證方法', () => {
    for (const claim of CLAIMS) {
      expect(claim.explanation).not.toBe('');
      expect(claim.howToCheck).not.toBe('');
    }
  });

  it('resultFor 區分四種結果', () => {
    const wrong = CLAIMS.find((claim) => claim.id === 'glow')!;
    const accurate = CLAIMS.find((claim) => claim.id === 'orbit')!;
    expect(resultFor(wrong, true)).toBe('found');
    expect(resultFor(wrong, false)).toBe('missed');
    expect(resultFor(accurate, true)).toBe('checked-accurate');
    expect(resultFor(accurate, false)).toBe('accurate');
  });

  it('countFound 只計算真正有問題且被標記的句子', () => {
    expect(countFound(new Set())).toBe(0);
    expect(countFound(new Set(['glow', 'orbit']))).toBe(1);
    expect(countFound(new Set(CLAIMS.map((claim) => claim.id)))).toBe(3);
  });
});
