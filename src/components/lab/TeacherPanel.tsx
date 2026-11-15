import type { TeacherGuide } from '@/content/types';
import { ModeOnly } from '@/components/ui/ModeOnly';
import { ProjectionToggle } from './ProjectionToggle';

/**
 * 教師專用區塊（僅教師模式顯示）。
 * 投影模式開啟時，備課內容會隱藏，只留下切換按鈕，避免投影給學生看到。
 */
export function TeacherPanel({ guide }: { guide: TeacherGuide }) {
  return (
    <ModeOnly mode="teacher">
      <section
        aria-labelledby="teacher-heading"
        className="border-accent-500 rounded-2xl border-2 border-dashed bg-white p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="teacher-heading" className="text-accent-800 text-xl font-bold">
            教師教學指引
          </h2>
          <ProjectionToggle />
        </div>
        <p className="text-ink-muted projection:block mt-2 hidden">
          投影模式已開啟：字級已放大，教學指引已隱藏。
        </p>
        <div className="projection:hidden mt-4 grid gap-6 lg:grid-cols-3">
          <div>
            <h3 className="font-bold">教學流程</h3>
            <ol className="text-ink-muted mt-2 list-decimal space-y-2 pl-5">
              {guide.flow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="font-bold">討論提問</h3>
            <ul className="text-ink-muted mt-2 list-disc space-y-2 pl-5">
              {guide.discussion.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold">常見迷思</h3>
            <dl className="text-ink-muted mt-2 space-y-3">
              {guide.misconceptions.map((item) => (
                <div key={item.myth}>
                  <dt className="text-ink font-medium">迷思：{item.myth}</dt>
                  <dd>澄清：{item.fact}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </ModeOnly>
  );
}
