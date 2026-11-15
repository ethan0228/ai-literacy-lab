import { type BigramModel, buildBigramModel } from '@/lib/ml/bigram';

/**
 * 生成式 AI 實驗共用的範例句子（已人工斷詞，以空白分隔）。
 * 刻意只有 14 句，讓學生可以完整看到模型「讀過」的所有資料。
 */
const RAW_SENTENCES = [
  '我 喜歡 吃 蘋果 。',
  '我 喜歡 吃 香蕉 。',
  '我 喜歡 看 書 。',
  '小貓 喜歡 吃 魚 。',
  '小貓 喜歡 睡覺 。',
  '小狗 喜歡 玩 球 。',
  '小狗 喜歡 吃 骨頭 。',
  '我 今天 很 開心 。',
  '小狗 今天 很 開心 。',
  '今天 天氣 很 好 。',
  '我 今天 吃 蘋果 。',
  '小貓 今天 很 想 睡覺 。',
  '我 很 喜歡 小貓 。',
  '小貓 喜歡 看 魚 。',
] as const;

export const END_WORD = '。';
export const MAX_WORDS = 12;

export const CORPUS: readonly (readonly string[])[] = RAW_SENTENCES.map((sentence) =>
  sentence.split(' '),
);

export const STORY_MODEL: BigramModel = buildBigramModel(CORPUS);

/** 把詞接成句子顯示（中文不需要空白）。 */
export function joinWords(words: readonly string[]): string {
  return words.join('');
}

const CORPUS_TEXTS = new Set(CORPUS.map(joinWords));

export function isInCorpus(words: readonly string[]): boolean {
  return CORPUS_TEXTS.has(joinWords(words));
}
