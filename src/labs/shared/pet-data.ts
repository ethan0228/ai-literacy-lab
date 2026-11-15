import { evaluateKnn, type LabeledPoint, predictKnn, type Tally } from '@/lib/ml/knn';
import { createNormal, createRandom } from '@/lib/ml/random';
import { clamp } from '@/lib/viz/scale';

/**
 * 機器學習實驗共用的「貓狗」模擬資料。
 * 這些數字是電腦依簡單的分布產生的，不是真實動物的量測資料。
 */
export type Pet = 'dog' | 'cat';

export const PETS: readonly Pet[] = ['dog', 'cat'];
export const PET_LABELS: Record<Pet, string> = { dog: '狗', cat: '貓' };

export const WEIGHT_DOMAIN = [0, 20] as const;
export const HEIGHT_DOMAIN = [10, 50] as const;

export interface PetSample {
  id: string;
  /** 體重（公斤） */
  weight: number;
  /** 身高（公分） */
  height: number;
  label: Pet;
}

const DISTRIBUTIONS: Record<Pet, { weight: [number, number]; height: [number, number] }> = {
  dog: { weight: [9, 3.5], height: [32, 7] },
  cat: { weight: [4.5, 1.3], height: [24, 3] },
};

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export function generatePets(label: Pet, count: number, seed: number): PetSample[] {
  const normal = createNormal(createRandom(seed));
  const { weight, height } = DISTRIBUTIONS[label];
  return Array.from({ length: count }, (_, index) => ({
    id: `${label}-${seed}-${index}`,
    weight: round1(clamp(normal(...weight), WEIGHT_DOMAIN[0] + 0.5, WEIGHT_DOMAIN[1] - 0.5)),
    height: round1(clamp(normal(...height), HEIGHT_DOMAIN[0] + 1, HEIGHT_DOMAIN[1] - 1)),
    label,
  }));
}

/** 把兩個特徵都換算到 0–1，距離才不會被單位較大的特徵主導。 */
export function normalizePet(weight: number, height: number): { x: number; y: number } {
  return {
    x: (weight - WEIGHT_DOMAIN[0]) / (WEIGHT_DOMAIN[1] - WEIGHT_DOMAIN[0]),
    y: (height - HEIGHT_DOMAIN[0]) / (HEIGHT_DOMAIN[1] - HEIGHT_DOMAIN[0]),
  };
}

export function toPoints(samples: readonly PetSample[]): LabeledPoint<Pet>[] {
  return samples.map((sample) => ({
    ...normalizePet(sample.weight, sample.height),
    label: sample.label,
  }));
}

export function predictPet(
  training: readonly LabeledPoint<Pet>[],
  weight: number,
  height: number,
  k: number,
): Pet | null {
  return predictKnn(training, normalizePet(weight, height), k);
}

/** 模型沒看過的測試資料：狗、貓各 30 隻。 */
export const TEST_SET: readonly PetSample[] = [
  ...generatePets('dog', 30, 101),
  ...generatePets('cat', 30, 202),
];

/** 「載入範例資料」使用的訓練資料：狗、貓各 12 隻。 */
export const EXAMPLE_TRAINING: readonly PetSample[] = [
  ...generatePets('dog', 12, 11),
  ...generatePets('cat', 12, 22),
];

export interface PetEvaluation {
  overall: Tally;
  byLabel: Record<Pet, Tally>;
}

export function evaluatePets(
  training: readonly PetSample[],
  k: number,
  test: readonly PetSample[] = TEST_SET,
): PetEvaluation {
  const trainingPoints = toPoints(training);
  const tallyFor = (label: Pet) =>
    evaluateKnn(trainingPoints, toPoints(test.filter((sample) => sample.label === label)), k);
  const dog = tallyFor('dog');
  const cat = tallyFor('cat');
  return {
    overall: { correct: dog.correct + cat.correct, total: dog.total + cat.total },
    byLabel: { dog, cat },
  };
}
