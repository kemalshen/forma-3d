// Посадочные страницы категорий запчастей: /ru|uz/catalog/hotends, /ru|uz/catalog/plates.
// Это тот же каталог запчастей с выбранной категорией, плюс свой H1, мета и вводный текст.
// Факты — из карточек товаров (app/parts.ts), без цен, наличия и сроков.

export type PartSlug = 'hotends' | 'plates';
export const PART_SLUGS: PartSlug[] = ['hotends', 'plates'];

/** Значение фильтра «Категория» в каталоге запчастей (см. PART_CATEGORIES в parts.ts). */
export const PART_FILTER: Record<PartSlug, string> = {hotends: 'Хотэнды и сопла', plates: 'Печатные пластины'};

export const partSlugOf = (category: string): PartSlug | undefined =>
  PART_SLUGS.find((s) => PART_FILTER[s] === category);

type Intro = {text: string; links: {to: string; text: string}[]};

export const PART_INTRO: Record<PartSlug, {ru: Intro; uz: Intro}> = {
  hotends: {
    ru: {
      text: 'Хотэнд — нагревательный узел с соплом: если сопло забилось, износилось или нужен другой диаметр, его меняют целиком. Здесь собраны оригинальные хотэнды Bambu Lab: 0,4 мм для A1 и A1 mini, хотэнды в сборе 0,4 мм для P1P, P1S, X1 и X1C, закалённые 0,4 мм для пластиков с углеволокном и стекловолокном (CF/GF), 0,2 мм для мелких деталей, 0,6 мм для быстрой печати крупных деталей, быстросъёмные закалённые хотэнды для P2S и серии H2, а также силиконовый чехол. Хотэнды от разных серий принтеров не взаимозаменяемы — подберём по модели вашего принтера.',
      links: [
        {to: 'knowledge/kogda-menyat-soplo', text: 'когда менять сопло'},
        {to: 'catalog/parts', text: 'все запчасти Bambu Lab'},
      ],
    },
    uz: {
      text: 'Hotend — soplo bilan birga qizdirish bloki: soplo tiqilib qolsa, yeyilsa yoki boshqa diametr kerak bo‘lsa, u butunlay almashtiriladi. Bu yerda original Bambu Lab hotendlari: A1 va A1 mini uchun 0,4 mm, P1P, P1S, X1 va X1C uchun 0,4 mm hotend yig‘masi, uglerod va shisha tolali plastiklar (CF/GF) uchun 0,4 mm toblangan hotend, mayda detallar uchun 0,2 mm, katta detallarni tez bosish uchun 0,6 mm, P2S va H2 seriyasi uchun tez almashtiriladigan toblangan hotendlar, shuningdek silikon qoplama. Turli seriyadagi printerlarning hotendlari bir-birining o‘rniga tushmaydi — printeringiz modeliga qarab tanlab beramiz.',
      links: [
        {to: 'knowledge/kogda-menyat-soplo', text: 'soploni qachon almashtirish kerak'},
        {to: 'catalog/parts', text: 'barcha Bambu Lab ehtiyot qismlari'},
      ],
    },
  },
  plates: {
    ru: {
      text: 'Печатный стол — съёмная пластина на магнитном основании, к которой прилипает первый слой модели. Здесь собраны оригинальные столы Bambu Lab: Textured PEI Plate 180 мм для A1 mini и 256 мм для A1, P1P, P1S, X1 и X1C — текстурированный PEI, дно детали получается шероховатым; Smooth PEI Plate — гладкое глянцевое дно; Cool Plate SuperTack — для PLA, держит деталь без клея; Engineering Plate для P1 и X1 — под инженерные пластики. Стол размером 180 мм подходит только к A1 mini, 256 мм — к остальным моделям. Подберём стол по модели принтера и материалу.',
      links: [
        {to: 'product/glue-stick', text: 'клей-карандаш для стола'},
        {to: 'knowledge/bambu-studio-nastroyka', text: 'как выбрать тип стола в Bambu Studio'},
        {to: 'catalog/parts', text: 'все запчасти Bambu Lab'},
      ],
    },
    uz: {
      text: 'Bosma stoli — magnitli asosdagi olinadigan plastina, modelning birinchi qatlami unga yopishadi. Bu yerda original Bambu Lab stollari: A1 mini uchun 180 mm va A1, P1P, P1S, X1, X1C uchun 256 mm Textured PEI Plate — teksturali PEI, detal tagi g‘adir-budur chiqadi; Smooth PEI Plate — silliq yaltiroq tag; Cool Plate SuperTack — PLA uchun, detalni yelimsiz ushlaydi; P1 va X1 uchun Engineering Plate — muhandislik plastiklari uchun. 180 mm stol faqat A1 mini ga, 256 mm — qolgan modellarga mos. Stolni printer modeli va materialga qarab tanlab beramiz.',
      links: [
        {to: 'product/glue-stick', text: 'bosma stoli uchun yelim'},
        {to: 'knowledge/bambu-studio-nastroyka', text: 'Bambu Studio’da stol turini tanlash'},
        {to: 'catalog/parts', text: 'barcha Bambu Lab ehtiyot qismlari'},
      ],
    },
  },
};

// «Частые вопросы» на /catalog/hotends и /catalog/plates (стр. 1). Факты — из статей базы знаний
// (kogda-menyat-soplo, bambu-studio-nastroyka) и карточек товаров; без цен, наличия и сроков.
type Faq = {title: string; items: [string, string][]};

const WHERE_RU = (what: string) =>
  `Здесь, в Forma 3D: ${what} собраны на этой странице. Оформите заказ на сайте или напишите в Telegram @kemalsen модель принтера — подберём совместимую деталь. Если позиция под заказ, цену и срок подтвердим перед оформлением. Доставляем по Ташкенту и в регионы Узбекистана, есть самовывоз — условия на странице «[Доставка и оплата](delivery)».`;
const WHERE_UZ = (what: string) =>
  `Shu yerda, Forma 3D’da: ${what} shu sahifada jamlangan. Saytda buyurtma bering yoki Telegram @kemalsen’ga printer modelini yozing — mos qismni tanlab beramiz. Pozitsiya buyurtma asosida bo‘lsa, narx va muddatni rasmiylashtirishdan oldin tasdiqlaymiz. Toshkent bo‘ylab va O‘zbekiston viloyatlariga yetkazamiz, olib ketish ham mumkin — shartlar «[Yetkazib berish va to‘lov](delivery)» sahifasida.`;

export const PART_FAQ: Record<PartSlug, {ru: Faq; uz: Faq}> = {
  hotends: {
    ru: {
      title: 'Частые вопросы о хотэндах и соплах',
      items: [
        ['Где купить сопло Bambu Lab 0,4 мм в Ташкенте?', WHERE_RU('оригинальные хотэнды Bambu Lab с соплом 0,4 мм для A1 и A1 mini, P1P и P1S, X1 и X1C, а также 0,2 и 0,6 мм и закалённые для CF/GF —')],
        ['Как заменить сопло на Bambu Lab A1 и A1 mini?', 'У A1 и A1 mini сопло меняется вместе с хотэндом, и он быстросъёмный: по данным Bambu Lab, без инструментов замена занимает несколько минут. После установки сопла другого диаметра или материала обновите информацию о сопле на экране принтера и выберите тот же диаметр в Bambu Studio. Стандартный вариант — [хотэнд A1 0,4 мм (сталь)](product/hotend-a1-04-steel). Хотэнды разных серий принтеров не взаимозаменяемы.'],
        ['Когда пора менять сопло?', 'Если засор возвращается после чистки, сопло давно в работе и качество печати упало без других причин или вы переходите на абразивные пластики с углеволокном и стекловолокном. Перед заменой проверьте температуру, влажность филамента и профиль в Bambu Studio; для чистки пригодится [набор для чистки сопла](product/nozzle-cleaning-kit). Подробнее — в статье «[Когда менять сопло](knowledge/kogda-menyat-soplo)».'],
        ['Обычное или закалённое сопло?', 'Для PLA, PETG, TPU, ABS и ASA подходит обычный стальной хотэнд. Для PLA-CF, PETG-CF, PA-CF, светящихся в темноте и других абразивных пластиков нужен закалённый: по данным Bambu Lab, их частицы истирают сопло из нержавеющей стали. Например, [закалённый хотэнд 0,4 мм для A1 / A1 mini](product/hotend-a1-04-hardened) или [для P1P / P1S](product/hotend-p1-04-hardened).'],
        ['Сопло 0,2, 0,4 или 0,6 мм — какое выбрать?', '0,4 мм — стандартный диаметр для большинства задач. 0,2 мм — для мелких деталей и тонких надписей, печать заметно дольше: [хотэнд 0,2 мм для A1 / A1 mini](product/hotend-a1-02). 0,6 мм печатает крупные детали быстрее, но слои грубее: [хотэнд 0,6 мм для A1 / A1 mini](product/hotend-a1-06). После смены диаметра выберите его в Bambu Studio.'],
      ],
    },
    uz: {
      title: 'Hotend va soplolar haqida ko‘p beriladigan savollar',
      items: [
        ['Toshkentda Bambu Lab 0,4 mm soplosini qayerdan sotib olish mumkin?', WHERE_UZ('A1 va A1 mini, P1P va P1S, X1 va X1C uchun 0,4 mm soploli original Bambu Lab hotendlari, shuningdek 0,2 va 0,6 mm hamda CF/GF uchun toblangan hotendlar')],
        ['Bambu Lab A1 va A1 mini da soplo qanday almashtiriladi?', 'A1 va A1 mini da soplo hotend bilan birga almashtiriladi, u tez yechiladigan: Bambu Lab ma’lumotlariga ko‘ra, asbobsiz almashtirish bir necha daqiqa oladi. Boshqa diametr yoki materialdagi soplo o‘rnatgandan keyin printer ekranidagi soplo ma’lumotini yangilang va Bambu Studio’da ham o‘sha diametrni tanlang. Standart variant — [A1 hotend 0,4 mm (po‘lat)](product/hotend-a1-04-steel). Turli seriyadagi printerlarning hotendlari bir-birining o‘rniga tushmaydi.'],
        ['Soploni qachon almashtirish kerak?', 'Tozalagandan keyin ham tiqilish qaytaversa, soplo uzoq ishlagan va boshqa sababsiz bosma sifati tushib ketgan bo‘lsa yoki uglerod va shisha tolali abraziv plastiklarga o‘tayotgan bo‘lsangiz. Almashtirishdan oldin haroratni, filament namligini va Bambu Studio’dagi profilni tekshiring; tozalash uchun [soploni tozalash to‘plami](product/nozzle-cleaning-kit) asqatadi. Batafsil — «[Soploni qachon almashtirish kerak](knowledge/kogda-menyat-soplo)» maqolasida.'],
        ['Oddiy yoki toblangan soplo?', 'PLA, PETG, TPU, ABS va ASA uchun oddiy po‘lat hotend mos. PLA-CF, PETG-CF, PA-CF, qorong‘ida yonuvchi va boshqa abraziv plastiklar uchun toblangan hotend kerak: Bambu Lab ma’lumotlariga ko‘ra, ularning zarralari zanglamaydigan po‘lat soploni yeyib yuboradi. Masalan, [A1 / A1 mini uchun toblangan hotend 0,4 mm](product/hotend-a1-04-hardened) yoki [P1P / P1S uchun](product/hotend-p1-04-hardened).'],
        ['Soplo 0,2, 0,4 yoki 0,6 mm — qaysi birini tanlash kerak?', '0,4 mm — ko‘pchilik vazifalar uchun standart diametr. 0,2 mm — mayda detallar va ingichka yozuvlar uchun, bosma ancha uzoq davom etadi: [A1 / A1 mini uchun 0,2 mm hotend](product/hotend-a1-02). 0,6 mm yirik detallarni tezroq bosadi, lekin qatlamlar dag‘alroq: [A1 / A1 mini uchun 0,6 mm hotend](product/hotend-a1-06). Diametrni almashtirgandan keyin uni Bambu Studio’da tanlang.'],
      ],
    },
  },
  plates: {
    ru: {
      title: 'Частые вопросы о печатных столах',
      items: [
        ['Где купить печатный стол Bambu Lab в Ташкенте?', WHERE_RU('оригинальные столы Bambu Lab — Textured PEI, Smooth PEI, Cool Plate SuperTack и Engineering Plate —')],
        ['Какой стол подходит к A1 mini, а какой — к A1, P1S и X1C?', 'Стол 180 мм подходит только к A1 mini: [Textured PEI Plate 180 мм](product/textured-plate-180). К A1, P1P, P1S, X1 и X1C — столы 256 мм, например [Textured PEI Plate 256 мм](product/textured-plate).'],
        ['Textured PEI, Smooth PEI или Cool Plate SuperTack — в чём разница?', 'На текстурированном PEI дно детали получается шероховатым, на [Smooth PEI](product/smooth-pei-plate) — гладким и глянцевым. [Cool Plate SuperTack](product/cool-plate-supertack) рассчитан на PLA и держит деталь без клея. [Engineering Plate](product/engineering-plate) для P1 и X1 — под инженерные пластики.'],
        ['Нужно ли указывать тип стола в Bambu Studio?', 'Да: тип стола в Bambu Studio должен совпадать с установленным на принтере — от него зависят температура стола в профиле и рекомендации по клею. Перед печатью Bambu Lab советует мыть стол горячей водой со средством для мытья посуды, тогда первый слой держится лучше. Подробнее — в статье «[Настройка Bambu Studio](knowledge/bambu-studio-nastroyka)».'],
      ],
    },
    uz: {
      title: 'Bosma stollari haqida ko‘p beriladigan savollar',
      items: [
        ['Toshkentda Bambu Lab bosma stolini qayerdan sotib olish mumkin?', WHERE_UZ('original Bambu Lab stollari — Textured PEI, Smooth PEI, Cool Plate SuperTack va Engineering Plate')],
        ['A1 mini ga qaysi stol, A1, P1S va X1C ga qaysi stol mos keladi?', '180 mm stol faqat A1 mini ga mos: [Textured PEI Plate 180 mm](product/textured-plate-180). A1, P1P, P1S, X1 va X1C uchun — 256 mm stollar, masalan [Textured PEI Plate 256 mm](product/textured-plate).'],
        ['Textured PEI, Smooth PEI yoki Cool Plate SuperTack — farqi nimada?', 'Teksturali PEI da detal tagi g‘adir-budur chiqadi, [Smooth PEI](product/smooth-pei-plate) da — silliq va yaltiroq. [Cool Plate SuperTack](product/cool-plate-supertack) PLA uchun mo‘ljallangan va detalni yelimsiz ushlaydi. P1 va X1 uchun [Engineering Plate](product/engineering-plate) — muhandislik plastiklari uchun.'],
        ['Bambu Studio’da stol turini ko‘rsatish kerakmi?', 'Ha: Bambu Studio’dagi stol turi printerga o‘rnatilgan stolga mos kelishi kerak — profildagi stol harorati va yelim bo‘yicha tavsiyalar shunga bog‘liq. Bosishdan oldin Bambu Lab stolni issiq suv va idish yuvish vositasi bilan yuvishni maslahat beradi — shunda birinchi qatlam yaxshiroq yopishadi. Batafsil — «[Bambu Studio sozlash](knowledge/bambu-studio-nastroyka)» maqolasida.'],
      ],
    },
  },
};
