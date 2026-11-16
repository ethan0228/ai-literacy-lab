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
 * 標題 → 教學模型說明（精簡）→ 互動實驗 → 挑戰 → 反思 → 學習目標（收合）→ 教師指引 → 完成標記。
 * 互動優先：實驗要盡量出現在第一個畫面，說明文字精簡或收合。
 */
export function LabShell({ module, lab, children }: LabShellProps) {
  return (
    <div className={`${container} space-y-5 py-6 sm:py-8`}>
      <Breadcrumbs
        items={[
          { label: '學習模組', href: '/modules' },
          { label: module.title, href: `/modules/${module.id}` },
          { label: lab.title },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">{lab.title}</h1>
        <p className="text-ink-muted mt-2 max-w-3xl text-lg">{lab.summary}</p>
        <div className="projection:hidden mt-3 flex flex-wrap gap-2">
          <Badge tone="brand">約 {lab.durationMinutes} 分鐘</Badge>
          {lab.gradeBands.map((band) => (
            <Badge key={band}>{GRADE_BAND_LABELS[band]}</Badge>
          ))}
        </div>
      </header>

      <ModelNotice>{lab.modelNotice}</ModelNotice>

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

      <details className={`${card} group`}>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
          <h2 id="objectives-heading" className="text-xl font-bold">
            學習目標
          </h2>
          <span
            aria-hidden="true"
            className="text-ink-muted text-sm font-semibold group-open:hidden"
          >
            展開
          </span>
          <span
            aria-hidden="true"
            className="text-ink-muted hidden text-sm font-semibold group-open:inline"
          >
            收合
          </span>
        </summary>
        <ul className="mt-4 list-disc space-y-1 pl-5">
          {lab.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </details>

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
