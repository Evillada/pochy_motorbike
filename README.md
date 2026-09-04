# Pochy MotorBike Landing Page

A modern, fast landing page for Pochy MotorBike, a motorcycle workshop in Medellín, Colombia. Built with Astro, React, Tailwind CSS, and Framer Motion for smooth animations and excellent performance.

## Getting Started

```bash
npm install          # Install dependencies
npm run dev          # Start the development server
npm run build        # Build for production
npm run preview      # Preview the production build locally
npm test             # Run tests
npm run check        # Type-check and lint
```

## Before You Deploy

Please confirm these items before launching to production:

- **Set `PUBLIC_SITE_URL`** (src/layouts/Layout.astro:10)
  - Copy `.env.example` to `.env` and replace `https://your-real-domain.com` with the real production URL.
  - Alternatively, set the environment variable directly in your hosting provider.
  - Without this, the canonical URL and Open Graph tags will point to the placeholder domain `https://pochymotorbike.example.com`.

- **Confirm business hours** (src/i18n/translations.ts:169 and 283)
  - Search for `TODO(pochy)` in `src/i18n/translations.ts`.
  - The Spanish `location.hours` array (line 170–174) and English `location.hours` array (line 284–288) are currently set to placeholder hours.
  - Update both to the real business hours before launch.

- **Verify WhatsApp number** (src/lib/whatsapp.ts:1)
  - The current number is `573166876163`.
  - Confirm this is correct and that the account is WhatsApp Business-enabled.

- **Confirm Google Maps location** (src/components/LocationHoursClient.tsx:8)
  - The current query is `'Pochy MotorBike Medellín'` (a name + city search).
  - Test that this resolves to the correct workshop location in Google Maps.
  - Once a confirmed street address is available, replace the search query with the exact address for better accuracy.

## Deploy

Both Vercel and Netlify auto-detect Astro projects:

```bash
npm run build
# Publish the `dist/` directory
```

No additional configuration needed.
