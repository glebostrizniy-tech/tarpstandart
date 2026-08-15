export type EquipmentPartner = {
  name: string;
  url: string;
  /** Что именно поставляет производитель. */
  focus: string;
};

export const EQUIPMENT_PARTNERS: EquipmentPartner[] = [
  {
    name: "Danrel",
    url: "https://www.danrel.com/",
    focus: "Оборудование для сварки и обработки технического текстиля",
  },
  {
    name: "Puxiong Group",
    url: "https://www.puxionggroup.com/",
    focus: "Промышленные комплексы для работы с ПВХ-тканями и плёнками",
  },
  {
    name: "Rili Welder",
    url: "https://riliwelder.com/",
    focus: "Сварочные аппараты для тентовых и пневмоконструкций",
  },
  {
    name: "PGM",
    url: "https://www.pgmsystem.com/en/",
    focus: "Закройные комплексы и автоматические раскройные машины",
  },
];

export const EQUIPMENT_PATH = "/oborudovanie";

export const EQUIPMENT_SEO = {
  title: "Оборудование для технического текстиля — поставки | ТарпСтандарт",
  description:
    "Комплексные поставки оборудования для работы с техническим текстилем: сварка ТВЧ и горячим воздухом, закройные комплексы PGM, лентопроклеечные машины.",
};
