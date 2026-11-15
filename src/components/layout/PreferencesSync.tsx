'use client';

import { useEffect } from 'react';
import { useMode, useProjection } from '@/lib/mode';

/** 把模式與投影狀態同步到 <html> 的 data 屬性，供 CSS 使用。 */
export function PreferencesSync() {
  const mode = useMode();
  const projection = useProjection();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.mode = mode;
    root.dataset.projection = String(projection);
  }, [mode, projection]);

  return null;
}
