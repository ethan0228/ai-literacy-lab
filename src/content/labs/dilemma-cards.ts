import type { LabContent } from '../types';

export const dilemmaCardsLab: LabContent = {
  moduleId: 'ai-ethics',
  id: 'dilemma-cards',
  title: '兩難情境卡',
  summary: '三個和 AI 有關的情境，每個選擇都有好處也有風險。選選看，會影響到哪些人？',
  durationMinutes: 20,
  gradeBands: ['upper-elementary', 'junior-high'],
  objectives: [
    '能從不同角色的立場分析使用 AI 的情境',
    '能說明自己的選擇，並指出它的好處與風險',
    '能提出保護自己與他人隱私的具體做法',
  ],
  modelNotice:
    '這些情境是為了討論而設計的虛構故事，列出的好處與風險只是部分的可能性，並不完整。真實的情況會更複雜，也會因學校規定、法律與每個人的處境而不同。這個實驗沒有標準答案。',
  challenge: {
    id: 'dilemma-cards-check',
    prompt: '想把有別人入鏡的照片上傳到 AI 工具之前，最應該先做哪件事？',
    options: [
      {
        id: 'consent',
        label: '徵求照片中每個人的同意，並了解照片會被怎麼使用',
        isCorrect: true,
        feedback: '答對了！別人的影像是他們的個人資料，要不要交出去，應該由他們自己決定。',
      },
      {
        id: 'popular',
        label: '確認這個工具很多人在用',
        isCorrect: false,
        feedback: '再想想：很多人用，不代表它會好好保護照片，也不代表照片中的人同意。',
      },
      {
        id: 'quality',
        label: '確認照片拍得夠清楚',
        isCorrect: false,
        feedback: '再想想：照片越清楚，臉部資訊反而越完整。重點是有沒有得到同意。',
      },
    ],
  },
  reflections: [
    '三個情境中，哪一個最難決定？是什麼讓你猶豫？',
    '寫下三條你自己使用 AI 時想遵守的原則。',
  ],
  teacherGuide: {
    flow: [
      '表態（5 分鐘）：每個情境先請學生選擇並移動到教室對應的角落。',
      '換位（10 分鐘）：指定各組扮演不同角色（同學、老師、家長），閱讀影響後說明立場。',
      '公約（5 分鐘）：全班共同擬定「我們的 AI 使用公約」草稿。',
    ],
    discussion: [
      '有沒有哪個選擇的「好處」和「風險」落在不同人身上？這樣公平嗎？',
      '「有條件同意」的條件如果沒有被遵守，可以怎麼辦？',
    ],
    misconceptions: [
      {
        myth: '倫理問題一定有一個正確答案。',
        fact: '許多情境需要在不同的價值之間取捨，重要的是能說明理由、考慮受影響的人。',
      },
      {
        myth: '只要我自己同意，就可以上傳任何照片。',
        fact: '照片中其他人的影像屬於他們的個人資料，需要他們同意。',
      },
    ],
  },
};
