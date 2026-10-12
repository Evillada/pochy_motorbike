import { translations, type Lang } from '@/i18n/translations';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { BUSINESS, FULL_ADDRESS } from '@/lib/business';

export default function FooterClient({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const whatsappHref = buildWhatsAppUrl(t.hero.whatsappMessage);
  const year = new Date().getFullYear();

  return (
    <MotionRoot>
    {/* Bottom padding keeps the copyright clear of the floating WhatsApp button on phones. */}
    <footer id="contact" className="scroll-mt-24 pt-14 pb-28 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 text-center sm:gap-6 sm:px-6">
        <img
          src="/images/pochy-logo.jpg"
          alt=""
          aria-hidden
          width={536}
          height={367}
          loading="lazy"
          className="h-14 w-auto mix-blend-screen"
        />
        <p className="max-w-sm text-sm text-muted-foreground">{t.footer.tagline}</p>

        <address className="not-italic text-sm text-muted-foreground">
          {FULL_ADDRESS}
          <br />
          <a href={`tel:${BUSINESS.phoneE164}`} className="inline-flex min-h-11 items-center hover:text-accent">
            {BUSINESS.phoneDisplay}
          </a>
        </address>

        <div className="flex flex-wrap items-center justify-center gap-x-6 text-sm font-semibold">
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-accent hover:text-foreground"
          >
            {t.footer.instagramLabel}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-accent hover:text-foreground"
          >
            {t.footer.whatsappLabel}
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {year} Pochy Motorbike. {t.footer.rights}
        </p>
      </div>
    </footer>
    </MotionRoot>
  );
}
