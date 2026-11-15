import { describe, expect, it } from 'vitest';
import { REGISTERED_LAB_KEYS } from '@/labs/registry';
import { labKey } from '@/lib/progress';
import { getLab, getLabsForModule, getModule, LABS, MODULES } from './index';
import { MODULE_IDS } from './types';

describe('教學內容完整性', () => {
  it('恰有六個模組，代號與順序正確且不重複', () => {
    expect(MODULES.map((module) => module.id)).toEqual([...MODULE_IDS]);
    expect(MODULES.map((module) => module.order)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('每個模組都有必要的教學資訊', () => {
    for (const learningModule of MODULES) {
      expect(learningModule.title).not.toBe('');
      expect(learningModule.bigQuestion).not.toBe('');
      expect(learningModule.objectives.length).toBeGreaterThan(0);
      expect(learningModule.teacherFocus.length).toBeGreaterThan(0);
    }
  });

  it('每個實驗都屬於存在的模組，且代號不與規劃中的實驗重複', () => {
    for (const lab of LABS) {
      const learningModule = getModule(lab.moduleId);
      expect(learningModule).toBeDefined();
      expect(learningModule?.plannedLabs.map((planned) => planned.id)).not.toContain(lab.id);
    }
    const keys = LABS.map((lab) => labKey(lab.moduleId, lab.id));
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('每個實驗都有教學模型說明、目標、反思與教師指引', () => {
    for (const lab of LABS) {
      expect(lab.modelNotice.length).toBeGreaterThan(20);
      expect(lab.objectives.length).toBeGreaterThan(0);
      expect(lab.reflections.length).toBeGreaterThan(0);
      expect(lab.teacherGuide.flow.length).toBeGreaterThan(0);
    }
  });

  it('每個挑戰題恰有一個正確答案，且每個選項都有回饋', () => {
    for (const lab of LABS) {
      if (!lab.challenge) continue;
      expect(lab.challenge.options.filter((option) => option.isCorrect)).toHaveLength(1);
      for (const option of lab.challenge.options) expect(option.feedback).not.toBe('');
    }
  });

  it('內容與互動元件一一對應', () => {
    expect([...REGISTERED_LAB_KEYS].sort()).toEqual(
      LABS.map((lab) => labKey(lab.moduleId, lab.id)).sort(),
    );
  });

  it('六個模組各有兩個已開放的實驗', () => {
    for (const learningModule of MODULES) {
      expect(getLabsForModule(learningModule.id)).toHaveLength(2);
    }
  });

  it('查詢函式', () => {
    expect(getLab('ai-basics', 'ai-or-not')?.title).toBe('是 AI，還是固定規則？');
    expect(getLab('ai-basics', 'nope')).toBeUndefined();
    expect(getLabsForModule('nope')).toEqual([]);
    expect(getModule('nope')).toBeUndefined();
  });
});
