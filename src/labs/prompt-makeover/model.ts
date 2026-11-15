/**
 * 「提示詞大改造」的資料。
 * 所有「示範回應」都是事先寫好的固定文字，用來示範不同問法可能造成的差異；
 * 不是 AI 即時產生的，真實 AI 工具每次的回答也不會一樣。
 */
export interface Rewrite {
  id: string;
  prompt: string;
  response: string;
  isBest: boolean;
  feedback: string;
}

export interface MakeoverRound {
  id: string;
  situation: string;
  originalPrompt: string;
  originalResponse: string;
  /** 原本的回應有什麼問題 */
  problem: string;
  rewrites: Rewrite[];
}

export const ROUNDS: readonly MakeoverRound[] = [
  {
    id: 'dinosaur',
    situation: '小安是五年級學生，要準備 3 分鐘的口頭報告，主題是暴龍。',
    originalPrompt: '介紹恐龍',
    originalResponse:
      '恐龍是曾經生活在地球上的一大類爬行動物，種類非常多，有吃植物的，也有吃肉的；有體型巨大的，也有和雞差不多大的。牠們出現在很久以前的中生代，後來大部分種類都滅絕了。科學家透過化石來研究恐龍……（後面還有很長的內容）',
    problem: '內容沒有錯，但範圍太大、太長，沒有聚焦在暴龍，也不適合 3 分鐘的報告。',
    rewrites: [
      {
        id: 'more-detail',
        prompt: '請非常詳細地介紹恐龍，越多越好',
        response:
          '恐龍的研究歷史悠久。以下分成十個部分說明：一、恐龍的定義與分類……二、三疊紀的恐龍……三、侏羅紀的恐龍……（內容比原本更長）',
        isBest: false,
        feedback: '再想想：要求「越多越好」讓回答更長了，但小安的問題是範圍太大、時間只有 3 分鐘。',
      },
      {
        id: 'specific',
        prompt:
          '我是國小五年級學生，要做 3 分鐘的口頭報告。請用 3 個重點介紹「暴龍」，每個重點一到兩句話，用國小生聽得懂的話。',
        response:
          '1. 暴龍生活在距今大約六千多萬年前的白堊紀晚期，是肉食性恐龍。\n2. 牠的身長大約 12 公尺，差不多是一輛公車的長度。\n3. 牠的牙齒又大又粗，咬合力很強，可以咬碎獵物的骨頭。',
        isBest: true,
        feedback:
          '這個改寫說清楚了「我是誰、要做什麼、主題、數量和難度」，回答就變得聚焦又好用。別忘了：報告前還是要查證這些內容。',
      },
      {
        id: 'urgent',
        prompt: '快點介紹恐龍！！！很急！！！',
        response:
          '好的！恐龍是曾經生活在地球上的一大類爬行動物，種類非常多……（和原本的回答差不多）',
        isBest: false,
        feedback: '再想想：加上驚嘆號或催促，並沒有提供任何新的資訊，回答自然不會更符合需要。',
      },
    ],
  },
  {
    id: 'essay',
    situation: '小安寫好了一篇作文〈我的家鄉〉，想讓它變得更好。',
    originalPrompt: '幫我寫作文',
    originalResponse: '好的，請問作文的題目是什麼？需要多少字？',
    problem: '沒有題目也沒有說明需求，AI 只能反問。而且小安已經寫好了，他要的其實不是「幫我寫」。',
    rewrites: [
      {
        id: 'write-for-me',
        prompt: '幫我寫一篇 600 字的作文，題目是〈我的家鄉〉',
        response:
          '〈我的家鄉〉\n我的家鄉是一個美麗的小鎮，那裡有青翠的山和清澈的小溪……（一篇完整但和小安的家鄉無關的作文）',
        isBest: false,
        feedback:
          '再想想：這樣會得到一篇完整的作文，但它不是小安寫的，寫的也不是小安真正的家鄉。把它當成自己的作業交出去並不誠實，也學不到東西。',
      },
      {
        id: 'feedback',
        prompt:
          '下面是我寫的作文〈我的家鄉〉。請指出兩個可以寫得更好的地方，並說明原因。請不要直接幫我改寫。\n（貼上自己的作文）',
        response:
          '1. 第二段提到「家鄉的夜市很熱鬧」，可以加入你看到、聽到或聞到的具體細節，讀者會更有畫面。\n2. 結尾只有一句話，可以多寫一點你對家鄉的感受，讓文章更完整。',
        isBest: true,
        feedback:
          '這個改寫讓 AI 當「給建議的讀者」，而不是代筆的人。作文還是小安自己的，而且他知道可以怎麼進步。',
      },
      {
        id: 'one-word',
        prompt: '作文',
        response: '你想了解作文的哪個方面呢？例如寫作技巧、題目發想，或是修改建議？',
        isBest: false,
        feedback: '再想想：提示詞越短，AI 越需要猜你的意思。這裡它猜不出來，只好反問。',
      },
    ],
  },
  {
    id: 'pets',
    situation: '小安家想養第一隻寵物，他想比較貓和狗，並和家人討論。',
    originalPrompt: '貓和狗哪個好',
    originalResponse:
      '貓和狗各有優點。狗通常比較熱情、需要陪伴，貓通常比較獨立。哪一個比較好要看個人的喜好和生活方式。',
    problem: '回答很籠統，沒有可以拿來和家人討論的具體比較。',
    rewrites: [
      {
        id: 'table',
        prompt:
          '我們家想養第一隻寵物。請用表格比較貓和狗，比較「每天需要的陪伴時間、活動空間、需要學習的照顧事項」三項，用國小生看得懂的話。',
        response:
          '｜項目｜貓｜狗｜\n｜每天陪伴｜可以自己待著，但仍需要每天互動｜通常需要較多陪伴與散步｜\n｜活動空間｜多半在室內活動｜需要到戶外活動｜\n｜照顧事項｜清理貓砂、梳毛｜散步、清理排泄物、基本訓練｜\n\n實際情況會依品種和個性而不同，建議再請教獸醫或有經驗的飼主。',
        isBest: true,
        feedback: '指定了用途、比較項目和格式，得到的內容就能直接拿來和家人討論。',
      },
      {
        id: 'opinion',
        prompt: '你覺得貓比較好還是狗比較好？選一個',
        response: '如果一定要選，我會說狗，因為牠們很忠心。不過這只是其中一種看法。',
        isBest: false,
        feedback:
          '再想想：這樣只會得到一個沒有根據的「意見」。AI 並沒有真正的喜好，這個答案也幫不上小安和家人的討論。',
      },
      {
        id: 'again',
        prompt: '貓和狗哪個好？請回答',
        response: '貓和狗各有優點，要看你的生活方式和喜好來決定。',
        isBest: false,
        feedback: '再想想：同樣的問題再問一次，並不會讓回答變得更具體。',
      },
    ],
  },
];

export const RESPONSE_LABEL = '示範回應（事先寫好的，不是 AI 即時產生）';
