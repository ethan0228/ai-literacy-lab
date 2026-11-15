/** 共用的 class 組合，避免在各元件重複。 */
export const buttonBase =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-base font-semibold transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-60 aria-pressed:border-brand-700 aria-pressed:opacity-100';

export const buttonPrimary = `${buttonBase} bg-brand-700 text-white hover:bg-brand-800`;

export const buttonSecondary = `${buttonBase} border border-slate-300 bg-white text-ink hover:border-brand-600 hover:text-brand-800`;

export const card = 'rounded-2xl border border-line bg-surface p-6 shadow-sm';

export const container = 'mx-auto w-full max-w-6xl px-4 sm:px-6';
