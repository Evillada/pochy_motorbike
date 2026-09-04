import '@testing-library/jest-dom/vitest';

// jsdom's stock navigator.language is "en-US". Several tests assert the
// app's default language ("es") for a first-time visitor with no stored
// preference — pin the locale globally so that default is deterministic
// across every test file, instead of each one stubbing it individually.
Object.defineProperty(navigator, 'language', {
  value: 'es-CO',
  configurable: true,
});
