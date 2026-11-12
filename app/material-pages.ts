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

// Частые вопросы на страницах материалов (2026-11-12): ответы на запросы вида «pla пластик ташкент»,
// «petg температура печати», «abs на a1». Факты — только из статей базы знаний сайта
// («PETG или PLA», «Какой филамент выбрать», «Как хранить филамент»; данные Bambu Lab). Без цен, сроков и скидок.
type Faq = {title: string; items: [string, string][]};

const BUY_RU = (m: string) =>
  `Здесь, в Forma 3D: ${m} Bambu Lab, 1,75 мм, собран на этой странице. Оформите заказ на сайте или напишите в Telegram @kemalsen — поможем выбрать серию и цвет под вашу задачу и принтер. Доставляем по Ташкенту и в регионы Узбекистана, есть самовывоз — условия на странице «[Доставка и оплата](delivery)».`;
const BUY_UZ = (m: string) =>
  `Shu yerda, Forma 3D’da: Bambu Lab ${m}, 1,75 mm, shu sahifada jamlangan. Saytda buyurtma bering yoki Telegram @kemalsen’ga yozing — vazifangiz va printeringizga mos seriya va rangni tanlashga yordam beramiz. Toshkent bo‘ylab va O‘zbekiston viloyatlariga yetkazamiz, olib ketish ham mumkin — shartlar «[Yetkazib berish va to‘lov](delivery)» sahifasida.`;

export const MATERIAL_FAQ: Record<MaterialSlug, {ru: Faq; uz: Faq}> = {
  pla: {
    ru: {
      title: 'Частые вопросы о PLA пластике',
      items: [
        ['Где купить PLA пластик для 3D-принтера в Ташкенте?', BUY_RU('PLA')],
        ['PLA Basic или PLA Matte — что выбрать?', 'PLA Matte даёт матовую поверхность, на которой слои заметны меньше, — для фигурок, макетов и подарков: [PLA Matte белый](product/pla-matte-white). PLA Basic прочнее: по данным Bambu Lab, прочность на изгиб у него 76 МПа против 53 МПа у PLA Matte — для держателей и кронштейнов берите [PLA Basic](product/pla-basic-black).'],
        ['Какая температура печати у PLA?', 'Для PLA Basic Bambu Lab указывает температуру сопла 190–230 °C. Подбирать её вручную не нужно: выберите в Bambu Studio профиль производителя, и слайсер подставит параметры сам. PLA печатается на любом принтере Bambu Lab, в том числе на A1 и A1 mini без корпуса.'],
        ['Выдерживает ли PLA нагрев и улицу?', 'Хуже, чем PETG: по техническому листу Bambu Lab, температура тепловой деформации PLA Basic — 54–57 °C. Для деталей в машину, на солнце или рядом с батареей лучше PETG или ASA — подробнее в статье «[PETG или PLA](knowledge/petg-ili-pla)».'],
      ],
    },
    uz: {
      title: 'PLA plastik haqida ko‘p beriladigan savollar',
      items: [
        ['Toshkentda 3D-printer uchun PLA plastikni qayerdan sotib olish mumkin?', BUY_UZ('PLA')],
        ['PLA Basic yoki PLA Matte — qaysi birini tanlash kerak?', 'PLA Matte xira sirt beradi, unda qatlamlar kamroq ko‘rinadi — figuralar, maketlar va sovg‘alar uchun: [oq PLA Matte](product/pla-matte-white). PLA Basic mustahkamroq: Bambu Lab ma’lumotlariga ko‘ra, uning egilishdagi mustahkamligi 76 MPa, PLA Matte da esa 53 MPa — ushlagichlar va kronshteynlar uchun [PLA Basic](product/pla-basic-black)ni oling.'],
        ['PLA qanday haroratda bosiladi?', 'PLA Basic uchun Bambu Lab soplo haroratini 190–230 °C deb ko‘rsatadi. Uni qo‘lda tanlash shart emas: Bambu Studio’da ishlab chiqaruvchi profilini tanlang, slayser parametrlarni o‘zi qo‘yadi. PLA har qanday Bambu Lab printerida, jumladan korpussiz A1 va A1 mini’da ham bosiladi.'],
        ['PLA issiqlik va ko‘chaga chidaydimi?', 'PETG dan yomonroq: Bambu Lab texnik varag‘iga ko‘ra, PLA Basic ning issiqlikdan deformatsiyalanish harorati 54–57 °C. Mashina, quyosh yoki batareya yonidagi detallar uchun PETG yoki ASA yaxshiroq — batafsil «[PETG yoki PLA](knowledge/petg-ili-pla)» maqolasida.'],
      ],
    },
  },
  petg: {
    ru: {
      title: 'Частые вопросы о PETG пластике',
      items: [
        ['Где купить PETG пластик в Ташкенте?', BUY_RU('PETG')],
        ['Чем PETG отличается от PLA?', 'По данным Bambu Lab, на изгиб базовые версии почти равны: 75 МПа у PETG Basic и 76 МПа у PLA Basic. Зато ударная вязкость у PETG выше — 34,2 против 20,6 кДж/м², и он лучше держит нагрев. PLA проще в печати. Подробное сравнение — в статье «[PETG или PLA](knowledge/petg-ili-pla)».'],
        ['Какая температура печати у PETG?', 'Для PETG HF Bambu Lab указывает температуру сопла 230–260 °C и стол 65–75 °C с клеем. В Bambu Studio выберите профиль именно своей версии — [PETG Basic](product/petg-basic-black-spool) или [PETG HF](product/petg-hf-white), и параметры подставятся сами.'],
        ['Нужно ли сушить PETG?', 'Да. PETG впитывает влагу: для PETG HF Bambu Lab рекомендует сушку перед использованием — 65 °C, 8 часов в сушилке — и хранение при влажности ниже 20%, в пакете с силикагелем. Если пластик тянет нити, а поверхность стала шероховатой, его пора просушить. Подробнее — «[Как хранить и сушить филамент](knowledge/kak-hranit-filament)», для сушки подойдёт [сушилка для филамента](product/filament-dryer).'],
      ],
    },
    uz: {
      title: 'PETG plastik haqida ko‘p beriladigan savollar',
      items: [
        ['Toshkentda PETG plastikni qayerdan sotib olish mumkin?', BUY_UZ('PETG')],
        ['PETG ning PLA dan farqi nimada?', 'Bambu Lab ma’lumotlariga ko‘ra, egilishda bazaviy versiyalar deyarli teng: PETG Basic da 75 MPa, PLA Basic da 76 MPa. Ammo PETG ning zarbaga chidamliligi yuqoriroq — 34,2 ga qarshi 20,6 kJ/m², va u issiqlikka yaxshiroq chidaydi. PLA esa osonroq bosiladi. Batafsil taqqoslash — «[PETG yoki PLA](knowledge/petg-ili-pla)» maqolasida.'],
        ['PETG qanday haroratda bosiladi?', 'PETG HF uchun Bambu Lab soplo haroratini 230–260 °C, stolni esa yelim bilan 65–75 °C deb ko‘rsatadi. Bambu Studio’da aynan o‘z versiyangiz profilini tanlang — [PETG Basic](product/petg-basic-black-spool) yoki [PETG HF](product/petg-hf-white), parametrlar o‘zi qo‘yiladi.'],
        ['PETG ni quritish kerakmi?', 'Ha. PETG namlikni yutadi: PETG HF uchun Bambu Lab ishlatishdan oldin quritishni — quritgichda 65 °C, 8 soat — va 20% dan past namlikda, silikagelli paketda saqlashni tavsiya qiladi. Agar plastik ip tortsa va sirt g‘adir-budur bo‘lib qolsa, uni quritish vaqti keldi. Batafsil — «[Filamentni saqlash va quritish](knowledge/kak-hranit-filament)», quritish uchun [filament quritgichi](product/filament-dryer) mos keladi.'],
      ],
    },
  },
  'abs-asa': {
    ru: {
      title: 'Частые вопросы об ABS и ASA пластике',
      items: [
        ['Где купить ABS и ASA пластик для 3D-принтера в Ташкенте?', BUY_RU('ABS и ASA')],
        ['Можно ли печатать ABS и ASA на Bambu Lab A1 и A1 mini?', 'Производитель не рекомендует: для серии A1 Bambu Lab относит ABS и ASA к нерекомендуемым материалам. У открытого корпуса крупные детали из высокотемпературных пластиков сильнее коробит, и слои хуже сцепляются. ABS и ASA печатают на принтере с закрытым корпусом (P1S, X1C и другие), а для A1 выбирайте PETG.'],
        ['Чем ASA отличается от ABS?', 'Оба выдерживают больший нагрев, чем PLA, — для корпусов, креплений и деталей рядом с теплом. ASA, по данным Bambu Lab, ещё и устойчив к ультрафиолету и старению и рассчитан на долгую работу на улице: если деталь будет постоянно на солнце, берите [ASA](product/asa-black-spool).'],
      ],
    },
    uz: {
      title: 'ABS va ASA plastik haqida ko‘p beriladigan savollar',
      items: [
        ['Toshkentda 3D-printer uchun ABS va ASA plastikni qayerdan sotib olish mumkin?', BUY_UZ('ABS va ASA')],
        ['ABS va ASA ni Bambu Lab A1 va A1 mini’da bosish mumkinmi?', 'Ishlab chiqaruvchi tavsiya etmaydi: A1 seriyasi uchun Bambu Lab ABS va ASA ni tavsiya etilmaydigan materiallar qatoriga kiritadi. Ochiq korpusda yuqori haroratli plastiklardan katta detallar ko‘proq qiyshayadi va qatlamlar yomonroq yopishadi. ABS va ASA yopiq korpusli printerda bosiladi (P1S, X1C va boshqalar), A1 uchun esa PETG ni tanlang.'],
        ['ASA ning ABS dan farqi nimada?', 'Ikkalasi ham PLA dan ko‘ra yuqori issiqlikka chidaydi — korpuslar, mahkamlagichlar va issiqlik yonidagi detallar uchun. Bambu Lab ma’lumotlariga ko‘ra, ASA bundan tashqari ultrabinafsha nurlar va eskirishga chidamli hamda ko‘chada uzoq ishlash uchun mo‘ljallangan: detal doim quyoshda bo‘lsa, [ASA](product/asa-black-spool)ni oling.'],
      ],
    },
  },
  tpu: {
    ru: {
      title: 'Частые вопросы о гибком TPU пластике',
      items: [
        ['Где купить TPU пластик в Ташкенте?', BUY_RU('гибкий TPU')],
        ['Можно ли печатать TPU на Bambu Lab A1?', 'Да: для серии A1 Bambu Lab относит TPU к подходящим материалам. У Bambu Lab это [TPU 95A HF](product/tpu-95a-hf-black-spool), 1,75 мм, на катушке 1 кг.'],
        ['Работает ли TPU с AMS?', 'Нет. По данным производителя, TPU 95A HF не совместим ни с одной системой AMS: его печатают с внешнего держателя катушки и одним цветом. Поэтому за TPU лучше браться, когда уже есть опыт печати PLA.'],
        ['Нужно ли сушить TPU?', 'Да, Bambu Lab рекомендует сушить TPU 95A HF перед использованием; режим указан на этикетке и в техническом листе. Хранить открытую катушку лучше в герметичном пакете с силикагелем — подробнее в статье «[Как хранить и сушить филамент](knowledge/kak-hranit-filament)».'],
      ],
    },
    uz: {
      title: 'Egiluvchan TPU plastik haqida ko‘p beriladigan savollar',
      items: [
        ['Toshkentda TPU plastikni qayerdan sotib olish mumkin?', BUY_UZ('egiluvchan TPU')],
        ['TPU ni Bambu Lab A1’da bosish mumkinmi?', 'Ha: A1 seriyasi uchun Bambu Lab TPU ni mos materiallar qatoriga kiritadi. Bambu Lab’da bu [TPU 95A HF](product/tpu-95a-hf-black-spool), 1,75 mm, g‘altakda 1 kg.'],
        ['TPU AMS bilan ishlaydimi?', 'Yo‘q. Ishlab chiqaruvchi ma’lumotlariga ko‘ra, TPU 95A HF hech qaysi AMS tizimi bilan mos emas: u tashqi g‘altak ushlagichidan va bitta rangda bosiladi. Shuning uchun TPU ga PLA bilan tajriba orttirgandan keyin o‘tgan ma’qul.'],
        ['TPU ni quritish kerakmi?', 'Ha, Bambu Lab TPU 95A HF ni ishlatishdan oldin quritishni tavsiya qiladi; rejim yorliqda va texnik varaqda ko‘rsatilgan. Ochilgan g‘altakni silikagelli germetik paketda saqlagan ma’qul — batafsil «[Filamentni saqlash va quritish](knowledge/kak-hranit-filament)» maqolasida.'],
      ],
    },
  },
};
