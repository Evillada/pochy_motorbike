export const WHATSAPP_PHONE = '573114021002';

export function buildWhatsAppUrl(message: string, phone: string = WHATSAPP_PHONE): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
