import {ORDER_LEAD_TIME} from './stock';
import type {Metadata} from 'next';
import {products, productBrand, fromPrice, matchesMaterial, type Product} from './catalog';
import productSeoData from './data/product-seo.json';
import {ARTICLES, findArticle} from './articles';
import {MATERIAL_SLUGS, MATERIAL_FILTER, type MaterialSlug} from './material-pages';
import {PART_SLUGS, partSlugOf} from './part-pages';
import {DEFAULT_CONTACTS, HOURS, PICKUP_POINTS, phoneDigits, type Contacts} from './contacts';

// Public address of the site. Can be overridden with the SITE_URL env var.
export const SITE_URL = (process.env.SITE_URL || 'https://forma-3d.uz').replace(/\/$/, '');
export const LANGS = ['ru', 'uz'] as const;
export type Lang = (typeof LANGS)[number];

// Pages the store can render. Anything else returns a real 404.
export const PAGES = ['', 'catalog', 'product', 'cart', 'business', 'account', 'delivery', 'contacts', 'knowledge', 'offer', 'privacy', 'returns'] as const;
// Indexable pages that go into the sitemap (cart / account are private; ?page=N is not listed).
export const SITEMAP_PAGES = ['', 'catalog', 'catalog/parts', 'catalog/hotends', 'catalog/plates', 'catalog/pla', 'catalog/petg', 'catalog/abs-asa', 'catalog/tpu', 'business', 'delivery', 'contacts', 'knowledge', 'offer', 'privacy', 'returns'];

export function findProduct(id?: string) {
  return id ? products.find((p) => p.id === id) : undefined;
}

/** Returns true when the path (without language) is a page the store can show. */
export function isValidPath(path: string[]) {
  const [page = '', sub, extra] = path;
  if (!(PAGES as readonly string[]).includes(page)) return false;
  if (page === 'product') return path.length === 2 && !!findProduct(sub);
  if (page === 'catalog') return !sub || ((sub === 'parts' || (MATERIAL_SLUGS as string[]).includes(sub) || (PART_SLUGS as string[]).includes(sub)) && !extra);
  if (page === 'knowledge') return !sub || (!!findArticle(sub) && !extra);
  return path.length <= 1;
}

const TITLE_MAX = 60;
const DESC_MAX = 160;
const SUFFIX = ' | Forma 3D';
const formatPrice = (v: number) => new Intl.NumberFormat('ru-RU').format(v).replace(/\s/g, ' ');

/* ------------------------------------------------------------------ */
/* Product pages (brief 1.1, 1.3, 1.4)                                 */
/* ------------------------------------------------------------------ */

export type ProductKind = 'spool' | 'refill' | 'request' | 'choice' | 'part';
type SeoRow = {kind: ProductKind; title_ru: string; title_uz: string; h1_ru: string; h1_uz: string};
const SEO_ROWS = productSeoData as Record<string, SeoRow>;

const lowerFirst = (s: string) => (s ? s[0].toLocaleLowerCase('ru') + s.slice(1) : s);

export function productKind(p: Product): ProductKind {
  const row = SEO_ROWS[p.id];
  if (row) return row.kind;
  if (p.type === 'parts') return 'part';
  if (p.availability === 'order' || p.id.includes('-request-')) return 'request';
  return p.format === 'refill' ? 'refill' : 'spool';
}

/** Filament line and colour as used in titles/H1 ("PLA Basic", "чёрный"). */
function filamentParts(p: Product, uz: boolean) {
  const line = p.material;
  const h1 = SEO_ROWS[p.id]?.[uz ? 'h1_uz' : 'h1_ru'];
  const prefix = `Bambu Lab ${line} `;
  if (h1 && h1.startsWith(prefix) && h1.includes(' — ')) {
    const color = h1.slice(prefix.length, h1.indexOf(' — '));
    if (color) return {line, color};
  }
  return {line, color: uz ? lowerFirst(p.uzColor) : lowerFirst(p.color)};
}

/** Visible "Формат" value on the product page. */
export function formatLabel(p: Product, uz: boolean) {
  if (p.type !== 'filament') return '';
  if (p.format === 'refill') return uz ? 'Refill 1 kg (g‘altaksiz)' : 'Рефилл 1 кг (без катушки)';
  return uz ? 'G‘altakda 1 kg' : 'Катушка 1 кг';
}

function fitTitle(candidates: string[]) {
  return candidates.find((c) => c.length <= TITLE_MAX) ?? candidates[candidates.length - 1];
}

/** Template titles/H1 for products that are not in the reference table (new products). */
function templateTitleH1(p: Product, uz: boolean): {title: string; h1: string} {
  const kind = productKind(p);
  if (kind === 'part') {
    const name = uz ? p.uzName || p.name : p.name;
    const models = /^[A-Z0-9 /]+$/i.test(p.color) && /\d/.test(p.color) ? p.color.replace(/\s*\/\s*/g, '/') : '';
    const title = uz
      ? fitTitle(models ? [`Bambu Lab ${models} ${name}${SUFFIX}`] : [`Bambu Lab uchun ${name} — Toshkentda${SUFFIX}`, `Bambu Lab uchun ${name}${SUFFIX}`])
      : fitTitle(models ? [`${name} для Bambu Lab ${models}${SUFFIX}`] : [`${name} для Bambu Lab — купить в Ташкенте${SUFFIX}`, `${name} для Bambu Lab${SUFFIX}`]);
    const h1 = uz ? (models ? `Bambu Lab ${p.color} uchun ${name}` : `Bambu Lab uchun ${name}`) : models ? `${name} для Bambu Lab ${p.color}` : `${name} для Bambu Lab`;
    return {title, h1};
  }
  const {line, color} = filamentParts(p, uz);
  const bl = 'Bambu Lab ';
  if (kind === 'request')
    return uz
      ? {title: fitTitle([`${bl}${line} buyurtmaga, g‘altakda 1 kg${SUFFIX}`, `${line} buyurtmaga, g‘altakda 1 kg${SUFFIX}`]), h1: `${bl}${line} — buyurtmaga, g‘altakda 1 kg`}
      : {title: fitTitle([`${bl}${line} под заказ, катушка 1 кг${SUFFIX}`, `${line} под заказ, катушка 1 кг${SUFFIX}`]), h1: `${bl}${line} — под заказ, 1 кг на катушке`};
  if (kind === 'refill')
    return uz
      ? {title: fitTitle([`${bl}${line} ${color}, refill (g‘altaksiz)${SUFFIX}`, `${line} ${color}, refill (g‘altaksiz)${SUFFIX}`]), h1: `${bl}${line} ${color} — refill 1 kg, g‘altaksiz`}
      : {title: fitTitle([`${bl}${line} ${color}, рефилл без катушки${SUFFIX}`, `${line} ${color}, рефилл без катушки${SUFFIX}`]), h1: `${bl}${line} ${color} — рефилл 1 кг без катушки`};
  return uz
    ? {title: fitTitle([`${bl}${line} ${color}, g‘altakda 1 kg${SUFFIX}`, `${line} ${color}, g‘altakda 1 kg${SUFFIX}`]), h1: `${bl}${line} ${color} — g‘altakda 1 kg`}
    : {title: fitTitle([`${bl}${line} ${color}, катушка 1 кг${SUFFIX}`, `${line} ${color}, катушка 1 кг${SUFFIX}`]), h1: `${bl}${line} ${color} — 1 кг на катушке`};
}

/** Drop optional tail phrases until the text fits the limit (price is never dropped). */
function fitDescription(text: string, steps: [string, string][]) {
  let out = text;
  for (const [from, to] of steps) {
    if (out.length <= DESC_MAX) break;
    out = out.replace(from, to).replace(/\s{2,}/g, ' ').trim();
  }
  return out;
}

// Owner-approved descriptions for specific pages (brief part 2).
const DESCRIPTION_OVERRIDES: Record<string, {ru: string; uz: string}> = {
  'hotend-a1-04-steel': {
    ru: 'Хотэнд для Bambu Lab A1 и A1 mini, сопло 0,4 мм (сталь). Оригинальная запчасть, доставка по Ташкенту в день заказа или на следующий. Подберём по модели.',
    uz: 'Bambu Lab A1 va A1 mini uchun hotend, soplo 0.4 mm (po‘lat). Original ehtiyot qism, Toshkentda buyurtma kuni yoki ertasiga yetkazamiz. Modelga qarab tanlaymiz.',
  },
};

function productDescription(p: Product, uz: boolean, h1: string) {
  const override = DESCRIPTION_OVERRIDES[p.id];
  if (override) return uz ? override.uz : override.ru;
  const kind = productKind(p);
  // Real price, or the temporary «от 200 000» (ru: «Цена от 200 000 сум», uz: «Narxi 200 000 so‘mdan»).
  const from = p.price == null ? fromPrice(p) : null;
  const price = p.price != null ? formatPrice(p.price) : from != null ? `${uz ? '' : 'от '}${formatPrice(from)}` : '';
  const som = from != null ? 'so‘mdan' : 'so‘m';

  if (kind === 'part') {
    const brand = productBrand(p);
    const original = brand === 'Bambu Lab'; // own kits and no-name accessories are not called "original"
    const byModel = /\b(A1|A2L|P1P?|P1S|P2S|X1[CE]?|X2D|H2[DSC])\b/.test(`${p.color} ${p.variantLabel ?? ''}`); // «подберём по модели» only where models matter
    if (uz) {
      const text = `${h1}.${price ? ` Narxi ${price} ${som}.` : ''} ${original ? 'Original ehtiyot qism, ' : ''}Toshkentda buyurtma kuni yoki ertasiga yetkazamiz.${byModel ? ' Modelga qarab tanlaymiz.' : ''}`;
      return fitDescription(text, [[' Modelga qarab tanlaymiz.', ''], ['Original ehtiyot qism, Toshkentda', 'Toshkentda']]);
    }
    const tail = (original ? ' Оригинальная запчасть, доставка по Ташкенту в день заказа или на следующий.' : ' Доставка по Ташкенту в день заказа или на следующий.') + (byModel ? ' Подберём по модели.' : '');
    return fitDescription(`${h1}.${price ? ` Цена ${price} сум.` : ''}${tail}`, [[' Подберём по модели.', ''], ['Оригинальная запчасть, доставка', 'Доставка']]);
  }

  const {line, color} = filamentParts(p, uz);
  if (kind === 'request' || kind === 'choice') {
    const priceTail = price ? (uz ? ` Narxi ${price} ${som}.` : ` Цена ${price} сум.`) : '';
    if (kind === 'choice')
      return uz
        ? fitDescription(
            `Bambu Lab ${line} g‘altakda, 1 kg, 1,75 mm.${priceTail} Rangni buyurtmada tanlaymiz. Original filament. Toshkentda buyurtma kuni yoki ertasiga yetkazamiz.`,
            [[' Original filament.', ''], [' kuni yoki ertasiga', '']],
          )
        : fitDescription(
            `Bambu Lab ${line} на катушке, 1 кг, 1,75 мм.${priceTail} Цвет на выбор — уточним при заказе. Оригинальный филамент, доставка по Ташкенту в день заказа или на следующий.`,
            [[' Оригинальный филамент, доставка', ' Доставка'], [' в день заказа или на следующий', '']],
          );
    return uz
      ? fitDescription(
          `Bambu Lab ${line} buyurtmaga: g‘altakda 1 kg, 1,75 mm.${priceTail} Rang va yetkazish muddatini buyurtmada aniqlaymiz. Original Bambu Lab mahsuloti.`,
          [[' Original Bambu Lab mahsuloti.', '']],
        )
      : fitDescription(
          `Bambu Lab ${line} под заказ: 1 кг на катушке, 1,75 мм.${priceTail} Цвет и срок поставки уточним при заказе. Оригинальная продукция Bambu Lab.`,
          [[' Оригинальная продукция Bambu Lab.', '']],
        );
  }
  if (kind === 'refill') {
    if (uz)
      return price
        ? `Bambu Lab ${line} ${color} refill: 1 kg, 1,75 mm, g‘altaksiz. Narxi ${price} ${som}. Toshkentda buyurtma kuni yoki ertasiga yetkazamiz.`
        : `Bambu Lab ${line} ${color} refill: 1 kg, 1,75 mm, g‘altaksiz — qayta ishlatiladigan g‘altak uchun. Toshkentda buyurtma kuni yoki ertasiga yetkazamiz.`;
    return price
      ? `Рефилл Bambu Lab ${line} ${color}: 1 кг филамента 1,75 мм без катушки. Цена ${price} сум. Доставка по Ташкенту в день заказа или на следующий.`
      : `Рефилл Bambu Lab ${line} ${color}: 1 кг филамента 1,75 мм без катушки, для многоразовой катушки. Доставка по Ташкенту в день заказа или на следующий.`;
  }
  if (uz)
    return fitDescription(
      `Bambu Lab ${line} ${color} g‘altakda, 1 kg, 1,75 mm. Original filament. Toshkentda buyurtma kuni yoki ertasiga yetkazamiz.${price ? ` Narxi ${price} ${som}.` : ' Tanlashga yordam beramiz.'}`,
      [[' Tanlashga yordam beramiz.', '']],
    );
  return fitDescription(
    `Bambu Lab ${line} ${color} на катушке, 1 кг, 1,75 мм. Оригинальный филамент, доставка по Ташкенту в день заказа или на следующий.${price ? ` Цена ${price} сум.` : ' Поможем с выбором.'}`,
    [[' Поможем с выбором.', '']],
  );
}

export type ProductSeo = {title: string; h1: string; description: string; kind: ProductKind; format: string};

export function productSeo(p: Product, lang: Lang): ProductSeo {
  const uz = lang === 'uz';
  const row = SEO_ROWS[p.id];
  const base = row ? {title: uz ? row.title_uz : row.title_ru, h1: uz ? row.h1_uz : row.h1_ru} : templateTitleH1(p, uz);
  let description = productDescription(p, uz, base.h1);
  // Товар не на складе → в описании честный срок «под заказ», а не доставка сегодня/завтра.
  if (!((p.stock ?? 0) > 0))
    description = description
      .replace('доставка по Ташкенту в день заказа или на следующий', `под заказ из Китая за ${ORDER_LEAD_TIME.ru}`)
      .replace('Доставка по Ташкенту в день заказа или на следующий', `Под заказ из Китая за ${ORDER_LEAD_TIME.ru}`)
      .replace('Toshkentda buyurtma kuni yoki ertasiga yetkazamiz', `Xitoydan ${ORDER_LEAD_TIME.uz} ichida buyurtma asosida olib kelamiz`);
  // Срок «под заказ» длиннее фразы о доставке — снова уложиться в лимит.
  description = fitDescription(description, [[' Подберём по модели.', ''], [' Modelga qarab tanlaymiz.', ''], ['Оригинальная запчасть, под заказ', 'Под заказ'], ['Original ehtiyot qism, Xitoydan', 'Xitoydan']]);
  return {...base, description, kind: productKind(p), format: formatLabel(p, uz)};
}

/** Back-compat helper used in Telegram messages and the client title. */
export function productTitle(p: Product, uz: boolean) {
  return productSeo(p, uz ? 'uz' : 'ru').h1;
}

/** Visible availability label key, shared by the page and JSON-LD so they never disagree. */
export function availabilityOf(p: Product): 'InStock' | 'OutOfStock' | 'PreOrder' | null {
  if (productKind(p) === 'request') return 'PreOrder';
  if (p.stock === null) return p.availability === 'order' ? 'PreOrder' : null;
  return p.stock > 0 ? 'InStock' : 'PreOrder'; // stock 0 is shown as «Под заказ»
}

/* ------------------------------------------------------------------ */
/* Static pages (brief part 2)                                         */
/* ------------------------------------------------------------------ */

type PageText = {title: string; description: string; h1: string};
const PAGE_TEXT: Record<string, Record<Lang, PageText>> = {
  '': {
    ru: {
      title: 'Филамент и запчасти Bambu Lab в Ташкенте | Forma 3D',
      description: 'Оригинальный филамент Bambu Lab, хотэнды, столы и запчасти в Ташкенте. Доставка в день заказа или на следующий, опт для бизнеса. Выберите материал в каталоге.',
      h1: 'Филамент и запчасти Bambu Lab в Ташкенте',
    },
    uz: {
      title: 'Bambu Lab filament va ehtiyot qismlar Toshkentda | Forma 3D',
      description: 'Original Bambu Lab filamenti, hotendlar, stollar va ehtiyot qismlar Toshkentda. Buyurtma kuni yoki ertasiga yetkazamiz, biznes uchun ulgurji. Katalogni ko‘ring!',
      h1: 'Toshkentda Bambu Lab filamenti va ehtiyot qismlari',
    },
  },
  catalog: {
    ru: {
      title: 'Филамент Bambu Lab купить в Ташкенте — PLA, PETG | Forma 3D',
      description: 'Филамент Bambu Lab 1,75 мм в Ташкенте: PLA, PETG, ABS, ASA, TPU и инженерные пластики. Доставка в день заказа или на следующий. Выберите материал и цвет.',
      h1: 'Филамент Bambu Lab для 3D-принтера',
    },
    uz: {
      title: 'Bambu Lab filament sotib olish, Toshkent | Forma 3D',
      description: 'Toshkentda Bambu Lab filamenti 1,75 mm: PLA, PETG, ABS, ASA, TPU va muhandislik plastiklari. Buyurtma kuni yoki ertasiga yetkazamiz. Rangni tanlang!',
      h1: '3D-printer uchun Bambu Lab filamenti',
    },
  },
  'catalog/parts': {
    ru: {
      title: 'Запчасти Bambu Lab в Ташкенте — хотэнды, столы | Forma 3D',
      description: 'Хотэнды и сопла, печатные столы, AMS и детали для ремонта Bambu Lab A1, P1S, X1C, H2D. Доставка по Ташкенту в день заказа или на следующий. Подберём по модели.',
      h1: 'Запчасти и расходники для Bambu Lab',
    },
    uz: {
      title: 'Bambu Lab ehtiyot qismlari Toshkentda | Forma 3D',
      description: 'Bambu Lab A1, P1S, X1C, H2D uchun hotend va soplolar, bosma stollari, AMS qismlari. Toshkentda buyurtma kuni yoki ertasiga yetkazamiz. Modelga qarab tanlaymiz.',
      h1: 'Bambu Lab uchun ehtiyot qismlar va sarf materiallari',
    },
  },
  'catalog/hotends': {
    ru: {
      title: 'Хотэнды и сопла Bambu Lab купить в Ташкенте | Forma 3D',
      description: 'Оригинальные хотэнды Bambu Lab в Ташкенте: 0,4 мм для A1, P1S, X1C, закалённые для CF/GF, 0,2 и 0,6 мм, хотэнды для P2S и H2D. Подберём по модели.',
      h1: 'Хотэнды и сопла для Bambu Lab A1, P1S, X1C',
    },
    uz: {
      title: 'Bambu Lab hotend va soplolari, Toshkent | Forma 3D',
      description: 'Toshkentda original Bambu Lab hotendlari: A1, P1S, X1C uchun 0,4 mm, CF/GF uchun toblangan, 0,2 va 0,6 mm, P2S va H2D uchun. Modelga qarab tanlaymiz.',
      h1: 'Bambu Lab A1, P1S, X1C uchun hotend va soplolar',
    },
  },
  'catalog/plates': {
    ru: {
      title: 'Печатные столы Bambu Lab купить в Ташкенте | Forma 3D',
      description: 'Оригинальные столы Bambu Lab в Ташкенте: Textured PEI 180 мм для A1 mini и 256 мм для A1, P1S, X1C, Smooth PEI, Cool Plate SuperTack, Engineering Plate.',
      h1: 'Печатные столы Bambu Lab для A1, A1 mini, P1S, X1C',
    },
    uz: {
      title: 'Bambu Lab bosma stollari, Toshkent | Forma 3D',
      description: 'Toshkentda original Bambu Lab stollari: A1 mini uchun 180 mm va A1, P1S, X1C uchun 256 mm Textured PEI, Smooth PEI, Cool Plate SuperTack, Engineering Plate.',
      h1: 'Bambu Lab A1, A1 mini, P1S, X1C uchun bosma stollari',
    },
  },
  'catalog/pla': {
    ru: {
      title: 'PLA пластик Bambu Lab купить в Ташкенте | Forma 3D',
      description: 'PLA пластик Bambu Lab 1,75 мм в Ташкенте: PLA Basic и PLA Matte на катушке 1 кг и рефиллом, Silk, Marble, Wood и другие серии. Поможем выбрать цвет.',
      h1: 'PLA пластик Bambu Lab для 3D-принтера',
    },
    uz: {
      title: 'Bambu Lab PLA plastik sotib olish, Toshkent | Forma 3D',
      description: 'Toshkentda Bambu Lab PLA plastik 1,75 mm: PLA Basic va PLA Matte g‘altakda 1 kg va refill, Silk, Marble, Wood va boshqa seriyalar. Rangni tanlang!',
      h1: '3D-printer uchun Bambu Lab PLA plastik',
    },
  },
  'catalog/petg': {
    ru: {
      title: 'PETG пластик Bambu Lab купить в Ташкенте | Forma 3D',
      description: 'PETG пластик Bambu Lab 1,75 мм в Ташкенте: PETG HF на катушке 1 кг и рефиллом, PETG Basic и PETG-CF. Прочнее PLA на удар и нагрев. Поможем с выбором.',
      h1: 'PETG пластик Bambu Lab для 3D-принтера',
    },
    uz: {
      title: 'Bambu Lab PETG plastik sotib olish, Toshkent | Forma 3D',
      description: 'Toshkentda Bambu Lab PETG plastik 1,75 mm: PETG HF g‘altakda 1 kg va refill, PETG Basic va PETG-CF. Zarba va issiqlikka PLA dan chidamliroq.',
      h1: '3D-printer uchun Bambu Lab PETG plastik',
    },
  },
  'catalog/abs-asa': {
    ru: {
      title: 'ABS и ASA пластик Bambu Lab купить в Ташкенте | Forma 3D',
      description: 'ABS и ASA пластик Bambu Lab 1,75 мм в Ташкенте, катушка 1 кг. Термостойкие детали, ASA — для улицы. Для принтеров с закрытым корпусом: P1S, X1C.',
      h1: 'ABS и ASA пластик Bambu Lab для 3D-принтера',
    },
    uz: {
      title: 'Bambu Lab ABS va ASA plastik, Toshkent | Forma 3D',
      description: 'Toshkentda Bambu Lab ABS va ASA plastik 1,75 mm, g‘altakda 1 kg. Issiqqa chidamli detallar, ASA — ko‘cha uchun. Yopiq korpusli printerlar uchun.',
      h1: '3D-printer uchun Bambu Lab ABS va ASA plastik',
    },
  },
  'catalog/tpu': {
    ru: {
      title: 'TPU пластик Bambu Lab купить в Ташкенте | Forma 3D',
      description: 'Гибкий TPU пластик Bambu Lab 95A HF 1,75 мм в Ташкенте, катушка 1 кг: накладки, амортизаторы, чехлы. Подходит для A1, печать с внешней катушки.',
      h1: 'Гибкий TPU пластик Bambu Lab для 3D-принтера',
    },
    uz: {
      title: 'Bambu Lab TPU plastik sotib olish, Toshkent | Forma 3D',
      description: 'Toshkentda egiluvchan Bambu Lab TPU 95A HF plastik 1,75 mm, g‘altakda 1 kg: qoplamalar, amortizatorlar, g‘iloflar. A1 uchun mos, tashqi g‘altakdan.',
      h1: '3D-printer uchun egiluvchan Bambu Lab TPU plastik',
    },
  },
  business: {
    ru: {
      title: 'Филамент оптом в Ташкенте для бизнеса и школ | Forma 3D',
      description: 'Филамент и запчасти Bambu Lab оптом от 5 катушек для принт-ферм, мастерских, школ и вузов. Счёт, договор, закрывающие документы. Запросите оптовые условия.',
      h1: 'Филамент Bambu Lab оптом для бизнеса и учебных заведений',
    },
    uz: {
      title: 'Ulgurji filament Toshkentda — biznes va maktablar | Forma 3D',
      description: 'Print-fermalar, ustaxonalar, maktab va oliygohlar uchun Bambu Lab filamenti va ehtiyot qismlari ulgurji, 5 g‘altakdan. Hujjatlar bilan. Shartlarni so‘rang.',
      h1: 'Biznes va ta’lim muassasalari uchun Bambu Lab filamenti ulgurji',
    },
  },
  delivery: {
    ru: {
      title: 'Доставка филамента по Ташкенту и оплата | Forma 3D',
      description: 'Доставка по Ташкенту в день заказа или на следующий, отправка в регионы, самовывоз в Ташкенте и Навои. Оплата Payme, Click, Humo. Узнайте условия.',
      h1: 'Доставка и оплата филамента по Ташкенту и Узбекистану',
    },
    uz: {
      title: 'Toshkent bo‘ylab filament yetkazish va to‘lov | Forma 3D',
      description: 'Filamentni Toshkent bo‘ylab buyurtma kuni yoki ertasiga yetkazamiz, viloyatlarga jo‘natamiz. Olib ketish: Toshkent va Navoiy. To‘lov: Payme, Click, Humo.',
      h1: 'Toshkent va O‘zbekiston bo‘ylab yetkazish va to‘lov',
    },
  },
  contacts: {
    ru: {
      title: 'Контакты и самовывоз в Ташкенте и Навои | Forma 3D',
      description: 'Как связаться с Forma 3D: телефон, Telegram, часы работы и пункты самовывоза в Ташкенте и Навои. Поможем с выбором — напишите в Telegram!',
      h1: 'Контакты Forma 3D',
    },
    uz: {
      title: 'Kontaktlar va olib ketish: Toshkent, Navoiy | Forma 3D',
      description: 'Forma 3D bilan bog‘lanish: telefon, Telegram, ish vaqti va Toshkent hamda Navoiydagi olib ketish punktlari. Tanlashga yordam beramiz — Telegramda yozing!',
      h1: 'Forma 3D kontaktlari',
    },
  },
  knowledge: {
    ru: {title: 'База знаний по 3D-печати | Forma 3D', description: 'Как выбрать филамент, чем отличаются PLA и PETG, как хранить материалы и обслуживать принтер.', h1: 'База знаний по 3D-печати и филаменту'},
    uz: {title: '3D-bosma bo‘yicha bilimlar bazasi | Forma 3D', description: 'Filamentni qanday tanlash, PLA va PETG farqi, materiallarni saqlash va printerga xizmat ko‘rsatish.', h1: '3D-bosma va filament bo‘yicha bilimlar bazasi'},
  },
  offer: {ru: {title: 'Публичная оферта | Forma 3D', description: 'Публичная оферта интернет-магазина Forma 3D.', h1: ''}, uz: {title: 'Ommaviy oferta | Forma 3D', description: 'Forma 3D internet-do‘konining ommaviy ofertasi.', h1: ''}},
  privacy: {ru: {title: 'Политика конфиденциальности | Forma 3D', description: 'Политика обработки персональных данных Forma 3D.', h1: ''}, uz: {title: 'Maxfiylik siyosati | Forma 3D', description: 'Forma 3D shaxsiy ma’lumotlarni qayta ishlash siyosati.', h1: ''}},
  returns: {ru: {title: 'Возврат и обмен | Forma 3D', description: 'Условия возврата и обмена товаров Forma 3D.', h1: ''}, uz: {title: 'Qaytarish va almashtirish | Forma 3D', description: 'Forma 3D mahsulotlarini qaytarish va almashtirish shartlari.', h1: ''}},
  cart: {ru: {title: 'Корзина | Forma 3D', description: 'Корзина Forma 3D.', h1: ''}, uz: {title: 'Savat | Forma 3D', description: 'Forma 3D savati.', h1: ''}},
  account: {ru: {title: 'Личный кабинет | Forma 3D', description: 'Личный кабинет Forma 3D.', h1: ''}, uz: {title: 'Shaxsiy kabinet | Forma 3D', description: 'Forma 3D shaxsiy kabineti.', h1: ''}},
};

// Catalog pages 2+ (brief 2.3–2.6).
const materialPaginated = (slug: MaterialSlug): Record<Lang, (n: number) => PageText> => {
  const name = {pla: 'PLA', petg: 'PETG', 'abs-asa': 'ABS / ASA', tpu: 'TPU'}[slug];
  return {
    ru: (n) => ({title: `${name} пластик Bambu Lab — страница ${n} | Forma 3D`, description: `${name} пластик Bambu Lab 1,75 мм, страница ${n}: катушки 1 кг и рефиллы с доставкой по Ташкенту.`, h1: `${name} пластик Bambu Lab для 3D-принтера — страница ${n}`}),
    uz: (n) => ({title: `Bambu Lab ${name} plastik — ${n}-sahifa | Forma 3D`, description: `Bambu Lab ${name} plastik 1,75 mm, ${n}-sahifa: g‘altakda 1 kg va refill, Toshkent bo‘ylab yetkazib berish.`, h1: `3D-printer uchun Bambu Lab ${name} plastik — ${n}-sahifa`}),
  };
};
const PAGINATED: Record<string, Record<Lang, (n: number) => PageText>> = {
  'catalog/hotends': {
    ru: (n) => ({title: `Хотэнды и сопла Bambu Lab — страница ${n} | Forma 3D`, description: `Хотэнды и сопла Bambu Lab, страница ${n}: 0,2, 0,4 и 0,6 мм, закалённые хотэнды для A1, P1S, X1C и H2D.`, h1: `Хотэнды и сопла для Bambu Lab — страница ${n}`}),
    uz: (n) => ({title: `Bambu Lab hotend va soplolari — ${n}-sahifa | Forma 3D`, description: `Bambu Lab hotend va soplolari, ${n}-sahifa: 0,2, 0,4 va 0,6 mm, A1, P1S, X1C va H2D uchun toblangan hotendlar.`, h1: `Bambu Lab uchun hotend va soplolar — ${n}-sahifa`}),
  },
  'catalog/pla': materialPaginated('pla'),
  'catalog/petg': materialPaginated('petg'),
  'catalog/abs-asa': materialPaginated('abs-asa'),
  'catalog/tpu': materialPaginated('tpu'),
  catalog: {
    ru: (n) => ({title: `Филамент Bambu Lab — страница ${n} | Forma 3D`, description: `Каталог филамента Bambu Lab, страница ${n}: PLA, PETG, ABS, ASA, TPU и инженерные пластики с доставкой по Ташкенту.`, h1: `Филамент Bambu Lab для 3D-принтера — страница ${n}`}),
    uz: (n) => ({title: `Bambu Lab filament — ${n}-sahifa | Forma 3D`, description: `Bambu Lab filamenti katalogi, ${n}-sahifa: PLA, PETG, ABS, ASA, TPU va muhandislik plastiklari, Toshkent bo‘ylab yetkazib berish.`, h1: `3D-printer uchun Bambu Lab filamenti — ${n}-sahifa`}),
  },
  'catalog/parts': {
    ru: (n) => ({title: `Запчасти Bambu Lab — страница ${n} | Forma 3D`, description: `Запчасти и расходники Bambu Lab, страница ${n}: хотэнды, сопла, печатные столы, AMS и детали для ремонта с доставкой по Ташкенту.`, h1: `Запчасти и расходники для Bambu Lab — страница ${n}`}),
    uz: (n) => ({title: `Bambu Lab ehtiyot qismlari — ${n}-sahifa | Forma 3D`, description: `Bambu Lab ehtiyot qismlari, ${n}-sahifa: hotendlar, soplolar, bosma stollari, AMS va ta’mirlash qismlari, Toshkent bo‘ylab yetkazib berish.`, h1: `Bambu Lab uchun ehtiyot qismlar va sarf materiallari — ${n}-sahifa`}),
  },
};

const pageKey = (path: string[]) => (path[0] === 'catalog' && path[1] ? `catalog/${path[1]}` : path[0] || '');

/** Title / description / H1 of a non-product page. */
export function pageText(lang: Lang, path: string[], catalogPage = 1): PageText {
  const key = pageKey(path);
  if (catalogPage > 1 && PAGINATED[key]) return PAGINATED[key][lang](catalogPage);
  return (PAGE_TEXT[key] ?? PAGE_TEXT[''])[lang];
}

export function buildMetadata(lang: Lang, path: string[], catalogPage = 1): Metadata {
  const uz = lang === 'uz';
  const rest = path.join('/');
  const pageQuery = path[0] === 'catalog' && catalogPage > 1 ? `?page=${catalogPage}` : '';
  const url = (l: Lang) => `${SITE_URL}/${l}${rest ? '/' + rest : ''}${pageQuery}`;
  const alternates = {canonical: url(lang), languages: {ru: url('ru'), uz: url('uz'), 'x-default': url('ru')}};
  const product = path[0] === 'product' ? findProduct(path[1]) : undefined;

  let title: string;
  let description: string;
  let image: string | undefined;
  if (product) {
    const seo = productSeo(product, lang);
    title = seo.title;
    description = seo.description;
    image = product.image ? `${SITE_URL}/images/${product.image}` : undefined;
  } else if (path[0] === 'knowledge' && findArticle(path[1])) {
    ({title, description} = findArticle(path[1])![lang]);
  } else {
    ({title, description} = pageText(lang, path, catalogPage));
  }
  const privatePage = path[0] === 'cart' || path[0] === 'account';

  return {
    title: {absolute: title},
    description,
    alternates,
    robots: privatePage ? {index: false, follow: true} : undefined,
    openGraph: {
      type: 'website',
      siteName: 'Forma 3D',
      locale: uz ? 'uz_UZ' : 'ru_RU',
      url: url(lang),
      title,
      description,
      ...(image ? {images: [{url: image}]} : {}),
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

/** schema.org Product (+ Offer only when there is a real price). */
export function productJsonLd(p: Product, lang: Lang) {
  const seo = productSeo(p, lang);
  const url = `${SITE_URL}/${lang}/product/${p.id}`;
  const brand = productBrand(p);
  const availability = availabilityOf(p);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: seo.h1,
    sku: p.id.toUpperCase(),
    ...(brand ? {brand: {'@type': 'Brand', name: brand}} : {}),
    ...(p.image ? {image: [`${SITE_URL}/images/${p.image}`]} : {}),
    description: seo.description,
    url,
    ...(p.price != null
      ? {
          offers: {
            '@type': 'Offer',
            url,
            price: String(p.price),
            priceCurrency: 'UZS',
            ...(availability ? {availability: `https://schema.org/${availability}`} : {}),
            itemCondition: 'https://schema.org/NewCondition',
            seller: {'@id': `${SITE_URL}/#organization`},
          },
        }
      : {}),
  };
}

/** Короткие названия посадочных категорий для хлебных крошек товара (2026-11-09). */
const SUBCATEGORY_LABEL: Record<string, Record<Lang, string>> = {
  hotends: {ru: 'Хотэнды и сопла', uz: 'Hotend va soplolar'},
  plates: {ru: 'Печатные столы', uz: 'Bosma stollari'},
  pla: {ru: 'PLA пластик', uz: 'PLA plastik'},
  petg: {ru: 'PETG пластик', uz: 'PETG plastik'},
  'abs-asa': {ru: 'ABS и ASA пластик', uz: 'ABS va ASA plastik'},
  tpu: {ru: 'TPU пластик', uz: 'TPU plastik'},
};

/** Посадочная категория товара (/catalog/hotends, /catalog/pla …), если она есть — для крошек и перелинковки. */
export function productSubcategory(p: Product, lang: Lang): {slug: string; to: string; name: string} | undefined {
  const slug = p.type === 'parts' ? partSlugOf(p.category ?? '') : MATERIAL_SLUGS.find((s) => matchesMaterial(p, MATERIAL_FILTER[s]));
  return slug ? {slug, to: `catalog/${slug}`, name: SUBCATEGORY_LABEL[slug][lang]} : undefined;
}

/** Breadcrumb trail shared by the visible crumbs and BreadcrumbList (brief 1.6). */
export function breadcrumbTrail(lang: Lang, path: string[], catalogPage = 1): {name: string; href?: string}[] {
  const uz = lang === 'uz';
  const home = {name: uz ? 'Bosh sahifa' : 'Главная', href: `/${lang}`};
  if (path[0] === 'product') {
    const p = findProduct(path[1]);
    if (!p) return [];
    const parts = p.type === 'parts';
    const sub = productSubcategory(p, lang);
    return [
      home,
      parts ? {name: uz ? 'Ehtiyot qismlar' : 'Запчасти и расходники', href: `/${lang}/catalog/parts`} : {name: uz ? 'Katalog' : 'Каталог', href: `/${lang}/catalog`},
      ...(sub ? [{name: sub.name, href: `/${lang}/${sub.to}`}] : []),
      {name: productSeo(p, lang).h1},
    ];
  }
  if (path[0] === 'catalog' && path[1] && (PART_SLUGS as string[]).includes(path[1]))
    return [home, {name: uz ? 'Ehtiyot qismlar' : 'Запчасти и расходники', href: `/${lang}/catalog/parts`}, {name: pageText(lang, path, catalogPage).h1}];
  if (path[0] === 'catalog' && path[1] && path[1] !== 'parts')
    return [home, {name: uz ? 'Katalog' : 'Каталог', href: `/${lang}/catalog`}, {name: pageText(lang, path, catalogPage).h1}];
  if (path[0] === 'catalog') return [home, {name: pageText(lang, path, catalogPage).h1}];
  const article = path[0] === 'knowledge' ? findArticle(path[1]) : undefined;
  if (article) return [home, {name: pageText(lang, ['knowledge']).h1, href: `/${lang}/knowledge`}, {name: article[lang].h1}];
  const info = path.length === 1 ? INFO_CRUMB[path[0]] : undefined;
  if (info) return [home, {name: info[lang]}];
  return [];
}

/** Короткие названия информационных страниц для видимых крошек и BreadcrumbList (одинаковые в обоих). */
export const INFO_CRUMB: Record<string, {ru: string; uz: string}> = {
  business: {ru: 'B2B', uz: 'B2B'},
  delivery: {ru: 'Доставка', uz: 'Yetkazib berish'},
  knowledge: {ru: 'База знаний', uz: 'Bilimlar bazasi'},
};

/** Article JSON-LD for /knowledge/<slug>. */
export function articleJsonLd(lang: Lang, slug: string) {
  const a = findArticle(slug);
  if (!a) return null;
  const url = `${SITE_URL}/${lang}/knowledge/${a.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a[lang].h1,
    description: a[lang].description,
    inLanguage: lang === 'uz' ? 'uz-Latn' : 'ru',
    datePublished: a.published,
    mainEntityOfPage: url,
    url,
    author: {'@id': `${SITE_URL}/#organization`, '@type': 'Organization', name: 'Forma 3D'},
    publisher: {'@id': `${SITE_URL}/#organization`, '@type': 'Organization', name: 'Forma 3D'},
  };
}

export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);

export function breadcrumbJsonLd(lang: Lang, path: string[], catalogPage = 1) {
  const trail = breadcrumbTrail(lang, path, catalogPage);
  if (!trail.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({'@type': 'ListItem', position: i + 1, name: c.name, ...(c.href ? {item: `${SITE_URL}${c.href}`} : {})})),
  };
}

/** Organization + two Store nodes for the home and contacts pages (brief 2.1, 2.2, 2.9, 2.10). */
export function organizationJsonLd(lang: Lang, page: 'home' | 'contacts', contacts: Contacts = DEFAULT_CONTACTS) {
  const uz = lang === 'uz';
  const tel = phoneDigits(contacts.phone);
  const sameAs = contacts.telegram ? [`https://t.me/${contacts.telegram}`] : [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const org = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Forma 3D',
    ...(page === 'home' && !uz ? {alternateName: 'Форма-3D'} : {}),
    url: `${SITE_URL}/${lang}`,
    logo: {'@type': 'ImageObject', url: `${SITE_URL}/icon-512.png`, width: 512, height: 512},
    ...(page === 'home'
      ? {
          description: uz
            ? 'Bambu Lab filamenti, hotendlar, bosma stollari, AMS va ehtiyot qismlar. Biznes va ta’lim muassasalari uchun ulgurji yetkazib berish.'
            : 'Филамент Bambu Lab, хотэнды, печатные столы, AMS и запчасти. Оптовые поставки для бизнеса и учебных заведений.',
        }
      : {}),
    ...(sameAs.length ? {sameAs} : {}),
    ...(tel ? {contactPoint: {'@type': 'ContactPoint', telephone: tel, contactType: 'customer service', areaServed: 'UZ'}} : {}),
    department: PICKUP_POINTS.map((s) => ({'@id': `${SITE_URL}/#store-${s.id}`})),
  };
  const stores = PICKUP_POINTS.map((s) => ({
    '@type': 'Store',
    '@id': `${SITE_URL}/#store-${s.id}`,
    name: `Forma 3D — ${s.city[lang]}`,
    parentOrganization: {'@id': `${SITE_URL}/#organization`},
    url: `${SITE_URL}/${lang}/contacts`,
    ...(tel ? {telephone: tel} : {}),
    address: {'@type': 'PostalAddress', streetAddress: s.street[lang], addressLocality: s.city[lang], addressCountry: 'UZ'},
    openingHoursSpecification: [{'@type': 'OpeningHoursSpecification', dayOfWeek: days, opens: HOURS.opens, closes: HOURS.closes}],
    currenciesAccepted: 'UZS',
    paymentAccepted: 'Payme, Click, Humo',
  }));
  // WebSite — источник названия сайта в выдаче Google («Forma 3D» вместо «forma-3d.uz»). Только на главных.
  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Forma 3D',
    alternateName: ['Форма-3D', 'Forma3D', 'forma-3d.uz'],
    url: `${SITE_URL}/`,
    inLanguage: ['ru', 'uz'],
    publisher: {'@id': `${SITE_URL}/#organization`},
  };
  return {'@context': 'https://schema.org', '@graph': [...(page === 'home' ? [website] : []), org, ...stores]};
}
