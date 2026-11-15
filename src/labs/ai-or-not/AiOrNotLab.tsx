'use client';

import { CategorySorter } from '@/components/lab/CategorySorter';
import { SORT_ITEMS, VERDICTS } from './model';

export default function AiOrNotLab() {
  return (
    <CategorySorter
      items={SORT_ITEMS}
      categories={VERDICTS}
      question="你覺得它是哪一種？"
      finishedHint="分數不是重點——回想一下，你是用什麼線索來判斷的？到下面的「挑戰一下」整理你的想法。"
    />
  );
}
