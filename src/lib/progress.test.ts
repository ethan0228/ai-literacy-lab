import { describe, expect, it } from 'vitest';
import {
  countCompleted,
  EMPTY_PROGRESS,
  isLabCompleted,
  labKey,
  markLabCompleted,
  parseProgress,
  unmarkLabCompleted,
} from './progress';

const NOW = new Date('2026-11-15T08:00:00.000Z');
const KEY = labKey('ai-basics', 'ai-or-not');

describe('progress', () => {
  it('labKey 組合模組與實驗代號', () => {
    expect(KEY).toBe('ai-basics/ai-or-not');
  });

  it('標記完成不會改動原物件', () => {
    const next = markLabCompleted(EMPTY_PROGRESS, KEY, NOW);
    expect(isLabCompleted(next, KEY)).toBe(true);
    expect(next.completedLabs[KEY]).toBe('2026-11-15T08:00:00.000Z');
    expect(EMPTY_PROGRESS.completedLabs).toEqual({});
  });

  it('重複標記保留第一次的完成時間', () => {
    const first = markLabCompleted(EMPTY_PROGRESS, KEY, NOW);
    expect(markLabCompleted(first, KEY, new Date('2027-01-01T00:00:00Z'))).toBe(first);
  });

  it('可以取消標記', () => {
    const done = markLabCompleted(EMPTY_PROGRESS, KEY, NOW);
    expect(isLabCompleted(unmarkLabCompleted(done, KEY), KEY)).toBe(false);
  });

  it('countCompleted 只計算指定的實驗', () => {
    const done = markLabCompleted(EMPTY_PROGRESS, KEY, NOW);
    expect(countCompleted(done, [KEY, 'x/y'])).toBe(1);
    expect(countCompleted(done, [])).toBe(0);
  });

  it('parseProgress 拒絕不合法的資料並濾掉錯誤欄位', () => {
    expect(parseProgress(null)).toBeUndefined();
    expect(parseProgress({ version: 2, completedLabs: {} })).toBeUndefined();
    expect(parseProgress({ version: 1 })).toBeUndefined();
    expect(parseProgress({ version: 1, completedLabs: { a: 'x', b: 42 } })).toEqual({
      version: 1,
      completedLabs: { a: 'x' },
    });
  });
});
