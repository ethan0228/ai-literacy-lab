import { describe, expect, it } from 'vitest';
import {
  applyTemperature,
  buildBigramModel,
  candidatesAfter,
  generateSentence,
  sampleWord,
  START,
} from './bigram';
import { createRandom } from './random';

const MODEL = buildBigramModel([
  ['我', '吃', '魚', '。'],
  ['我', '吃', '魚', '。'],
  ['我', '吃', '飯', '。'],
  ['貓', '吃', '魚', '。'],
]);

describe('buildBigramModel', () => {
  it('統計開頭與下一個詞的次數與機率，依次數排序', () => {
    expect(candidatesAfter(MODEL, START)).toEqual([
      { word: '我', count: 3, probability: 0.75 },
      { word: '貓', count: 1, probability: 0.25 },
    ]);
    expect(candidatesAfter(MODEL, '吃').map((candidate) => candidate.word)).toEqual(['魚', '飯']);
    expect(candidatesAfter(MODEL, '沒看過')).toEqual([]);
  });

  it('每個詞的候選機率總和為 1', () => {
    for (const candidates of MODEL.values()) {
      expect(candidates.reduce((sum, candidate) => sum + candidate.probability, 0)).toBeCloseTo(1);
    }
  });
});

describe('applyTemperature', () => {
  const base = candidatesAfter(MODEL, '吃');

  it('t = 1 維持原始機率', () => {
    expect(applyTemperature(base, 1).map((candidate) => candidate.probability)).toEqual([
      0.75, 0.25,
    ]);
  });

  it('t = 0 只選第一名', () => {
    expect(applyTemperature(base, 0).map((candidate) => candidate.probability)).toEqual([1, 0]);
  });

  it('t 越小越集中、越大越平均，總和維持 1', () => {
    const low = applyTemperature(base, 0.5);
    const high = applyTemperature(base, 2);
    expect(low[0]?.probability).toBeCloseTo(0.9);
    expect(high[0]?.probability).toBeLessThan(0.75);
    expect(high[0]?.probability).toBeGreaterThan(0.5);
    expect(high.reduce((sum, candidate) => sum + candidate.probability, 0)).toBeCloseTo(1);
  });

  it('沒有候選詞時回傳空陣列', () => {
    expect(applyTemperature([], 1)).toEqual([]);
  });
});

describe('sampleWord', () => {
  const base = candidatesAfter(MODEL, '吃');

  it('依累積機率選詞', () => {
    expect(sampleWord(base, () => 0)).toBe('魚');
    expect(sampleWord(base, () => 0.74)).toBe('魚');
    expect(sampleWord(base, () => 0.76)).toBe('飯');
    expect(sampleWord(base, () => 0.999999)).toBe('飯');
    expect(sampleWord([], () => 0.5)).toBeUndefined();
  });
});

describe('generateSentence', () => {
  it('t = 0 時永遠產生最常見的句子', () => {
    const options = { temperature: 0, endWord: '。', maxWords: 10 };
    expect(generateSentence(MODEL, { ...options, random: createRandom(1) })).toEqual([
      '我',
      '吃',
      '魚',
      '。',
    ]);
    expect(generateSentence(MODEL, { ...options, random: createRandom(99) })).toEqual([
      '我',
      '吃',
      '魚',
      '。',
    ]);
  });

  it('可能組合出範例中沒有的句子，且不超過長度上限', () => {
    const seen = new Set<string>();
    for (let seed = 0; seed < 200; seed += 1) {
      const words = generateSentence(MODEL, {
        temperature: 2,
        random: createRandom(seed),
        endWord: '。',
        maxWords: 3,
      });
      expect(words.length).toBeLessThanOrEqual(3);
      seen.add(words.join(''));
    }
    expect(seen.has('貓吃飯')).toBe(true);
  });
});
