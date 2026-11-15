import type { SortCategory, SortItem } from '@/lib/sorting';

/**
 * 「是 AI，還是固定規則？」的卡片資料。
 * 注意：二分法是入門用的簡化，真實產品常混合兩種做法。
 */
export type Verdict = 'learns' | 'rules';

export const VERDICTS: readonly SortCategory<Verdict>[] = [
  { id: 'learns', label: '從資料中學習（AI）' },
  { id: 'rules', label: '照固定規則執行' },
];

export const SORT_ITEMS: readonly SortItem<Verdict>[] = [
  {
    id: 'calculator',
    name: '電子計算機',
    description: '按下 12 × 8，立刻顯示 96。',
    category: 'rules',
    explanation: '計算機照著固定的數學規則運算，同樣的輸入永遠得到同樣的結果，不需要從資料中學習。',
  },
  {
    id: 'spam-filter',
    name: '垃圾郵件過濾',
    description: '信箱自動把可疑的廣告信移到垃圾郵件匣。',
    category: 'learns',
    explanation:
      '常見的垃圾郵件過濾會從大量「垃圾信」與「正常信」的範例中學習特徵，再判斷新的信件。',
  },
  {
    id: 'traffic-timer',
    name: '定時紅綠燈',
    description: '每 60 秒固定切換一次燈號。',
    category: 'rules',
    explanation: '定時紅綠燈依照設定好的秒數切換，是固定規則，不會因為資料而改變行為。',
  },
  {
    id: 'video-recommendation',
    name: '影片推薦',
    description: '影音平台根據你看過的影片，推薦你可能喜歡的內容。',
    category: 'learns',
    explanation: '推薦系統會從許多人的觀看紀錄中學習規律，預測你可能感興趣的影片。',
  },
  {
    id: 'automatic-door',
    name: '感應式自動門',
    description: '感應到有東西靠近就打開。',
    category: 'rules',
    explanation: '一般的自動門只要感應器被觸發就開門，是「如果……就……」的固定規則。',
  },
  {
    id: 'speech-to-text',
    name: '語音輸入',
    description: '對著手機說話，它把聲音轉成文字。',
    category: 'learns',
    explanation: '語音辨識模型是從大量的語音與對應文字中學習，才能辨識不同人的聲音與口音。',
  },
];
