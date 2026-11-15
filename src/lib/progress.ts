/**
 * 本機學習進度的資料模型（純函式，伺服器與瀏覽器皆可使用）。
 * 只記錄「哪個實驗在何時完成」，不含任何可識別個人的資料。
 */
export interface Progress {
  version: 1;
  /** labKey（`moduleId/labId`）→ 完成時間（ISO 8601） */
  completedLabs: Record<string, string>;
}

export const EMPTY_PROGRESS: Progress = { version: 1, completedLabs: {} };

export function labKey(moduleId: string, labId: string): string {
  return `${moduleId}/${labId}`;
}

export function parseProgress(raw: unknown): Progress | undefined {
  if (typeof raw !== 'object' || raw === null) return undefined;
  const candidate = raw as { version?: unknown; completedLabs?: unknown };
  if (candidate.version !== 1) return undefined;
  if (typeof candidate.completedLabs !== 'object' || candidate.completedLabs === null) {
    return undefined;
  }
  const completedLabs: Record<string, string> = {};
  for (const [key, value] of Object.entries(candidate.completedLabs)) {
    if (typeof value === 'string') completedLabs[key] = value;
  }
  return { version: 1, completedLabs };
}

export function markLabCompleted(progress: Progress, key: string, now: Date): Progress {
  if (progress.completedLabs[key]) return progress;
  return { ...progress, completedLabs: { ...progress.completedLabs, [key]: now.toISOString() } };
}

export function unmarkLabCompleted(progress: Progress, key: string): Progress {
  if (!progress.completedLabs[key]) return progress;
  const completedLabs = { ...progress.completedLabs };
  delete completedLabs[key];
  return { ...progress, completedLabs };
}

export function isLabCompleted(progress: Progress, key: string): boolean {
  return Boolean(progress.completedLabs[key]);
}

export function countCompleted(progress: Progress, keys: readonly string[]): number {
  return keys.filter((key) => isLabCompleted(progress, key)).length;
}
