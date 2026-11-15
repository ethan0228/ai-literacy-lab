import type { ReactNode } from 'react';

const TONES = {
  brand: 'bg-brand-50 text-brand-800 ring-brand-200',
  accent: 'bg-accent-50 text-accent-800 ring-accent-200',
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  success: 'bg-success-50 text-success-800 ring-green-200',
} as const;

export function Badge({
  tone = 'neutral',
  children,
}: {
  tone?: keyof typeof TONES;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ring-inset ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
