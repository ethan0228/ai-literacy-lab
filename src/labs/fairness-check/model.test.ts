import { describe, expect, it } from 'vitest';
import { CELLS, describeGap, gap, summarize } from './model';

describe('fairness-check 教學模型', () => {
  it('共 200 位使用者，修正後不會讓任何一格變差', () => {
    expect(CELLS.reduce((sum, cell) => sum + cell.total, 0)).toBe(200);
    for (const cell of CELLS) {
      expect(cell.correctBefore).toBeLessThanOrEqual(cell.total);
      expect(cell.correctAfter).toBeGreaterThanOrEqual(cell.correctBefore);
      expect(cell.correctAfter).toBeLessThanOrEqual(cell.total);
    }
  });

  it('整體看起來不錯（88%）', () => {
    expect(summarize('overall', false)).toEqual([
      { id: 'overall', label: '全部使用者', correct: 176, total: 200, percent: 88 },
    ]);
  });

  it('依年齡分組看不出差別，依口音分組才發現差距', () => {
    const byAge = summarize('age', false);
    const byAccent = summarize('accent', false);
    expect(byAge.map((group) => group.percent)).toEqual([88, 88]);
    expect(gap(byAge)).toBe(0);
    expect(byAccent.map((group) => [group.correct, group.total])).toEqual([
      [144, 150],
      [32, 50],
    ]);
    expect(gap(byAccent)).toBe(32);
    expect(describeGap('accent', byAccent)).toContain('相差 32 個百分點');
    expect(describeGap('age', byAge)).toContain('看不出明顯的差別');
  });

  it('各種分組的人數與答對數加總一致', () => {
    for (const improved of [false, true]) {
      const overall = summarize('overall', improved)[0]!;
      for (const dimension of ['age', 'accent'] as const) {
        const groups = summarize(dimension, improved);
        expect(groups.reduce((sum, group) => sum + group.total, 0)).toBe(overall.total);
        expect(groups.reduce((sum, group) => sum + group.correct, 0)).toBe(overall.correct);
      }
    }
  });

  it('補充資料後差距縮小，整體也提升', () => {
    const byAccent = summarize('accent', true);
    expect(byAccent.map((group) => group.percent)).toEqual([96, 92]);
    expect(gap(byAccent)).toBe(4);
    expect(summarize('overall', true)[0]?.percent).toBe(95);
  });

  it('只看整體時提醒要分組檢查', () => {
    expect(describeGap('overall', summarize('overall', false))).toContain('分組');
  });
});
