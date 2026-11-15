import type { LearningModule } from './types';

export const MODULES: readonly LearningModule[] = [
  {
    id: 'ai-basics',
    order: 1,
    title: 'AI 基礎與分類',
    tagline: '什麼算是 AI？什麼不是？',
    description:
      '從生活中的例子出發，分辨「照固定規則執行的程式」和「從資料中學習的 AI」，並認識 AI 的主要類型。',
    bigQuestion: '我們每天用的科技裡，哪些是 AI？判斷的依據是什麼？',
    objectives: [
      '能說出 AI 與一般規則式程式的主要差異',
      '能舉出生活中使用 AI 的例子，並說明理由',
      '能區分辨識型、預測型與生成式 AI 的用途',
    ],
    teacherFocus: [
      '先蒐集學生的既有想法，再用實驗結果對照，避免直接給定義。',
      '強調分類是「幫助思考的工具」：真實產品常同時包含規則與學習兩種做法。',
    ],
    plannedLabs: [],
  },
  {
    id: 'machine-learning',
    order: 2,
    title: '機器學習實驗室',
    tagline: '電腦怎麼從資料中找出規律？',
    description: '親手準備資料、訓練小型分類模型，觀察資料的數量與組成如何影響結果。',
    bigQuestion: '為什麼給電腦的資料不同，它學到的東西就不同？',
    objectives: [
      '能描述「資料 → 訓練 → 預測」的基本流程',
      '能觀察並說明訓練資料對模型表現的影響',
      '能指出資料偏差可能造成的不公平結果',
    ],
    teacherFocus: [
      '讓學生先預測結果再執行實驗，對照預測與實際的落差。',
      '提醒學生：實驗使用的是可在瀏覽器執行的小型教學模型，規模遠小於實際系統。',
    ],
    plannedLabs: [],
  },
  {
    id: 'generative-ai',
    order: 3,
    title: '生成式 AI 實驗室',
    tagline: 'AI 怎麼「寫」出文字和圖片？',
    description: '用簡化的文字接龍模型，體驗「依機率預測下一個字詞」的概念，並了解它的限制。',
    bigQuestion: '生成式 AI 產生的內容是「知道」答案，還是「預測」出來的？',
    objectives: [
      '能用自己的話說明「預測下一個字詞」的概念',
      '能說明為什麼同一個問題可能得到不同的回答',
      '能指出生成內容可能出錯的原因',
    ],
    teacherFocus: [
      '明確區分「教學用簡化模型」與「真實的大型語言模型」，避免學生過度類推。',
      '引導學生討論：聽起來流暢的句子，一定是正確的嗎？',
    ],
    plannedLabs: [],
  },
  {
    id: 'prompt-design',
    order: 4,
    title: '提示詞設計工作坊',
    tagline: '怎麼問，才能得到有用的回答？',
    description: '拆解好提示詞的組成：角色、任務、背景、格式與限制，練習一步步改寫與比較。',
    bigQuestion: '同一個需求，為什麼換個問法結果差很多？',
    objectives: [
      '能辨識提示詞中的任務、背景、格式與限制',
      '能針對模糊的提示詞提出具體的改寫',
      '能說明為什麼不該在提示詞中輸入個人隱私資料',
    ],
    teacherFocus: [
      '以學生的真實學習任務（寫報告、整理筆記）作為練習情境。',
      '同步討論學習誠信：AI 是協助思考的工具，不是代寫作業的捷徑。',
    ],
    plannedLabs: [],
  },
  {
    id: 'ai-trust',
    order: 5,
    title: 'AI 可信度與事實查核',
    tagline: 'AI 說的，都是真的嗎？',
    description: '練習找出 AI 回答中的錯誤與缺漏，學會用多方來源查證，建立合理的信任程度。',
    bigQuestion: '什麼時候可以相信 AI 的回答？要怎麼確認？',
    objectives: [
      '能說明 AI 為什麼會產生看似合理但錯誤的內容',
      '能使用至少兩種方法查證一則資訊',
      '能判斷哪些情境需要特別謹慎地查核',
    ],
    teacherFocus: [
      '以查核流程（停、查、比、問）為主軸，而不是要求學生背誦錯誤案例。',
      '可結合圖書館利用教育或媒體素養課程。',
    ],
    plannedLabs: [],
  },
  {
    id: 'ai-ethics',
    order: 6,
    title: 'AI 倫理與社會影響',
    tagline: '好用之外，還要想什麼？',
    description: '透過情境抉擇，討論公平、隱私、著作權與責任，思考 AI 對個人與社會的影響。',
    bigQuestion: '當 AI 的決定影響到人，誰應該負責？怎樣才算公平？',
    objectives: [
      '能從不同角色的立場分析一個 AI 使用情境',
      '能說明保護個人資料與他人隱私的做法',
      '能提出負責任使用 AI 的個人守則',
    ],
    teacherFocus: [
      '情境沒有唯一標準答案，重點在於說明理由並聆聽不同觀點。',
      '可搭配班級共同訂定「我們的 AI 使用公約」。',
    ],
    plannedLabs: [],
  },
];
