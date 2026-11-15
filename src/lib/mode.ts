import { createLocalStore, useLocalStore } from '@/lib/storage/local-store';

export const MODES = ['student', 'teacher'] as const;
export type Mode = (typeof MODES)[number];

export const MODE_LABELS: Record<Mode, string> = {
  student: '學生模式',
  teacher: '教師模式',
};

export function isMode(value: unknown): value is Mode {
  return typeof value === 'string' && (MODES as readonly string[]).includes(value);
}

export const modeStore = createLocalStore<Mode>({
  key: 'ail:mode:v1',
  fallback: 'student',
  parse: (raw) => (isMode(raw) ? raw : undefined),
});

export function useMode(): Mode {
  return useLocalStore(modeStore);
}

/** 教師投影模式：放大字級並隱藏教師備課資訊，適合投影到教室螢幕。 */
export const projectionStore = createLocalStore<boolean>({
  key: 'ail:projection:v1',
  fallback: false,
  parse: (raw) => (typeof raw === 'boolean' ? raw : undefined),
});

/** 投影模式只在教師模式下生效。 */
export function useProjection(): boolean {
  const mode = useMode();
  const enabled = useLocalStore(projectionStore);
  return mode === 'teacher' && enabled;
}
