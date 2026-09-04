# Pochy MotorBike — Landing Page (Design Spec)

**Date:** 2026-09-04
**Status:** Approved by user, ready for implementation planning

## 1. Goal

A single-page marketing landing for **Pochy MotorBike**, a motorcycle repair
shop ("Taller de Motos y mantenimientos generales") in **Medellín, Colombia**
(Instagram: [@pochy_motorbike](https://www.instagram.com/pochy_motorbike/)).
The page must drive one primary action — **contact via WhatsApp** — while
reading as a premium, custom-built brand experience, not a generic template.

Non-negotiable bar set by the user: senior-frontend quality, modern,
attractive, functional, animated, and **visually distinctive** — no
stock-template look.

## 2. Reference project

`../workgroup-landing-page-astro` (sibling project, another motorcycle-shop
landing already built for this user) sets the house stack and conventions:
Astro `.astro` shells + React `.tsx` islands for interactive pieces, Tailwind
for styling, a `scripts/deploy.js` for Vercel/Netlify. Pochy Motos reuses this
stack and structure, but is a **new, independently themed build** — content,
palette, motion language, and section design are specific to this brand, not
copied from the reference project.

## 3. Stack

- **Astro 4** (static output, islands architecture)
- **React 18** via `@astrojs/react`, for the language provider and any
  section that needs interaction/animation state
- **Tailwind CSS** via `@astrojs/tailwind`, extended with a custom theme
  (brand colors, font families, keyframes)
- **Framer Motion** (`motion` package) for scroll reveals, hover/tap
  micro-interactions, and the mobile menu transition — chosen over hand-rolled
  `IntersectionObserver` code because it gives spring-based, interruptible
  animation for the polish level requested, at a small, tree-shakeable cost
- **lucide-react** for iconography (already used in the reference project)
- No backend/CMS: content lives in typed TS objects; no forms post anywhere
  except the WhatsApp deep link

## 4. Visual identity (the "unique, not generic" part)

- **Palette:** racing-inspired dark theme — near-black base
  (`#0B0B0D`/`#141416`), a saturated red primary (`#E5182B`-ish, refined from
  the Instagram branding), a warm orange accent for highlights/gradients, and
  off-white text. Not a flat corporate palette — accents use a red→orange
  gradient (echoes the Instagram logo's glow).
- **Typography:** a condensed/technical display face (e.g. **Rajdhani** or
  **Orbitron** from Google Fonts) for headlines to carry the motorsport feel,
  paired with **Inter** for body text for readability. Loaded via
  `@astrojs/tailwind` + `<link>` in the layout head (not the Tailwind CDN).
- **Motifs:** diagonal "speed line" section dividers instead of straight
  edges, a subtle animated gradient glow behind the hero, a horizontal
  auto-scrolling marquee for the services/brand strip, custom-styled section
  numbers (e.g. `01 — Servicios`) instead of generic icons-in-circles.
- **Motion language:** staggered fade/slide-up reveals on scroll (per
  section, not per element — avoid "everything bounces in" fatigue), a
  magnetic/scale hover on primary buttons, an animated underline on nav
  links, smooth-scroll to anchors, and a page-load hero entrance sequence
  (headline → CTA → visual, staggered).

## 5. Internationalization (ES / EN)

No i18n router — this is a single page, not multi-route content, so
Astro's file-based i18n would add routing complexity for no benefit here.
Instead:

- `src/i18n/translations.ts` exports `es` and `en` dictionaries (typed by a
  shared `Translations` interface so a missing key is a compile error).
- `src/i18n/LanguageProvider.tsx` — a React context/island wrapping the page
  content, exposing `{ lang, setLang, t }`. Persists the choice to
  `localStorage` (`pochy-lang`), defaults to `es`, and reads
  `navigator.language` only as a fallback for first-time visitors.
- Static, non-interactive `.astro` sections that need copy either receive
  translated strings as props from `index.astro` (read at build time for the
  default `es` render) or are themselves small `.tsx` islands that call
  `useLanguage()` — same pattern the reference project uses for its
  Client-suffixed components.
- A toggle in the header (and mobile menu) switches `lang` instantly, no
  reload, no route change.

## 6. Content & sections

All copy is a first draft the user can edit post-build; nothing here is
final marketing copy.

1. **Header** — logo, anchor nav (Servicios, Nosotros, Ubicación,
   Contacto), ES/EN toggle, WhatsApp CTA button. Transparent over hero,
   solidifies on scroll.
2. **Hero** — "Pochy MotorBike" + tagline ("Taller de motos y
   mantenimientos generales en Medellín"), primary CTA
   ("Agenda por WhatsApp"), secondary CTA (scroll to services). Animated
   gradient/glow background, staggered entrance.
3. **Servicios** — mantenimiento general, cambio de aceite, frenos,
   diagnóstico eléctrico, repuestos — as distinct cards with the
   "01/02/03…" numbering motif, each linking its own WhatsApp message
   (e.g. "Hola, quiero cotizar *cambio de aceite*").
4. **Financiación (Addi)** — a callout banner mirroring the Instagram
   "Crédito" highlight: "Financia tu mantenimiento con Addi", with a CTA to
   ask about it via WhatsApp.
5. **Por qué elegirnos / Clientes** — 3–4 trust points (experiencia,
   repuestos originales, atención personalizada, ubicación central) — no
   fabricated testimonials or fake review counts, since we have no real
   client quotes to use.
6. **Ubicación y horario** — Medellín + placeholder hours (marked clearly
   as "ajustar" in a code comment), embedded map link that opens Google
   Maps search for the shop name + city (no fabricated exact address/pin).
7. **CTA final** — full-bleed closing section, big WhatsApp button.
8. **Footer** — Instagram link (@pochy_motorbike), WhatsApp, quick nav,
   year.
9. **Floating WhatsApp button** — persistent, all breakpoints, opens
   `https://wa.me/573166876163` with a prefilled greeting.

## 7. Images

Stock photography (motorcycle workshop / mechanic-at-work / tools /
motorcycle detail shots), color-graded via a CSS overlay to match the dark
red/orange palette so stock images read as "on-brand" rather than generic
stock. No images are pulled from the Instagram account itself (not
accessible without login, and third-party client photos shouldn't be reused
without permission anyway).

## 8. Responsive & accessibility

Mobile-first Tailwind breakpoints; mobile gets a slide-in nav menu (animated)
instead of the desktop anchor row. Respect `prefers-reduced-motion` (Framer
Motion variants drop to opacity-only transitions). Color contrast checked
against the dark palette (off-white text, not pure red-on-black for body
copy).

## 9. Deploy

Same pattern as the reference project: `npm run build` + `scripts/deploy.js`
targeting Vercel or Netlify, decided later by the user. Not wired to a
specific account/project in this repo.

## 10. Out of scope

- No CMS/admin for editing content later (plain TS objects instead)
- No contact form / email backend — WhatsApp is the only conversion path
- No blog, no multi-page routing
- No real testimonials, exact street address, or business hours — these are
  placeholders the user fills in before publishing

## 11. Open assumptions (flag if wrong)

- WhatsApp number `+57 316 687 6163` is correct and WhatsApp-enabled
- "Medellín" is sufficient location detail for now; no exact address supplied
- Generic service list is acceptable as a first draft
