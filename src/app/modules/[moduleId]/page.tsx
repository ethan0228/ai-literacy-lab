import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ModuleIcon } from '@/components/modules/ModuleIcon';
import { Badge } from '@/components/ui/Badge';
import { ModeOnly } from '@/components/ui/ModeOnly';
import { card, container } from '@/components/ui/styles';
import { getLabsForModule, getModule, MODULES } from '@/content';

interface PageProps {
  params: Promise<{ moduleId: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return MODULES.map((module) => ({ moduleId: module.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const learningModule = getModule((await params).moduleId);
  return learningModule
    ? { title: learningModule.title, description: learningModule.description }
    : {};
}

export default async function ModulePage({ params }: PageProps) {
  const learningModule = getModule((await params).moduleId);
  if (!learningModule) notFound();
  const labs = getLabsForModule(learningModule.id);

  return (
    <div className={`${container} space-y-8 py-8 sm:py-10`}>
      <Breadcrumbs
        items={[{ label: '學習模組', href: '/modules' }, { label: learningModule.title }]}
      />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <span className="bg-brand-50 text-brand-700 grid size-16 shrink-0 place-items-center rounded-2xl">
          <ModuleIcon moduleId={learningModule.id} className="size-9" />
        </span>
        <div>
          <p className="text-brand-700 font-semibold">模組 {learningModule.order}</p>
          <h1 className="text-3xl font-bold sm:text-4xl">{learningModule.title}</h1>
          <p className="text-ink-muted mt-3 max-w-3xl text-lg">{learningModule.description}</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="question-heading" className={card}>
          <h2 id="question-heading" className="text-xl font-bold">
            核心提問
          </h2>
          <p className="text-accent-800 mt-3 text-lg font-medium">{learningModule.bigQuestion}</p>
        </section>
        <section aria-labelledby="module-objectives-heading" className={card}>
          <h2 id="module-objectives-heading" className="text-xl font-bold">
            學習目標
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {learningModule.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="labs-heading">
        <h2 id="labs-heading" className="text-2xl font-bold">
          互動實驗
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {labs.map((lab) => (
            <li key={lab.id} className={`${card} relative transition-shadow hover:shadow-md`}>
              <Badge tone="accent">可以開始・約 {lab.durationMinutes} 分鐘</Badge>
              <h3 className="mt-3 text-lg font-bold">
                <Link
                  href={`/modules/${learningModule.id}/labs/${lab.id}`}
                  className="text-brand-800 after:absolute after:inset-0 after:rounded-2xl"
                >
                  {lab.title}
                </Link>
              </h3>
              <p className="text-ink-muted mt-1">{lab.summary}</p>
            </li>
          ))}
          {learningModule.plannedLabs.map((lab) => (
            <li key={lab.id} className={`${card} border-dashed bg-transparent shadow-none`}>
              <Badge>規劃中</Badge>
              <h3 className="mt-3 text-lg font-bold">{lab.title}</h3>
              <p className="text-ink-muted mt-1">{lab.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <ModeOnly mode="teacher">
        <section
          aria-labelledby="teacher-focus-heading"
          className="border-accent-500 rounded-2xl border-2 border-dashed bg-white p-6"
        >
          <h2 id="teacher-focus-heading" className="text-accent-800 text-xl font-bold">
            教師教學重點
          </h2>
          <ul className="text-ink-muted mt-3 list-disc space-y-2 pl-5">
            {learningModule.teacherFocus.map((focus) => (
              <li key={focus}>{focus}</li>
            ))}
          </ul>
        </section>
      </ModeOnly>
    </div>
  );
}
