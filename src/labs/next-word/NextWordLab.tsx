'use client';

import { useState } from 'react';
import { buttonPrimary, buttonSecondary } from '@/components/ui/styles';
import { ProbabilityBars } from '@/components/viz/ProbabilityBars';
import { candidatesAfter, START } from '@/lib/ml/bigram';
import {
  CORPUS,
  END_WORD,
  isInCorpus,
  joinWords,
  MAX_WORDS,
  STORY_MODEL,
} from '@/labs/shared/story-corpus';

export default function NextWordLab() {
  const [words, setWords] = useState<readonly string[]>([]);

  const last = words.at(-1);
  const candidates = candidatesAfter(STORY_MODEL, last ?? START);
  const finished = last === END_WORD || words.length >= MAX_WORDS || candidates.length === 0;
  const append = (word: string) => setWords((previous) => [...previous, word]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <p className="font-semibold">目前的句子</p>
        <p
          aria-live="polite"
          data-testid="sentence"
          className="border-line bg-canvas mt-2 flex min-h-16 flex-wrap items-center gap-2 rounded-xl border p-4 text-2xl font-bold"
        >
          {words.length === 0 ? (
            <span className="text-ink-muted text-base font-normal">（還沒有任何詞）</span>
          ) : (
            words.map((word, index) => (
              <span key={index} className="rounded-lg bg-white px-2 py-1 shadow-sm">
                {word}
              </span>
            ))
          )}
        </p>

        {finished && (
          <div
            data-testid="sentence-verdict"
            className={`animate-reveal mt-4 rounded-xl p-4 ${
              isInCorpus(words) ? 'bg-brand-50 text-brand-900' : 'bg-accent-50 text-accent-800'
            }`}
          >
            <p className="font-bold">「{joinWords(words)}」</p>
            <p className="mt-1">
              {isInCorpus(words)
                ? '這個句子在範例句子裡出現過，模型把它重新接了出來。'
                : '範例句子裡沒有這一句！它是模型把看過的片段重新組合出來的新句子。讀起來通順，但內容不一定是真的。'}
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className={buttonPrimary}
            aria-disabled={finished}
            onClick={() => {
              const top = candidates[0];
              if (!finished && top) append(top.word);
            }}
          >
            選機率最高的
          </button>
          <button
            type="button"
            className={buttonSecondary}
            aria-disabled={words.length === 0}
            onClick={() => setWords([])}
          >
            重新開始
          </button>
        </div>

        <details className="border-line mt-5 rounded-xl border p-4">
          <summary className="cursor-pointer font-semibold">
            看看模型讀過的 {CORPUS.length} 個範例句子
          </summary>
          <ol className="text-ink-muted mt-3 list-decimal space-y-1 pl-6">
            {CORPUS.map((sentence) => (
              <li key={joinWords(sentence)}>{joinWords(sentence)}</li>
            ))}
          </ol>
        </details>
      </div>

      <div>
        {finished ? (
          <p className="bg-canvas text-ink-muted rounded-xl p-4">
            句子完成了。按「重新開始」再接一句，試試看能不能接出範例裡沒有的句子。
          </p>
        ) : (
          <>
            <p className="font-semibold">
              {last === undefined
                ? '範例句子的第一個詞出現過：'
                : `在範例句子裡，「${last}」的後面出現過：`}
            </p>
            <p className="text-ink-muted mt-1 mb-3 text-sm">
              選一個詞接下去。長條越長，代表它在範例中越常出現在這個位置。
            </p>
            <ProbabilityBars items={candidates} onSelect={append} label="下一個詞的候選" />
          </>
        )}
      </div>
    </div>
  );
}
