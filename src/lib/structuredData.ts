import { BUSINESS } from './business';
import { buildMapsSearchUrl } from './maps';

interface LocalBusinessInput {
  pageUrl: string;
  imageUrl: string;
  description: string;
  langCode: string;
}

/** schema.org AutoRepair (a LocalBusiness subtype) — what Google reads for the local pack / Maps. */
export function buildLocalBusinessJsonLd({ pageUrl, imageUrl, description, langCode }: LocalBusinessInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${pageUrl}#business`,
    name: BUSINESS.name,
    description,
    url: pageUrl,
    image: imageUrl,
    logo: imageUrl,
    telephone: BUSINESS.phoneE164,
    inLanguage: langCode,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${BUSINESS.streetAddress}, ${BUSINESS.neighborhood}`,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.countryCode,
    },
    areaServed: { '@type': 'City', name: BUSINESS.city },
    hasMap: buildMapsSearchUrl(BUSINESS.mapsQuery),
    sameAs: [BUSINESS.instagramUrl],
    paymentAccepted: 'Addi, Sistecrédito, Redeban',
  };
}

/** JSON for a <script type="application/ld+json">, with "<" escaped so content can't close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
