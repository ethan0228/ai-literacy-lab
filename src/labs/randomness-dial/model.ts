import { generateSentence } from '@/lib/ml/bigram';
import { createRandom } from '@/lib/ml/random';
import { END_WORD, joinWords, MAX_WORDS, STORY_MODEL } from '@/labs/shared/story-corpus';

/** 「隨機程度旋鈕」的教學模型：用同一個接龍模型，以不同的隨機程度產生句子。 */
export const RANDOMNESS = { min: 0, max: 2, step: 0.25, initial: 1 } as const;
export const SENTENCES_PER_ROUND = 5;
/** 用來展示機率變化的固定情境 */
export const DEMO_WORD = '喜歡';

export function describeRandomness(value: number): string {
  if (value === 0) return '完全不隨機：每次都選最常見的詞';
  if (value < 1) return '偏低：大多選常見的詞';
  if (value === 1) return '照範例中的出現比例';
  if (value < 2) return '偏高：少見的詞更容易被選到';
  return '很高：各個詞被選到的機會變得接近';
}

/** round：第幾次產生。同樣的設定與 round 會得到同樣的句子，方便全班比較。 */
export function generateRound(randomness: number, round: number): string[] {
  return Array.from({ length: SENTENCES_PER_ROUND }, (_, index) =>
    joinWords(
      generateSentence(STORY_MODEL, {
        temperature: randomness,
        random: createRandom(round * 1000 + index * 37 + 5),
        endWord: END_WORD,
        maxWords: MAX_WORDS,
      }),
    ),
  );
}

export function countDistinct(sentences: readonly string[]): number {
  return new Set(sentences).size;
}
