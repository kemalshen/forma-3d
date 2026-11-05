// Посадочные страницы материалов: /ru|uz/catalog/pla, /ru|uz/catalog/petg.
// Это тот же каталог филамента с выбранным фильтром материала, плюс свой H1, мета и вводный текст.
// Факты о материалах — из статьи «PETG или PLA» (данные Bambu Lab), без цен и сроков.

export type MaterialSlug = 'pla' | 'petg';
export const MATERIAL_SLUGS: MaterialSlug[] = ['pla', 'petg'];

/** Значение фильтра «Материал» в каталоге (см. materials / matchesMaterial в catalog.ts). */
export const MATERIAL_FILTER: Record<MaterialSlug, string> = {pla: 'PLA', petg: 'PETG'};

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
        {to: 'catalog/petg', text: 'PETG пластик'},
      ],
    },
    uz: {
      text: 'PLA — bosish uchun eng oson plastik: deyarli kirishmaydi, ochiq printerda bosiladi va maketlar, prototiplar, figuralar va dekor uchun mos. Bu yerda Bambu Lab PLA, 1,75 mm: PLA Basic va PLA Matte g‘altakda 1 kg yoki g‘altaksiz refill, shuningdek Silk, Marble, Wood, Glow, PLA-CF va boshqa seriyalar buyurtmaga. PLA qizdirilganda yumshaydi (taxminan 55 °C), shuning uchun ko‘chada va issiq joyda ishlaydigan detallar uchun PETG yaxshiroq.',
      links: [
        {to: 'knowledge/petg-ili-pla', text: 'PETG yoki PLA: qaysi birini tanlash'},
        {to: 'knowledge/kakoy-filament-vybrat', text: 'yangi boshlovchi uchun qaysi filament'},
        {to: 'catalog/petg', text: 'PETG plastik'},
      ],
    },
  },
  petg: {
    ru: {
      text: 'PETG — пластик для функциональных деталей: лучше PLA держит удар и нагрев, по данным Bambu Lab стоек к воде и ультрафиолету и подходит для изделий на улице. Здесь собраны PETG от Bambu Lab, 1,75 мм: PETG HF — версия для быстрой печати — на катушке 1 кг или рефиллом без катушки, а также PETG Basic и PETG-CF. PETG впитывает влагу — перед печатью его стоит просушить.',
      links: [
        {to: 'knowledge/petg-ili-pla', text: 'PETG или PLA: что выбрать'},
        {to: 'knowledge/kak-hranit-filament', text: 'как хранить и сушить филамент'},
        {to: 'catalog/pla', text: 'PLA пластик'},
      ],
    },
    uz: {
      text: 'PETG — funksional detallar uchun plastik: zarba va issiqlikka PLA dan yaxshiroq chidaydi, Bambu Lab ma’lumotlariga ko‘ra suv va ultrabinafsha nurlarga chidamli, ko‘chadagi buyumlar uchun mos. Bu yerda Bambu Lab PETG, 1,75 mm: PETG HF — tez bosish uchun versiya — g‘altakda 1 kg yoki g‘altaksiz refill, shuningdek PETG Basic va PETG-CF. PETG namlikni yutadi — bosishdan oldin uni quritish kerak.',
      links: [
        {to: 'knowledge/petg-ili-pla', text: 'PETG yoki PLA: qaysi birini tanlash'},
        {to: 'knowledge/kak-hranit-filament', text: 'filamentni saqlash va quritish'},
        {to: 'catalog/pla', text: 'PLA plastik'},
      ],
    },
  },
};
