import { describe, expect, it } from 'vitest';
import {
  evaluatePets,
  EXAMPLE_TRAINING,
  generatePets,
  HEIGHT_DOMAIN,
  normalizePet,
  predictPet,
  TEST_SET,
  toPoints,
  WEIGHT_DOMAIN,
} from './pet-data';

describe('pet-data', () => {
  it('相同種子產生相同資料，且都落在座標範圍內', () => {
    expect(generatePets('dog', 5, 1)).toEqual(generatePets('dog', 5, 1));
    for (const sample of [...TEST_SET, ...EXAMPLE_TRAINING]) {
      expect(sample.weight).toBeGreaterThan(WEIGHT_DOMAIN[0]);
      expect(sample.weight).toBeLessThan(WEIGHT_DOMAIN[1]);
      expect(sample.height).toBeGreaterThan(HEIGHT_DOMAIN[0]);
      expect(sample.height).toBeLessThan(HEIGHT_DOMAIN[1]);
    }
  });

  it('測試資料為狗、貓各 30 隻，且與範例訓練資料不重複', () => {
    expect(TEST_SET.filter((sample) => sample.label === 'dog')).toHaveLength(30);
    expect(TEST_SET.filter((sample) => sample.label === 'cat')).toHaveLength(30);
    const testIds = new Set(TEST_SET.map((sample) => sample.id));
    expect(EXAMPLE_TRAINING.some((sample) => testIds.has(sample.id))).toBe(false);
  });

  it('normalizePet 把特徵換算到 0–1', () => {
    expect(normalizePet(0, 10)).toEqual({ x: 0, y: 0 });
    expect(normalizePet(20, 50)).toEqual({ x: 1, y: 1 });
    expect(normalizePet(10, 30)).toEqual({ x: 0.5, y: 0.5 });
  });

  it('沒有訓練資料時無法預測，全部算答錯', () => {
    expect(predictPet([], 5, 25, 3)).toBeNull();
    expect(evaluatePets([], 3).overall).toEqual({ correct: 0, total: 60 });
  });

  it('範例訓練資料能讓模型答對大部分測試資料', () => {
    const points = toPoints(EXAMPLE_TRAINING);
    expect(predictPet(points, 16, 45, 3)).toBe('dog');
    expect(predictPet(points, 4, 23, 3)).toBe('cat');
    const result = evaluatePets(EXAMPLE_TRAINING, 3);
    expect(result.overall.correct).toBeGreaterThanOrEqual(48);
    expect(result.overall.correct).toBe(result.byLabel.dog.correct + result.byLabel.cat.correct);
  });

  it('只用狗訓練的模型，會把所有貓都判成狗', () => {
    const result = evaluatePets(generatePets('dog', 10, 5), 3);
    expect(result.byLabel.cat.correct).toBe(0);
    expect(result.byLabel.dog.correct).toBe(30);
  });
});
