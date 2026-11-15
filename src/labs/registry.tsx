import dynamic from 'next/dynamic';
import type { ComponentType, ReactNode } from 'react';

function LabLoading() {
  return <p className="text-ink-muted">實驗載入中…</p>;
}

/**
 * labKey（`moduleId/labId`）→ 互動元件。
 * 以動態載入分割程式碼，每個實驗只在自己的頁面下載。
 */
const LAB_COMPONENTS: Record<string, ComponentType> = {
  'ai-basics/ai-or-not': dynamic(() => import('./ai-or-not/AiOrNotLab'), { loading: LabLoading }),
  'ai-basics/ai-family-map': dynamic(() => import('./ai-family-map/AiFamilyMapLab'), {
    loading: LabLoading,
  }),
  'machine-learning/train-a-classifier': dynamic(
    () => import('./train-a-classifier/TrainClassifierLab'),
    { loading: LabLoading },
  ),
  'machine-learning/biased-data': dynamic(() => import('./biased-data/BiasedDataLab'), {
    loading: LabLoading,
  }),
  'generative-ai/next-word': dynamic(() => import('./next-word/NextWordLab'), {
    loading: LabLoading,
  }),
  'generative-ai/randomness-dial': dynamic(() => import('./randomness-dial/RandomnessDialLab'), {
    loading: LabLoading,
  }),
  'prompt-design/prompt-builder': dynamic(() => import('./prompt-builder/PromptBuilderLab'), {
    loading: LabLoading,
  }),
  'prompt-design/prompt-makeover': dynamic(() => import('./prompt-makeover/PromptMakeoverLab'), {
    loading: LabLoading,
  }),
  'ai-trust/spot-the-error': dynamic(() => import('./spot-the-error/SpotTheErrorLab'), {
    loading: LabLoading,
  }),
  'ai-trust/source-check': dynamic(() => import('./source-check/SourceCheckLab'), {
    loading: LabLoading,
  }),
  'ai-ethics/dilemma-cards': dynamic(() => import('./dilemma-cards/DilemmaCardsLab'), {
    loading: LabLoading,
  }),
  'ai-ethics/fairness-check': dynamic(() => import('./fairness-check/FairnessCheckLab'), {
    loading: LabLoading,
  }),
};

export const REGISTERED_LAB_KEYS: readonly string[] = Object.keys(LAB_COMPONENTS);

/** 回傳實驗的互動元件；尚未登錄時回傳 undefined。 */
export function renderLab(key: string): ReactNode | undefined {
  const Experiment = LAB_COMPONENTS[key];
  return Experiment ? <Experiment /> : undefined;
}
