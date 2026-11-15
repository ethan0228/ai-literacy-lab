/**
 * 「來源比一比」的資料。
 * 所有來源（網站、帳號、機構、文章）都是為了教學而虛構的，並非真實存在的網頁。
 */
export type Signal = 'good' | 'caution';

export interface SourceField {
  label: string;
  value: string;
  signal: Signal;
  note: string;
}

export interface Source {
  id: string;
  name: string;
  fields: SourceField[];
}

export interface SourceRound {
  id: string;
  question: string;
  sources: [Source, Source];
  betterId: string;
  takeaway: string;
}

export const SIGNAL_LABELS: Record<Signal, string> = {
  good: '可信線索',
  caution: '要小心',
};

export const ROUNDS: readonly SourceRound[] = [
  {
    id: 'water',
    question: '健康課要報告「每天該喝多少水」，哪一個來源比較適合引用？',
    betterId: 'health-agency',
    takeaway: '先問「誰寫的？根據什麼？為什麼寫？」——想賣東西的文章，內容可能偏向對它有利的說法。',
    sources: [
      {
        id: 'blog',
        name: '「元氣生活小站」的文章',
        fields: [
          {
            label: '作者',
            value: '沒有寫',
            signal: 'caution',
            note: '不知道是誰寫的，無法判斷專業程度。',
          },
          { label: '日期', value: '沒有寫', signal: 'caution', note: '不知道資訊是否過時。' },
          {
            label: '根據',
            value: '「專家說每個人每天一定要喝 3000 毫升」',
            signal: 'caution',
            note: '沒說是哪位專家、哪份研究，無法查證。',
          },
          {
            label: '目的',
            value: '文章最後推薦購買濾水器',
            signal: 'caution',
            note: '有販售商品的目的，內容可能不夠中立。',
          },
        ],
      },
      {
        id: 'health-agency',
        name: '政府衛生機關網站的衛教文章',
        fields: [
          {
            label: '作者',
            value: '標示負責的單位',
            signal: 'good',
            note: '知道由誰負責，有問題可以追查。',
          },
          {
            label: '日期',
            value: '標示最近的更新日期',
            signal: 'good',
            note: '可以判斷資訊是否夠新。',
          },
          {
            label: '根據',
            value: '列出參考資料，並說明需求量因人而異',
            signal: 'good',
            note: '有列出依據，也沒有把話說得太絕對。',
          },
          { label: '目的', value: '提供民眾健康資訊', signal: 'good', note: '沒有販售商品。' },
        ],
      },
    ],
  },
  {
    id: 'closure',
    question: '颱風天，你想知道「明天是否停課」，應該相信哪一個？',
    betterId: 'official',
    takeaway: '遇到重要或緊急的消息，回到原始、官方的來源確認；「快轉給大家」不是可信的理由。',
    sources: [
      {
        id: 'official',
        name: '縣市政府官方網站的公告',
        fields: [
          {
            label: '作者',
            value: '縣市政府',
            signal: 'good',
            note: '這是有權決定是否停課的單位，屬於原始來源。',
          },
          {
            label: '日期',
            value: '標示公告的日期與時間',
            signal: 'good',
            note: '可以確認是不是今天的最新消息。',
          },
          { label: '根據', value: '正式公告', signal: 'good', note: '不需要再透過別人轉述。' },
          { label: '目的', value: '通知民眾', signal: 'good', note: '這是它的職責。' },
        ],
      },
      {
        id: 'forward',
        name: '通訊軟體群組轉傳的截圖',
        fields: [
          {
            label: '作者',
            value: '不知道是誰做的圖',
            signal: 'caution',
            note: '轉了很多手，找不到最初的來源。',
          },
          {
            label: '日期',
            value: '圖上沒有日期',
            signal: 'caution',
            note: '可能是去年的舊圖被重新轉傳。',
          },
          {
            label: '根據',
            value: '「聽說明天全部停課」',
            signal: 'caution',
            note: '「聽說」沒有任何依據。',
          },
          {
            label: '目的',
            value: '「快轉給大家！」',
            signal: 'caution',
            note: '催促轉傳的訊息，常常沒有經過查證。',
          },
        ],
      },
    ],
  },
  {
    id: 'sleep',
    question: '科展想引用「國中生平均睡眠時間」的數據，哪一個來源比較好？',
    betterId: 'report',
    takeaway: '數據要看「什麼時候調查、怎麼調查、調查了誰」。點閱數高不代表內容可靠。',
    sources: [
      {
        id: 'video',
        name: '百萬點閱的短影片',
        fields: [
          {
            label: '作者',
            value: '人氣創作者',
            signal: 'caution',
            note: '受歡迎不等於在這個主題上有專業。',
          },
          { label: '日期', value: '三年前上傳', signal: 'caution', note: '數據可能已經過時。' },
          {
            label: '根據',
            value: '「我看過一份研究說……」',
            signal: 'caution',
            note: '沒有說是哪一份研究，無法找到原始資料。',
          },
          {
            label: '目的',
            value: '吸引觀看與分享',
            signal: 'caution',
            note: '內容可能為了吸引人而誇大。',
          },
        ],
      },
      {
        id: 'report',
        name: '研究機構去年發表的調查報告',
        fields: [
          {
            label: '作者',
            value: '標示研究團隊與機構',
            signal: 'good',
            note: '可以查到是誰做的研究。',
          },
          { label: '日期', value: '去年發表', signal: 'good', note: '資料夠新。' },
          {
            label: '根據',
            value: '說明調查了多少位學生、怎麼調查',
            signal: 'good',
            note: '交代方法，別人可以檢查它是否合理。',
          },
          {
            label: '目的',
            value: '發表研究結果',
            signal: 'good',
            note: '這是原始資料，可以直接引用並註明出處。',
          },
        ],
      },
    ],
  },
];
