export type Manufacturer = {
  slug: string;
  /** Название бренда как его знают на рынке. */
  name: string;
  /** Короткая подпись для карточки. */
  tagline: string;
  site: string;
  /** Ссылка на сайт в человекочитаемом виде. */
  siteLabel: string;
  seoTitle: string;
  seoDescription: string;
  body: string[];
  /** Коллекции этого производителя в нашем ассортименте. */
  collections: string[];
  /** Слаги материалов, к которым ведём со страницы производителя. */
  relatedMaterials: string[];
};

export const MANUFACTURERS: Manufacturer[] = [
  {
    slug: "sijia",
    name: "Sijia Group",
    tagline: "Мировой лидер в производстве тканей ПВХ",
    site: "https://en.sijiacn.com/",
    siteLabel: "en.sijiacn.com",
    seoTitle: "Sijia Group — ткани ПВХ и технический текстиль | ТарпСтандарт",
    seoDescription:
      "TarpStandart представляет Sijia Group на рынке России и Беларуси: ткани ПВХ, ТПУ-плёнки, Airdeck, лодочные и морозостойкие материалы с 2010 года.",
    body: [
      "TarpStandart представляет на рынке России и Беларуси одного из мировых лидеров в производстве тканей ПВХ и других видов технического текстиля — конгломерат заводов Sijia Group.",
      "Большая линейка технического текстиля и неизменно высокое качество известны на нашем рынке с 2010 года.",
    ],
    collections: [
      "Sijia Boat и Sijia Boat Camo — газодержащие лодочные ткани",
      "Sijiatex TPU — полностью полиуретановые ткани",
      "SijiaTex TPU Film — прозрачные плёнки ТПУ",
      "Sijia Airdeck — двустенные ткани drop stitch",
      "SijiaTex Waders — материалы для забродной одежды",
    ],
    relatedMaterials: [
      "tkan-pvh-gazoderzhashchaya",
      "tkani-tpu-i-blendy",
      "plenki-tpu",
      "airdeck-drop-stitch",
    ],
  },
  {
    slug: "hongshida",
    name: "Hongshida (HSD)",
    tagline: "Один из крупнейших производителей тканей ПВХ",
    site: "https://hsdtextile.com",
    siteLabel: "hsdtextile.com",
    seoTitle: "Hongshida HSD — газодержащие ткани ПВХ | ТарпСтандарт",
    seoDescription:
      "Hongshida (HSD) — один из крупнейших производителей тканей ПВХ. Газодержащие ткани 650–1100 г/м² для лодок, аттракционов и пневмоконструкций.",
    body: [
      "Hongshida — один из крупнейших и хорошо зарекомендовавших себя производителей. Неизменно высокое качество для решения производственных задач в области применения тканей ПВХ является визитной карточкой компании HSD.",
      "Материал коллекции Hongshida Boat устойчив к образованию грибка и воздействию ультрафиолета. Отличительная особенность коллекции — высокое качество за разумную цену.",
    ],
    collections: [
      "Hongshida Boat 650 / 750 / 850 г/м² — нить 1000 × 1000 D, строение 23 × 23",
      "Hongshida Boat 1100 г/м² — нить 1000 × 1000 D, строение 28 × 26",
    ],
    relatedMaterials: ["tkan-pvh-gazoderzhashchaya", "tkan-pvh"],
  },
];

export function findManufacturerBySlug(slug: string): Manufacturer | undefined {
  return MANUFACTURERS.find((item) => item.slug === slug);
}

export function manufacturerPath(slug: string): string {
  return `/proizvoditeli/${slug}`;
}
