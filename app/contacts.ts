// Store contacts shown across the site and in JSON-LD.
// Values come from the owner (SEO brief 2026-10-29). Phone and Telegram can be
// overridden in Railway → Variables (CONTACT_PHONE / CONTACT_TELEGRAM) without a rebuild.
export type Contacts = {phone: string; telegram: string};

export const DEFAULT_CONTACTS: Contacts = {phone: '+998 99 454-19-13', telegram: 'kemalsen'};

export const HOURS = {ru: 'Ежедневно 09:00–21:00', uz: 'Har kuni 09:00–21:00', opens: '09:00', closes: '21:00'};

export const PICKUP_POINTS = [
  {id: 'tashkent', city: {ru: 'Ташкент', uz: 'Toshkent'}, street: {ru: 'ул. Бобура, 42', uz: 'Bobur ko‘chasi, 42'}},
  {id: 'navoi', city: {ru: 'Навои', uz: 'Navoiy'}, street: {ru: 'ул. Спутник, 3', uz: 'Sputnik ko‘chasi, 3'}},
] as const;

export function readContacts(): Contacts {
  const phone = (process.env.CONTACT_PHONE ?? DEFAULT_CONTACTS.phone).trim();
  const telegram = (process.env.CONTACT_TELEGRAM ?? DEFAULT_CONTACTS.telegram)
    .trim()
    .replace(/^https?:\/\/t\.me\//, '')
    .replace(/^@/, '');
  return {phone, telegram};
}

export const phoneDigits = (phone: string) => phone.replace(/[^\d+]/g, '');
export const telHref = (phone: string) => `tel:${phoneDigits(phone)}`;
export const tgHref = (user: string, text = '') =>
  user ? `https://t.me/${user}${text ? `?text=${encodeURIComponent(text)}` : ''}` : '';
