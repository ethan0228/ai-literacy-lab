import Link from 'next/link';
import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { card, container } from '@/components/ui/styles';
import { GRADE_BAND_LABELS, type LabContent, type LearningModule } from '@/content/types';
import { labKey } from '@/lib/progress';
import { ChallengePanel } from './ChallengePanel';
import { CompleteLabButton } from './CompleteLabButton';
import { ModelNotice } from './ModelNotice';
import { TeacherPanel } from './TeacherPanel';

interface LabShellProps {
  module: LearningModule;
  lab: LabContent;
  /** 實驗的互動元件（來自 src/labs） */
  children: ReactNode;
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className={card}>
      <h2 id={id} className="mb-4 scroll-mt-24 text-xl font-bold">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * 所有實驗共用的頁面模板：
 * 標題 → 教學模型說明 → 學習目標 → 互動實驗 → 挑戰 → 反思 → 教師指引 → 完成標記。
 */
export function LabShell({ module, lab, children }: LabShellProps) {
  return (
    <div className={`${container} space-y-6 py-8 sm:py-10`}>
      <Breadcrumbs
        items={[
          { label: '學習模組', href: '/modules' },
          { label: module.title, href: `/modules/${module.id}` },
          { label: lab.title },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">{lab.title}</h1>
        <p className="text-ink-muted mt-3 max-w-3xl text-lg">{lab.summary}</p>
        <div className="projection:hidden mt-4 flex flex-wrap gap-2">
          <Badge tone="brand">約 {lab.durationMinutes} 分鐘</Badge>
          {lab.gradeBands.map((band) => (
            <Badge key={band}>{GRADE_BAND_LABELS[band]}</Badge>
          ))}
        </div>
      </header>

      <ModelNotice>{lab.modelNotice}</ModelNotice>

      <Section id="objectives-heading" title="學習目標">
        <ul className="list-disc space-y-1 pl-5">
          {lab.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </Section>

      <Section id="experiment-heading" title="互動實驗">
        {children}
      </Section>

      {lab.challenge && (
        <Section id="challenge-heading" title="挑戰一下">
          <ChallengePanel challenge={lab.challenge} />
        </Section>
      )}

      <Section id="reflection-heading" title="想一想">
        <ol className="list-decimal space-y-2 pl-5">
          {lab.reflections.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </Section>

      <TeacherPanel guide={lab.teacherGuide} />

      <div className="projection:hidden flex flex-wrap items-center justify-between gap-4">
        <CompleteLabButton labKey={labKey(lab.moduleId, lab.id)} />
        <Link
          href={`/modules/${module.id}`}
          className="text-brand-800 py-2 font-semibold underline underline-offset-4"
        >
          回到「{module.title}」
        </Link>
      </div>
    </div>
  );
}
