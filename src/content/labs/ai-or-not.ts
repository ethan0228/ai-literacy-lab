import type { LabContent } from '../types';

export const aiOrNotLab: LabContent = {
  moduleId: 'ai-basics',
  id: 'ai-or-not',
  title: '是 AI，還是固定規則？',
  summary: '看看六個生活中的科技，判斷它們是「從資料中學習」，還是「照固定規則執行」。',
  durationMinutes: 15,
  gradeBands: ['upper-elementary', 'junior-high'],
  objectives: [
    '能用「是否從資料中學習」作為判斷 AI 的線索',
    '能為自己的分類說明理由',
    '能了解同一類產品可能有不同的做法',
  ],
  modelNotice:
    '這個實驗把科技簡化成「從資料中學習」和「照固定規則執行」兩類，方便入門思考。真實產品常同時使用兩種做法，而且不同廠牌的設計可能不同。',
  challenge: {
    id: 'ai-or-not-check',
    prompt: '下面哪一個說法，最能幫助我們判斷一項科技是不是 AI？',
    options: [
      {
        id: 'looks-smart',
        label: '它看起來很聰明、反應很快',
        isCorrect: false,
        feedback:
          '再想想：計算機算得又快又準，但它只是照著固定規則計算。「看起來聰明」不是可靠的線索。',
      },
      {
        id: 'learns-from-data',
        label: '它的表現來自從大量資料或範例中學到的規律',
        isCorrect: true,
        feedback: '答對了！「是否從資料中學習規律」是分辨 AI 與一般規則式程式的重要線索。',
      },
      {
        id: 'uses-electricity',
        label: '它需要插電或連上網路',
        isCorrect: false,
        feedback: '再想想：電風扇也要插電，很多連網的裝置也只是照固定規則運作。',
      },
    ],
  },
  reflections: [
    '有沒有哪一張卡片讓你猶豫？你最後是根據什麼線索決定的？',
    '找一找你家裡或學校的一項科技，你覺得它是 AI 嗎？你會怎麼確認？',
  ],
  teacherGuide: {
    flow: [
      '暖身（3 分鐘）：請學生寫下一個「我覺得是 AI」的東西與理由。',
      '實驗（7 分鐘）：兩人一組完成六張卡片，要求每次作答前先說出理由。',
      '歸納（5 分鐘）：全班比較最有爭議的卡片，整理出「判斷線索」。',
    ],
    discussion: [
      '如果自動門改用攝影機辨識「人」才開門，分類會改變嗎？為什麼？',
      '「照固定規則」的程式有什麼優點？什麼情況下反而比較適合？',
    ],
    misconceptions: [
      {
        myth: '只要是電腦或機器人，就是 AI。',
        fact: '許多電腦程式與機器只是執行人預先寫好的固定規則，並沒有從資料中學習。',
      },
      {
        myth: 'AI 和人一樣會「理解」與「思考」。',
        fact: '目前的 AI 是從資料中找出統計規律來產生結果，和人類的理解方式並不相同。',
      },
    ],
  },
};
