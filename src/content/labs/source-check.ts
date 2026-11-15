import type { LabContent } from '../types';

export const sourceCheckLab: LabContent = {
  moduleId: 'ai-trust',
  id: 'source-check',
  title: '來源比一比',
  summary: '同一個問題，兩個說法。用「作者、日期、根據、目的」四個線索，判斷哪一個比較可信。',
  durationMinutes: 15,
  gradeBands: ['upper-elementary', 'junior-high'],
  objectives: [
    '能用作者、日期、根據、目的四個線索檢視資訊來源',
    '能說明為什麼要回到原始或官方來源確認重要訊息',
    '能分辨「受歡迎」與「可信」的差別',
  ],
  modelNotice:
    '實驗中的網站、帳號、機構與文章都是為了練習而虛構的。四個線索是幫助判斷的入門方法，不是絕對的規則：看起來正式的來源也可能出錯，真正查證時還需要比對多個來源。',
  challenge: {
    id: 'source-check-check',
    prompt: '用 AI 查到一個答案後，下面哪一個做法最能確認它是否正確？',
    options: [
      {
        id: 'ask-again',
        label: '再問 AI 一次：「你確定嗎？」',
        isCorrect: false,
        feedback: '再想想：AI 可能很有自信地重複同樣的錯誤，或者改口說出另一個錯誤的答案。',
      },
      {
        id: 'cross-check',
        label: '找到可靠的原始來源，並和另一個來源比對',
        isCorrect: true,
        feedback: '答對了！查證的重點是離開 AI，找到有作者、有根據的來源，並且互相比對。',
      },
      {
        id: 'looks-right',
        label: '看它寫得詳不詳細',
        isCorrect: false,
        feedback: '再想想：寫得詳細不代表正確，編造的內容也可以寫得很詳細。',
      },
    ],
  },
  reflections: [
    '四個線索中，你平常最容易忽略哪一個？',
    '想一則你最近看到的訊息，試著用四個線索檢查它。',
  ],
  teacherGuide: {
    flow: [
      '引入（3 分鐘）：展示一則轉傳訊息，請學生舉手表決「會不會相信」。',
      '實驗（8 分鐘）：三回合皆先個別選擇，再閱讀每個線索的說明。',
      '應用（4 分鐘）：請學生用四個線索檢查課本或學校網站的一篇文章。',
    ],
    discussion: [
      '官方網站一定不會出錯嗎？發現官方資訊有疑問時可以怎麼做？',
      '為什麼點閱數高的內容不一定比較可信？',
    ],
    misconceptions: [
      {
        myth: '很多人轉傳或按讚的訊息，應該是真的。',
        fact: '轉傳次數反映的是它吸引人的程度，和是否經過查證無關。',
      },
      {
        myth: '查證就是再去問另一個 AI。',
        fact: '不同的 AI 可能犯相同的錯。查證需要找到由人負責、有根據的原始來源。',
      },
    ],
  },
};
