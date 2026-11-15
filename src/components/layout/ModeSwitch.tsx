'use client';

import { MODE_LABELS, MODES, modeStore, useMode } from '@/lib/mode';

export function ModeSwitch() {
  const mode = useMode();

  return (
    <div
      role="group"
      aria-label="使用模式"
      className="border-line inline-flex rounded-full border bg-slate-100 p-1"
    >
      {MODES.map((option) => {
        const selected = option === mode;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => modeStore.set(option)}
            className={`min-h-9 rounded-full px-3 text-sm font-semibold transition-colors sm:px-4 ${
              selected
                ? option === 'teacher'
                  ? 'bg-accent-700 text-white'
                  : 'bg-brand-700 text-white'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {MODE_LABELS[option]}
          </button>
        );
      })}
    </div>
  );
}
