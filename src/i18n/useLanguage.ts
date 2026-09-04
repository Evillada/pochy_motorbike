import { useSyncExternalStore } from 'react';
import { getLang, getServerLang, setLang, subscribe } from './languageStore';
import { translations, type Translations } from './translations';

export interface UseLanguageResult {
  lang: 'es' | 'en';
  setLang: typeof setLang;
  t: Translations;
}

export function useLanguage(): UseLanguageResult {
  const lang = useSyncExternalStore(subscribe, getLang, getServerLang);
  return { lang, setLang, t: translations[lang] };
}
