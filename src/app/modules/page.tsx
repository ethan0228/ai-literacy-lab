import type { Metadata } from 'next';
import { ModuleGrid } from '@/components/modules/ModuleGrid';
import { container } from '@/components/ui/styles';

export const metadata: Metadata = {
  title: '學習模組',
  description: 'AI 素養互動實驗室的六大學習模組。',
};

export default function ModulesPage() {
  return (
    <div className={`${container} py-10 sm:py-14`}>
      <h1 className="text-3xl font-bold sm:text-4xl">學習模組</h1>
      <p className="text-ink-muted mt-3 mb-8 max-w-2xl text-lg">
        六個模組涵蓋 AI 的基本概念、運作原理、實際應用與社會影響。每個模組都由數個互動實驗組成。
      </p>
      <ModuleGrid />
    </div>
  );
}
