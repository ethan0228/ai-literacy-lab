import type { Metadata } from 'next';
import Link from 'next/link';
import { PrintButton } from '@/components/teachers/PrintButton';
import { card, container } from '@/components/ui/styles';
import { getLabsForModule, LABS, MODULES } from '@/content';
import { GRADE_BAND_LABELS } from '@/content/types';

export const metadata: Metadata = {
  title: '教師資源',
  description: '課程總覽、各實驗的時間與學習目標，以及課堂使用方式。',
};

const STEPS = [
  {
    title: '切換到教師模式',
    body: '頁面右上角切換為「教師模式」後，每個實驗下方會出現教學流程、討論提問與常見迷思。',
  },
  {
    title: '開啟投影模式',
    body: '在實驗頁的教師教學指引中按「開啟投影模式」：字級放大、備課內容隱藏，上方控制列可跳到各段落並切換全螢幕。',
  },
  {
    title: '先預測，再操作',
    body: '每個實驗的教學流程都安排了預測或表態的步驟。先讓學生說出想法，再用實驗結果對照，效果最好。',
  },
  {
    title: '說明這是教學模型',
    body: '每個實驗開頭都有「這是教學模型」的說明，請帶學生讀過，避免把簡化的模型當成真實 AI 的完整運作方式。',
  },
];

export default function TeachersPage() {
  const totalMinutes = LABS.reduce((sum, lab) => sum + lab.durationMinutes, 0);

  return (
    <div className={`${container} space-y-10 py-10 sm:py-14`}>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">教師資源</h1>
          <p className="text-ink-muted mt-3 max-w-2xl text-lg">
            全站共 {MODULES.length} 個模組、{LABS.length} 個實驗，合計約 {totalMinutes}{' '}
            分鐘。每個實驗可獨立使用，不需依序進行。
          </p>
        </div>
        <PrintButton />
      </header>

      <section aria-labelledby="how-heading" className="print:hidden">
        <h2 id="how-heading" className="text-2xl font-bold">
          課堂使用方式
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-2">
          {STEPS.map((step, index) => (
            <li key={step.title} className={card}>
              <h3 className="text-lg font-bold">
                <span className="text-accent-700">{index + 1}. </span>
                {step.title}
              </h3>
              <p className="text-ink-muted mt-1">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="text-2xl font-bold">
          課程總覽
        </h2>
        <div className="mt-4 space-y-8">
          {MODULES.map((learningModule) => {
            const labs = getLabsForModule(learningModule.id);
            const minutes = labs.reduce((sum, lab) => sum + lab.durationMinutes, 0);
            return (
              <article
                key={learningModule.id}
                aria-labelledby={`teach-${learningModule.id}`}
                className={`${card} break-inside-avoid`}
              >
                <h3 id={`teach-${learningModule.id}`} className="text-xl font-bold">
                  模組 {learningModule.order}：{learningModule.title}
                  <span className="text-ink-muted ml-2 text-base font-normal">
                    約 {minutes} 分鐘
                  </span>
                </h3>
                <p className="mt-2">
                  <strong>核心提問：</strong>
                  {learningModule.bigQuestion}
                </p>
                <ul className="text-ink-muted mt-2 list-disc space-y-1 pl-5">
                  {learningModule.teacherFocus.map((focus) => (
                    <li key={focus}>{focus}</li>
                  ))}
                </ul>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[36rem] border-collapse text-left">
                    <caption className="sr-only">{learningModule.title}的實驗</caption>
                    <thead>
                      <tr className="border-line text-ink-muted border-b-2 text-sm">
                        <th scope="col" className="py-2 pr-4 font-semibold">
                          實驗
                        </th>
                        <th scope="col" className="py-2 pr-4 font-semibold whitespace-nowrap">
                          時間
                        </th>
                        <th scope="col" className="py-2 pr-4 font-semibold">
                          適用
                        </th>
                        <th scope="col" className="py-2 font-semibold">
                          學習目標
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {labs.map((lab) => (
                        <tr key={lab.id} className="border-line border-b align-top last:border-0">
                          <th scope="row" className="py-3 pr-4 font-semibold">
                            <Link
                              href={`/modules/${lab.moduleId}/labs/${lab.id}`}
                              className="text-brand-800 underline underline-offset-4"
                            >
                              {lab.title}
                            </Link>
                          </th>
                          <td className="py-3 pr-4 whitespace-nowrap">
                            {lab.durationMinutes} 分鐘
                          </td>
                          <td className="py-3 pr-4">
                            {lab.gradeBands.map((band) => GRADE_BAND_LABELS[band]).join('、')}
                          </td>
                          <td className="py-3">
                            <ul className="list-disc space-y-1 pl-5">
                              {lab.objectives.map((objective) => (
                                <li key={objective}>{objective}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="notes-heading" className={card}>
        <h2 id="notes-heading" className="text-xl font-bold">
          使用前請留意
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            所有互動都是在瀏覽器中執行的簡化教學模型，沒有連接任何真實的 AI
            服務；提示詞與查核實驗中的「AI 回答」是事先寫好的示範文字。
          </li>
          <li>本站不蒐集學生資料，也不需要帳號。學習進度只存在學生使用的那一台裝置上。</li>
          <li>
            建議的時間與年段僅供參考，請依班級狀況調整。本站尚未標示與課綱的對應，請依學校課程計畫自行安排。
          </li>
        </ul>
      </section>
    </div>
  );
}
