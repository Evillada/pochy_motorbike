import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LANG_NAMES, LANGS, langPath, translations, type Lang } from '@/i18n/translations';
import { Button } from '@/components/ui/Button';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

const NAV_ANCHORS = ['services', 'why-us', 'location', 'contact'] as const;

export default function HeaderClient({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLabels: Record<(typeof NAV_ANCHORS)[number], string> = {
    services: t.nav.services,
    'why-us': t.nav.whyUs,
    location: t.nav.location,
    contact: t.nav.contact,
  };

  const whatsappHref = buildWhatsAppUrl(t.hero.whatsappMessage);

  return (
    <MotionRoot>
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl backdrop-saturate-150 bg-background/70 shadow-[0_1px_0_0_var(--border)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
        <a href="#top" className="flex h-11 shrink-0 items-center">
          <img
            src="/images/pochy-logo.jpg"
            alt="Pochy Motorbike"
            width={536}
            height={367}
            className="h-9 sm:h-11 w-auto mix-blend-screen"
          />
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button
              type="button"
              aria-label={t.languageToggle.label}
              aria-expanded={langOpen}
              aria-controls="language-menu"
              onClick={() => setLangOpen((open) => !open)}
              className="inline-flex h-11 items-center gap-1 rounded-full bg-white/[0.06] shadow-[0_0_0_1px_var(--border)] px-3.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {lang}
              <ChevronDown aria-hidden className="h-3.5 w-3.5" />
            </button>
            <ul
              id="language-menu"
              className={cn(
                'absolute right-0 top-full mt-2 min-w-[11rem] rounded-2xl bg-background/95 p-1.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)] ring-1 ring-border backdrop-blur-xl',
                !langOpen && 'hidden',
              )}
            >
              {LANGS.map((code) => (
                <li key={code}>
                  <a
                    href={langPath(code)}
                    hrefLang={code}
                    lang={code}
                    aria-current={code === lang ? 'page' : undefined}
                    className={cn(
                      'flex min-h-11 items-center justify-between gap-4 rounded-xl px-3 text-sm font-medium hover:bg-muted',
                      code === lang ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {LANG_NAMES[code]}
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{code}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden sm:block">
            <Button
              as="a"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              className="px-4 py-2.5 text-sm"
            >
              {t.hero.ctaPrimary}
            </Button>
          </div>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-border"
          >
            <span className="flex h-4 w-5 flex-col justify-between">
              <span className="h-0.5 w-full bg-foreground" />
              <span className="h-0.5 w-full bg-foreground" />
              <span className="h-0.5 w-full bg-foreground" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_ANCHORS.map((anchor) => (
                <a
                  key={anchor}
                  href={`#${anchor}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center rounded-xl px-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {navLabels[anchor]}
                </a>
              ))}
              <Button
                as="a"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                className="mt-2"
              >
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
