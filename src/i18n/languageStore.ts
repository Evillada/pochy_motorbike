import { translations, type Lang } from './translations';

const STORAGE_KEY = 'pochy-lang';
const listeners = new Set<() => void>();

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'es';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;
  } catch {
    // localStorage can throw under strict privacy settings (e.g. Safari's
    // "Block All Cookies") — fall through to the navigator.language check.
  }
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
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // If persisting fails, just skip it — currentLang still updates in
      // memory and subscribers are still notified below.
    }
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    document.title = translations[lang].meta.title;
  }
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
