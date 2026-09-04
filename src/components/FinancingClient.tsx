import { useId } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { Button } from '@/components/ui/Button';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

/**
 * Original illustration: an installment card — a credit-card silhouette
 * with three "cuota" dots (one lit) and a small coin — standing in for a
 * stock "financing" photo. Ties the Addi partnership to something visual
 * instead of just the paragraph explaining it.
 */
function InstallmentCardIllustration({ className = '' }: { className?: string }) {
  const gradientId = `financing-gradient-${useId()}`;
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <rect
        x="14"
        y="26"
        width="150"
        height="98"
        rx="14"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
      />
      <rect x="14" y="50" width="150" height="14" fill={`url(#${gradientId})`} opacity="0.25" />
      <rect x="30" y="86" width="26" height="18" rx="4" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" />
      <circle cx="150" cy="95" r="16" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" />
      <path d="M144 95h12M150 89v12" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" />
      {/* Three installment dots — the middle one "due now" is filled. */}
      <circle cx="96" cy="96" r="5" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" />
      <circle cx="114" cy="96" r="5" fill={`url(#${gradientId})`} />
      <circle cx="132" cy="96" r="5" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" />
    </svg>
  );
}

export default function FinancingClient() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(t.financing.whatsappMessage);

  return (
    <MotionRoot>
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="card-surface relative overflow-hidden p-10 sm:p-14"
        >
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_40%,transparent),transparent)]"
          />
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {t.financing.eyebrow}
              </span>
              <h2 className="mt-3 max-w-xl font-body text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {t.financing.title}
              </h2>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">{t.financing.description}</p>
              <div className="mt-8">
                <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer">
                  {t.financing.ctaLabel}
                </Button>
              </div>
            </div>
            <InstallmentCardIllustration className="hidden lg:block w-full max-w-xs mx-auto" />
          </div>
        </motion.div>
      </div>
    </section>
    </MotionRoot>
  );
}
