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

export const CONTACT_PHONES = ["+78123052516", "+79602441144"];
export const CONTACT_EMAIL = "sale@tarpstandart.ru";

export const CATALOG_PDF_URL = "https://disk.yandex.ru/i/CEMoBbKapZCOBw";

export const LEGAL_ADDRESS = {
  postalCode: "197374",
  city: "Санкт-Петербург",
  street: "ул. Стародеревенская, д. 11, корп. 2, лит. А",
};

export const WAREHOUSE_CITIES = ["Москва", "Санкт-Петербург", "Минск", "Уфа"];

/** Предложный падеж для текстов вида «со складов в ...». */
export const WAREHOUSE_CITIES_IN = "Москве, Санкт-Петербурге, Минске и Уфе";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
