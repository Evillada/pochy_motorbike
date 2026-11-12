import { WHATSAPP_PHONE } from './whatsapp';

// TODO(pochy): confirm the street address — taken from the shop's Google Maps listing.
export const BUSINESS = {
  name: 'Pochy Motorbike',
  streetAddress: 'Cra. 74E #32F-09',
  neighborhood: 'Belén',
  city: 'Medellín',
  region: 'Antioquia',
  countryCode: 'CO',
  phoneDisplay: '+57 311 402 1002',
  phoneE164: `+${WHATSAPP_PHONE}`,
  instagramUrl: 'https://www.instagram.com/pochy_motorbike/',
  // Must match the name on the Google Maps listing, or the embed won't find the shop.
  mapsQuery: 'Pochy Motorbike Medellín',
  // `lrd=<feature id>,3` opens Google's "write a review" dialog for this listing.
  reviewUrl: 'https://www.google.com/search?q=Pochy+Motorbike#lrd=0x8e4429e3867e6df5:0xfc251b08721d8995,3',
  // Copied from the Google listing by hand — update when it changes.
  googleRating: '5.0',
  googleReviewCount: 7,
} as const;

export const FULL_ADDRESS = `${BUSINESS.streetAddress}, ${BUSINESS.neighborhood}, ${BUSINESS.city}`;
