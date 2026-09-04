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
