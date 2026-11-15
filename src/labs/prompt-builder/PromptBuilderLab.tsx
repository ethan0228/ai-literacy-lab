'use client';

import { useState } from 'react';
import { buttonSecondary } from '@/components/ui/styles';
import { assemblePrompt, type BlockId, BLOCKS, reviewPrompt } from './model';

export default function PromptBuilderLab() {
  const [selected, setSelected] = useState<ReadonlySet<BlockId>>(new Set());
  const review = reviewPrompt(selected);
  const prompt = assemblePrompt(selected);

  function toggle(id: BlockId) {
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <fieldset>
        <legend className="font-semibold">
          任務情境：自然課要報告「水循環」。選擇要放進提示詞的積木：
        </legend>
        <div className="mt-3 grid gap-2">
          {BLOCKS.map((block) => {
            const checked = selected.has(block.id);
            return (
              <label
                key={block.id}
                className={`has-focus-visible:outline-accent-600 flex cursor-pointer gap-3 rounded-xl border-2 p-3 transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 ${
                  checked ? 'border-brand-700 bg-brand-50' : 'border-line bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(block.id)}
                  aria-label={`${block.kind}積木`}
                  className="accent-brand-700 mt-1 size-5 shrink-0 outline-none"
                />
                <span>
                  <span className="font-bold">{block.kind}</span>
                  <span className="text-ink-muted ml-2 text-sm">{block.question}</span>
                  <span className="mt-1 block">{block.text}</span>
                </span>
              </label>
            );
          })}
        </div>
        <button
          type="button"
          className={`${buttonSecondary} mt-3`}
          aria-disabled={selected.size === 0}
          onClick={() => setSelected(new Set())}
        >
          全部拿掉
        </button>
      </fieldset>

      <div className="space-y-4">
        <div>
          <p className="font-semibold">組合出來的提示詞</p>
          <p
            data-testid="assembled-prompt"
            className="border-line bg-canvas mt-2 min-h-28 rounded-xl border p-4 whitespace-pre-line"
          >
            {prompt || <span className="text-ink-muted">（還沒有放入任何積木）</span>}
          </p>
        </div>

        <div aria-live="polite" data-testid="prompt-review" className="space-y-3">
          <p className="font-semibold">
            檢查清單：已包含 {review.included} / {review.total} 種資訊
          </p>
          {review.privacyWarning && (
            <p
              data-testid="privacy-warning"
              className="animate-reveal border-accent-600 bg-accent-50 text-accent-800 rounded-xl border-2 p-4 font-medium"
            >
              <strong>注意隱私！</strong>
              {review.privacyWarning}
            </p>
          )}
          {review.complete && (
            <p className="animate-reveal bg-success-50 text-success-800 rounded-xl p-4 font-medium">
              這份提示詞把角色、背景、任務、格式和限制都說清楚了，而且沒有多餘的個人資料。
            </p>
          )}
          {review.missing.length > 0 && (
            <ul className="space-y-2">
              {review.missing.map((item) => (
                <li key={item.id} className="bg-canvas rounded-xl p-3">
                  <span className="font-bold">還沒有「{item.kind}」</span>
                  <span className="text-ink-muted block">{item.note}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
