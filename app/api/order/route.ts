import {products, productBrand, type Product} from '../../catalog';

// Sends orders and B2B requests from the site to Telegram.
// Required env vars (set them in Railway → Variables, never in code):
//   TELEGRAM_BOT_TOKEN — token from @BotFather
//   TELEGRAM_CHAT_ID   — chat id (or several, comma-separated) that receives the messages

export const dynamic = 'force-dynamic';

const DELIVERY: Record<string, string> = {courier: 'Курьер · Ташкент', pickup: 'Самовывоз', region: 'В регионы'};
const PAYMENT: Record<string, string> = {payme: 'Payme', click: 'Click', card: 'UZCARD / HUMO', invoice: 'По счёту', cash: 'При получении'};

const unitPrice = (p: Product, n: number) =>
  n >= 20 ? Math.round((p.price ?? 0) * 0.88) : n >= 5 ? Math.round((p.price ?? 0) * 0.95) : (p.price ?? 0);
const money = (v: number) => new Intl.NumberFormat('ru-RU').format(v).replace(/ /g, ' ');
const esc = (v: unknown) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// Simple in-memory limit: at most 5 submissions per IP per 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 5;
}

function orderNumber() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `FM-${p(d.getUTCDate())}${p(d.getUTCMonth() + 1)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function buildOrder(body: Record<string, unknown>, no: string) {
  const name = str(body.name, 100);
  const phone = str(body.phone, 40);
  if (!name || phone.replace(/\D/g, '').length < 9) return {error: 'contact'};

  const raw = Array.isArray(body.items) ? body.items.slice(0, 100) : [];
  const lines: string[] = [];
  let subtotal = 0;
  let unknownPrice = false;
  for (const it of raw) {
    const id = str((it as {id?: unknown})?.id, 120);
    const qty = Math.floor(Number((it as {qty?: unknown})?.qty));
    const p = products.find((x) => x.id === id);
    if (!p || !(qty >= 1 && qty <= 1000)) continue;
    const brand = productBrand(p);
    const label = `${brand ? brand + ' ' : ''}${p.name}${p.variantLabel ? ' · ' + p.variantLabel : ''} — ${p.color}${p.type === 'filament' ? ' · 1 кг' : ''}`;
    if (p.price == null) {
      unknownPrice = true;
      lines.push(`• ${esc(label)} × ${qty} — <i>цена уточняется</i>\n  <code>${esc(p.id)}</code>`);
    } else {
      const u = unitPrice(p, qty);
      subtotal += u * qty;
      lines.push(`• ${esc(label)} × ${qty} = ${money(u * qty)} сум\n  <code>${esc(p.id)}</code>`);
    }
  }
  if (!lines.length) return {error: 'cart'};

  const delivery = DELIVERY[str(body.delivery, 20)] ? str(body.delivery, 20) : 'courier';
  const deliveryPrice = delivery === 'pickup' || subtotal >= 1000000 ? 0 : delivery === 'region' ? 45000 : 25000;
  const payment = PAYMENT[str(body.payment, 20)] ?? '—';
  const isCompany = body.customer === 'company';

  const text = [
    `🛒 <b>Новый заказ ${no}</b>`,
    '',
    `<b>Клиент:</b> ${esc(name)}${isCompany ? ' (компания)' : ''}`,
    `<b>Телефон:</b> ${esc(phone)}`,
    isCompany ? `<b>Компания:</b> ${esc(str(body.company, 150))}\n<b>ИНН:</b> ${esc(str(body.inn, 20))}` :null,
    `<b>Получение:</b> ${DELIVERY[delivery]}`,
    delivery !== 'pickup' ? `<b>Адрес:</b> ${esc(str(body.address, 300))}` :null,
    `<b>Оплата:</b> ${payment}`,
    str(body.comment) ? `<b>Комментарий:</b> ${esc(str(body.comment, 1000))}` :null,
    '',
    '<b>Товары:</b>',
    ...lines,
    '',
    `Товары: ${money(subtotal)} сум`,
    `Доставка: ${deliveryPrice ? money(deliveryPrice) + ' сум' : 'бесплатно'}`,
    `<b>Итого: ${money(subtotal + deliveryPrice)} сум</b>${unknownPrice ? ' + позиции с уточняемой ценой' : ''}`,
    `Язык сайта: ${body.lang === 'uz' ? 'UZ' : 'RU'}`,
  ];
  return {text: text.filter((l) => l !== null).join('\n')};
}

function buildBusiness(body: Record<string, unknown>, no: string) {
  const company = str(body.company, 150);
  const contact = str(body.contact, 100);
  const phone = str(body.phone, 40);
  if (!company || !contact || phone.replace(/\D/g, '').length < 9) return {error: 'contact'};
  const edu = body.segment === 'education';
  const text = [
    `🏢 <b>B2B-заявка ${no}</b>`,
    '',
    `<b>Тип:</b> ${edu ? 'Образование' : 'Бизнес'}`,
    `<b>Компания:</b> ${esc(company)}`,
    `<b>ИНН:</b> ${esc(str(body.inn, 20))}`,
    `<b>Контакт:</b> ${esc(contact)}`,
    `<b>Телефон:</b> ${esc(phone)}`,
    edu && str(body.printers, 10) ? `<b>Принтеров:</b> ${esc(str(body.printers, 10))}` : '',
    str(body.details) ? `<b>Что печатают:</b> ${esc(str(body.details, 1500))}` : '',
    `Язык сайта: ${body.lang === 'uz' ? 'UZ' : 'RU'}`,
  ];
  return {text: text.filter(Boolean).join('\n')};
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_CHAT_ID ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!token || !chats.length) {
    console.error('[order] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set');
    return Response.json({ok: false, error: 'not_configured'}, {status: 503});
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ok: false, error: 'bad_request'}, {status: 400});
  }

  // Honeypot: bots fill the hidden "website" field, people never see it.
  if (str(body.website)) return Response.json({ok: true, number: orderNumber()});

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return Response.json({ok: false, error: 'rate_limited'}, {status: 429});

  const no = orderNumber();
  const built = body.kind === 'business' ? buildBusiness(body, no) : buildOrder(body, no);
  if ('error' in built) return Response.json({ok: false, error: built.error}, {status: 400});

  let delivered = 0;
  for (const chat of chats) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({chat_id: chat, text: built.text, parse_mode: 'HTML', disable_web_page_preview: true}),
        signal: AbortSignal.timeout(10_000),
      });
      if (r.ok) delivered++;
      else console.error('[order] Telegram error', r.status, await r.text());
    } catch (e) {
      console.error('[order] Telegram request failed', e);
    }
  }
  if (!delivered) return Response.json({ok: false, error: 'send_failed'}, {status: 502});
  return Response.json({ok: true, number: no});
}
