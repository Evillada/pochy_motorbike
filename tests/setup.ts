import '@testing-library/jest-dom/vitest';

// jsdom's stock navigator.language is "en-US". Several tests assert the
// app's default language ("es") for a first-time visitor with no stored
// preference — pin the locale globally so that default is deterministic
// across every test file, instead of each one stubbing it individually.
Object.defineProperty(navigator, 'language', {
  value: 'es-CO',
  configurable: true,
});

// Mock IntersectionObserver for framer-motion's whileInView — jsdom doesn't
// implement it. Typed against the real interface (not `any`) so this stays
// under strict-mode checking like the rest of the codebase.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect(): void {}
  observe(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve(): void {}
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
