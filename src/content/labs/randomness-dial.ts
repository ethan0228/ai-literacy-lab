import type { LabContent } from '../types';

export const randomnessDialLab: LabContent = {
  moduleId: 'generative-ai',
  id: 'randomness-dial',
  title: '隨機程度旋鈕',
  summary: '同一台接龍機，轉動「隨機程度」旋鈕，看看句子從一成不變到天馬行空的變化。',
  durationMinutes: 15,
  gradeBands: ['upper-elementary', 'junior-high'],
  objectives: [
    '能說明為什麼同一個問題，生成式 AI 可能給出不同的回答',
    '能觀察隨機程度如何改變每個詞被選到的機會',
    '能比較「穩定」與「多變」各自適合的情境',
  ],
  modelNotice:
    '這個旋鈕調整的是接龍機挑選下一個詞時的隨機程度，沿用只讀過 14 個句子的簡化模型。許多生成式 AI 工具也有類似的設定（常稱為「溫度」），概念相近，但實際的計算方式與效果和這裡的示範不完全相同。',
  challenge: {
    id: 'randomness-check',
    prompt: '你問了 AI 兩次同樣的問題，卻得到不一樣的回答。最可能的原因是什麼？',
    options: [
      {
        id: 'broken',
        label: 'AI 壞掉了',
        isCorrect: false,
        feedback: '再想想：在實驗中，隨機程度不是 0 的時候，每次產生的句子本來就可能不同。',
      },
      {
        id: 'random-choice',
        label: '它產生內容時，會帶著一點隨機性來選擇',
        isCorrect: true,
        feedback:
          '答對了！生成的過程包含隨機選擇，所以同樣的問題可能得到不同的回答——這也是需要查證的原因之一。',
      },
      {
        id: 'mood',
        label: 'AI 第二次的心情不一樣',
        isCorrect: false,
        feedback: '再想想：AI 沒有心情。回答不同，是因為產生內容的過程中有隨機選擇。',
      },
    ],
  },
  reflections: [
    '把旋鈕轉到 0，再轉到 2。哪一邊的句子比較容易出現奇怪的內容？為什麼？',
    '查資料和寫故事，你會希望隨機程度高一點還是低一點？',
  ],
  teacherGuide: {
    flow: [
      '預測（2 分鐘）：提問「同一台接龍機，連續產生 5 句會一樣嗎？」',
      '實驗（8 分鐘）：依序試 0、1、2，記錄「5 句中有幾種不同的句子」，並觀察長條的變化。',
      '應用（5 分鐘）：討論不同任務適合的設定，以及「多問幾次、互相比對」的查核方法。',
    ],
    discussion: [
      '隨機程度是 0 的時候，句子永遠一樣。這代表它是「正確」的嗎？',
      '為什麼設計者要讓 AI 帶有隨機性，而不是永遠給同一個答案？',
    ],
    misconceptions: [
      {
        myth: 'AI 每次回答不同，代表它在亂講。',
        fact: '隨機性是設計的一部分，能讓內容更多樣；但也因此不能只看一次回答就當成事實。',
      },
      {
        myth: '把隨機程度調到最低，回答就一定正確。',
        fact: '低隨機只代表「穩定地選最常見的」，如果資料或模型本身有錯，它會穩定地給出錯誤的內容。',
      },
    ],
  },
};
