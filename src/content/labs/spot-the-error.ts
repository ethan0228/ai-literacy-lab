import type { LabContent } from '../types';

export const spotTheErrorLab: LabContent = {
  moduleId: 'ai-trust',
  id: 'spot-the-error',
  title: '抓錯偵探',
  summary: '一段介紹月球的 AI 回答，讀起來很流暢，但裡面藏了三個問題。你找得出來嗎？',
  durationMinutes: 15,
  gradeBands: ['upper-elementary', 'junior-high'],
  objectives: [
    '能說明 AI 的回答為什麼可能出現看似合理的錯誤',
    '能辨識特別需要查證的內容：人名、年份、數字與「根據某某調查」',
    '能說出至少兩種查證的方法',
  ],
  modelNotice:
    '這段「AI 回答」是事先寫好的示範文字，並且刻意放入兩個錯誤和一個編造的來源，用來練習查證；它不是任何 AI 工具實際產生的內容。真實的 AI 回答中，錯誤的數量、位置與類型都無法預料，有時完全正確，有時錯得更不明顯。',
  challenge: {
    id: 'spot-the-error-check',
    prompt: 'AI 的回答裡，哪一種內容最需要另外查證？',
    options: [
      {
        id: 'smooth',
        label: '讀起來不太通順的句子',
        isCorrect: false,
        feedback: '再想想：實驗中有問題的句子都很通順。通不通順，和內容是否正確沒有關係。',
      },
      {
        id: 'specifics',
        label: '人名、年份、數字，以及「根據某某調查」的說法',
        isCorrect: true,
        feedback: '答對了！這些細節最容易出錯或被編造，而且一旦寫進報告，影響也最大。',
      },
      {
        id: 'long',
        label: '特別長的句子',
        isCorrect: false,
        feedback: '再想想：句子的長短不是判斷依據，重點是它說了哪些可以被查證的事實。',
      },
    ],
  },
  reflections: [
    '「第一位踏上月球的人是加加林」為什麼容易讓人相信？它和正確答案有什麼關聯？',
    '那份「調查」看起來有機構、有年份、有百分比。這些細節為什麼反而讓人放下戒心？',
  ],
  teacherGuide: {
    flow: [
      '閱讀（3 分鐘）：學生獨立閱讀六個句子，先不查資料，憑直覺標記。',
      '查證（7 分鐘）：分組用課本或可靠網站查證被標記的句子，再按「查看查證結果」比對。',
      '歸納（5 分鐘）：整理「最需要查證的內容類型」與「查證方法」清單。',
    ],
    discussion: [
      '把正確的句子也標記起來，算是「答錯」嗎？為什麼？',
      '如果你不知道正確答案，要怎麼發現「加加林」那一句有問題？',
    ],
    misconceptions: [
      {
        myth: 'AI 的回答如果有錯，讀起來會怪怪的。',
        fact: '錯誤的內容常常和正確的內容一樣通順、一樣有自信，無法從語氣分辨。',
      },
      {
        myth: 'AI 有附上來源或數字，就代表有根據。',
        fact: 'AI 可能產生看起來很像真的、但實際上不存在的來源與數據，必須找到原始資料才能確認。',
      },
    ],
  },
};
