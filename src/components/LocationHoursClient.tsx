import { useId } from 'react';
import { motion } from 'framer-motion';
import { translations, type Lang } from '@/i18n/translations';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildMapsEmbedUrl, buildMapsSearchUrl } from '@/lib/maps';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { BUSINESS, FULL_ADDRESS } from '@/lib/business';

/** Small original pictogram, shared shape for both cards in this section. */
function LocationGlyph({ variant, className = '' }: { variant: 'pin' | 'clock'; className?: string }) {
  const gradientId = `location-gradient-${useId()}`;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-deep)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {variant === 'pin' ? (
          <>
            <path d="M24 6c8 0 14 6 14 14 0 10-14 22-14 22S10 30 10 20c0-8 6-14 14-14Z" />
            <circle cx="24" cy="20" r="5" />
          </>
        ) : (
          <>
            <circle cx="24" cy="24" r="16" />
            <path d="M24 15v9l7 4" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function LocationHoursClient({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const mapsHref = buildMapsSearchUrl(BUSINESS.mapsQuery);
  const mapsEmbedSrc = buildMapsEmbedUrl(BUSINESS.mapsQuery);
  const appointmentHref = buildWhatsAppUrl(t.location.appointmentWhatsappMessage);

  return (
    <MotionRoot>
    <section id="location" className="relative scroll-mt-24 py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.location.eyebrow} title={t.location.title} />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
            <motion.div
              whileHover={{ y: -4 }}
              className="reveal card-surface p-6 sm:p-8"
            >
              <motion.span
                className="inline-block"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
              >
                <LocationGlyph variant="pin" className="h-10 w-10" />
              </motion.span>
              <p className="mt-4 font-body text-xl font-semibold tracking-[-0.01em]">{t.location.citySummary}</p>
              <address className="mt-2 not-italic text-sm text-muted-foreground">
                {FULL_ADDRESS}
                <br />
                <a href={`tel:${BUSINESS.phoneE164}`} className="inline-flex min-h-11 items-center font-medium text-foreground hover:text-accent">
                  {BUSINESS.phoneDisplay}
                </a>
              </address>
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-accent hover:text-foreground"
              >
                {t.location.mapCtaLabel}
                <span aria-hidden>&rarr;</span>
              </a>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="reveal card-surface p-6 sm:p-8"
            >
              <LocationGlyph variant="clock" className="h-10 w-10" />
              <p className="mt-4 font-body text-xl font-semibold tracking-[-0.01em]">{t.location.hoursTitle}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.3em] text-accent">
                {t.location.appointmentOnly}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t.location.appointmentNote}</p>
              <Button
                as="a"
                href={appointmentHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full px-5 py-3 text-sm sm:w-auto"
              >
                {t.location.appointmentCtaLabel}
              </Button>
            </motion.div>
          </div>

          <div
            className="reveal card-surface flex min-h-[300px] overflow-hidden p-2 sm:min-h-[360px] lg:min-h-[380px]"
          >
            <iframe
              title={t.location.mapTitle}
              src={mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full flex-1 rounded-[1.4rem] border-0"
            />
          </div>
        </div>

        <div className="reveal card-surface mt-4 flex flex-col items-center gap-5 p-6 text-center sm:mt-6 sm:flex-row sm:justify-between sm:p-8 sm:text-left">
          <div>
            <p className="font-body text-lg font-semibold tracking-[-0.01em]">{t.location.reviewsTitle}</p>
            <a
              href={BUSINESS.reviewUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <span className="font-semibold text-foreground">{BUSINESS.googleRating}</span>
              <span className="flex gap-0.5 text-accent" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.svg
                    key={i}
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 0.6, delay: i * 0.12, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                  </motion.svg>
                ))}
              </span>
              <span>
                {BUSINESS.googleReviewCount} {t.location.reviewsCount}
              </span>
            </a>
          </div>
          <Button
            as="a"
            href={BUSINESS.reviewUrl}
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            className="w-full shrink-0 px-5 py-3 text-sm sm:w-auto"
          >
            {t.location.reviewsCtaLabel}
          </Button>
        </div>
      </div>
    </section>
    </MotionRoot>
  );
}
