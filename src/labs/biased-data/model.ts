import { generatePets, type PetSample } from '@/labs/shared/pet-data';

/**
 * 「資料偏了會怎樣？」的教學模型。
 * 訓練資料固定 40 筆，只改變其中貓與狗的比例；模型固定使用最近的 5 筆資料投票。
 */
export const BIAS_K = 5;
export const TRAINING_SIZE = 40;

export interface BiasOption {
  id: string;
  cats: number;
  dogs: number;
  label: string;
}

export const BIAS_OPTIONS: readonly BiasOption[] = [20, 8, 4, 2].map((cats) => ({
  id: `cats-${cats}`,
  cats,
  dogs: TRAINING_SIZE - cats,
  label: `貓 ${cats} 筆、狗 ${TRAINING_SIZE - cats} 筆${cats === 20 ? '（平衡）' : ''}`,
}));

const CAT_POOL = generatePets('cat', 20, 31);
const DOG_POOL = generatePets('dog', TRAINING_SIZE, 41);

export function buildTrainingSet(option: BiasOption): PetSample[] {
  return [...DOG_POOL.slice(0, option.dogs), ...CAT_POOL.slice(0, option.cats)];
}
