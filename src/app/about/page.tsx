import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { card, container } from '@/components/ui/styles';

export const metadata: Metadata = {
  title: '關於本站與隱私說明',
  description: 'AI 素養互動實驗室的目的、隱私做法與教學模型聲明。',
};

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className={card}>
      <h2 id={id} className="text-xl font-bold">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

const STORED = [
  { key: 'ail:mode:v1', what: '你選擇的是學生模式還是教師模式' },
  { key: 'ail:projection:v1', what: '教師是否開啟了投影模式' },
  { key: 'ail:progress:v1', what: '哪些實驗被標記為已完成，以及完成的時間' },
];

export default function AboutPage() {
  return (
    <div className={`${container} max-w-3xl space-y-6 py-10 sm:py-14`}>
      <h1 className="text-3xl font-bold sm:text-4xl">關於本站與隱私說明</h1>

      <Block id="purpose-heading" title="這個網站在做什麼">
        <p>
          AI 素養互動實驗室（AI Literacy
          Lab）為國小高年級與國中學生設計，透過可以動手操作的小實驗，認識 AI
          能做什麼、不能做什麼，以及怎麼負責任地使用它。教師可以切換到教師模式，直接在課堂上使用。
        </p>
      </Block>

      <Block id="privacy-heading" title="隱私：我們不蒐集你的資料">
        <ul className="list-disc space-y-1 pl-5">
          <li>不需要註冊或登入，也不會詢問姓名、學校或任何聯絡方式。</li>
          <li>沒有使用分析、廣告或追蹤工具，也不會載入其他網站的資源。</li>
          <li>你在實驗中的作答不會被儲存或傳送，重新整理頁面就會消失。</li>
        </ul>
        <p>
          為了記住你的設定，以下三項資料會儲存在你這台裝置的瀏覽器裡（localStorage），不會傳送到任何地方：
        </p>
        <ul className="space-y-2">
          {STORED.map((item) => (
            <li key={item.key} className="bg-canvas rounded-lg px-3 py-2">
              <code className="font-mono text-sm">{item.key}</code>
              <span className="block">{item.what}</span>
            </li>
          ))}
        </ul>
        <p>
          想要清除，可以到
          <Link
            href="/progress"
            className="text-brand-800 font-semibold underline underline-offset-4"
          >
            「我的進度」
          </Link>
          頁面按「清除所有進度」，或在瀏覽器設定中清除這個網站的資料。
        </p>
      </Block>

      <Block id="model-heading" title="教學模型聲明">
        <p>
          站上所有的互動都是為了教學而簡化的模型，在你的瀏覽器中執行，沒有連接任何真實的 AI
          服務。它們用來幫助理解概念，並不代表真實 AI 系統（例如大型語言模型）的完整運作方式。
        </p>
        <p>
          部分實驗中的「AI
          回答」、資訊來源與測試數據，是事先寫好或虛構的示範內容，有些還刻意包含錯誤，用來練習查證。這些地方在畫面上都有標示。
        </p>
      </Block>

      <Block id="a11y-heading" title="無障礙">
        <p>
          本站以 WCAG 2.1 AA
          為目標：所有功能都可以用鍵盤操作，圖表都有對應的文字說明，並會依照系統的「減少動態效果」設定關閉動畫。如果你在使用上遇到困難，請告訴提供這個網站給你的老師或單位。
        </p>
      </Block>
    </div>
  );
}
