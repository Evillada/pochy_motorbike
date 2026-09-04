# Pochy MotorBike Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, bilingual (ES/EN) Astro landing page for Pochy MotorBike (motorcycle workshop, Medellín) with a WhatsApp-first conversion path, an original animated visual identity, and no generic template look.

**Architecture:** Astro 4 static site. Every section is an `.astro` wrapper (`client:load`/`client:visible`) around a React island (`*Client.tsx`) so Framer Motion can drive entrance/hover animation. Language switching is powered by a tiny framework-agnostic pub/sub store (`src/i18n/languageStore.ts`) read via `useSyncExternalStore`, so every independently-hydrated island stays in sync without sharing a React tree. All copy lives in typed dictionaries (`src/i18n/translations.ts`); all visuals are original inline SVG/CSS (no stock photography, no downloaded assets — see Deviation note below).

**Tech Stack:** Astro ^4.15, @astrojs/react ^3.6, @astrojs/tailwind ^5.1, Tailwind ^3.4, React ^18.3, TypeScript ^5.6 (strict), Framer Motion ^11, lucide-react ^0.454, Vitest + @testing-library/react for unit/component tests.

**Spec:** [docs/superpowers/specs/2026-09-04-pochy-motos-landing-design.md](../specs/2026-09-04-pochy-motos-landing-design.md)

**Deviation from spec §7 (approved inline, confirm with user before/while executing):** the spec said "stock photography, color-graded to match the palette." No tool in this environment can browse/download stock-photo libraries without per-file download approval, and photographic stock is exactly the "generic" look the user explicitly said to avoid. This plan instead builds the entire visual identity from original inline SVG (a custom animated mark, speed-line dividers, a marquee strip) and CSS (gradients, glow, noise texture) — zero external imagery beyond Google Fonts and lucide icons. If the user later supplies real shop photos, they drop into `public/images/` and swap into `HeroClient`/`WhyUsClient` in a follow-up task; no rework needed elsewhere.

## Global Constraints

- WhatsApp number: `573166876163` (E.164, no `+` or spaces) — used verbatim in every `wa.me` link.
- Default language `es`, toggle to `en`, persisted in `localStorage` key `pochy-lang`, no route change.
- Business location: Medellín, Colombia (no exact street address supplied — do not fabricate one).
- Business hours are a **placeholder** the user must confirm before publishing — mark clearly in code as `// TODO(pochy): confirm real hours before launch`.
- No fabricated testimonials, review counts, or client photos.
- No CMS, no contact form, no backend — WhatsApp links are the only conversion mechanism.
- No multi-page routing — one page, anchor navigation only.
- Respect `prefers-reduced-motion`: every Framer Motion animation must have a reduced-motion fallback (instant/opacity-only).
- TypeScript strict mode; no `any`.
- Mobile-first Tailwind; test at 375px and 1440px minimum.

---

## Task 1: Project scaffold & tooling

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `src/env.d.ts`
- Create: `.gitignore`

**Interfaces:**
- Produces: a working `npm run dev`, `npm run build`, `npm run test` in an Astro + React + Tailwind + Vitest project. Every later task depends on this.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "pochy-motos-landing",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "test:watch": "vitest",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.3",
    "@astrojs/react": "^3.6.2",
    "@astrojs/tailwind": "^5.1.3",
    "astro": "^4.15.7",
    "clsx": "^2.1.1",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.454.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.5",
    "tailwindcss": "^3.4.14"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^22.7.5",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.0",
    "jsdom": "^25.0.1",
    "typescript": "^5.6.2",
    "vitest": "^2.1.4"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: lockfile created, no errors.

- [ ] **Step 3: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'motion-vendor': ['framer-motion'],
          },
        },
      },
    },
  },
});
```

- [ ] **Step 4: Create `tailwind.config.mjs`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.55 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 6: Create `vitest.config.ts`**

The `@/*` path alias in `tsconfig.json` only resolves for Astro's own build —
Vitest runs its own, separate Vite config and needs the alias declared here
too, or every `@/...` import in a test (starting in Task 4) fails to
resolve.

```ts
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
```

- [ ] **Step 7: Create `tests/setup.ts`**

jsdom's stock `navigator.language` is `"en-US"`. Every `*Client.tsx` test
from Task 6 onward transitively imports `languageStore` for the first time
in that test file's own module graph (Vitest isolates each test file), so
the store's first-visit fallback would deterministically resolve to `"en"`
instead of `"es"` and break every "shows Spanish by default" assertion —
pin the locale here, once, so no individual test file needs its own stub.

```ts
import '@testing-library/jest-dom/vitest';

// jsdom's stock navigator.language is "en-US". Several tests assert the
// app's default language ("es") for a first-time visitor with no stored
// preference — pin the locale globally so that default is deterministic
// across every test file, instead of each one stubbing it individually.
Object.defineProperty(navigator, 'language', {
  value: 'es-CO',
  configurable: true,
});
```

- [ ] **Step 8: Create `src/env.d.ts`**

```ts
/// <reference types="astro/client" />
```

- [ ] **Step 9: Create `.gitignore`**

```
node_modules/
dist/
.astro/
.env
.DS_Store
```

- [ ] **Step 10: Verify the scaffold builds**

Run: `mkdir -p src/pages && printf '---\n---\n<html><body>ok</body></html>\n' > src/pages/index.astro && npm run build`
Expected: `astro build` completes with an output summary and no errors (this placeholder `index.astro` is overwritten in Task 13).

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro + React + Tailwind + Vitest project

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 2: i18n core — translations, language store, hook

**Files:**
- Create: `src/i18n/translations.ts`
- Create: `src/i18n/translations.test.ts`
- Create: `src/i18n/languageStore.ts`
- Create: `src/i18n/languageStore.test.ts`
- Create: `src/i18n/useLanguage.ts`

**Interfaces:**
- Produces: `type Lang = "es" | "en"`; `translations: Record<Lang, Translations>`; `getLang(): Lang`, `setLang(lang: Lang): void`, `subscribe(listener: () => void): () => void` from `languageStore.ts`; `useLanguage(): { lang: Lang; setLang: (l: Lang) => void; t: Translations }` from `useLanguage.ts`. Every `*Client.tsx` component in later tasks imports `useLanguage` from `@/i18n/useLanguage` and reads `t.<section>.<field>`.

- [ ] **Step 1: Write the failing test for translations parity**

```ts
// src/i18n/translations.test.ts
import { describe, expect, it } from 'vitest';
import { translations } from './translations';

function collectKeys(obj: unknown, prefix = ''): string[] {
  if (Array.isArray(obj)) {
    return obj.length > 0 ? collectKeys(obj[0], `${prefix}[]`) : [`${prefix}[]`];
  }
  if (obj && typeof obj === 'object') {
    return Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) =>
      collectKeys(value, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

describe('translations', () => {
  it('es and en expose the exact same key shape', () => {
    const esKeys = collectKeys(translations.es).sort();
    const enKeys = collectKeys(translations.en).sort();
    expect(enKeys).toEqual(esKeys);
  });

  it('has at least one service item per language', () => {
    expect(translations.es.services.items.length).toBeGreaterThan(0);
    expect(translations.en.services.items.length).toBe(translations.es.services.items.length);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/i18n/translations.test.ts`
Expected: FAIL — `Cannot find module './translations'`.

- [ ] **Step 3: Write `src/i18n/translations.ts`**

```ts
export interface ServiceItem {
  title: string;
  description: string;
  whatsappMessage: string;
}

export interface TrustPoint {
  title: string;
  description: string;
}

export interface HoursRow {
  label: string;
  value: string;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    whyUs: string;
    location: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    whatsappMessage: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    items: ServiceItem[];
  };
  financing: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    whatsappMessage: string;
  };
  whyUs: {
    eyebrow: string;
    title: string;
    points: TrustPoint[];
  };
  location: {
    eyebrow: string;
    title: string;
    citySummary: string;
    hoursTitle: string;
    hours: HoursRow[];
    mapCtaLabel: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    whatsappMessage: string;
  };
  footer: {
    tagline: string;
    instagramLabel: string;
    whatsappLabel: string;
    rights: string;
  };
  languageToggle: {
    label: string;
  };
}

const es: Translations = {
  meta: {
    title: 'Pochy MotorBike | Taller de motos en Medellín',
    description:
      'Pochy MotorBike: taller de motos y mantenimientos generales en Medellín. Agenda tu cita por WhatsApp.',
  },
  nav: {
    services: 'Servicios',
    whyUs: 'Por qué nosotros',
    location: 'Ubicación',
    contact: 'Contacto',
  },
  hero: {
    eyebrow: 'Taller de motos · Medellín',
    title: 'Tu moto, en manos que sí saben.',
    subtitle:
      'Mantenimiento general, diagnóstico y repuestos para tu motocicleta. Rápido, honesto y cerca de ti en Medellín.',
    ctaPrimary: 'Agenda por WhatsApp',
    ctaSecondary: 'Ver servicios',
    whatsappMessage: 'Hola, quiero agendar un servicio para mi moto en Pochy MotorBike.',
  },
  services: {
    eyebrow: 'Lo que hacemos',
    title: 'Servicios',
    subtitle: 'Mantenimiento completo para que tu moto no te falle cuando más la necesitas.',
    ctaLabel: 'Cotizar',
    items: [
      {
        title: 'Mantenimiento general',
        description: 'Revisión completa de tu moto: motor, frenos, suspensión y más.',
        whatsappMessage: 'Hola, quiero cotizar el servicio de *Mantenimiento general*.',
      },
      {
        title: 'Cambio de aceite',
        description: 'Aceite y filtro adecuados para la marca y uso de tu motocicleta.',
        whatsappMessage: 'Hola, quiero cotizar el servicio de *Cambio de aceite*.',
      },
      {
        title: 'Frenos',
        description: 'Cambio de pastillas y discos, ajuste y revisión del sistema de frenado.',
        whatsappMessage: 'Hola, quiero cotizar el servicio de *Frenos*.',
      },
      {
        title: 'Diagnóstico eléctrico',
        description: 'Batería, luces, encendido y fallas eléctricas detectadas a tiempo.',
        whatsappMessage: 'Hola, quiero cotizar el servicio de *Diagnóstico eléctrico*.',
      },
      {
        title: 'Repuestos',
        description: 'Repuestos para las marcas y modelos más comunes en Medellín.',
        whatsappMessage: 'Hola, quiero consultar disponibilidad de *Repuestos*.',
      },
    ],
  },
  financing: {
    eyebrow: 'Financiación',
    title: 'Mantén tu moto al día, paga a tu ritmo',
    description:
      'Pochy MotorBike tiene alianza con Addi: financia el mantenimiento de tu moto y paga en cuotas.',
    ctaLabel: 'Preguntar por Addi',
    whatsappMessage: 'Hola, quiero más información sobre financiar mi mantenimiento con Addi.',
  },
  whyUs: {
    eyebrow: 'Por qué elegirnos',
    title: 'Un taller de confianza en Medellín',
    points: [
      {
        title: 'Atención personalizada',
        description: 'Te explicamos qué necesita tu moto, sin letra pequeña ni sorpresas.',
      },
      {
        title: 'Repuestos de calidad',
        description: 'Trabajamos con repuestos confiables para las marcas más comunes.',
      },
      {
        title: 'Financiación con Addi',
        description: 'Paga tu mantenimiento en cuotas cuando lo necesites.',
      },
      {
        title: 'Ubicados en Medellín',
        description: 'Fácil de visitar, respuesta rápida por WhatsApp.',
      },
    ],
  },
  location: {
    eyebrow: 'Encuéntranos',
    title: 'Ubicación y horario',
    citySummary: 'Medellín, Colombia',
    hoursTitle: 'Horario de atención',
    hours: [
      { label: 'Lunes a viernes', value: '8:00 a.m. – 6:00 p.m.' },
      { label: 'Sábado', value: '8:00 a.m. – 1:00 p.m.' },
      { label: 'Domingo', value: 'Cerrado' },
    ],
    mapCtaLabel: 'Ver en Google Maps',
  },
  finalCta: {
    title: '¿Tu moto necesita atención?',
    subtitle: 'Escríbenos ahora y te respondemos por WhatsApp en minutos.',
    ctaLabel: 'Agendar por WhatsApp',
    whatsappMessage: 'Hola, quiero agendar una cita en Pochy MotorBike.',
  },
  footer: {
    tagline: 'Taller de motos y mantenimientos generales.',
    instagramLabel: 'Síguenos en Instagram',
    whatsappLabel: 'Escríbenos por WhatsApp',
    rights: 'Todos los derechos reservados.',
  },
  languageToggle: {
    label: 'Idioma',
  },
};

const en: Translations = {
  meta: {
    title: 'Pochy MotorBike | Motorcycle workshop in Medellín',
    description:
      'Pochy MotorBike: motorcycle workshop and general maintenance in Medellín. Book your appointment on WhatsApp.',
  },
  nav: {
    services: 'Services',
    whyUs: 'Why us',
    location: 'Location',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'Motorcycle workshop · Medellín',
    title: 'Your bike, in hands that know.',
    subtitle:
      'General maintenance, diagnostics, and parts for your motorcycle. Fast, honest, and close to you in Medellín.',
    ctaPrimary: 'Book on WhatsApp',
    ctaSecondary: 'See services',
    whatsappMessage: "Hi, I'd like to book a service for my motorcycle at Pochy MotorBike.",
  },
  services: {
    eyebrow: 'What we do',
    title: 'Services',
    subtitle: "Complete maintenance so your bike doesn't let you down when you need it most.",
    ctaLabel: 'Get a quote',
    items: [
      {
        title: 'General maintenance',
        description: 'Full check-up of your bike: engine, brakes, suspension, and more.',
        whatsappMessage: "Hi, I'd like a quote for *General maintenance*.",
      },
      {
        title: 'Oil change',
        description: 'The right oil and filter for your motorcycle brand and use.',
        whatsappMessage: "Hi, I'd like a quote for *Oil change*.",
      },
      {
        title: 'Brakes',
        description: 'Pad and disc replacement, adjustment, and full brake check.',
        whatsappMessage: "Hi, I'd like a quote for *Brakes*.",
      },
      {
        title: 'Electrical diagnostics',
        description: 'Battery, lights, ignition, and electrical faults caught early.',
        whatsappMessage: "Hi, I'd like a quote for *Electrical diagnostics*.",
      },
      {
        title: 'Spare parts',
        description: 'Parts for the most common brands and models in Medellín.',
        whatsappMessage: "Hi, I'd like to check availability of *Spare parts*.",
      },
    ],
  },
  financing: {
    eyebrow: 'Financing',
    title: 'Keep your bike maintained, pay at your pace',
    description:
      "Pochy MotorBike partners with Addi: finance your motorcycle's maintenance and pay in installments.",
    ctaLabel: 'Ask about Addi',
    whatsappMessage: "Hi, I'd like more info about financing my maintenance with Addi.",
  },
  whyUs: {
    eyebrow: 'Why choose us',
    title: 'A workshop you can trust in Medellín',
    points: [
      {
        title: 'Personalized attention',
        description: 'We explain what your bike needs — no fine print, no surprises.',
      },
      {
        title: 'Quality parts',
        description: 'We work with reliable parts for the most common brands.',
      },
      {
        title: 'Financing with Addi',
        description: 'Pay for your maintenance in installments whenever you need to.',
      },
      {
        title: 'Based in Medellín',
        description: 'Easy to visit, fast response on WhatsApp.',
      },
    ],
  },
  location: {
    eyebrow: 'Find us',
    title: 'Location & hours',
    citySummary: 'Medellín, Colombia',
    hoursTitle: 'Opening hours',
    hours: [
      { label: 'Monday to Friday', value: '8:00 am – 6:00 pm' },
      { label: 'Saturday', value: '8:00 am – 1:00 pm' },
      { label: 'Sunday', value: 'Closed' },
    ],
    mapCtaLabel: 'View on Google Maps',
  },
  finalCta: {
    title: 'Does your bike need attention?',
    subtitle: "Message us now and we'll reply on WhatsApp in minutes.",
    ctaLabel: 'Book on WhatsApp',
    whatsappMessage: "Hi, I'd like to book an appointment at Pochy MotorBike.",
  },
  footer: {
    tagline: 'Motorcycle workshop and general maintenance.',
    instagramLabel: 'Follow us on Instagram',
    whatsappLabel: 'Message us on WhatsApp',
    rights: 'All rights reserved.',
  },
  languageToggle: {
    label: 'Language',
  },
};

export type Lang = 'es' | 'en';

export const translations: Record<Lang, Translations> = { es, en };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/i18n/translations.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Write the failing test for the language store**

```ts
// src/i18n/languageStore.test.ts
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
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/i18n/languageStore.test.ts`
Expected: FAIL — `Cannot find module './languageStore'`.

- [ ] **Step 7: Write `src/i18n/languageStore.ts`**

```ts
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
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/i18n/languageStore.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 9: Write `src/i18n/useLanguage.ts`** (no separate test — it's a 5-line wire-up over already-tested pieces; exercised indirectly by every component test in later tasks)

```ts
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
```

- [ ] **Step 10: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (5 tests total).

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: add i18n translations, language store, and useLanguage hook

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 3: Shared utilities — cn, WhatsApp links, Maps links

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/whatsapp.ts`
- Create: `src/lib/whatsapp.test.ts`
- Create: `src/lib/maps.ts`
- Create: `src/lib/maps.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `cn(...inputs: ClassValue[]): string`; `WHATSAPP_PHONE = "573166876163"`; `buildWhatsAppUrl(message: string, phone?: string): string`; `buildMapsSearchUrl(query: string): string`. Every later component that links to WhatsApp or Maps imports these instead of hand-building URLs.

- [ ] **Step 1: Write `src/lib/utils.ts`** (straight port, no test needed — it's a 2-line wrapper around two already-tested libraries)

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Write the failing test for the WhatsApp URL builder**

```ts
// src/lib/whatsapp.test.ts
import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, WHATSAPP_PHONE } from './whatsapp';

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me URL with the default shop number and encoded message', () => {
    const url = buildWhatsAppUrl('Hola, ¿tienen frenos?');
    expect(url).toBe(`https://wa.me/${WHATSAPP_PHONE}?text=Hola%2C%20%C2%BFtienen%20frenos%3F`);
  });

  it('accepts an override phone number', () => {
    const url = buildWhatsAppUrl('hi', '5731112222');
    expect(url).toBe('https://wa.me/5731112222?text=hi');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/lib/whatsapp.test.ts`
Expected: FAIL — `Cannot find module './whatsapp'`.

- [ ] **Step 4: Write `src/lib/whatsapp.ts`**

```ts
export const WHATSAPP_PHONE = '573166876163';

export function buildWhatsAppUrl(message: string, phone: string = WHATSAPP_PHONE): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/lib/whatsapp.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 6: Write the failing test for the Maps URL builder**

```ts
// src/lib/maps.test.ts
import { describe, expect, it } from 'vitest';
import { buildMapsSearchUrl } from './maps';

describe('buildMapsSearchUrl', () => {
  it('builds a Google Maps search URL from a free-text query', () => {
    const url = buildMapsSearchUrl('Pochy MotorBike Medellín');
    expect(url).toBe(
      'https://www.google.com/maps/search/?api=1&query=Pochy%20MotorBike%20Medell%C3%ADn',
    );
  });
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npx vitest run src/lib/maps.test.ts`
Expected: FAIL — `Cannot find module './maps'`.

- [ ] **Step 8: Write `src/lib/maps.ts`**

```ts
export function buildMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
```

- [ ] **Step 9: Run test to verify it passes**

Run: `npx vitest run src/lib/maps.test.ts`
Expected: PASS (1 test).

- [ ] **Step 10: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (8 tests total).

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: add cn, WhatsApp link, and Maps link utilities

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 4: UI primitives — Button, SectionHeading, MotoGlyph

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Button.test.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/MotoGlyph.tsx`
- Create: `src/components/ui/MotionRoot.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`; `MotionConfig` from `framer-motion`.
- Produces: `<Button as="a" href={...} variant="primary"|"ghost">`; `<SectionHeading index="01" eyebrow={...} title={...} />`; `<MotoGlyph className? />`; `<MotionRoot>{children}</MotionRoot>`. All section components (Tasks 6–12) render CTAs through `Button`, section titles through `SectionHeading`, and wrap their own top-level return in `MotionRoot` — see Global Constraints (reduced motion).

- [ ] **Step 1: Write the failing test for Button**

```tsx
// src/components/ui/Button.test.tsx
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders as a link with the given href when as="a"', () => {
    render(
      <Button as="a" href="https://wa.me/123">
        Agenda por WhatsApp
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Agenda por WhatsApp' });
    expect(link).toHaveAttribute('href', 'https://wa.me/123');
  });

  it('renders as a button and fires onClick when as="button"', async () => {
    const onClick = vi.fn();
    render(
      <Button as="button" onClick={onClick}>
        Ver servicios
      </Button>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Ver servicios' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ui/Button.test.tsx`
Expected: FAIL — `Cannot find module './Button'`.

- [ ] **Step 3: Write `src/components/ui/Button.tsx`**

```tsx
import { motion } from 'framer-motion';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost';

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

// Framer Motion's motion.button/motion.a redefine these DOM event handlers
// with incompatible signatures (e.g. onAnimationStart takes a Framer
// AnimationDefinition, not a DOM AnimationEvent). Omitting them from the
// native attribute types below keeps the two APIs from colliding — Button
// never needs to expose them, since nothing in this project passes
// onAnimationStart/onDrag* to a Button.
type MotionConflictingProps =
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd';

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflictingProps> & { as?: 'button' };

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflictingProps> & { as: 'a'; href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_8px_24px_color-mix(in_oklch,var(--primary)_45%,transparent)]',
  ghost: 'bg-transparent text-foreground border border-border hover:border-primary',
};

const MotionAnchor = motion.a;
const MotionButton = motion.button;

export function Button(props: ButtonProps) {
  const { variant = 'primary', className, children, ...rest } = props;

  const sharedClassName = cn(
    'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3',
    'font-display text-base font-semibold tracking-wide',
    'transition-shadow duration-300',
    variantClasses[variant],
    className,
  );

  const motionProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  } as const;

  if (props.as === 'a') {
    const { as: _as, href, ...anchorRest } = rest as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      MotionConflictingProps
    > & {
      href: string;
    };
    return (
      <MotionAnchor href={href} className={sharedClassName} {...motionProps} {...anchorRest}>
        {children}
      </MotionAnchor>
    );
  }

  const { as: _as, ...buttonRest } = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    MotionConflictingProps
  >;
  return (
    <MotionButton type="button" className={sharedClassName} {...motionProps} {...buttonRest}>
      {children}
    </MotionButton>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/ui/Button.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Write `src/components/ui/SectionHeading.tsx`** (presentational composition of already-tested primitives — no dedicated test; covered by each section's smoke test in later tasks)

```tsx
interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ index, eyebrow, title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left'}>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          {index}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</span>
      </div>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
      {subtitle ? <p className="mt-3 text-muted-foreground max-w-xl">{subtitle}</p> : null}
    </div>
  );
}
```

- [ ] **Step 6: Write `src/components/ui/MotoGlyph.tsx`** (original animated mark — visual-only, no unit test; verified visually in Task 13)

```tsx
import { motion } from 'framer-motion';

interface MotoGlyphProps {
  className?: string;
}

/**
 * Original mark for Pochy MotorBike: a hex outline pierced by a speed line,
 * with a rotating gear at its core. Built entirely from inline SVG — no
 * stock art or icon-font glyph.
 */
export function MotoGlyph({ className = '' }: MotoGlyphProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Pochy MotorBike">
      <defs>
        <linearGradient id="pochy-glyph-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>

      <motion.path
        d="M100 8 L182 52 V148 L100 192 L18 148 V52 Z"
        fill="none"
        stroke="url(#pochy-glyph-gradient)"
        strokeWidth={4}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />

      <motion.g
        style={{ transformOrigin: '100px 100px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
      >
        <circle cx={100} cy={100} r={26} fill="none" stroke="url(#pochy-glyph-gradient)" strokeWidth={3} />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x={97}
            y={68}
            width={6}
            height={12}
            rx={1.5}
            fill="url(#pochy-glyph-gradient)"
            transform={`rotate(${(i * 360) / 8} 100 100)`}
          />
        ))}
      </motion.g>

      <motion.path
        d="M32 118 L84 118 L96 100 L112 136 L124 118 L168 118"
        fill="none"
        stroke="url(#pochy-glyph-gradient)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
      />
    </svg>
  );
}
```

- [ ] **Step 7: Write `src/components/ui/MotionRoot.tsx`**

Every top-level `*Client.tsx` component in Tasks 6–13 wraps its returned JSX
in this instead of importing `MotionConfig` directly — one place enforces
the reduced-motion contract for every animated section, including nested
`Button`/`MotoGlyph` instances (they inherit it from the surrounding React
tree). No dedicated test: it's a 6-line pass-through over an already-stable
framer-motion API; covered implicitly by every component test that renders
through it in later tasks.

```tsx
import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionRootProps {
  children: ReactNode;
}

/**
 * Wraps one island's content so every Framer Motion animation inside it
 * respects the OS-level "reduce motion" preference. `reducedMotion="user"`
 * disables transform/layout animation (scale, slide, rotate) while leaving
 * opacity fades intact, matching the Global Constraints' reduced-motion
 * requirement without touching each animated component individually.
 */
export function MotionRoot({ children }: MotionRootProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

- [ ] **Step 8: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (10 tests total).

- [ ] **Step 9: Type-check**

Run: `npm run check`
Expected: 0 errors. (Button's discriminated union spreads native HTML
attributes onto Framer Motion components; if this reports `ts(2322)` on
`onAnimationStart`/`onDrag*`, see the `MotionConflictingProps` Omit already
applied above — Framer Motion's motion.button/motion.a redefine those six
handlers with incompatible signatures, so the native attribute types must
omit them before being spread onto a motion component.)

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add Button, SectionHeading, MotoGlyph, and MotionRoot UI primitives

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 5: Global theme, fonts, and Layout.astro

**Files:**
- Create: `src/styles/globals.css`
- Create: `src/layouts/Layout.astro`
- Create: `public/favicon.svg`

**Interfaces:**
- Consumes: nothing new.
- Produces: the `--background`/`--primary`/etc. CSS custom properties every Tailwind class in Tasks 4–12 resolves against; the `<Layout>` component every page/section is rendered inside (via `src/pages/index.astro` in Task 13).

- [ ] **Step 1: Write `src/styles/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: oklch(0.09 0.015 30);
    --foreground: oklch(0.97 0.01 90);
    --card: oklch(0.15 0.02 30);
    --card-foreground: oklch(0.97 0.01 90);

    --primary: oklch(0.58 0.22 25);
    --primary-foreground: oklch(0.98 0.02 25);

    --accent: oklch(0.72 0.19 55);
    --accent-foreground: oklch(0.14 0.02 55);

    --muted: oklch(0.2 0.015 30);
    --muted-foreground: oklch(0.72 0.02 60);

    --border: oklch(0.28 0.02 30);
    --ring: oklch(0.58 0.22 25);

    --radius: 0.75rem;
  }

  * {
    border-color: var(--border);
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    overflow-x: hidden;
  }

  ::selection {
    background-color: color-mix(in oklch, var(--primary) 60%, transparent);
    color: var(--primary-foreground);
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Diagonal "speed line" divider between sections, replacing plain borders. */
  .speed-divider {
    position: relative;
  }

  .speed-divider::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent);
    opacity: 0.5;
    clip-path: polygon(0 100%, 3% 0, 100% 0, 97% 100%);
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

- [ ] **Step 2: Create `public/favicon.svg`** (original mark, not a downloaded icon)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e5182b"/>
      <stop offset="100%" stop-color="#ff8a3d"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="#0b0b0d"/>
  <path d="M32 6 L56 18 V46 L32 58 L8 46 V18 Z" fill="none" stroke="url(#g)" stroke-width="3"/>
  <circle cx="32" cy="32" r="9" fill="none" stroke="url(#g)" stroke-width="2.5"/>
</svg>
```

- [ ] **Step 3: Write `src/layouts/Layout.astro`**

```astro
---
import '../styles/globals.css';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://pochymotorbike.example.com';
---

<!doctype html>
<html lang="es" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#0b0b0d" />
    <meta name="color-scheme" content="dark" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="generator" content={Astro.generator} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={siteUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:locale" content="es_CO" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />

    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={siteUrl} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="font-body">
    <slot />
  </body>
</html>
```

- [ ] **Step 4: Verify the build still passes**

Run: `npm run build`
Expected: succeeds (the placeholder `src/pages/index.astro` from Task 1 still renders; `Layout.astro` isn't wired in until Task 13, so this just confirms no syntax errors in the new files via `astro check`).

Run: `npm run check`
Expected: no type errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add global theme, fonts, and base Layout

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 6: Header, language toggle, mobile menu

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/HeaderClient.tsx`
- Create: `src/components/HeaderClient.test.tsx`

**Interfaces:**
- Consumes: `useLanguage` from `@/i18n/useLanguage`; `Button` from `@/components/ui/Button`; `MotoGlyph` from `@/components/ui/MotoGlyph`; `MotionRoot` from `@/components/ui/MotionRoot`; `buildWhatsAppUrl` from `@/lib/whatsapp`.
- Produces: `<Header />` (Astro wrapper) used once in `index.astro` (Task 13). No other component depends on Header's internals.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/HeaderClient.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderClient from './HeaderClient';

describe('HeaderClient', () => {
  it('shows Spanish nav labels by default and switches to English on toggle', async () => {
    render(<HeaderClient />);

    expect(screen.getByRole('link', { name: 'Servicios' })).toBeInTheDocument();

    // The toggle's only direct text node is the 2-letter target-language code
    // ("EN" while in Spanish); querying by that exact text avoids ambiguity
    // with the hamburger button, whose accessible name ("Menu") happens to
    // contain the substring "en" too.
    await userEvent.click(screen.getByText('EN'));

    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/HeaderClient.test.tsx`
Expected: FAIL — `Cannot find module './HeaderClient'`.

- [ ] **Step 3: Write `src/components/HeaderClient.tsx`**

```tsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { Button } from '@/components/ui/Button';
import { MotoGlyph } from '@/components/ui/MotoGlyph';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const NAV_ANCHORS = ['services', 'why-us', 'location', 'contact'] as const;

export default function HeaderClient() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLabels: Record<(typeof NAV_ANCHORS)[number], string> = {
    services: t.nav.services,
    'why-us': t.nav.whyUs,
    location: t.nav.location,
    contact: t.nav.contact,
  };

  const whatsappHref = buildWhatsAppUrl(t.hero.whatsappMessage);

  return (
    <MotionRoot>
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <MotoGlyph className="h-9 w-9" />
          <span className="font-display text-lg font-bold tracking-wide">Pochy MotorBike</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ANCHORS.map((anchor) => (
            <a
              key={anchor}
              href={`#${anchor}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {navLabels[anchor]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={t.languageToggle.label}
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>

          <div className="hidden sm:block">
            <Button as="a" href={whatsappHref} variant="primary" className="px-4 py-2 text-sm">
              {t.hero.ctaPrimary}
            </Button>
          </div>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden rounded-md border border-border p-2"
          >
            <span className="sr-only">Menu</span>
            <div className="flex h-4 w-5 flex-col justify-between">
              <span className="h-0.5 w-full bg-foreground" />
              <span className="h-0.5 w-full bg-foreground" />
              <span className="h-0.5 w-full bg-foreground" />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_ANCHORS.map((anchor) => (
                <a
                  key={anchor}
                  href={`#${anchor}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {navLabels[anchor]}
                </a>
              ))}
              <Button as="a" href={whatsappHref} variant="primary" className="mt-2">
                {t.hero.ctaPrimary}
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
    </MotionRoot>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/HeaderClient.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Write `src/components/Header.astro`**

```astro
---
import HeaderClient from './HeaderClient';
---

<HeaderClient client:load />
```

- [ ] **Step 6: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (11 tests total).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Header with language toggle and mobile menu

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 7: Hero section

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/HeroClient.tsx`
- Create: `src/components/HeroClient.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `Button`, `MotoGlyph`, `MotionRoot`, `buildWhatsAppUrl`.
- Produces: `<Hero />` used once in `index.astro`, rendered with `id="top"`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/HeroClient.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroClient from './HeroClient';
import { WHATSAPP_PHONE } from '@/lib/whatsapp';

describe('HeroClient', () => {
  it('renders the Spanish headline and a primary CTA linking to WhatsApp', () => {
    render(<HeroClient />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tu moto, en manos que sí saben.');

    const cta = screen.getByRole('link', { name: 'Agenda por WhatsApp' });
    expect(cta.getAttribute('href')).toContain(`https://wa.me/${WHATSAPP_PHONE}`);
  });

  it('renders a secondary CTA that anchors to the services section', () => {
    render(<HeroClient />);
    expect(screen.getByRole('link', { name: 'Ver servicios' })).toHaveAttribute('href', '#services');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/HeroClient.test.tsx`
Expected: FAIL — `Cannot find module './HeroClient'`.

- [ ] **Step 3: Write `src/components/HeroClient.tsx`**

```tsx
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { Button } from '@/components/ui/Button';
import { MotoGlyph } from '@/components/ui/MotoGlyph';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HeroClient() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(t.hero.whatsappMessage);

  return (
    <MotionRoot>
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary)_28%,transparent),transparent_70%)] animate-glow-pulse"
      />
      <div
        aria-hidden
        className="absolute -right-24 top-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_35%,transparent),transparent)]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-accent"
          >
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-4 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-lg text-lg text-muted-foreground">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <Button as="a" href={whatsappHref}>
              {t.hero.ctaPrimary}
            </Button>
            <Button as="a" href="#services" variant="ghost">
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="mx-auto w-full max-w-sm"
        >
          <MotoGlyph className="w-full drop-shadow-[0_0_40px_color-mix(in_oklch,var(--primary)_35%,transparent)]" />
        </motion.div>
      </div>
    </section>
    </MotionRoot>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/HeroClient.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Write `src/components/Hero.astro`**

```astro
---
import HeroClient from './HeroClient';
---

<HeroClient client:load />
```

- [ ] **Step 6: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (13 tests total).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add animated Hero section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 8: Services section (with marquee strip)

**Files:**
- Create: `src/components/Services.astro`
- Create: `src/components/ServicesClient.tsx`
- Create: `src/components/ServicesClient.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `SectionHeading`, `MotionRoot`, `buildWhatsAppUrl`. (Per-card CTAs are inline text links, not `Button` — they need to sit inside a compact card, not look like a full button.)
- Produces: `<Services />` used once in `index.astro`, rendered with `id="services"`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/ServicesClient.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServicesClient from './ServicesClient';
import { translations } from '@/i18n/translations';

describe('ServicesClient', () => {
  it('renders one card per service with a WhatsApp quote link', () => {
    render(<ServicesClient />);

    const items = translations.es.services.items;
    expect(screen.getAllByText('Cotizar')).toHaveLength(items.length);

    const oilChangeLink = screen.getByRole('link', { name: /Cotizar.*Cambio de aceite/s });
    expect(oilChangeLink.getAttribute('href')).toContain(
      encodeURIComponent(items[1].whatsappMessage).slice(0, 20),
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ServicesClient.test.tsx`
Expected: FAIL — `Cannot find module './ServicesClient'`.

- [ ] **Step 3: Write `src/components/ServicesClient.tsx`**

```tsx
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function ServicesClient() {
  const { t } = useLanguage();

  return (
    <MotionRoot>
    <section id="services" className="speed-divider relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="01"
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6"
            >
              <span className="font-display text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-card-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
              <a
                href={buildWhatsAppUrl(service.whatsappMessage)}
                aria-label={`${t.services.ctaLabel} ${service.title}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors group-hover:text-primary"
              >
                {t.services.ctaLabel}
                <span aria-hidden>&rarr;</span>
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 overflow-hidden scrollbar-hide" aria-hidden>
          <div className="flex w-max animate-marquee gap-10 text-2xl font-display font-bold uppercase tracking-widest text-muted-foreground/40">
            {[...t.services.items, ...t.services.items].map((service, i) => (
              <span key={`${service.title}-${i}`}>{service.title} &bull;</span>
            ))}
          </div>
        </div>
      </div>
    </section>
    </MotionRoot>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/ServicesClient.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Write `src/components/Services.astro`**

```astro
---
import ServicesClient from './ServicesClient';
---

<ServicesClient client:visible />
```

- [ ] **Step 6: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (14 tests total).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Services section with per-service WhatsApp CTAs and marquee

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 9: Financing (Addi) section

**Files:**
- Create: `src/components/Financing.astro`
- Create: `src/components/FinancingClient.tsx`
- Create: `src/components/FinancingClient.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `Button`, `MotionRoot`, `buildWhatsAppUrl`.
- Produces: `<Financing />` used once in `index.astro`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/FinancingClient.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FinancingClient from './FinancingClient';
import { WHATSAPP_PHONE } from '@/lib/whatsapp';
import { translations } from '@/i18n/translations';

describe('FinancingClient', () => {
  it('renders the Addi callout description and a WhatsApp CTA', () => {
    render(<FinancingClient />);
    // Both the description and the CTA label contain the word "Addi", so
    // match the full description text (its element's only text node) rather
    // than a bare /Addi/ substring, which would match both and throw.
    expect(screen.getByText(translations.es.financing.description)).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: 'Preguntar por Addi' });
    expect(cta.getAttribute('href')).toContain(`https://wa.me/${WHATSAPP_PHONE}`);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/FinancingClient.test.tsx`
Expected: FAIL — `Cannot find module './FinancingClient'`.

- [ ] **Step 3: Write `src/components/FinancingClient.tsx`**

```tsx
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { Button } from '@/components/ui/Button';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function FinancingClient() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(t.financing.whatsappMessage);

  return (
    <MotionRoot>
    <section className="speed-divider relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-r from-card to-card p-8 sm:p-10"
        >
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_40%,transparent),transparent)]"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t.financing.eyebrow}
          </span>
          <h2 className="mt-2 max-w-xl font-display text-2xl font-bold sm:text-3xl">
            {t.financing.title}
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">{t.financing.description}</p>
          <div className="mt-6">
            <Button as="a" href={whatsappHref}>
              {t.financing.ctaLabel}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
    </MotionRoot>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/FinancingClient.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Write `src/components/Financing.astro`**

```astro
---
import FinancingClient from './FinancingClient';
---

<FinancingClient client:visible />
```

- [ ] **Step 6: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (15 tests total).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Addi financing callout section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 10: Why-us / trust section

**Files:**
- Create: `src/components/WhyUs.astro`
- Create: `src/components/WhyUsClient.tsx`
- Create: `src/components/WhyUsClient.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `SectionHeading`, `MotionRoot`, `Handshake`/`ShieldCheck`/`Wallet`/`MapPin` icons from `lucide-react`.
- Produces: `<WhyUs />` used once in `index.astro`, rendered with `id="why-us"`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/WhyUsClient.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhyUsClient from './WhyUsClient';
import { translations } from '@/i18n/translations';

describe('WhyUsClient', () => {
  it('renders every trust point title', () => {
    render(<WhyUsClient />);
    for (const point of translations.es.whyUs.points) {
      expect(screen.getByText(point.title)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/WhyUsClient.test.tsx`
Expected: FAIL — `Cannot find module './WhyUsClient'`.

- [ ] **Step 3: Write `src/components/WhyUsClient.tsx`**

```tsx
import { motion } from 'framer-motion';
import { Handshake, ShieldCheck, Wallet, MapPin, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MotionRoot } from '@/components/ui/MotionRoot';

// Order matches translations.ts whyUs.points: personalized attention, quality
// parts, Addi financing, Medellín location.
const POINT_ICONS: LucideIcon[] = [Handshake, ShieldCheck, Wallet, MapPin];

export default function WhyUsClient() {
  const { t } = useLanguage();

  return (
    <MotionRoot>
    <section id="why-us" className="speed-divider relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="02" eyebrow={t.whyUs.eyebrow} title={t.whyUs.title} align="center" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.whyUs.points.map((point, i) => {
            const Icon = POINT_ICONS[i] ?? Handshake;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-lg border border-border bg-card p-6 text-center"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{point.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
    </MotionRoot>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/WhyUsClient.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Write `src/components/WhyUs.astro`**

```astro
---
import WhyUsClient from './WhyUsClient';
---

<WhyUsClient client:visible />
```

- [ ] **Step 6: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (16 tests total).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Why-us trust section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 11: Location & hours section

**Files:**
- Create: `src/components/LocationHours.astro`
- Create: `src/components/LocationHoursClient.tsx`
- Create: `src/components/LocationHoursClient.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `SectionHeading`, `MotionRoot`, `buildMapsSearchUrl`.
- Produces: `<LocationHours />` used once in `index.astro`, rendered with `id="location"`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/LocationHoursClient.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import LocationHoursClient from './LocationHoursClient';

describe('LocationHoursClient', () => {
  it('links to a Google Maps search for the shop name and city', () => {
    render(<LocationHoursClient />);
    const link = screen.getByRole('link', { name: 'Ver en Google Maps' });
    expect(link.getAttribute('href')).toBe(
      'https://www.google.com/maps/search/?api=1&query=Pochy%20MotorBike%20Medell%C3%ADn',
    );
  });

  it('renders every hours row', () => {
    render(<LocationHoursClient />);
    expect(screen.getByText('Lunes a viernes')).toBeInTheDocument();
    expect(screen.getByText('Domingo')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/LocationHoursClient.test.tsx`
Expected: FAIL — `Cannot find module './LocationHoursClient'`.

- [ ] **Step 3: Write `src/components/LocationHoursClient.tsx`**

```tsx
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildMapsSearchUrl } from '@/lib/maps';

// TODO(pochy): confirm real hours and exact address before launch.
const MAPS_QUERY = 'Pochy MotorBike Medellín';

export default function LocationHoursClient() {
  const { t } = useLanguage();
  const mapsHref = buildMapsSearchUrl(MAPS_QUERY);

  return (
    <MotionRoot>
    <section id="location" className="speed-divider relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="03" eyebrow={t.location.eyebrow} title={t.location.title} />

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border border-border bg-card p-6"
          >
            <p className="font-display text-lg font-semibold">{t.location.citySummary}</p>
            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-primary"
            >
              {t.location.mapCtaLabel}
              <span aria-hidden>&rarr;</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg border border-border bg-card p-6"
          >
            <p className="font-display text-lg font-semibold">{t.location.hoursTitle}</p>
            <dl className="mt-4 space-y-2">
              {t.location.hours.map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
    </MotionRoot>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/LocationHoursClient.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Write `src/components/LocationHours.astro`**

```astro
---
import LocationHoursClient from './LocationHoursClient';
---

<LocationHoursClient client:visible />
```

- [ ] **Step 6: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (18 tests total).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Location & hours section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 12: Final CTA + Footer

**Files:**
- Create: `src/components/FinalCta.astro`
- Create: `src/components/FinalCtaClient.tsx`
- Create: `src/components/Footer.astro`
- Create: `src/components/FooterClient.tsx`
- Create: `src/components/FooterClient.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `Button`, `MotoGlyph`, `MotionRoot`, `buildWhatsAppUrl`.
- Produces: `<FinalCta />` and `<Footer />`, each used once in `index.astro`, `Footer` rendered with `id="contact"`.

- [ ] **Step 1: Write `src/components/FinalCtaClient.tsx`** (thin composition of already-tested `Button`/`buildWhatsAppUrl` — covered by the Footer test below plus the visual check in Task 13; no dedicated test file)

```tsx
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { Button } from '@/components/ui/Button';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function FinalCtaClient() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(t.finalCta.whatsappMessage);

  return (
    <MotionRoot>
    <section className="speed-divider relative overflow-hidden py-24 text-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_oklch,var(--primary)_25%,transparent),transparent_70%)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl px-4 sm:px-6"
      >
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.finalCta.title}</h2>
        <p className="mt-3 text-muted-foreground">{t.finalCta.subtitle}</p>
        <div className="mt-8 flex justify-center">
          <Button as="a" href={whatsappHref}>
            {t.finalCta.ctaLabel}
          </Button>
        </div>
      </motion.div>
    </section>
    </MotionRoot>
  );
}
```

- [ ] **Step 2: Write `src/components/FinalCta.astro`**

```astro
---
import FinalCtaClient from './FinalCtaClient';
---

<FinalCtaClient client:visible />
```

- [ ] **Step 3: Write the failing test for Footer**

```tsx
// src/components/FooterClient.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FooterClient from './FooterClient';

describe('FooterClient', () => {
  it('links to the Instagram profile and shows the current year', () => {
    render(<FooterClient />);

    const instagramLink = screen.getByRole('link', { name: 'Síguenos en Instagram' });
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/pochy_motorbike/');

    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run src/components/FooterClient.test.tsx`
Expected: FAIL — `Cannot find module './FooterClient'`.

- [ ] **Step 5: Write `src/components/FooterClient.tsx`**

```tsx
import { useLanguage } from '@/i18n/useLanguage';
import { MotoGlyph } from '@/components/ui/MotoGlyph';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const INSTAGRAM_URL = 'https://www.instagram.com/pochy_motorbike/';

export default function FooterClient() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(t.hero.whatsappMessage);
  const year = new Date().getFullYear();

  return (
    <MotionRoot>
    <footer id="contact" className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <MotoGlyph className="h-12 w-12" />
        <p className="max-w-sm text-sm text-muted-foreground">{t.footer.tagline}</p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-accent hover:text-primary">
            {t.footer.instagramLabel}
          </a>
          <a href={whatsappHref} className="text-accent hover:text-primary">
            {t.footer.whatsappLabel}
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {year} Pochy MotorBike. {t.footer.rights}
        </p>
      </div>
    </footer>
    </MotionRoot>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/components/FooterClient.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 7: Write `src/components/Footer.astro`**

```astro
---
import FooterClient from './FooterClient';
---

<FooterClient client:visible />
```

- [ ] **Step 8: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (19 tests total).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add Final CTA and Footer sections

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 13: Floating WhatsApp button, page assembly, and final verification

**Files:**
- Create: `src/components/WhatsAppButton.astro`
- Create: `src/components/WhatsAppButtonClient.tsx`
- Create: `src/components/WhatsAppButtonClient.test.tsx`
- Modify: `src/pages/index.astro` (replace the Task 1 placeholder)

**Interfaces:**
- Consumes: every component from Tasks 5–12, plus `useLanguage`/`MotionRoot`/`buildWhatsAppUrl`.
- Produces: the final assembled page. Nothing later depends on this.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/WhatsAppButtonClient.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsAppButtonClient from './WhatsAppButtonClient';
import { WHATSAPP_PHONE } from '@/lib/whatsapp';

describe('WhatsAppButtonClient', () => {
  it('links to wa.me with the shop number and a default greeting', () => {
    render(<WhatsAppButtonClient />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link.getAttribute('href')).toContain(`https://wa.me/${WHATSAPP_PHONE}`);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/WhatsAppButtonClient.test.tsx`
Expected: FAIL — `Cannot find module './WhatsAppButtonClient'`.

- [ ] **Step 3: Write `src/components/WhatsAppButtonClient.tsx`**

```tsx
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function WhatsAppButtonClient() {
  const { t } = useLanguage();
  const href = buildWhatsAppUrl(t.hero.whatsappMessage);

  return (
    <MotionRoot>
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] sm:bottom-6 sm:right-6"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </motion.a>
    </MotionRoot>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/WhatsAppButtonClient.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Write `src/components/WhatsAppButton.astro`**

```astro
---
import WhatsAppButtonClient from './WhatsAppButtonClient';
---

<WhatsAppButtonClient client:load />
```

- [ ] **Step 6: Replace `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Financing from '../components/Financing.astro';
import WhyUs from '../components/WhyUs.astro';
import LocationHours from '../components/LocationHours.astro';
import FinalCta from '../components/FinalCta.astro';
import Footer from '../components/Footer.astro';
import WhatsAppButton from '../components/WhatsAppButton.astro';

const title = 'Pochy MotorBike | Taller de motos en Medellín';
const description =
  'Pochy MotorBike: taller de motos y mantenimientos generales en Medellín. Agenda tu cita por WhatsApp.';
---

<Layout title={title} description={description}>
  <Header />
  <main class="min-h-screen overflow-x-hidden">
    <Hero />
    <Services />
    <Financing />
    <WhyUs />
    <LocationHours />
    <FinalCta />
  </main>
  <Footer />
  <WhatsAppButton />
</Layout>
```

- [ ] **Step 7: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (20 tests total).

- [ ] **Step 8: Type-check and build**

Run: `npm run check && npm run build`
Expected: no type errors; `astro build` completes and prints the `dist/` output summary.

- [ ] **Step 9: Manual verification pass**

Run: `npm run preview` and open the printed local URL in a browser.
Check:
- Hero, all sections, footer, and floating WhatsApp button render with no console errors.
- The language toggle in the header switches every section's text (hero, nav, services, financing, why-us, location, footer) between Spanish and English instantly, and the choice survives a page reload (`localStorage`).
- Every WhatsApp CTA (header, hero, each service card, financing, final CTA, floating button, footer) opens a `wa.me/573166876163` link with a sensible prefilled message.
- "Ver en Google Maps" opens a Google Maps search for "Pochy MotorBike Medellín".
- At 375px width: mobile menu opens/closes, no horizontal scroll anywhere on the page.
- With OS-level "reduce motion" enabled, entrance/hover animations are near-instant (no large slides/bounces).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add floating WhatsApp button and assemble the full landing page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Deploy note (out of scope for this plan's tasks, for the user before publishing)

Vercel and Netlify both auto-detect Astro (`npm run build`, publish `dist/`) with zero extra config — no FTP-style `deploy/` script is needed for either, unlike the reference project which targets shared/FTP hosting. Before publishing: fill in the real business hours (marked `TODO(pochy)` in `LocationHoursClient.tsx`), swap in real photos if/when available, and confirm the WhatsApp number is correct.
