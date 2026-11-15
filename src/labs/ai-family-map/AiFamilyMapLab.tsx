'use client';

import { CategorySorter } from '@/components/lab/CategorySorter';
import { FAMILIES, FAMILY_ITEMS } from './model';

export default function AiFamilyMapLab() {
  return (
    <CategorySorter
      items={FAMILY_ITEMS}
      categories={FAMILIES}
      question="它主要在做哪一件事？"
      finishedHint="想一想：有沒有哪個應用其實同時用到兩個家族？到下面的「挑戰一下」再試一題。"
    />
  );
}
