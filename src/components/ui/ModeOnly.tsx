'use client';

import type { ReactNode } from 'react';
import { type Mode, useMode } from '@/lib/mode';

/** 只在指定模式下顯示內容。 */
export function ModeOnly({ mode, children }: { mode: Mode; children: ReactNode }) {
  return useMode() === mode ? <>{children}</> : null;
}
