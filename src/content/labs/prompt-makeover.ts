import type { LabContent } from '../types';

export const promptMakeoverLab: LabContent = {
  moduleId: 'prompt-design',
  id: 'prompt-makeover',
  title: '提示詞大改造',
  summary: '三個太模糊的提示詞，各有三種改寫。比較看看，哪一種改寫真的讓回答變好？',
  durationMinutes: 20,
  gradeBands: ['upper-elementary', 'junior-high'],
  objectives: [
    '能針對模糊的提示詞提出具體的改寫',
    '能比較不同改寫造成的回答差異並說明原因',
    '能分辨「請 AI 給建議」與「請 AI 代寫」的差別',
  ],
  modelNotice:
    '這個實驗裡的所有「示範回應」都是事先寫好的固定文字，用來示範不同問法可能造成的差異，並不是 AI 即時產生的。真實的 AI 工具每次回答都可能不同，內容也可能有錯，仍然需要查證。',
  challenge: {
    id: 'prompt-makeover-check',
    prompt: '下面哪一種做法，最可能讓 AI 的回答更符合你的需要？',
    options: [
      {
        id: 'repeat',
        label: '把同樣的問題再問一次',
        isCorrect: false,
        feedback: '再想想：沒有提供新的資訊，回答通常不會更具體。',
      },
      {
        id: 'add-info',
        label: '補充你的用途、對象和想要的格式',
        isCorrect: true,
        feedback: '答對了！讓 AI 知道「給誰用、用來做什麼、要長什麼樣子」，回答才會聚焦。',
      },
      {
        id: 'longer',
        label: '要求回答越長越好',
        isCorrect: false,
        feedback: '再想想：回答變長不等於變好，反而更難找到你需要的重點。',
      },
    ],
  },
  reflections: [
    '第二回合中，「幫我寫一篇作文」和「請指出兩個可以改進的地方」有什麼不同？哪一種對學習比較有幫助？',
    '拿到一個看起來很不錯的回答之後，你還應該做什麼？',
  ],
  teacherGuide: {
    flow: [
      '診斷（5 分鐘）：先只看原本的提示詞與回應，請學生說出「問題在哪裡」。',
      '比較（10 分鐘）：每回合先投票選改寫，再逐一點開三種改寫，比較示範回應。',
      '公約（5 分鐘）：以第二回合為例，討論班級使用 AI 完成作業的原則。',
    ],
    discussion: [
      '「幫我寫作文」的改寫能得到完整的作文，為什麼它不是最好的選擇？',
      '在什麼情況下，使用 AI 是在幫助學習？什麼情況下是在取代學習？',
    ],
    misconceptions: [
      {
        myth: '只要找到「神奇的提示詞」，AI 就會給出完美答案。',
        fact: '好的提示詞能提高回答符合需要的機會，但不能保證內容正確，仍需自己判斷與查證。',
      },
      {
        myth: 'AI 寫出來的東西，交出去就算是我的作業。',
        fact: '作業的目的是練習與展現自己的學習。可以請 AI 給建議，但成果應該是自己完成的，並依老師的規定說明使用方式。',
      },
    ],
  },
};
