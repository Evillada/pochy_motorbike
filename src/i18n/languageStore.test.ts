import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('languageStore', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.resetModules();
    // jsdom defaults navigator.language to "en-US", which would make the
    // module's first-visit fallback pick "en" and break the "defaults to
    // es" expectation below. Pin it so the fallback behaves the same in
    // every environment this test runs in.
    vi.stubGlobal('navigator', { ...window.navigator, language: 'es-CO' });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('defaults to "es" when nothing is stored', async () => {
    const { getLang } = await import('./languageStore');
    expect(getLang()).toBe('es');
  });

  it('setLang updates the value, persists it, and notifies subscribers', async () => {
    const { getLang, setLang, subscribe } = await import('./languageStore');
    const listener = vi.fn();
    const unsubscribe = subscribe(listener);

    setLang('en');

    expect(getLang()).toBe('en');
    expect(window.localStorage.getItem('pochy-lang')).toBe('en');
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    setLang('es');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('setLang is a no-op when the language is unchanged', async () => {
    const { setLang, subscribe } = await import('./languageStore');
    const listener = vi.fn();
    subscribe(listener);

    setLang('es');

    expect(listener).not.toHaveBeenCalled();
  });
});
