import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { getLabsForModule } from '@/content';
import type { LearningModule } from '@/content/types';
import { labKey } from '@/lib/progress';
import { ModuleIcon } from './ModuleIcon';
import { ModuleProgress } from './ModuleProgress';

export function ModuleCard({ module }: { module: LearningModule }) {
  const labs = getLabsForModule(module.id);
  const headingId = `module-${module.id}-title`;

  return (
    <article
      aria-labelledby={headingId}
      className="group border-line bg-surface relative flex h-full flex-col rounded-2xl border p-6 shadow-sm transition-shadow focus-within:shadow-md hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="bg-brand-50 text-brand-700 grid size-12 place-items-center rounded-xl">
          <ModuleIcon moduleId={module.id} className="size-7" />
        </span>
        {labs.length > 0 ? (
          <Badge tone="accent">可以開始</Badge>
        ) : (
          <Badge tone="neutral">即將推出</Badge>
        )}
      </div>
      <p className="text-brand-700 mt-4 text-sm font-semibold">模組 {module.order}</p>
      <h3 id={headingId} className="text-ink text-xl font-bold">
        <Link
          href={`/modules/${module.id}`}
          className="after:absolute after:inset-0 after:rounded-2xl"
        >
          {module.title}
        </Link>
      </h3>
      <p className="text-accent-700 mt-1 font-medium">{module.tagline}</p>
      <p className="text-ink-muted mt-3 flex-1">{module.description}</p>
      <div className="mt-4">
        <ModuleProgress labKeys={labs.map((lab) => labKey(lab.moduleId, lab.id))} />
      </div>
    </article>
  );
}
