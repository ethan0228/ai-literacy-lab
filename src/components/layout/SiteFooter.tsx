import Link from 'next/link';
import { container } from '@/components/ui/styles';

export function SiteFooter() {
  return (
    <footer className="border-line projection:hidden mt-16 border-t bg-white print:hidden">
      <div className={`${container} text-ink-muted space-y-1 py-8 text-sm`}>
        <p className="text-ink font-semibold">AI Literacy Lab｜AI 素養互動實驗室</p>
        <p>本站不需註冊或登入；學習進度只儲存在你的瀏覽器，不會上傳或蒐集個人資料。</p>
        <nav aria-label="頁尾導覽" className="flex flex-wrap gap-x-5 py-1">
          <Link
            href="/about"
            className="text-brand-800 py-1 font-medium underline underline-offset-4"
          >
            關於本站與隱私說明
          </Link>
          <Link
            href="/teachers"
            className="text-brand-800 py-1 font-medium underline underline-offset-4"
          >
            教師資源
          </Link>
        </nav>
        <p>站內互動皆為簡化的教學模型，用來幫助理解概念，並不代表真實 AI 系統的完整運作方式。</p>
      </div>
    </footer>
  );
}
