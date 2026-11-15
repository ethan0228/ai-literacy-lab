import type { LabContent } from '../types';

export const aiFamilyMapLab: LabContent = {
  moduleId: 'ai-basics',
  id: 'ai-family-map',
  title: 'AI 家族地圖',
  summary: '辨識、預測、生成——把六個 AI 應用分到三個家族，看看它們各自在做什麼。',
  durationMinutes: 15,
  gradeBands: ['upper-elementary', 'junior-high'],
  objectives: [
    '能區分辨識、預測與生成三種 AI 用途',
    '能依「輸入是什麼、輸出是什麼」說明分類理由',
    '能了解一個產品可能同時用到多種 AI',
  ],
  modelNotice:
    '「辨識、預測、生成」是依主要用途做的入門分類，不是唯一或正式的分法。真實的產品常同時用到好幾種，分類的界線也不一定清楚。',
  challenge: {
    id: 'ai-family-check',
    prompt: '「輸入一段描述，就得到一首新的歌」主要屬於哪一個家族？',
    options: [
      {
        id: 'recognize',
        label: '辨識：分辨這是什麼',
        isCorrect: false,
        feedback: '再想想：辨識的輸出是「類別」，例如「這是貓」。這裡的輸出是一首新的歌。',
      },
      {
        id: 'predict',
        label: '預測：推估數字或接下來的事',
        isCorrect: false,
        feedback: '再想想：預測的輸出通常是一個數字或可能性。這裡的輸出是全新的作品。',
      },
      {
        id: 'generate',
        label: '生成：產生新的內容',
        isCorrect: true,
        feedback: '答對了！輸出是原本不存在的新內容（一首歌），所以屬於生成。',
      },
    ],
  },
  reflections: [
    '語音助理要先「聽懂你說什麼」，再「回答你」。它可能用到哪幾個家族？',
    '三個家族中，你覺得哪一種出錯時影響最大？為什麼？',
  ],
  teacherGuide: {
    flow: [
      '引入（3 分鐘）：以「輸入 → AI → 輸出」的方框圖說明三個家族的輸出差異。',
      '實驗（7 分鐘）：學生個別完成六張卡片，作答前先說出這個應用的輸入與輸出。',
      '延伸（5 分鐘）：分組舉出一個新例子，請其他組判斷它屬於哪個家族。',
    ],
    discussion: [
      '「拍照認植物」如果認錯了，可能造成什麼後果？我們該怎麼使用它的結果？',
      '推薦影片算是預測嗎？它在預測什麼？',
    ],
    misconceptions: [
      {
        myth: '每個 AI 產品只屬於一個家族。',
        fact: '許多產品結合多種功能，例如語音助理同時包含語音辨識與文字生成。',
      },
      {
        myth: '生成式 AI 是從資料庫裡找出現成的答案。',
        fact: '生成式 AI 是依照從資料中學到的規律產生新內容，所以內容可能是全新的，也可能有錯。',
      },
    ],
  },
};
