import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LabShell } from '@/components/lab/LabShell';
import { getLab, getModule, LABS } from '@/content';
import { renderLab } from '@/labs/registry';
import { labKey } from '@/lib/progress';

interface PageProps {
  params: Promise<{ moduleId: string; labId: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LABS.map((lab) => ({ moduleId: lab.moduleId, labId: lab.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { moduleId, labId } = await params;
  const lab = getLab(moduleId, labId);
  return lab ? { title: lab.title, description: lab.summary } : {};
}

export default async function LabPage({ params }: PageProps) {
  const { moduleId, labId } = await params;
  const learningModule = getModule(moduleId);
  const lab = getLab(moduleId, labId);
  const experiment = renderLab(labKey(moduleId, labId));
  if (!learningModule || !lab || !experiment) notFound();

  return (
    <LabShell module={learningModule} lab={lab}>
      {experiment}
    </LabShell>
  );
}
