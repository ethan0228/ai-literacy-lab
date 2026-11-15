/**
 * 「提示詞積木」的教學模型：用一份檢查清單檢視提示詞包含了哪些資訊。
 * 這是幫助思考的清單，不是評分標準；也不會真的把提示詞送給任何 AI。
 */
export type BlockId = 'role' | 'context' | 'task' | 'format' | 'constraint' | 'personal';

export interface PromptBlock {
  id: BlockId;
  /** 積木種類 */
  kind: string;
  /** 這塊積木回答的問題 */
  question: string;
  text: string;
  /** 少了這塊時的提醒；個資積木沒有這一項 */
  missingNote?: string;
}

/** 組合提示詞時的排列順序 */
export const BLOCKS: readonly PromptBlock[] = [
  {
    id: 'role',
    kind: '角色',
    question: '希望 AI 用什麼身分回答？',
    text: '請你扮演一位很會用生活例子解釋科學的自然老師。',
    missingNote: '沒有指定角色：回答的語氣和深度可能不符合你的期待。這一塊不一定每次都需要。',
  },
  {
    id: 'context',
    kind: '背景',
    question: '我是誰？要用在哪裡？',
    text: '我是國小五年級學生，下週要在班上做 3 分鐘的口頭報告。',
    missingNote: '沒有說明背景：AI 不知道對象和用途，內容可能太難、太長，或用不上。',
  },
  {
    id: 'task',
    kind: '任務',
    question: '到底要 AI 做什麼？',
    text: '請幫我說明「水循環」是怎麼發生的。',
    missingNote: '沒有任務：AI 不知道你要它做什麼，這是最不能少的一塊。',
  },
  {
    id: 'format',
    kind: '格式',
    question: '希望回答長什麼樣子？',
    text: '請用 4 個步驟條列，每個步驟不超過兩句話。',
    missingNote: '沒有指定格式：回答可能是一大段文字，不好整理成報告。',
  },
  {
    id: 'constraint',
    kind: '限制',
    question: '有什麼要注意或避免的？',
    text: '請使用國小學生看得懂的詞語；如果有不確定的地方，請直接告訴我。',
    missingNote: '沒有限制：回答可能出現艱深的詞，也不會主動提醒哪裡不確定。',
  },
  {
    id: 'personal',
    kind: '個人資料',
    question: '要不要告訴 AI 我是誰？',
    text: '我叫王小明，就讀幸福國小五年三班，家裡電話是 0900-000-000。',
  },
];

export const ESSENTIAL_IDS: readonly BlockId[] = [
  'role',
  'context',
  'task',
  'format',
  'constraint',
];

export const PRIVACY_WARNING =
  '這塊積木包含姓名、學校班級和電話。完成這個任務完全不需要這些資料——不要把自己或別人的個人資料輸入 AI 工具。';

export function assemblePrompt(selected: ReadonlySet<BlockId>): string {
  return BLOCKS.filter((block) => selected.has(block.id))
    .map((block) => block.text)
    .join('\n');
}

export interface PromptReview {
  included: number;
  total: number;
  missing: { id: BlockId; kind: string; note: string }[];
  privacyWarning: string | null;
  complete: boolean;
}

export function reviewPrompt(selected: ReadonlySet<BlockId>): PromptReview {
  const missing = BLOCKS.filter(
    (block) => ESSENTIAL_IDS.includes(block.id) && !selected.has(block.id),
  ).map((block) => ({ id: block.id, kind: block.kind, note: block.missingNote ?? '' }));
  const hasPersonal = selected.has('personal');
  return {
    included: ESSENTIAL_IDS.length - missing.length,
    total: ESSENTIAL_IDS.length,
    missing,
    privacyWarning: hasPersonal ? PRIVACY_WARNING : null,
    complete: missing.length === 0 && !hasPersonal,
  };
}
