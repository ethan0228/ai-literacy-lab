'use client';

import { buttonSecondary } from '@/components/ui/styles';
import { projectionStore, useProjection } from '@/lib/mode';

export function ProjectionToggle() {
  const projection = useProjection();

  return (
    <button
      type="button"
      aria-pressed={projection}
      onClick={() => projectionStore.set(!projection)}
      className={buttonSecondary}
    >
      {projection ? '結束投影模式' : '開啟投影模式'}
    </button>
  );
}
