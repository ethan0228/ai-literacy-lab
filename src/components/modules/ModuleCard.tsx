import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { getLabsForModule } from '@/content';
import type { LearningModule } from '@/content/types';
import { labKey } from '@/lib/progress';
import { ModuleIcon } from './ModuleIcon';
import { ModuleProgress } from './ModuleProgress';

export function ModuleCard({
  module,
  compact = false,
}: {
  module: LearningModule;
  /** 首頁用：以提問（tagline）為主視覺，不顯示描述 */
  compact?: boolean;
}) {
  const labs = getLabsForModule(module.id);
  const headingId = `module-${module.id}-title`;
  const link = (
    <Link href={`/modules/${module.id}`} className="after:absolute after:inset-0 after:rounded-2xl">
      {module.title}
    </Link>
  );

  return (
    <article
      aria-labelledby={headingId}
      className={`group border-line bg-surface hover:border-brand-200 relative flex h-full flex-col rounded-2xl border shadow-sm transition-shadow focus-within:shadow-md hover:shadow-md ${compact ? 'p-4 sm:p-6' : 'p-6'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="bg-brand-50 text-brand-700 grid size-12 place-items-center rounded-xl">
          <ModuleIcon moduleId={module.id} className="size-7" />
        </span>
        {labs.length === 0 && <Badge tone="neutral">即將推出</Badge>}
      </div>
      <p className="text-brand-700 mt-4 text-sm font-semibold">模組 {module.order}</p>
      {compact ? (
        <>
          <p className="text-ink mt-1 flex-1 text-lg leading-snug font-bold sm:text-xl">
            {module.tagline}
          </p>
          <h3 id={headingId} className="text-ink-muted mt-3 text-sm font-medium sm:text-base">
            {link}
          </h3>
        </>
      ) : (
        <>
          <h3 id={headingId} className="text-ink text-xl font-bold">
            {link}
          </h3>
          <p className="text-accent-700 mt-1 font-medium">{module.tagline}</p>
          <p className="text-ink-muted mt-3 flex-1">{module.description}</p>
        </>
      )}
      <div className={compact ? 'mt-2' : 'mt-4'}>
        <ModuleProgress labKeys={labs.map((lab) => labKey(lab.moduleId, lab.id))} />
      </div>
    </article>
  );
}
