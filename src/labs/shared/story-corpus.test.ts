import { describe, expect, it } from 'vitest';
import { candidatesAfter, START } from '@/lib/ml/bigram';
import { CORPUS, END_WORD, isInCorpus, joinWords, STORY_MODEL } from './story-corpus';

describe('story-corpus', () => {
  it('有 14 個句子，每句都以句號結尾', () => {
    expect(CORPUS).toHaveLength(14);
    for (const sentence of CORPUS) expect(sentence.at(-1)).toBe(END_WORD);
  });

  it('開頭最常見的是「我」，「喜歡」後面最常見的是「吃」', () => {
    expect(candidatesAfter(STORY_MODEL, START)[0]).toMatchObject({ word: '我', count: 6 });
    expect(candidatesAfter(STORY_MODEL, '喜歡')[0]).toMatchObject({ word: '吃', count: 4 });
  });

  it('「吃」後面有多個候選，可以組合出範例中沒有的句子', () => {
    expect(candidatesAfter(STORY_MODEL, '吃').map((candidate) => candidate.word)).toEqual([
      '蘋果',
      '香蕉',
      '魚',
      '骨頭',
    ]);
    expect(isInCorpus(['我', '喜歡', '吃', '蘋果', '。'])).toBe(true);
    expect(isInCorpus(['我', '喜歡', '吃', '骨頭', '。'])).toBe(false);
  });

  it('joinWords 不加空白', () => {
    expect(joinWords(['我', '喜歡', '。'])).toBe('我喜歡。');
  });
});
