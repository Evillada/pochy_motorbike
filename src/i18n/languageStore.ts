import type { Lang } from './translations';

const STORAGE_KEY = 'pochy-lang';
const listeners = new Set<() => void>();

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'es';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'es' || stored === 'en') return stored;
  return window.navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
}

let currentLang: Lang = readInitialLang();

export function getLang(): Lang {
  return currentLang;
}

/** Snapshot used during SSR / before hydration — always "es" to match the server-rendered HTML. */
export function getServerLang(): Lang {
  return 'es';
}

export function setLang(lang: Lang): void {
  if (lang === currentLang) return;
  currentLang = lang;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, lang);
  }
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
