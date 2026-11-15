'use client';

import { countCompleted } from '@/lib/progress';
import { useProgress } from '@/lib/progress-store';

/** 顯示模組內已完成的實驗數（讀取本機進度）。 */
export function ModuleProgress({ labKeys }: { labKeys: readonly string[] }) {
  const progress = useProgress();
  if (labKeys.length === 0) return null;
  const done = countCompleted(progress, labKeys);

  return (
    <p className="text-ink-muted text-sm font-medium">
      已完成 <span className={done > 0 ? 'text-success-700' : undefined}>{done}</span> /{' '}
      {labKeys.length} 個實驗
    </p>
  );
}
