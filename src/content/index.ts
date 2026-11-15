import { aiFamilyMapLab } from './labs/ai-family-map';
import { aiOrNotLab } from './labs/ai-or-not';
import { biasedDataLab } from './labs/biased-data';
import { dilemmaCardsLab } from './labs/dilemma-cards';
import { fairnessCheckLab } from './labs/fairness-check';
import { nextWordLab } from './labs/next-word';
import { promptBuilderLab } from './labs/prompt-builder';
import { promptMakeoverLab } from './labs/prompt-makeover';
import { randomnessDialLab } from './labs/randomness-dial';
import { sourceCheckLab } from './labs/source-check';
import { spotTheErrorLab } from './labs/spot-the-error';
import { trainAClassifierLab } from './labs/train-a-classifier';
import { MODULES } from './modules';
import type { LabContent, LearningModule } from './types';

export { MODULES };

/** 已開放的實驗。新增實驗時：加入內容檔 → 在此登錄 → 在 src/labs/registry.tsx 登錄互動元件。 */
export const LABS: readonly LabContent[] = [
  aiOrNotLab,
  aiFamilyMapLab,
  trainAClassifierLab,
  biasedDataLab,
  nextWordLab,
  randomnessDialLab,
  promptBuilderLab,
  promptMakeoverLab,
  spotTheErrorLab,
  sourceCheckLab,
  dilemmaCardsLab,
  fairnessCheckLab,
];

export function getModule(moduleId: string): LearningModule | undefined {
  return MODULES.find((module) => module.id === moduleId);
}

export function getLabsForModule(moduleId: string): LabContent[] {
  return LABS.filter((lab) => lab.moduleId === moduleId);
}

export function getLab(moduleId: string, labId: string): LabContent | undefined {
  return LABS.find((lab) => lab.moduleId === moduleId && lab.id === labId);
}
