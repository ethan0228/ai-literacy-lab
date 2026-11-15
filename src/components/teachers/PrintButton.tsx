'use client';

import { buttonSecondary } from '@/components/ui/styles';

export function PrintButton() {
  return (
    <button
      type="button"
      className={`${buttonSecondary} print:hidden`}
      onClick={() => window.print()}
    >
      列印這份總覽
    </button>
  );
}
