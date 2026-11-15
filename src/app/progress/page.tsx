import type { Metadata } from 'next';
import { ProgressOverview } from '@/components/progress/ProgressOverview';
import { container } from '@/components/ui/styles';

export const metadata: Metadata = {
  title: '我的進度',
  description: '查看已完成的實驗。進度只儲存在你的瀏覽器中。',
};

export default function ProgressPage() {
  return (
    <div className={`${container} py-10 sm:py-14`}>
      <h1 className="text-3xl font-bold sm:text-4xl">我的進度</h1>
      <p className="text-ink-muted mt-3 mb-8 max-w-2xl text-lg">
        在實驗頁面按下「標記為已完成」，就會記錄在這裡。不需要登入，紀錄也不會離開這台裝置。
      </p>
      <ProgressOverview />
    </div>
  );
}
