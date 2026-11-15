import { EMPTY_PROGRESS, parseProgress, type Progress } from '@/lib/progress';
import { createLocalStore, useLocalStore } from '@/lib/storage/local-store';

/** 進度的本機儲存（僅限 Client Component 使用）。 */
export const progressStore = createLocalStore<Progress>({
  key: 'ail:progress:v1',
  fallback: EMPTY_PROGRESS,
  parse: parseProgress,
});

export function useProgress(): Progress {
  return useLocalStore(progressStore);
}
