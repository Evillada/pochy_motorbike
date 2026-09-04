export const WHATSAPP_PHONE = '573166876163';

export function buildWhatsAppUrl(message: string, phone: string = WHATSAPP_PHONE): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
