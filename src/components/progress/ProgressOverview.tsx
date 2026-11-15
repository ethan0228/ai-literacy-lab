'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ModuleIcon } from '@/components/modules/ModuleIcon';
import { buttonPrimary, buttonSecondary, card } from '@/components/ui/styles';
import { getLabsForModule, LABS, MODULES } from '@/content';
import { countCompleted, labKey } from '@/lib/progress';
import { progressStore, useProgress } from '@/lib/progress-store';

const dateFormat = new Intl.DateTimeFormat('zh-TW', { dateStyle: 'long' });

function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '' : dateFormat.format(date);
}

const ALL_KEYS = LABS.map((lab) => labKey(lab.moduleId, lab.id));

export function ProgressOverview() {
  const progress = useProgress();
  const [confirming, setConfirming] = useState(false);

  const done = countCompleted(progress, ALL_KEYS);
  const next = LABS.find((lab) => !progress.completedLabs[labKey(lab.moduleId, lab.id)]);

  return (
    <div className="space-y-8">
      <section aria-labelledby="summary-heading" className={card}>
        <h2 id="summary-heading" className="text-xl font-bold">
          整體進度
        </h2>
        <p className="mt-2 text-lg" data-testid="progress-summary">
          已完成 <strong>{done}</strong> / {ALL_KEYS.length} 個實驗
        </p>
        <div
          role="progressbar"
          aria-label="整體進度"
          aria-valuemin={0}
          aria-valuemax={ALL_KEYS.length}
          aria-valuenow={done}
          className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200"
        >
          <div
            className="bg-success-700 h-full rounded-full transition-[width] duration-500"
            style={{ width: `${(done / ALL_KEYS.length) * 100}%` }}
          />
        </div>
        {next ? (
          <p className="mt-4">
            建議接著做：
            <Link
              href={`/modules/${next.moduleId}/labs/${next.id}`}
              className="text-brand-800 font-semibold underline underline-offset-4"
            >
              {next.title}
            </Link>
          </p>
        ) : (
          <p className="text-success-800 mt-4 font-semibold">全部的實驗都完成了，太棒了！</p>
        )}
      </section>

      {MODULES.map((learningModule) => {
        const labs = getLabsForModule(learningModule.id);
        return (
          <section key={learningModule.id} aria-labelledby={`progress-${learningModule.id}`}>
            <h2
              id={`progress-${learningModule.id}`}
              className="flex items-center gap-2 text-xl font-bold"
            >
              <ModuleIcon moduleId={learningModule.id} className="text-brand-700 size-6" />
              模組 {learningModule.order}：{learningModule.title}
            </h2>
            <ul className="divide-line border-line bg-surface mt-3 divide-y rounded-2xl border">
              {labs.map((lab) => {
                const completedAt = progress.completedLabs[labKey(lab.moduleId, lab.id)];
                return (
                  <li
                    key={lab.id}
                    className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3"
                  >
                    <Link
                      href={`/modules/${lab.moduleId}/labs/${lab.id}`}
                      className="text-brand-800 py-1 font-semibold underline underline-offset-4"
                    >
                      {lab.title}
                    </Link>
                    {completedAt ? (
                      <span className="text-success-800 font-medium">
                        ✓ 已完成{formatDate(completedAt) && `（${formatDate(completedAt)}）`}
                      </span>
                    ) : (
                      <span className="text-ink-muted">尚未完成</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <section aria-labelledby="reset-heading" className={card}>
        <h2 id="reset-heading" className="text-xl font-bold">
          清除進度
        </h2>
        <p className="text-ink-muted mt-2">
          進度只儲存在這台裝置的這個瀏覽器裡。使用共用電腦時，可以在離開前清除。
        </p>
        <div aria-live="polite" className="mt-4 flex flex-wrap items-center gap-3">
          {confirming ? (
            <>
              <p className="text-accent-800 w-full font-semibold">確定要清除嗎？清除後無法復原。</p>
              <button
                type="button"
                className={buttonPrimary}
                onClick={() => {
                  progressStore.reset();
                  setConfirming(false);
                }}
              >
                確定清除
              </button>
              <button
                type="button"
                className={buttonSecondary}
                onClick={() => setConfirming(false)}
              >
                取消
              </button>
            </>
          ) : (
            <button
              type="button"
              className={buttonSecondary}
              aria-disabled={done === 0}
              onClick={() => {
                if (done > 0) setConfirming(true);
              }}
            >
              清除所有進度
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
