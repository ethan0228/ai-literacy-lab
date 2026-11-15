import { describe, expect, it } from 'vitest';
import { FAMILIES, FAMILY_ITEMS } from './model';

describe('ai-family-map 卡片資料', () => {
  it('三個家族各有兩張卡片，代號不重複', () => {
    for (const family of FAMILIES) {
      expect(FAMILY_ITEMS.filter((item) => item.category === family.id)).toHaveLength(2);
    }
    expect(new Set(FAMILY_ITEMS.map((item) => item.id)).size).toBe(FAMILY_ITEMS.length);
  });

  it('相同家族的卡片不會連續出現', () => {
    for (let index = 1; index < FAMILY_ITEMS.length; index += 1) {
      expect(FAMILY_ITEMS[index]?.category).not.toBe(FAMILY_ITEMS[index - 1]?.category);
    }
  });
});
