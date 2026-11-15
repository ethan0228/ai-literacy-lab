/** 每個實驗都必須顯示：說明互動是簡化的教學模型。 */
export function ModelNotice({ children }: { children: string }) {
  return (
    <aside
      role="note"
      aria-label="教學模型說明"
      className="border-accent-200 bg-accent-50 text-accent-800 flex gap-3 rounded-xl border p-4"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
        className="mt-0.5 size-6 shrink-0"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 7.5v.5" />
      </svg>
      <p>
        <strong className="font-bold">這是教學模型。</strong>
        {children}
      </p>
    </aside>
  );
}
