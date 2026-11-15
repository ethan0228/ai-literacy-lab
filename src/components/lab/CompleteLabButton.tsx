'use client';

import { buttonPrimary, buttonSecondary } from '@/components/ui/styles';
import { isLabCompleted, markLabCompleted, unmarkLabCompleted } from '@/lib/progress';
import { progressStore, useProgress } from '@/lib/progress-store';

export function CompleteLabButton({ labKey }: { labKey: string }) {
  const completed = isLabCompleted(useProgress(), labKey);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        aria-pressed={completed}
        onClick={() =>
          progressStore.set((progress) =>
            completed
              ? unmarkLabCompleted(progress, labKey)
              : markLabCompleted(progress, labKey, new Date()),
          )
        }
        className={completed ? buttonSecondary : buttonPrimary}
      >
        {completed ? '取消完成標記' : '標記為已完成'}
      </button>
      <p aria-live="polite" className="text-success-800 text-sm font-medium">
        {completed ? '已完成！進度已儲存在這台裝置的瀏覽器中。' : ''}
      </p>
    </div>
  );
}
