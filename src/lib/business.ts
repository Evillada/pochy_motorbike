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
} as const;

export const FULL_ADDRESS = `${BUSINESS.streetAddress}, ${BUSINESS.neighborhood}, ${BUSINESS.city}`;
