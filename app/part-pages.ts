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
