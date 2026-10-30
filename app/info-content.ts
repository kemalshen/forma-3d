// SEO-тексты страниц /contacts, /delivery, /knowledge (ТЗ SEO от 2026-10-30).
// Ссылки в тексте: [анкор](путь без языка). {lead} — срок «под заказ» из ORDER_LEAD_TIME (stock.ts).

type Lang = 'ru' | 'uz';
type Faq = {title: string; items: [string, string][]};

export const INFO_FAQ: Record<'contacts' | 'delivery' | 'knowledge', Record<Lang, Faq>> = {
  "contacts": {
    "ru": {
      "title": "Частые вопросы",
      "items": [
        [
          "Как быстрее всего с нами связаться?",
          "Напишите в Telegram @kemalsen или позвоните по номеру +998 99 454-19-13. Мы на связи ежедневно с 09:00 до 21:00. В Telegram удобно прислать фото детали или название модели принтера: так быстрее подобрать то, что нужно."
        ],
        [
          "Можно ли забрать заказ самостоятельно?",
          "Да, самовывоз бесплатный. Пункты выдачи: Ташкент, ул. Бобура, 42, и Навои, ул. Спутник, 3, ежедневно с 09:00 до 21:00. Заказ можно забрать через час после того, как менеджер его подтвердит. Подробнее о сроках и оплате — на странице «[Доставка и оплата](delivery)». Пункты выдачи — это наш офис, поэтому заказ передаём у входа."
        ],
        [
          "Можно ли приехать без заказа и посмотреть товар?",
          "Нет, витрины у нас нет: все товары продаются только по заказу — на сайте, по телефону +998 99 454-19-13 или в Telegram @kemalsen."
        ],
        [
          "Поможете выбрать материал или запчасть?",
          "Да. Напишите, на каком принтере Bambu Lab вы печатаете (A1, A1 mini, P1S, X1C, H2D и другие) и что хотите напечатать. Подскажем [подходящий филамент](catalog) — PLA, PETG, ABS, ASA или TPU — либо [хотэнд, сопло и печатный стол](catalog/parts) под вашу модель."
        ],
        [
          "Работаете ли вы с компаниями и учебными заведениями?",
          "Да. Для принт-ферм, мастерских и учебных заведений есть оптовые цены от 5 катушек и документы для бизнеса, оплатить можно по счёту. Условия — на странице «[Филамент оптом для бизнеса](business)»."
        ]
      ]
    },
    "uz": {
      "title": "Ko‘p beriladigan savollar",
      "items": [
        [
          "Biz bilan qanday tezroq bog‘lanish mumkin?",
          "Telegramda @kemalsen ga yozing yoki +998 99 454-19-13 raqamiga qo‘ng‘iroq qiling. Har kuni 09:00 dan 21:00 gacha aloqadamiz. Telegramda detal rasmini yoki printer modelini yuborish qulay: shunda kerakli narsani tezroq tanlaymiz."
        ],
        [
          "Buyurtmani o‘zim olib ketsam bo‘ladimi?",
          "Ha, olib ketish bepul. Punktlar: Toshkent, Bobur ko‘chasi, 42 va Navoiy, Sputnik ko‘chasi, 3, har kuni 09:00 dan 21:00 gacha. Menejer buyurtmani tasdiqlaganidan bir soat o‘tib uni olib ketishingiz mumkin. Muddat va to‘lov haqida batafsil — «[Yetkazish va to‘lov](delivery)» sahifasida. Olib ketish punktlari — bizning ofisimiz, shuning uchun buyurtmani kirish oldida topshiramiz."
        ],
        [
          "Buyurtmasiz kelib, mahsulotni ko‘rsam bo‘ladimi?",
          "Yo‘q, bizda vitrina yo‘q: barcha mahsulotlar faqat buyurtma orqali sotiladi — saytda, +998 99 454-19-13 telefoni yoki Telegram @kemalsen orqali."
        ],
        [
          "Material yoki ehtiyot qism tanlashga yordam berasizmi?",
          "Ha. Qaysi Bambu Lab printerida bosayotganingizni (A1, A1 mini, P1S, X1C, H2D va boshqalar) va nima bosmoqchi ekaningizni yozing. [Mos filamentni](catalog) — PLA, PETG, ABS, ASA yoki TPU — yoki modelingizga mos [hotend, soplo va bosma stolini](catalog/parts) tavsiya qilamiz."
        ],
        [
          "Kompaniyalar va ta’lim muassasalari bilan ishlaysizmi?",
          "Ha. Print-fermalar, ustaxonalar va ta’lim muassasalari uchun 5 ta g‘altakdan boshlab ulgurji narxlar va biznes uchun hujjatlar bor, hisob orqali to‘lash mumkin. Shartlar — «[Biznes uchun ulgurji filament](business)» sahifasida."
        ]
      ]
    }
  },
  "delivery": {
    "ru": {
      "title": "Вопросы о доставке и оплате",
      "items": [
        [
          "Как оформить и оплатить заказ?",
          "Добавьте товары в корзину и оформите заказ на сайте. Менеджер подтвердит наличие и пришлёт ссылку на оплату или счёт. Оплатить можно онлайн через Payme, Click, UzCard и Humo, по счёту для компаний или при получении в Ташкенте."
        ],
        [
          "Успею ли я получить филамент сегодня?",
          "По Ташкенту — да, если оформить заказ до 14:00: курьер привезёт его в тот же день. Заказы после 14:00 доставляем на следующий день. Ещё быстрее — самовывоз: заказ можно забрать через час после подтверждения менеджером."
        ],
        [
          "Доставляете ли вы в другие города Узбекистана?",
          "Да, в регионы отправляем курьерской службой, срок — 1–4 дня. Стоимость — 50 000 сум. Если вам удобнее Навои, заберите заказ сами в пункте на ул. Спутник, 3."
        ],
        [
          "Есть ли бесплатная доставка?",
          "Самовывоз в Ташкенте и Навои всегда бесплатный. Доставка бесплатная при заказе от 1 000 000 сум."
        ],
        [
          "Как быстро приходят материалы под заказ?",
          "[Спецпластики — PLA-CF, PETG-CF, PC, PA-CF и PVA](catalog) — мы привозим под заказ. Срок поставки — {lead}, точную дату менеджер сообщит при оформлении."
        ],
        [
          "Работаете ли вы с юрлицами?",
          "Да. Принт-фермам, мастерским и учебным заведениям выставляем счёт, оптовые цены действуют от 5 катушек. Предоставляем все необходимые закрывающие документы. Подробнее — на странице «[Филамент оптом для бизнеса](business)»."
        ],
        [
          "Как вернуть товар?",
          "Условия возврата описаны на странице «[Возврат товара](returns)». Если что-то пошло не так с заказом, напишите нам в Telegram @kemalsen — разберёмся."
        ]
      ]
    },
    "uz": {
      "title": "Yetkazish va to‘lov bo‘yicha savollar",
      "items": [
        [
          "Buyurtmani qanday rasmiylashtirish va to‘lash mumkin?",
          "Mahsulotlarni savatga qo‘shing va saytda buyurtma bering. Menejer mahsulot borligini tasdiqlaydi va to‘lov havolasini yoki hisobni yuboradi. Payme, Click, UzCard va Humo orqali onlayn, kompaniyalar uchun hisob orqali yoki Toshkentda qabul qilishda to‘lash mumkin."
        ],
        [
          "Filamentni bugun olsam bo‘ladimi?",
          "Toshkentda — ha, agar buyurtmani 14:00 gacha bersangiz, kuryer uni shu kuni yetkazadi. 14:00 dan keyingi buyurtmalar ertasi kuni yetkaziladi. Bundan ham tezroq — olib ketish: menejer tasdiqlaganidan bir soat o‘tib buyurtmani olishingiz mumkin."
        ],
        [
          "O‘zbekistonning boshqa shaharlariga yetkazasizmi?",
          "Ha, viloyatlarga kuryerlik xizmati orqali jo‘natamiz, muddati — 1–4 kun. Narxi — 50 000 so‘m. Navoiy sizga qulay bo‘lsa, buyurtmani Sputnik ko‘chasi, 3 dagi punktdan o‘zingiz olib keting."
        ],
        [
          "Bepul yetkazish bormi?",
          "Toshkent va Navoiyda olib ketish har doim bepul. 1 000 000 so‘mdan boshlab buyurtmalarda yetkazib berish bepul."
        ],
        [
          "Buyurtmaga keltiriladigan materiallar qancha vaqtda keladi?",
          "[Maxsus plastiklarni — PLA-CF, PETG-CF, PC, PA-CF va PVA](catalog) — buyurtmaga olib kelamiz. Yetkazib berish muddati — {lead}, aniq sanani menejer buyurtma paytida aytadi."
        ],
        [
          "Yuridik shaxslar bilan ishlaysizmi?",
          "Ha. Print-fermalar, ustaxonalar va ta’lim muassasalariga hisob beramiz, ulgurji narxlar 5 ta g‘altakdan boshlanadi. Barcha kerakli yopuvchi hujjatlarni taqdim etamiz. Batafsil — «[Biznes uchun ulgurji filament](business)» sahifasida."
        ],
        [
          "Mahsulotni qanday qaytarish mumkin?",
          "Qaytarish shartlari «[Mahsulotni qaytarish](returns)» sahifasida yozilgan. Buyurtmada muammo bo‘lsa, Telegramda @kemalsen ga yozing — hal qilamiz."
        ]
      ]
    }
  },
  "knowledge": {
    "ru": {
      "title": "Коротко о материалах в нашем каталоге",
      "items": [
        [
          "Какой диаметр у филамента?",
          "Весь [филамент Bambu Lab](catalog) в нашем каталоге — диаметром 1,75 мм, на катушках по 1 кг."
        ],
        [
          "Чем рефилл отличается от филамента на катушке?",
          "Рефилл — это тот же 1 кг филамента, но без катушки. Его ставят на [многоразовую катушку Bambu Lab](product/reusable-spool), поэтому, если она у вас уже есть, новая катушка с каждым заказом не нужна."
        ],
        [
          "Какие материалы можно купить?",
          "В каталоге есть PLA (Basic и Matte), PETG HF, ABS, ASA и TPU. Инженерные пластики — PLA-CF, PETG-CF, PC, PA-CF и PVA — привозим под заказ."
        ],
        [
          "Есть ли запчасти для моего принтера?",
          "Мы подбираем [хотэнды и сопла для Bambu Lab](catalog/parts) A1, P1, X1 и H2, а также печатные столы, AMS и детали для ремонта. Напишите модель принтера — подскажем, что подойдёт."
        ]
      ]
    },
    "uz": {
      "title": "Katalogimizdagi materiallar haqida qisqacha",
      "items": [
        [
          "Filament diametri qanday?",
          "Katalogimizdagi barcha [Bambu Lab filamenti](catalog) 1,75 mm diametrli, 1 kg li g‘altaklarda."
        ],
        [
          "Refill g‘altakdagi filamentdan nimasi bilan farq qiladi?",
          "Refill — o‘sha 1 kg filament, faqat g‘altaksiz. U [qayta ishlatiladigan Bambu Lab g‘altagi](product/reusable-spool)ga o‘rnatiladi, shuning uchun bunday g‘altagingiz bo‘lsa, har buyurtmada yangi g‘altak kerak emas."
        ],
        [
          "Qanday materiallarni sotib olish mumkin?",
          "Katalogda PLA (Basic va Matte), PETG HF, ABS, ASA va TPU bor. Muhandislik plastiklarini — PLA-CF, PETG-CF, PC, PA-CF va PVA — buyurtmaga olib kelamiz."
        ],
        [
          "Printerim uchun ehtiyot qismlar bormi?",
          "Bambu Lab A1, P1, X1 va H2 uchun [hotend va soplolar](catalog/parts), shuningdek bosma stollari, AMS va ta’mirlash qismlarini tanlaymiz. Printer modelini yozing — mosini aytamiz."
        ]
      ]
    }
  }
};

export const KNOWLEDGE_INTRO: Record<Lang, string> = {
  "ru": "Здесь собираем практические советы по 3D-печати на принтерах Bambu Lab: как выбрать первый филамент, чем отличаются PLA и PETG, как хранить катушки между печатями, с чего начать в Bambu Studio и когда менять сопло. Не нашли ответ — напишите нам в Telegram @kemalsen: подскажем материал и запчасть под вашу модель принтера. Мы на связи ежедневно с 09:00 до 21:00.",
  "uz": "Bu yerda Bambu Lab printerlarida 3D-bosma bo‘yicha amaliy maslahatlarni to‘playmiz: birinchi filamentni qanday tanlash, PLA va PETG farqi, g‘altaklarni bosmalar orasida qanday saqlash, Bambu Studio’da nimadan boshlash va soploni qachon almashtirish kerak. Javob topmadingizmi? Telegramda @kemalsen ga yozing: printeringiz modeliga mos material va ehtiyot qismni tavsiya qilamiz. Har kuni 09:00 dan 21:00 gacha aloqadamiz."
};

// Анонсы карточек — в порядке массива guides в store.tsx.
export const GUIDE_TEASERS: Record<Lang, string[]> = {
  "ru": [
    "Что учитывать при выборе первого материала и чем отличаются линейки PLA Basic и PLA Matte от Bambu Lab.",
    "Сравниваем PLA и PETG по прочности, термостойкости и простоте печати, чтобы подобрать материал под конкретную деталь.",
    "Почему пластик набирает влагу и как этого избежать: [сушилка для филамента](product/filament-dryer), [вакуумные пакеты](product/vacuum-storage-bags) и силикагель.",
    "С чего начать в слайсере Bambu Lab: профиль филамента, высота слоя и базовые настройки печати.",
    "По каким признакам понять, что сопло износилось, и когда вместо стального нужно закалённое."
  ],
  "uz": [
    "Birinchi materialni tanlashda nimalarga e’tibor berish kerak va Bambu Lab PLA Basic hamda PLA Matte bir-biridan nimasi bilan farq qiladi.",
    "PLA va PETG’ni mustahkamlik, issiqlikka chidamlilik va bosish qulayligi bo‘yicha solishtiramiz — aniq detal uchun material tanlash oson bo‘ladi.",
    "Plastik nega nam tortadi va bunga qanday yo‘l qo‘ymaslik mumkin: [filament quritgich](product/filament-dryer), [vakuum paketlar](product/vacuum-storage-bags) va silikagel.",
    "Bambu Lab slayserida nimadan boshlash kerak: filament profili, qatlam balandligi va asosiy bosma sozlamalari.",
    "Soplo eskirganini qaysi belgilardan bilish mumkin va qachon po‘lat o‘rniga qattiqlashtirilgan soplo kerak bo‘ladi."
  ]
};
