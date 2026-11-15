/**
 * 二元語言模型（bigram）：只根據「前一個詞」統計下一個詞出現的次數。
 * 這是說明「預測下一個詞」概念的最小教學模型，不是大型語言模型的運作方式。
 */
export const START = '<s>';

export interface Candidate {
  word: string;
  /** 在範例句子中出現的次數 */
  count: number;
  probability: number;
}

export type BigramModel = ReadonlyMap<string, readonly Candidate[]>;

/** sentences：已斷詞的句子。候選詞依次數由多到少排列，次數相同時依首次出現的順序。 */
export function buildBigramModel(sentences: readonly (readonly string[])[]): BigramModel {
  const counts = new Map<string, Map<string, number>>();
  for (const sentence of sentences) {
    let previous = START;
    for (const word of sentence) {
      const followers = counts.get(previous) ?? new Map<string, number>();
      followers.set(word, (followers.get(word) ?? 0) + 1);
      counts.set(previous, followers);
      previous = word;
    }
  }

  const model = new Map<string, Candidate[]>();
  for (const [word, followers] of counts) {
    const total = [...followers.values()].reduce((sum, count) => sum + count, 0);
    model.set(
      word,
      [...followers]
        .map(([follower, count]) => ({ word: follower, count, probability: count / total }))
        .sort((a, b) => b.count - a.count),
    );
  }
  return model;
}

export function candidatesAfter(model: BigramModel, word: string): readonly Candidate[] {
  return model.get(word) ?? [];
}

/**
 * 依「隨機程度」重新分配機率：p ∝ count^(1/t)。
 * t = 1 為原始機率；t 越小越集中在最常見的詞（t = 0 時只選第一名）；t 越大越平均。
 */
export function applyTemperature(candidates: readonly Candidate[], t: number): Candidate[] {
  if (candidates.length === 0) return [];
  if (t <= 0) {
    return candidates.map((candidate, index) => ({
      ...candidate,
      probability: index === 0 ? 1 : 0,
    }));
  }
  const weights = candidates.map((candidate) => candidate.count ** (1 / t));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  return candidates.map((candidate, index) => ({
    ...candidate,
    probability: (weights[index] ?? 0) / total,
  }));
}

/** 依機率抽出一個詞；random 需回傳 0（含）到 1（不含）的數。 */
export function sampleWord(
  candidates: readonly Candidate[],
  random: () => number,
): string | undefined {
  let threshold = random();
  for (const candidate of candidates) {
    threshold -= candidate.probability;
    if (threshold < 0) return candidate.word;
  }
  return candidates.at(-1)?.word;
}

export interface GenerateOptions {
  temperature: number;
  random: () => number;
  endWord: string;
  maxWords: number;
}

export function generateSentence(model: BigramModel, options: GenerateOptions): string[] {
  const words: string[] = [];
  let previous = START;
  while (words.length < options.maxWords) {
    const next = sampleWord(
      applyTemperature(candidatesAfter(model, previous), options.temperature),
      options.random,
    );
    if (next === undefined) break;
    words.push(next);
    if (next === options.endWord) break;
    previous = next;
  }
  return words;
}
