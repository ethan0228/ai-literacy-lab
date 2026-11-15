import type { LabContent } from '../types';

export const fairnessCheckLab: LabContent = {
  moduleId: 'ai-ethics',
  id: 'fairness-check',
  title: '公平檢查站',
  summary: '一台說話點餐機的測試成績很漂亮。換個方式分組看看，它對每個人都一樣好用嗎？',
  durationMinutes: 15,
  gradeBands: ['upper-elementary', 'junior-high'],
  objectives: [
    '能說明為什麼整體成績好，不代表對每個群體都公平',
    '能透過分組比較，找出系統表現較差的群體',
    '能提出改善不公平結果的可能做法',
  ],
  modelNotice:
    '這 200 位使用者的測試結果，是為了教學而設計的假想數字，不是任何真實產品的資料；「補充資料後」的結果同樣是事先設定的。真實的公平性檢查需要考慮更多種分組方式，而且「公平」有不只一種定義，補充資料也不一定能解決所有問題。',
  challenge: {
    id: 'fairness-check-check',
    prompt: '廠商說：「整體正確率 88%，所以這台機器對大家都很好用。」這個說法有什麼問題？',
    options: [
      {
        id: 'too-low',
        label: '88% 太低了，要 100% 才能上線',
        isCorrect: false,
        feedback: '再想想：沒有系統能做到 100%。問題不在整體數字的高低。',
      },
      {
        id: 'hides-groups',
        label: '整體數字可能掩蓋了某一群人特別不好用的情況',
        isCorrect: true,
        feedback: '答對了！依口音分組後，才看得出其中一群人的正確率明顯較低。',
      },
      {
        id: 'too-few',
        label: '測試 200 個人一定不夠',
        isCorrect: false,
        feedback:
          '再想想：人數多寡也很重要，但即使測試更多人，只看整體數字仍然會漏掉群體之間的差異。',
      },
    ],
  },
  reflections: [
    '依年齡分組看不出差別，依口音分組才看得出來。這告訴我們檢查公平時要注意什麼？',
    '如果這台機器沒有改善就上線，哪些人會比較吃虧？他們可能會遇到什麼狀況？',
  ],
  teacherGuide: {
    flow: [
      '表態（2 分鐘）：只顯示整體結果，表決「可以上線嗎？」',
      '檢查（8 分鐘）：依序切換分組方式，記錄各組的數字；再勾選「補充資料」比較前後。',
      '連結（5 分鐘）：回顧模組 2「資料偏了會怎樣？」，討論訓練資料與公平的關係。',
    ],
    discussion: [
      '除了年齡和口音，你還會想用什麼方式分組檢查？',
      '改善後兩組仍相差 4 個百分點，這樣算公平了嗎？誰來決定？',
    ],
    misconceptions: [
      {
        myth: '整體正確率高，就代表系統是公平的。',
        fact: '人數較少的群體表現再差，對整體數字的影響也有限，必須分開檢查。',
      },
      {
        myth: '只要加入更多資料，不公平就會消失。',
        fact: '補充資料常有幫助，但還需要持續檢查，並讓受影響的人有管道反映問題。',
      },
    ],
  },
};
