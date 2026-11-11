// Посадочные страницы материалов: /ru|uz/catalog/pla, petg, abs-asa, tpu.
// Это тот же каталог филамента с выбранным фильтром материала, плюс свой H1, мета и вводный текст.
// Факты о материалах — из статей «PETG или PLA» и «Какой филамент выбрать» (данные Bambu Lab), без цен и сроков.

export type MaterialSlug = 'pla' | 'petg' | 'abs-asa' | 'tpu';
export const MATERIAL_SLUGS: MaterialSlug[] = ['pla', 'petg', 'abs-asa', 'tpu'];

/** Значение фильтра «Материал» в каталоге (см. materials / matchesMaterial в catalog.ts). */
export const MATERIAL_FILTER: Record<MaterialSlug, string> = {pla: 'PLA', petg: 'PETG', 'abs-asa': 'ABS / ASA', tpu: 'TPU'};

export const materialSlugOf = (filter: string): MaterialSlug | undefined =>
  MATERIAL_SLUGS.find((s) => MATERIAL_FILTER[s] === filter);

type Intro = {text: string; links: {to: string; text: string}[]};

export const MATERIAL_INTRO: Record<MaterialSlug, {ru: Intro; uz: Intro}> = {
  pla: {
    ru: {
      text: 'PLA — самый простой в печати пластик: почти не даёт усадки, печатает на открытом принтере и подходит для макетов, прототипов, фигурок и декора. Здесь собраны PLA от Bambu Lab, 1,75 мм: PLA Basic и PLA Matte на катушке 1 кг или рефиллом без катушки, а также Silk, Marble, Wood, Glow, PLA-CF и другие серии под заказ. PLA размягчается при нагреве (около 55 °C), поэтому для деталей на улице и рядом с теплом лучше PETG.',
      links: [
        {to: 'knowledge/petg-ili-pla', text: 'PETG или PLA: что выбрать'},
        {to: 'knowledge/kakoy-filament-vybrat', text: 'какой филамент выбрать новичку'},
      ],
    },
    uz: {
      text: 'PLA — bosish uchun eng oson plastik: deyarli kirishmaydi, ochiq printerda bosiladi va maketlar, prototiplar, figuralar va dekor uchun mos. Bu yerda Bambu Lab PLA, 1,75 mm: PLA Basic va PLA Matte g‘altakda 1 kg yoki g‘altaksiz refill, shuningdek Silk, Marble, Wood, Glow, PLA-CF va boshqa seriyalar buyurtmaga. PLA qizdirilganda yumshaydi (taxminan 55 °C), shuning uchun ko‘chada va issiq joyda ishlaydigan detallar uchun PETG yaxshiroq.',
      links: [
        {to: 'knowledge/petg-ili-pla', text: 'PETG yoki PLA: qaysi birini tanlash'},
        {to: 'knowledge/kakoy-filament-vybrat', text: 'yangi boshlovchi uchun qaysi filament'},
      ],
    },
  },
  petg: {
    ru: {
      text: 'PETG — пластик для функциональных деталей: лучше PLA держит удар и нагрев, по данным Bambu Lab стоек к воде и ультрафиолету и подходит для изделий на улице. Здесь собраны PETG от Bambu Lab, 1,75 мм: PETG HF — версия для быстрой печати — на катушке 1 кг или рефиллом без катушки, а также PETG Basic и PETG-CF. PETG впитывает влагу — перед печатью его стоит просушить.',
      links: [
        {to: 'knowledge/petg-ili-pla', text: 'PETG или PLA: что выбрать'},
        {to: 'knowledge/kak-hranit-filament', text: 'как хранить и сушить филамент'},
      ],
    },
    uz: {
      text: 'PETG — funksional detallar uchun plastik: zarba va issiqlikka PLA dan yaxshiroq chidaydi, Bambu Lab ma’lumotlariga ko‘ra suv va ultrabinafsha nurlarga chidamli, ko‘chadagi buyumlar uchun mos. Bu yerda Bambu Lab PETG, 1,75 mm: PETG HF — tez bosish uchun versiya — g‘altakda 1 kg yoki g‘altaksiz refill, shuningdek PETG Basic va PETG-CF. PETG namlikni yutadi — bosishdan oldin uni quritish kerak.',
      links: [
        {to: 'knowledge/petg-ili-pla', text: 'PETG yoki PLA: qaysi birini tanlash'},
        {to: 'knowledge/kak-hranit-filament', text: 'filamentni saqlash va quritish'},
      ],
    },
  },
  'abs-asa': {
    ru: {
      text: 'ABS и ASA — пластики для деталей, которым нужен нагрев выше, чем выдерживает PLA: корпуса, крепления, детали для машины и мест возле тепла. ASA, по данным Bambu Lab, устойчив к ультрафиолету и старению и рассчитан на долгую работу на улице. Оба материала печатают на принтере с закрытым корпусом (P1S, X1C и другие); для A1 и A1 mini производитель их не рекомендует — для открытого принтера выбирайте PETG. Здесь собраны ABS и ASA от Bambu Lab, 1,75 мм, на катушке 1 кг.',
      links: [
        {to: 'knowledge/kakoy-filament-vybrat', text: 'какой филамент выбрать'},
        {to: 'knowledge/petg-ili-pla', text: 'PETG или PLA: что выбрать'},
      ],
    },
    uz: {
      text: 'ABS va ASA — PLA chiday olmaydigan issiqlikka chidashi kerak bo‘lgan detallar uchun plastiklar: korpuslar, mahkamlagichlar, mashina uchun va issiq joylar yonidagi detallar. Bambu Lab ma’lumotlariga ko‘ra, ASA ultrabinafsha nurlar va eskirishga chidamli hamda ko‘chada uzoq ishlash uchun mo‘ljallangan. Ikkala material yopiq korpusli printerda bosiladi (P1S, X1C va boshqalar); A1 va A1 mini uchun ishlab chiqaruvchi ularni tavsiya etmaydi — ochiq printer uchun PETG ni tanlang. Bu yerda Bambu Lab ABS va ASA, 1,75 mm, g‘altakda 1 kg.',
      links: [
        {to: 'knowledge/kakoy-filament-vybrat', text: 'qaysi filamentni tanlash kerak'},
        {to: 'knowledge/petg-ili-pla', text: 'PETG yoki PLA: qaysi birini tanlash'},
      ],
    },
  },
  tpu: {
    ru: {
      text: 'TPU — гибкий пластик для накладок, амортизаторов, ремешков, чехлов и других эластичных деталей. У Bambu Lab это TPU 95A HF, 1,75 мм, на катушке 1 кг. Для серии A1 производитель относит TPU к подходящим материалам. TPU не совместим с AMS — его печатают с внешней катушки. За TPU лучше браться, когда уже есть опыт печати PLA.',
      links: [
        {to: 'knowledge/kakoy-filament-vybrat', text: 'какой филамент выбрать'},
        {to: 'knowledge/kak-hranit-filament', text: 'как хранить и сушить филамент'},
      ],
    },
    uz: {
      text: 'TPU — qoplamalar, amortizatorlar, tasmalar, g‘iloflar va boshqa elastik detallar uchun egiluvchan plastik. Bambu Lab da bu TPU 95A HF, 1,75 mm, g‘altakda 1 kg. A1 seriyasi uchun ishlab chiqaruvchi TPU ni mos materiallar qatoriga kiritadi. TPU AMS bilan mos emas — u tashqi g‘altakdan bosiladi. TPU ga PLA bilan biroz tajriba orttirgandan keyin o‘tgan ma’qul.',
      links: [
        {to: 'knowledge/kakoy-filament-vybrat', text: 'qaysi filamentni tanlash kerak'},
        {to: 'knowledge/kak-hranit-filament', text: 'filamentni saqlash va quritish'},
      ],
    },
  },
};

/** Подписи ссылок на страницы материалов: блок «Другие материалы» и вводный текст общего каталога. */
export const MATERIAL_LINK_TEXT: Record<MaterialSlug, {ru: string; uz: string}> = {
  pla: {ru: 'PLA пластик', uz: 'PLA plastik'},
  petg: {ru: 'PETG пластик', uz: 'PETG plastik'},
  'abs-asa': {ru: 'ABS и ASA пластик', uz: 'ABS va ASA plastik'},
  tpu: {ru: 'гибкий TPU пластик', uz: 'egiluvchan TPU plastik'},
};

/**
 * Частые вопросы на страницах материалов (видимый блок под товарами, только на первой странице).
 * Факты — из статей «Какой филамент выбрать», «PETG или PLA», «Как хранить филамент» (данные Bambu Lab).
 * Без цен, наличия, сроков и условий доставки: про доставку — только ссылка на /delivery.
 * Ссылки: [анкор](путь без языка), как в info-content.ts.
 */
type Faq = {title: string; items: [string, string][]};

const BUY_RU = (what: string): [string, string] => [
  `Где купить ${what} в Ташкенте?`,
  'В Forma 3D: оформите заказ на сайте, позвоните по номеру +998 99 454-19-13 или напишите в Telegram @kemalsen — поможем выбрать материал и цвет под вашу задачу и принтер. Доставка и самовывоз — на странице «[Доставка и оплата](delivery)».',
];
const BUY_UZ = (what: string): [string, string] => [
  `Toshkentda ${what}ni qayerdan sotib olish mumkin?`,
  'Forma 3D’da: saytda buyurtma bering, +998 99 454-19-13 raqamiga qo‘ng‘iroq qiling yoki Telegram @kemalsen’ga yozing — vazifangiz va printeringizga mos material va rangni tanlashga yordam beramiz. Yetkazib berish va olib ketish — «[Yetkazib berish va to‘lov](delivery)» sahifasida.',
];

export const MATERIAL_FAQ: Record<MaterialSlug, {ru: Faq; uz: Faq}> = {
  pla: {
    ru: {
      title: 'Частые вопросы о PLA пластике',
      items: [
        ['Для чего подходит PLA пластик?', 'Для макетов, прототипов, фигурок, декора и учебных моделей. PLA проще всего в печати: печатается по готовому профилю Bambu Studio и подходит для любого принтера Bambu Lab, в том числе для A1 и A1 mini без корпуса. Подробнее — «[Какой филамент выбрать новичку](knowledge/kakoy-filament-vybrat)».'],
        ['Чем PLA Basic отличается от PLA Matte?', 'PLA Matte даёт матовую поверхность без блеска, на которой слои заметны меньше, — для фигурок, подарков и корпусов. PLA Basic прочнее: по данным Bambu Lab, прочность на изгиб у PLA Basic — 76 МПа, у PLA Matte — 53 МПа. Для держателей и кронштейнов берите [PLA Basic](product/pla-basic-black).'],
        ['Выдерживает ли PLA нагрев?', 'Ограниченно: по техническому листу Bambu Lab, температура тепловой деформации PLA Basic — 54–57 °C. Детали для машины летом, для мест возле батареи или горячих узлов лучше печатать из [PETG](catalog/petg) или [ASA](catalog/abs-asa).'],
        ['Как хранить и сушить PLA?', 'Открытую катушку храните в герметичном пакете с силикагелем: Bambu Lab указывает влажность ниже 20%. Если пластик набрал влагу, его сушат при 50–55 °C 8 часов. Подробнее — «[Как хранить филамент](knowledge/kak-hranit-filament)».'],
        BUY_RU('PLA пластик'),
      ],
    },
    uz: {
      title: 'PLA plastik haqida ko‘p beriladigan savollar',
      items: [
        ['PLA plastik nima uchun mos?', 'Maketlar, prototiplar, figuralar, dekor va o‘quv modellari uchun. PLA bosish uchun eng oson: Bambu Studio ning tayyor profili bilan bosiladi va har qanday Bambu Lab printeriga, jumladan korpussiz A1 va A1 mini ga ham mos. Batafsil — «[Yangi boshlovchi uchun qaysi filament](knowledge/kakoy-filament-vybrat)».'],
        ['PLA Basic va PLA Matte ning farqi nimada?', 'PLA Matte yaltiramaydigan mat sirt beradi, unda qatlamlar kamroq ko‘rinadi — figuralar, sovg‘alar va korpuslar uchun. PLA Basic mustahkamroq: Bambu Lab ma’lumotlariga ko‘ra, egilishdagi mustahkamlik PLA Basic da 76 MPa, PLA Matte da 53 MPa. Ushlagich va kronshteynlar uchun [PLA Basic](product/pla-basic-black) oling.'],
        ['PLA issiqlikka chidaydimi?', 'Cheklangan: Bambu Lab texnik varag‘iga ko‘ra, PLA Basic ning issiqlikdan deformatsiyalanish harorati 54–57 °C. Yozda mashina ichida, batareya yoki issiq qismlar yonida turadigan detallarni [PETG](catalog/petg) yoki [ASA](catalog/abs-asa) dan bosgan ma’qul.'],
        ['PLA ni qanday saqlash va quritish kerak?', 'Ochilgan g‘altakni silikagelli germetik paketda saqlang: Bambu Lab 20% dan past namlikni ko‘rsatadi. Plastik namlik yutgan bo‘lsa, u 50–55 °C da 8 soat quritiladi. Batafsil — «[Filamentni saqlash va quritish](knowledge/kak-hranit-filament)».'],
        BUY_UZ('PLA plastik'),
      ],
    },
  },
  petg: {
    ru: {
      title: 'Частые вопросы о PETG пластике',
      items: [
        ['Чем PETG отличается от PLA?', 'По данным Bambu Lab, на изгиб базовые версии почти равны (76 МПа у PLA Basic и 75 МПа у PETG Basic), а на удар PETG заметно лучше: ударная вязкость 34,2 против 20,6 кДж/м². PETG также лучше переносит нагрев. Подробное сравнение — «[PETG или PLA](knowledge/petg-ili-pla)».'],
        ['Подходит ли PETG для улицы?', 'Да: Bambu Lab отмечает стойкость PETG к воде, ультрафиолету и температуре и называет его выгодным вариантом для изделий на улице. Если деталь будет постоянно на прямом солнце, присмотритесь к [ASA](catalog/abs-asa) — но для него нужен принтер с закрытым корпусом.'],
        ['PETG HF или PETG Basic — что выбрать?', 'Обе версии — PETG. HF (High Flow) рассчитан на высокую скорость печати, PETG Basic подойдёт для большинства функциональных деталей. В Bambu Studio выбирайте профиль именно своей версии.'],
        ['Как печатать PETG на принтере Bambu Lab?', 'По готовому профилю Bambu Studio — он выставит температуру сам. Для PETG HF производитель указывает сопло 230–260 °C и стол 65–75 °C с клеем. PETG подходит и для принтеров серии A1.'],
        ['Нужно ли сушить PETG?', 'PETG HF Bambu Lab рекомендует сушить перед использованием: 65 °C, 8 часов в сушилке. Признаки отсыревшего пластика — нити между частями модели и шероховатая поверхность. Для этого подойдёт [сушилка для филамента](product/filament-dryer).'],
        BUY_RU('PETG пластик'),
      ],
    },
    uz: {
      title: 'PETG plastik haqida ko‘p beriladigan savollar',
      items: [
        ['PETG ning PLA dan farqi nimada?', 'Bambu Lab ma’lumotlariga ko‘ra, egilishda bazaviy versiyalar deyarli teng (PLA Basic da 76 MPa, PETG Basic da 75 MPa), zarbada esa PETG ancha yaxshi: zarbaga chidamlilik 34,2 ga qarshi 20,6 kJ/m². PETG issiqlikka ham yaxshiroq chidaydi. Batafsil taqqoslash — «[PETG yoki PLA](knowledge/petg-ili-pla)».'],
        ['PETG ko‘cha uchun mosmi?', 'Ha: Bambu Lab PETG ning suv, ultrabinafsha nurlar va haroratga chidamliligini qayd etadi va uni ko‘chadagi buyumlar uchun foydali variant deb ataydi. Detal doim to‘g‘ridan-to‘g‘ri quyosh ostida bo‘lsa, [ASA](catalog/abs-asa) ga qarang — lekin u uchun yopiq korpusli printer kerak.'],
        ['PETG HF yoki PETG Basic — qaysi birini tanlash?', 'Ikkala versiya ham PETG. HF (High Flow) yuqori tezlikda bosish uchun mo‘ljallangan, PETG Basic esa ko‘pchilik funksional detallar uchun mos. Bambu Studio da aynan o‘z versiyangiz profilini tanlang.'],
        ['Bambu Lab printerida PETG ni qanday bosish kerak?', 'Bambu Studio ning tayyor profili bilan — u haroratni o‘zi qo‘yadi. PETG HF uchun ishlab chiqaruvchi soplo 230–260 °C va stol 65–75 °C, yelim bilan, deb ko‘rsatadi. PETG A1 seriyasidagi printerlarga ham mos.'],
        ['PETG ni quritish kerakmi?', 'Bambu Lab PETG HF ni ishlatishdan oldin quritishni tavsiya qiladi: quritgichda 65 °C, 8 soat. Namlangan plastik belgilari — model qismlari orasida iplar va g‘adir-budur sirt. Buning uchun [filament quritgichi](product/filament-dryer) mos keladi.'],
        BUY_UZ('PETG plastik'),
      ],
    },
  },
  'abs-asa': {
    ru: {
      title: 'Частые вопросы об ABS и ASA пластике',
      items: [
        ['Чем ASA отличается от ABS?', 'Оба пластика выдерживают больший нагрев, чем PLA. ASA, по данным Bambu Lab, к тому же устойчив к ультрафиолету и старению и рассчитан на долгую работу на улице, поэтому для деталей под солнцем выбирают его.'],
        ['Можно ли печатать ABS и ASA на Bambu Lab A1?', 'Производитель не рекомендует ABS и ASA для серии A1 (A1 и A1 mini): из-за открытого корпуса у крупных деталей растёт риск коробления и слабого сцепления слоёв. Для них нужен принтер с закрытым корпусом — P1S, X1C и другие. Для открытого принтера выбирайте [PETG](catalog/petg).'],
        ['Что выбрать для детали в машине или возле тепла?', 'PETG или ASA: у PLA температура тепловой деформации всего 54–57 °C. Для деталей, которые постоянно на солнце, — ASA. Сравнение материалов — «[PETG или PLA](knowledge/petg-ili-pla)» и «[Какой филамент выбрать](knowledge/kakoy-filament-vybrat)».'],
        BUY_RU('ABS и ASA пластик'),
      ],
    },
    uz: {
      title: 'ABS va ASA plastik haqida ko‘p beriladigan savollar',
      items: [
        ['ASA ning ABS dan farqi nimada?', 'Ikkala plastik ham PLA ga qaraganda ko‘proq issiqlikka chidaydi. ASA esa Bambu Lab ma’lumotlariga ko‘ra ultrabinafsha nurlar va eskirishga ham chidamli va ko‘chada uzoq ishlash uchun mo‘ljallangan, shuning uchun quyosh ostidagi detallar uchun uni tanlashadi.'],
        ['ABS va ASA ni Bambu Lab A1 da bosish mumkinmi?', 'Ishlab chiqaruvchi ABS va ASA ni A1 seriyasi (A1 va A1 mini) uchun tavsiya etmaydi: ochiq korpus tufayli katta detallarda qiyshayish va qatlamlar yomon yopishishi xavfi oshadi. Ular uchun yopiq korpusli printer kerak — P1S, X1C va boshqalar. Ochiq printer uchun [PETG](catalog/petg) ni tanlang.'],
        ['Mashina ichidagi yoki issiqlik yonidagi detal uchun nimani tanlash kerak?', 'PETG yoki ASA: PLA ning issiqlikdan deformatsiyalanish harorati atigi 54–57 °C. Doim quyosh ostida turadigan detallar uchun — ASA. Materiallarni taqqoslash — «[PETG yoki PLA](knowledge/petg-ili-pla)» va «[Qaysi filamentni tanlash kerak](knowledge/kakoy-filament-vybrat)».'],
        BUY_UZ('ABS va ASA plastik'),
      ],
    },
  },
  tpu: {
    ru: {
      title: 'Частые вопросы о TPU пластике',
      items: [
        ['Для чего нужен TPU?', 'TPU — гибкий пластик для накладок, амортизаторов, ремешков, чехлов и других эластичных деталей. У Bambu Lab это TPU 95A HF, 1,75 мм, на катушке 1 кг.'],
        ['Можно ли печатать TPU через AMS?', 'Нет: по данным Bambu Lab, TPU 95A HF не совместим ни с одной системой AMS. Его печатают с внешнего держателя катушки и одним цветом.'],
        ['Подходит ли TPU для Bambu Lab A1?', 'Да, для серии A1 (A1 и A1 mini) производитель относит TPU к подходящим материалам. За TPU лучше браться, когда уже есть опыт печати PLA.'],
        ['Нужно ли сушить TPU?', 'Да: Bambu Lab рекомендует сушить TPU 95A HF перед использованием, режим указан на этикетке и в техническом листе. Как хранить открытую катушку — «[Как хранить филамент](knowledge/kak-hranit-filament)».'],
        BUY_RU('TPU пластик'),
      ],
    },
    uz: {
      title: 'TPU plastik haqida ko‘p beriladigan savollar',
      items: [
        ['TPU nima uchun kerak?', 'TPU — qoplamalar, amortizatorlar, tasmalar, g‘iloflar va boshqa elastik detallar uchun egiluvchan plastik. Bambu Lab da bu TPU 95A HF, 1,75 mm, g‘altakda 1 kg.'],
        ['TPU ni AMS orqali bosish mumkinmi?', 'Yo‘q: Bambu Lab ma’lumotlariga ko‘ra, TPU 95A HF hech qaysi AMS tizimi bilan mos emas. U tashqi g‘altak ushlagichidan va bitta rangda bosiladi.'],
        ['TPU Bambu Lab A1 uchun mosmi?', 'Ha, A1 seriyasi (A1 va A1 mini) uchun ishlab chiqaruvchi TPU ni mos materiallar qatoriga kiritadi. TPU ga PLA bilan biroz tajriba orttirgandan keyin o‘tgan ma’qul.'],
        ['TPU ni quritish kerakmi?', 'Ha: Bambu Lab TPU 95A HF ni ishlatishdan oldin quritishni tavsiya qiladi, rejim yorliqda va texnik varaqda ko‘rsatilgan. Ochilgan g‘altakni qanday saqlash — «[Filamentni saqlash va quritish](knowledge/kak-hranit-filament)».'],
        BUY_UZ('TPU plastik'),
      ],
    },
  },
};
