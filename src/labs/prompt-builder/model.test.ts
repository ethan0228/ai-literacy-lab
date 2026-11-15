import { describe, expect, it } from 'vitest';
import { assemblePrompt, type BlockId, BLOCKS, ESSENTIAL_IDS, reviewPrompt } from './model';

const set = (...ids: BlockId[]) => new Set<BlockId>(ids);

describe('prompt-builder 教學模型', () => {
  it('每塊必要積木都有缺少時的提醒', () => {
    for (const id of ESSENTIAL_IDS) {
      expect(BLOCKS.find((block) => block.id === id)?.missingNote).toBeTruthy();
    }
  });

  it('assemblePrompt 依固定順序組合，與選取順序無關', () => {
    expect(assemblePrompt(set())).toBe('');
    const prompt = assemblePrompt(set('format', 'task'));
    expect(prompt.split('\n')).toHaveLength(2);
    expect(prompt.indexOf('水循環')).toBeLessThan(prompt.indexOf('4 個步驟'));
  });

  it('reviewPrompt 列出缺少的積木', () => {
    const review = reviewPrompt(set('task'));
    expect(review.included).toBe(1);
    expect(review.total).toBe(5);
    expect(review.missing.map((item) => item.id)).toEqual([
      'role',
      'context',
      'format',
      'constraint',
    ]);
    expect(review.complete).toBe(false);
    expect(review.privacyWarning).toBeNull();
  });

  it('五塊齊全且沒有個資才算完成', () => {
    expect(reviewPrompt(set(...ESSENTIAL_IDS)).complete).toBe(true);
    const withPersonal = reviewPrompt(set(...ESSENTIAL_IDS, 'personal'));
    expect(withPersonal.complete).toBe(false);
    expect(withPersonal.missing).toEqual([]);
    expect(withPersonal.privacyWarning).toContain('個人資料');
  });

  it('個資積木使用明顯虛構的資料', () => {
    expect(BLOCKS.find((block) => block.id === 'personal')?.text).toContain('0900-000-000');
  });
});
