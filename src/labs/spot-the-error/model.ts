/**
 * 「抓錯偵探」的資料。
 * 這段「AI 回答」是事先寫好的示範文字，並且刻意放入錯誤與編造的來源，
 * 用來練習查證；不是任何 AI 工具實際產生的內容。
 */
export type ClaimKind = 'accurate' | 'wrong' | 'unverifiable';

export interface Claim {
  id: string;
  text: string;
  kind: ClaimKind;
  explanation: string;
  /** 可以怎麼查證 */
  howToCheck: string;
}

export const QUESTION = '請介紹月球。';

export const CLAIMS: readonly Claim[] = [
  {
    id: 'satellite',
    text: '月球是地球唯一的天然衛星。',
    kind: 'accurate',
    explanation: '地球只有月球這一顆天然衛星。',
    howToCheck: '查閱自然課本或天文館的網站。',
  },
  {
    id: 'glow',
    text: '月球本身會發光，所以晚上看起來特別明亮。',
    kind: 'wrong',
    explanation: '月球本身不會發光，我們看到的月光是它反射的太陽光。',
    howToCheck: '用關鍵字「月球 發光 反射」查詢天文館或科學教育網站。',
  },
  {
    id: 'orbit',
    text: '月球繞地球一圈大約需要 27 天。',
    kind: 'accurate',
    explanation: '月球繞地球公轉一圈大約 27 天多。',
    howToCheck: '查閱自然課本或百科全書中的「月球公轉」。',
  },
  {
    id: 'apollo',
    text: '1969 年，阿波羅 11 號的太空人首次登上月球。',
    kind: 'accurate',
    explanation: '阿波羅 11 號在 1969 年 7 月登陸月球。',
    howToCheck: '年份和事件名稱很容易在百科全書或太空機構的網站上查到。',
  },
  {
    id: 'first-person',
    text: '第一位踏上月球的人是尤里．加加林。',
    kind: 'wrong',
    explanation:
      '第一位踏上月球的人是尼爾．阿姆斯壯。加加林是第一位進入太空的人——名字是真的、聽起來也很合理，但放錯了地方。',
    howToCheck: '人名、年份、數字最容易出錯，至少用兩個可靠的來源互相比對。',
  },
  {
    id: 'survey',
    text: '根據 2023 年「國際月球研究協會」的調查，有 87% 的科學家認為月球表面很適合種植水稻。',
    kind: 'unverifiable',
    explanation:
      '這個機構和這份調查都是編造的，查不到任何原始資料。有機構名稱、有年份、有百分比，看起來很專業，卻完全沒有根據。',
    howToCheck: '看到「根據某某調查」時，試著找出原始的調查報告；找不到就不要採信。',
  },
];

export const ISSUE_COUNT = CLAIMS.filter((claim) => claim.kind !== 'accurate').length;

export type ClaimResult = 'found' | 'missed' | 'checked-accurate' | 'accurate';

export function resultFor(claim: Claim, flagged: boolean): ClaimResult {
  if (claim.kind === 'accurate') return flagged ? 'checked-accurate' : 'accurate';
  return flagged ? 'found' : 'missed';
}

export const RESULT_LABELS: Record<ClaimResult, string> = {
  found: '找到了！這句有問題',
  missed: '漏掉了：這句有問題',
  'checked-accurate': '查證後發現是正確的——多查證不是壞事',
  accurate: '這句是正確的',
};

export function countFound(flagged: ReadonlySet<string>): number {
  return CLAIMS.filter((claim) => resultFor(claim, flagged.has(claim.id)) === 'found').length;
}
