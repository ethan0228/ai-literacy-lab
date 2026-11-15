import { useSyncExternalStore } from 'react';

function subscribe(listener: () => void): () => void {
  document.addEventListener('fullscreenchange', listener);
  return () => document.removeEventListener('fullscreenchange', listener);
}

const noopSubscribe = () => () => {};

/** 全螢幕狀態與切換。不支援全螢幕的瀏覽器（例如 iPhone 的 Safari）supported 為 false。 */
export function useFullscreen(): { supported: boolean; active: boolean; toggle: () => void } {
  const active = useSyncExternalStore(
    subscribe,
    () => document.fullscreenElement !== null,
    () => false,
  );
  const supported = useSyncExternalStore(
    noopSubscribe,
    () => document.fullscreenEnabled === true,
    () => false,
  );

  function toggle() {
    // 使用者拒絕或瀏覽器不允許時會 reject：全螢幕只是輔助功能，失敗時維持原狀即可
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void document.documentElement.requestFullscreen().catch(() => {});
  }

  return { supported, active, toggle };
}
