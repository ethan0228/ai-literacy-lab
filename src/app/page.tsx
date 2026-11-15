import { ModeHero } from '@/components/home/ModeHero';
import { ModuleGrid } from '@/components/modules/ModuleGrid';
import { card, container } from '@/components/ui/styles';

const APPROACH = [
  { title: '互動實驗', body: '親手調整、觀察變化，從結果中發現規律。' },
  { title: '概念探究', body: '用提問和挑戰，把觀察整理成自己的理解。' },
  { title: '實際應用', body: '把概念帶回學習與生活中的真實情境。' },
  { title: '倫理反思', body: '想一想：這樣使用 AI，對誰好？對誰可能不公平？' },
];

export default function HomePage() {
  return (
    <>
      <section className="border-line border-b bg-white">
        <div className={`${container} py-12 sm:py-20`}>
          <ModeHero />
        </div>
      </section>

      <section aria-labelledby="modules-heading" className={`${container} pt-12 sm:pt-16`}>
        <h2 id="modules-heading" className="text-2xl font-bold sm:text-3xl">
          六大學習模組
        </h2>
        <p className="text-ink-muted mt-2 mb-6">
          從認識 AI 開始，一路走到查核與倫理。可以依序學習，也可以自由選擇。
        </p>
        <ModuleGrid />
      </section>

      <section aria-labelledby="approach-heading" className={`${container} pt-12 sm:pt-16`}>
        <h2 id="approach-heading" className="text-2xl font-bold sm:text-3xl">
          我們怎麼學
        </h2>
        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map((step, index) => (
            <li key={step.title} className={card}>
              <span
                aria-hidden="true"
                className="bg-accent-100 text-accent-800 grid size-9 place-items-center rounded-full font-bold"
              >
                {index + 1}
              </span>
              <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
              <p className="text-ink-muted mt-1">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
