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
  'abs-asa': {
    ru: {
      text: 'ABS и ASA — пластики для деталей, которым нужен нагрев выше, чем выдерживает PLA: корпуса, крепления, детали для машины и мест возле тепла. ASA, по данным Bambu Lab, устойчив к ультрафиолету и старению и рассчитан на долгую работу на улице. Оба материала печатают на принтере с закрытым корпусом (P1S, X1C и другие); для A1 и A1 mini производитель их не рекомендует — для открытого принтера выбирайте PETG. Здесь собраны ABS и ASA от Bambu Lab, 1,75 мм, на катушке 1 кг.',
      links: [
        {to: 'knowledge/kakoy-filament-vybrat', text: 'какой филамент выбрать'},
        {to: 'knowledge/petg-ili-pla', text: 'PETG или PLA: что выбрать'},
        {to: 'catalog/petg', text: 'PETG пластик'},
      ],
    },
    uz: {
      text: 'ABS va ASA — PLA chiday olmaydigan issiqlikka chidashi kerak bo‘lgan detallar uchun plastiklar: korpuslar, mahkamlagichlar, mashina uchun va issiq joylar yonidagi detallar. Bambu Lab ma’lumotlariga ko‘ra, ASA ultrabinafsha nurlar va eskirishga chidamli hamda ko‘chada uzoq ishlash uchun mo‘ljallangan. Ikkala material yopiq korpusli printerda bosiladi (P1S, X1C va boshqalar); A1 va A1 mini uchun ishlab chiqaruvchi ularni tavsiya etmaydi — ochiq printer uchun PETG ni tanlang. Bu yerda Bambu Lab ABS va ASA, 1,75 mm, g‘altakda 1 kg.',
      links: [
        {to: 'knowledge/kakoy-filament-vybrat', text: 'qaysi filamentni tanlash kerak'},
        {to: 'knowledge/petg-ili-pla', text: 'PETG yoki PLA: qaysi birini tanlash'},
        {to: 'catalog/petg', text: 'PETG plastik'},
      ],
    },
  },
  tpu: {
    ru: {
      text: 'TPU — гибкий пластик для накладок, амортизаторов, ремешков, чехлов и других эластичных деталей. У Bambu Lab это TPU 95A HF, 1,75 мм, на катушке 1 кг. Для серии A1 производитель относит TPU к подходящим материалам. TPU не совместим с AMS — его печатают с внешней катушки. За TPU лучше браться, когда уже есть опыт печати PLA.',
      links: [
        {to: 'knowledge/kakoy-filament-vybrat', text: 'какой филамент выбрать'},
        {to: 'knowledge/kak-hranit-filament', text: 'как хранить и сушить филамент'},
        {to: 'catalog/pla', text: 'PLA пластик'},
      ],
    },
    uz: {
      text: 'TPU — qoplamalar, amortizatorlar, tasmalar, g‘iloflar va boshqa elastik detallar uchun egiluvchan plastik. Bambu Lab da bu TPU 95A HF, 1,75 mm, g‘altakda 1 kg. A1 seriyasi uchun ishlab chiqaruvchi TPU ni mos materiallar qatoriga kiritadi. TPU AMS bilan mos emas — u tashqi g‘altakdan bosiladi. TPU ga PLA bilan biroz tajriba orttirgandan keyin o‘tgan ma’qul.',
      links: [
        {to: 'knowledge/kakoy-filament-vybrat', text: 'qaysi filamentni tanlash kerak'},
        {to: 'knowledge/kak-hranit-filament', text: 'filamentni saqlash va quritish'},
        {to: 'catalog/pla', text: 'PLA plastik'},
      ],
    },
  },
};
