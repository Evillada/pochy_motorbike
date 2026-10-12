import '@testing-library/jest-dom/vitest';

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
