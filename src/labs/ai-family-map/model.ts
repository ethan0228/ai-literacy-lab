import type { SortCategory, SortItem } from '@/lib/sorting';

/**
 * 「AI 家族地圖」的卡片資料。
 * 注意：三個家族是依「主要用途」做的入門分類，實際應用常同時用到好幾種。
 */
export type Family = 'recognize' | 'predict' | 'generate';

export const FAMILIES: readonly SortCategory<Family>[] = [
  { id: 'recognize', label: '辨識', hint: '分辨這是什麼' },
  { id: 'predict', label: '預測', hint: '推估數字或接下來的事' },
  { id: 'generate', label: '生成', hint: '產生新的內容' },
];

export const FAMILY_ITEMS: readonly SortItem<Family>[] = [
  {
    id: 'face-unlock',
    name: '手機臉部解鎖',
    description: '看一眼手機，它確認是你本人才解鎖。',
    category: 'recognize',
    explanation: '它的工作是分辨「這張臉是不是機主」，屬於辨識：把輸入的影像歸到某一類。',
  },
  {
    id: 'arrival-time',
    name: '地圖預估抵達時間',
    description: '地圖 App 告訴你：大約 25 分鐘後到達。',
    category: 'predict',
    explanation: '它根據過去與目前的路況資料，推估一個「數字」（還要多久），屬於預測。',
  },
  {
    id: 'story-writer',
    name: '聊天機器人寫故事',
    description: '輸入「寫一個關於太空貓的故事」，它寫出一篇新故事。',
    category: 'generate',
    explanation: '它產生原本不存在的新文字，屬於生成。',
  },
  {
    id: 'plant-id',
    name: '拍照認植物',
    description: '對著路邊的花拍照，App 告訴你它可能是什麼植物。',
    category: 'recognize',
    explanation: '它把照片歸到某一種植物，是辨識。注意它給的是「最可能」的答案，也可能認錯。',
  },
  {
    id: 'demand-forecast',
    name: '便當進貨量',
    description: '商店的系統估計明天大概會賣出幾個便當。',
    category: 'predict',
    explanation: '它根據過去的銷售紀錄推估明天的數量，屬於預測。',
  },
  {
    id: 'text-to-image',
    name: '文字變圖片',
    description: '輸入「戴著帽子的企鵝」，得到一張新的圖片。',
    category: 'generate',
    explanation: '它依照文字描述產生一張新的圖片，屬於生成。',
  },
];
