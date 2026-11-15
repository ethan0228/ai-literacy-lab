/** 「把卡片分到類別」這類實驗共用的純邏輯。 */
export interface SortItem<C extends string = string> {
  id: string;
  name: string;
  description: string;
  category: C;
  explanation: string;
}

export interface SortCategory<C extends string = string> {
  id: C;
  label: string;
  /** 類別的簡短說明（選填），顯示在按鈕下方 */
  hint?: string;
}

export type Answers<C extends string = string> = Readonly<Record<string, C>>;

export function isCorrect<C extends string>(item: SortItem<C>, answer: C): boolean {
  return item.category === answer;
}

export interface Score {
  answered: number;
  correct: number;
  total: number;
}

export function scoreAnswers<C extends string>(
  items: readonly SortItem<C>[],
  answers: Answers<C>,
): Score {
  let answered = 0;
  let correct = 0;
  for (const item of items) {
    const answer = answers[item.id];
    if (answer === undefined) continue;
    answered += 1;
    if (isCorrect(item, answer)) correct += 1;
  }
  return { answered, correct, total: items.length };
}

export function nextUnanswered<C extends string>(
  items: readonly SortItem<C>[],
  answers: Answers<C>,
): SortItem<C> | undefined {
  return items.find((item) => answers[item.id] === undefined);
}
