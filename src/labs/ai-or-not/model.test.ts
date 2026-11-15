import { describe, expect, it } from 'vitest';
import { SORT_ITEMS, VERDICTS } from './model';

describe('ai-or-not 卡片資料', () => {
  it('兩種分類的卡片數量相同，代號不重複', () => {
    const learns = SORT_ITEMS.filter((item) => item.category === 'learns').length;
    expect(learns).toBe(SORT_ITEMS.length - learns);
    expect(new Set(SORT_ITEMS.map((item) => item.id)).size).toBe(SORT_ITEMS.length);
  });

  it('每張卡片的類別都存在，且有說明', () => {
    const ids = VERDICTS.map((verdict) => verdict.id);
    for (const item of SORT_ITEMS) {
      expect(ids).toContain(item.category);
      expect(item.explanation).not.toBe('');
    }
  });
});
