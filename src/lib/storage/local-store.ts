import { useSyncExternalStore } from 'react';

/**
 * 以 localStorage 為後端的極簡外部狀態庫。
 * - 伺服器端與首次 hydration 一律回傳 fallback，避免 hydration 不一致。
 * - localStorage 無法使用（隱私模式、被停用）時自動退回記憶體，網站功能不受影響。
 * - 資料只留在使用者的瀏覽器，不會傳送到任何伺服器。
 */
export interface LocalStoreOptions<T> {
  key: string;
  fallback: T;
  /** 驗證並轉換未知資料；不合法時回傳 undefined 以使用 fallback。 */
  parse: (raw: unknown) => T | undefined;
}

export interface LocalStore<T> {
  get: () => T;
  set: (next: T | ((previous: T) => T)) => void;
  reset: () => void;
  subscribe: (listener: () => void) => () => void;
  getServerSnapshot: () => T;
}

export function createLocalStore<T>({ key, fallback, parse }: LocalStoreOptions<T>): LocalStore<T> {
  const listeners = new Set<() => void>();
  let memoryRaw: string | null = null;
  let useMemory = false;
  let cachedRaw: string | null | undefined;
  let cachedValue: T = fallback;

  function readRaw(): string | null {
    if (useMemory) return memoryRaw;
    try {
      return window.localStorage.getItem(key);
    } catch {
      useMemory = true;
      return memoryRaw;
    }
  }

  function decode(raw: string | null): T {
    if (raw === null) return fallback;
    try {
      return parse(JSON.parse(raw)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function get(): T {
    if (typeof window === 'undefined') return fallback;
    const raw = readRaw();
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedValue = decode(raw);
    }
    return cachedValue;
  }

  function notify(): void {
    listeners.forEach((listener) => listener());
  }

  function writeRaw(raw: string | null): void {
    memoryRaw = raw;
    if (!useMemory) {
      try {
        if (raw === null) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, raw);
      } catch {
        useMemory = true;
      }
    }
    notify();
  }

  function set(next: T | ((previous: T) => T)): void {
    const value = typeof next === 'function' ? (next as (previous: T) => T)(get()) : next;
    writeRaw(JSON.stringify(value));
  }

  function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) listener();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  }

  return { get, set, reset: () => writeRaw(null), subscribe, getServerSnapshot: () => fallback };
}

export function useLocalStore<T>(store: LocalStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.getServerSnapshot);
}
