import { describe, expect, it } from 'vitest';
import { isCorrect, nextUnanswered, scoreAnswers, type SortItem } from './sorting';

const ITEMS: SortItem<'a' | 'b'>[] = [
  { id: 'one', name: '一', description: '', category: 'a', explanation: '' },
  { id: 'two', name: '二', description: '', category: 'b', explanation: '' },
  { id: 'three', name: '三', description: '', category: 'a', explanation: '' },
];

describe('sorting', () => {
  it('isCorrect 比對答案', () => {
    expect(isCorrect(ITEMS[0]!, 'a')).toBe(true);
    expect(isCorrect(ITEMS[0]!, 'b')).toBe(false);
  });

  it('scoreAnswers 計算已答與答對數，忽略不存在的卡片', () => {
    expect(scoreAnswers(ITEMS, {})).toEqual({ answered: 0, correct: 0, total: 3 });
    expect(scoreAnswers(ITEMS, { one: 'a', two: 'a', unknown: 'b' })).toEqual({
      answered: 2,
      correct: 1,
      total: 3,
    });
  });

  it('nextUnanswered 依序回傳下一張，全部答完回傳 undefined', () => {
    expect(nextUnanswered(ITEMS, {})?.id).toBe('one');
    expect(nextUnanswered(ITEMS, { one: 'a' })?.id).toBe('two');
    expect(nextUnanswered(ITEMS, { one: 'a', two: 'b', three: 'a' })).toBeUndefined();
  });
});
