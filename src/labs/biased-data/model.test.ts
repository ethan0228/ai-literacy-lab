import { describe, expect, it } from 'vitest';
import { evaluatePets } from '@/labs/shared/pet-data';
import { BIAS_K, BIAS_OPTIONS, buildTrainingSet, TRAINING_SIZE } from './model';

describe('biased-data 教學模型', () => {
  it('每個選項的訓練資料都是 40 筆，貓狗數量符合設定', () => {
    for (const option of BIAS_OPTIONS) {
      const training = buildTrainingSet(option);
      expect(training).toHaveLength(TRAINING_SIZE);
      expect(training.filter((sample) => sample.label === 'cat')).toHaveLength(option.cats);
    }
  });

  it('貓的資料越少，貓的辨識正確數越低；狗不會變差', () => {
    const results = BIAS_OPTIONS.map(
      (option) => evaluatePets(buildTrainingSet(option), BIAS_K).byLabel,
    );
    const cats = results.map((result) => result.cat.correct);
    const dogs = results.map((result) => result.dog.correct);
    expect(cats).toEqual([...cats].sort((a, b) => b - a));
    expect(dogs).toEqual([...dogs].sort((a, b) => a - b));
    expect(cats[0]).toBeGreaterThanOrEqual(27);
    expect(cats.at(-1)).toBe(0);
  });
});
