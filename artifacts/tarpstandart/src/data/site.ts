const configuredSiteUrl =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  typeof import.meta.env.VITE_SITE_URL === "string"
    ? import.meta.env.VITE_SITE_URL
    : undefined;

export const SITE_URL = (
  configuredSiteUrl ?? "https://glebostrizniy-tech.github.io/tarpstandart"
).replace(/\/+$/, "");

export const SITE_NAME = "ТарпСтандарт";
export const SITE_LEGAL_NAME = "ООО «ТарпСтандарт»";

export const COMPANY_SLOGAN =
  "Десятки поставщиков, сотни покупателей, тысячи сделок, миллионы квадратных метров проданного технического текстиля";

export const CONTACT_PHONES = ["+78123052516", "+79602441144"];
export const CONTACT_EMAIL = "sale@tarpstandart.ru";

export const CATALOG_PDF_URL = "https://disk.yandex.ru/i/CEMoBbKapZCOBw";

export const LEGAL_ADDRESS = {
  postalCode: "197374",
  city: "Санкт-Петербург",
  street: "ул. Стародеревенская, д. 11, корп. 2, лит. А",
};

export type Warehouse = {
  city: string;
  address: string;
  country: "RU" | "BY";
};

/** Склады отгрузки. Порядок — как на сайте, адреса для водителей. */
export const WAREHOUSES: Warehouse[] = [
  {
    city: "Санкт-Петербург",
    country: "RU",
    address:
      "Ленинградская область, Всеволожский район, Муринское городское поселение, производственная зона Мурино, Северный проезд, 16/6",
  },
  {
    city: "Москва",
    country: "RU",
    address:
      "Московская область, Долгопрудный, микрорайон Шереметьевский, ул. Южная, д. 1, стр. 13",
  },
  {
    city: "Уфа",
    country: "RU",
    address: "Республика Башкортостан, Уфа, ул. Путейская, д. 3",
  },
  {
    city: "Минск",
    country: "BY",
    address:
      "Республика Беларусь, Минская область, Минский район, севернее аг. Михановичи, Михановичский Логистический Центр",
  },
];

export const WAREHOUSE_CITIES = WAREHOUSES.map((warehouse) => warehouse.city);

/** Предложный падеж для текстов вида «со складов в ...». */
export const WAREHOUSE_CITIES_IN = "Москве, Санкт-Петербурге, Минске и Уфе";

export function warehouseMapUrl(warehouse: Warehouse): string {
  return `https://yandex.ru/maps/?text=${encodeURIComponent(`${warehouse.city}, ${warehouse.address}`)}`;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
