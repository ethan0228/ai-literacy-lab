/**
 * 「兩難情境卡」的資料。
 * 情境為虛構；每個選擇都同時列出好處與風險，沒有標準答案。
 */
export type Tone = 'benefit' | 'risk';

export interface Impact {
  who: string;
  effect: string;
  tone: Tone;
}

export interface DilemmaChoice {
  id: string;
  label: string;
  impacts: Impact[];
  /** 選擇後進一步思考的提問 */
  followUp: string;
}

export interface Dilemma {
  id: string;
  title: string;
  situation: string;
  choices: DilemmaChoice[];
}

export const TONE_LABELS: Record<Tone, string> = { benefit: '可能的好處', risk: '可能的風險' };

export const DILEMMAS: readonly Dilemma[] = [
  {
    id: 'group-report',
    title: '小組報告的捷徑',
    situation:
      '明天要交小組報告，大家都還沒寫。組員阿哲說：「我請 AI 寫好了一整份，直接交出去就好，老師不會發現的。」',
    choices: [
      {
        id: 'submit',
        label: '直接交出去，不特別說明',
        impacts: [
          { who: '小組', effect: '今晚可以早點休息，準時交出報告。', tone: 'benefit' },
          { who: '小組', effect: '沒有真正學到內容；報告若有錯誤，也沒人發現。', tone: 'risk' },
          { who: '其他同學', effect: '自己花時間完成報告的人，受到不公平的對待。', tone: 'risk' },
          { who: '老師', effect: '被隱瞞，無法知道學生真正的學習狀況。', tone: 'risk' },
        ],
        followUp: '如果老師問：「這一段是什麼意思？」你們答得出來嗎？',
      },
      {
        id: 'assist',
        label: '把 AI 的內容當參考，自己重寫並註明使用方式',
        impacts: [
          { who: '小組', effect: '能理解內容，報告是自己的成果。', tone: 'benefit' },
          { who: '老師', effect: '知道 AI 被用在哪裡，可以給更適合的回饋。', tone: 'benefit' },
          { who: '小組', effect: '今晚要花更多時間，還得查證 AI 的內容。', tone: 'risk' },
        ],
        followUp: '你們會怎麼向老師說明「哪些部分用了 AI、怎麼用的」？',
      },
      {
        id: 'no-ai',
        label: '完全不用 AI，熬夜自己寫',
        impacts: [
          { who: '小組', effect: '成果完全出自自己，沒有誠信上的疑慮。', tone: 'benefit' },
          {
            who: '小組',
            effect: '時間很趕，報告可能比較粗糙；也少了練習善用工具的機會。',
            tone: 'risk',
          },
          { who: '阿哲', effect: '他的提議被否決，可能覺得自己的努力沒被看見。', tone: 'risk' },
        ],
        followUp: '「不用 AI」一定比「用 AI」更好嗎？關鍵是什麼？',
      },
    ],
  },
  {
    id: 'class-photo',
    title: '全班合照變卡通',
    situation:
      '你拍了一張全班的合照，發現一個 AI 修圖 App 可以把照片變成卡通風格，想做成班級紀念卡。使用前需要把照片上傳。',
    choices: [
      {
        id: 'upload',
        label: '直接上傳，給大家一個驚喜',
        impacts: [
          { who: '你', effect: '很快就能做出有趣的紀念卡。', tone: 'benefit' },
          {
            who: '照片中的同學',
            effect: '臉部影像在不知情的情況下被交給陌生的公司。',
            tone: 'risk',
          },
          {
            who: '照片中的同學',
            effect: '照片可能被保存或用於其他用途，之後很難收回。',
            tone: 'risk',
          },
        ],
        followUp: '如果是別人沒問過你，就把你的照片上傳，你有什麼感覺？',
      },
      {
        id: 'ask-first',
        label: '先看隱私說明，並徵求每個人同意',
        impacts: [
          { who: '照片中的同學', effect: '可以自己決定要不要讓照片被上傳。', tone: 'benefit' },
          { who: '你', effect: '了解 App 會怎麼處理照片，避免之後後悔。', tone: 'benefit' },
          { who: '你', effect: '比較花時間；只要有人不同意，就得改變計畫。', tone: 'risk' },
        ],
        followUp: '如果有一位同學不同意，你會怎麼做？',
      },
      {
        id: 'only-me',
        label: '只上傳自己的照片',
        impacts: [
          { who: '照片中的同學', effect: '他們的影像沒有被交出去。', tone: 'benefit' },
          { who: '你', effect: '自己的臉部影像仍然交給了 App，需要自己承擔風險。', tone: 'risk' },
          { who: '全班', effect: '做不成全班的紀念卡。', tone: 'risk' },
        ],
        followUp: '自己的照片就可以隨意上傳嗎？上傳前你會先確認什麼？',
      },
    ],
  },
  {
    id: 'attention-camera',
    title: '會看專不專心的鏡頭',
    situation:
      '學校考慮在教室安裝 AI 鏡頭，分析學生的表情與姿勢，判斷每個人上課是否專心，並把結果提供給老師。學校想聽聽學生的意見。',
    choices: [
      {
        id: 'support',
        label: '贊成安裝',
        impacts: [
          { who: '老師', effect: '可能更快發現需要幫助的學生。', tone: 'benefit' },
          { who: '學生', effect: '隨時被觀察，可能感到壓力，或學會「假裝專心」。', tone: 'risk' },
          {
            who: '學生',
            effect: '表情不等於專心程度，系統可能誤判，尤其是表達方式比較不同的人。',
            tone: 'risk',
          },
          { who: '所有人', effect: '大量臉部影像被蒐集，若外洩後果嚴重。', tone: 'risk' },
        ],
        followUp: '「看起來專心」和「真的在學習」是同一件事嗎？',
      },
      {
        id: 'oppose',
        label: '反對安裝',
        impacts: [
          { who: '學生', effect: '隱私受到保護，可以自在地上課。', tone: 'benefit' },
          { who: '老師', effect: '少了一項輔助工具，需要用其他方式了解學生。', tone: 'risk' },
          { who: '學校', effect: '原本想解決的問題還在，需要另外想辦法。', tone: 'risk' },
        ],
        followUp: '不用鏡頭，還有什麼方法可以幫助上課容易分心的同學？',
      },
      {
        id: 'conditions',
        label: '有條件同意：先說清楚規則',
        impacts: [
          {
            who: '學生與家長',
            effect: '事先被告知，可以選擇是否參加，並能對結果提出申訴。',
            tone: 'benefit',
          },
          {
            who: '學校',
            effect: '必須訂出資料保存、使用範圍與刪除的規則，做起來比較複雜。',
            tone: 'risk',
          },
          { who: '學生', effect: '即使有規則，誤判與被監看的壓力仍然可能存在。', tone: 'risk' },
        ],
        followUp: '你認為至少要有哪三條規則，你才會同意？',
      },
    ],
  },
];
