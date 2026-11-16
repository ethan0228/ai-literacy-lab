import { HeroTryIt } from '@/components/home/HeroTryIt';
import { ModeHero } from '@/components/home/ModeHero';
import { ModuleGrid } from '@/components/modules/ModuleGrid';
import { container } from '@/components/ui/styles';

const APPROACH = [
  { title: '互動實驗', body: '親手調整，觀察變化。' },
  { title: '概念探究', body: '把觀察整理成自己的理解。' },
  { title: '實際應用', body: '帶回生活中的真實情境。' },
  { title: '倫理反思', body: '想一想：這樣用，對誰公平？' },
];

export default function HomePage() {
  return (
    <>
      <section className="border-line border-b bg-white">
        <div
          className={`${container} grid items-center gap-8 py-10 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12`}
        >
          <ModeHero />
          <HeroTryIt />
        </div>
      </section>

      <section aria-labelledby="modules-heading" className={`${container} pt-12 sm:pt-16`}>
        <h2 id="modules-heading" className="text-2xl font-bold sm:text-3xl">
          六大學習模組
        </h2>
        <p className="text-ink-muted mt-2 mb-6">六個問題，挑一個你最好奇的開始。</p>
        <ModuleGrid compact />
      </section>

      <section aria-labelledby="approach-heading" className={`${container} pt-12 sm:pt-16`}>
        <h2 id="approach-heading" className="text-2xl font-bold sm:text-3xl">
          我們怎麼學
        </h2>
        <ol className="border-line bg-surface mt-6 grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border p-5 shadow-sm sm:p-6 lg:grid-cols-4">
          {APPROACH.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span
                aria-hidden="true"
                className="bg-accent-100 text-accent-800 grid size-9 shrink-0 place-items-center rounded-full font-bold"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="text-ink-muted text-sm">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
