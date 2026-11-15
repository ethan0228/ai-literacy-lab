'use client';

import { usePathname } from 'next/navigation';
import { useFullscreen } from '@/lib/fullscreen';
import { projectionStore, useProjection } from '@/lib/mode';

const JUMP_LINKS = [
  { href: '#experiment-heading', label: '實驗' },
  { href: '#challenge-heading', label: '挑戰' },
  { href: '#reflection-heading', label: '想一想' },
];

const barButton =
  'min-h-9 rounded-lg border border-white/40 px-3 text-sm font-semibold hover:bg-white/15';

/** 投影模式的控制列：取代頁首，提供段落跳轉、全螢幕與結束投影。 */
export function ProjectionBar() {
  const projection = useProjection();
  const fullscreen = useFullscreen();
  const onLabPage = usePathname().includes('/labs/');

  if (!projection) return null;

  return (
    <div
      role="region"
      aria-label="投影模式控制列"
      className="bg-brand-900 sticky top-0 z-30 flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 text-white"
    >
      <p className="text-sm font-bold">投影模式</p>
      {onLabPage && (
        <nav aria-label="實驗段落" className="flex gap-1">
          {JUMP_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold underline-offset-4 hover:bg-white/15 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
      <div className="ml-auto flex gap-2">
        {fullscreen.supported && (
          <button type="button" className={barButton} onClick={fullscreen.toggle}>
            {fullscreen.active ? '離開全螢幕' : '全螢幕'}
          </button>
        )}
        <button
          type="button"
          className={barButton}
          onClick={() => {
            projectionStore.set(false);
            if (fullscreen.active) fullscreen.toggle();
          }}
        >
          結束投影
        </button>
      </div>
    </div>
  );
}
