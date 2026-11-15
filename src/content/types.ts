/** 教學內容的資料模型。內容（src/content）與互動程式（src/labs）分離。 */

export const MODULE_IDS = [
  'ai-basics',
  'machine-learning',
  'generative-ai',
  'prompt-design',
  'ai-trust',
  'ai-ethics',
] as const;
export type ModuleId = (typeof MODULE_IDS)[number];

export type GradeBand = 'upper-elementary' | 'junior-high';

export const GRADE_BAND_LABELS: Record<GradeBand, string> = {
  'upper-elementary': '國小高年級',
  'junior-high': '國中',
};

/** 已規劃、尚未開放的實驗。 */
export interface PlannedLab {
  id: string;
  title: string;
  summary: string;
}

export interface LearningModule {
  id: ModuleId;
  order: number;
  title: string;
  tagline: string;
  description: string;
  /** 貫穿模組的核心提問 */
  bigQuestion: string;
  objectives: string[];
  /** 教師模式顯示的教學重點 */
  teacherFocus: string[];
  plannedLabs: PlannedLab[];
}

export interface ChallengeOption {
  id: string;
  label: string;
  isCorrect: boolean;
  /** 選擇後立即顯示的回饋 */
  feedback: string;
}

export interface Challenge {
  id: string;
  prompt: string;
  options: ChallengeOption[];
}

export interface Misconception {
  myth: string;
  fact: string;
}

export interface TeacherGuide {
  flow: string[];
  discussion: string[];
  misconceptions: Misconception[];
}

/** 已開放實驗的完整教學內容。 */
export interface LabContent {
  moduleId: ModuleId;
  id: string;
  title: string;
  summary: string;
  durationMinutes: number;
  gradeBands: GradeBand[];
  objectives: string[];
  /** 必填：說明此互動是簡化的教學模型，以及它省略了什麼。 */
  modelNotice: string;
  challenge?: Challenge;
  reflections: string[];
  teacherGuide: TeacherGuide;
}
