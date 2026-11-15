import { describe, expect, it, vi } from 'vitest';
import { createLocalStore } from './local-store';

function makeStore(key = 'test:value') {
  return createLocalStore<number>({
    key,
    fallback: 0,
    parse: (raw) => (typeof raw === 'number' ? raw : undefined),
  });
}

describe('createLocalStore', () => {
  it('沒有資料時回傳 fallback', () => {
    expect(makeStore().get()).toBe(0);
  });

  it('寫入後可讀回，並保存到 localStorage', () => {
    const store = makeStore();
    store.set(3);
    expect(store.get()).toBe(3);
    expect(window.localStorage.getItem('test:value')).toBe('3');
  });

  it('支援以函式更新', () => {
    const store = makeStore();
    store.set(1);
    store.set((previous) => previous + 1);
    expect(store.get()).toBe(2);
  });

  it('資料格式不合法或 JSON 損毀時回傳 fallback', () => {
    window.localStorage.setItem('test:value', '"not a number"');
    expect(makeStore().get()).toBe(0);
    window.localStorage.setItem('test:value', '{broken');
    expect(makeStore().get()).toBe(0);
  });

  it('變更時通知訂閱者，取消訂閱後不再通知', () => {
    const store = makeStore();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    store.set(1);
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    store.set(2);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('reset 會清除資料', () => {
    const store = makeStore();
    store.set(5);
    store.reset();
    expect(store.get()).toBe(0);
    expect(window.localStorage.getItem('test:value')).toBeNull();
  });

  it('物件值在未變更時維持相同參考（useSyncExternalStore 的要求）', () => {
    const store = createLocalStore<{ n: number }>({
      key: 'test:object',
      fallback: { n: 0 },
      parse: (raw) => raw as { n: number },
    });
    store.set({ n: 1 });
    expect(store.get()).toBe(store.get());
  });

  it('localStorage 無法使用時退回記憶體', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    const store = makeStore('test:blocked');
    expect(store.get()).toBe(0);
    store.set(7);
    expect(store.get()).toBe(7);
    spy.mockRestore();
  });

  it('伺服器快照一律為 fallback', () => {
    const store = makeStore();
    store.set(9);
    expect(store.getServerSnapshot()).toBe(0);
  });
});
