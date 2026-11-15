import type { LabContent } from '../types';

export const promptBuilderLab: LabContent = {
  moduleId: 'prompt-design',
  id: 'prompt-builder',
  title: '提示詞積木',
  summary: '角色、背景、任務、格式、限制——用積木組出一份提示詞，檢查還少了什麼。',
  durationMinutes: 15,
  gradeBands: ['upper-elementary', 'junior-high'],
  objectives: [
    '能辨識提示詞中的角色、背景、任務、格式與限制',
    '能說明少了某種資訊時，回答可能出現什麼問題',
    '能說明為什麼不該在提示詞中輸入個人資料',
  ],
  modelNotice:
    '這個實驗不會把提示詞送給任何 AI，只用一份檢查清單來檢視提示詞包含了哪些資訊。五塊積木是幫助思考的方法，不是唯一的寫法，也不是每次都要全部用上；提示詞寫得完整，並不保證 AI 的回答一定正確。',
  challenge: {
    id: 'prompt-builder-check',
    prompt: '小美想請 AI 幫忙規劃班級同樂會。下面哪一項「不應該」寫進提示詞？',
    options: [
      {
        id: 'budget',
        label: '活動預算是 1500 元',
        isCorrect: false,
        feedback: '再想想：預算是很有用的背景資訊，能讓建議更實際，而且不是個人資料。',
      },
      {
        id: 'personal',
        label: '全班同學的姓名和家裡電話',
        isCorrect: true,
        feedback: '答對了！姓名和電話是個人資料，規劃同樂會完全用不到，也不該替別人把資料交出去。',
      },
      {
        id: 'format',
        label: '請用表格列出三個方案',
        isCorrect: false,
        feedback: '再想想：指定格式能讓回答更容易使用，可以放心寫進去。',
      },
    ],
  },
  reflections: [
    '五塊積木中，你覺得哪一塊最不能少？哪一塊有時候可以省略？',
    '想一個你最近的學習任務，試著說出它的「背景」和「格式」積木會怎麼寫。',
  ],
  teacherGuide: {
    flow: [
      '引入（3 分鐘）：只放「任務」積木，請學生預測 AI 的回答會有什麼問題。',
      '實驗（7 分鐘）：一次加一塊積木，閱讀檢查清單的變化；最後加入「個人資料」積木並討論。',
      '遷移（5 分鐘）：兩人一組，為自己的學習任務口頭說出五塊積木。',
    ],
    discussion: [
      '「個人資料」積木的內容對完成任務有幫助嗎？如果沒有，為什麼有人會想寫進去？',
      '提示詞寫得很完整，AI 的回答就一定正確嗎？接下來還要做什麼？',
    ],
    misconceptions: [
      {
        myth: '提示詞越長越好。',
        fact: '重點是提供「有用的」資訊；無關的內容和個人資料反而不該出現。',
      },
      {
        myth: '告訴 AI 越多自己的事，它越能幫上忙。',
        fact: '只需要提供和任務有關的背景（例如年級、用途），不需要也不應該提供可以辨識個人的資料。',
      },
    ],
  },
};
