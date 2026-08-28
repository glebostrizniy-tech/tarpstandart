import {
  absoluteUrl,
  CONTACT_EMAIL,
  CONTACT_PHONES,
  LEGAL_ADDRESS,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  WAREHOUSE_CITIES,
  WAREHOUSES,
} from "./site";
import type { Material } from "./materials";
import { materialPath } from "./materials";

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/og-image.png"),
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONES,
    foundingDate: "2004",
    taxID: "7814190674",
    vatID: "7814190674",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RU",
      addressLocality: LEGAL_ADDRESS.city,
      postalCode: LEGAL_ADDRESS.postalCode,
      streetAddress: LEGAL_ADDRESS.street,
    },
    areaServed: WAREHOUSE_CITIES.map((city) => ({
      "@type": "City",
      name: city,
    })),
    location: WAREHOUSES.map((warehouse) => ({
      "@type": "Place",
      name: `Склад ${SITE_NAME} — ${warehouse.city}`,
      address: {
        "@type": "PostalAddress",
        addressCountry: warehouse.country,
        addressLocality: warehouse.city,
        streetAddress: warehouse.address,
      },
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT_PHONES[0],
        email: CONTACT_EMAIL,
        availableLanguage: ["ru"],
      },
    ],
    sameAs: ["https://vk.com/tarpstandart", "https://web.max.ru/-73641918407966"],
  };
}

export function materialJsonLd(material: Material): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: material.name,
    description: material.seoDescription,
    url: absoluteUrl(materialPath(material.slug)),
    category: "Технический текстиль",
    brand: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_LEGAL_NAME,
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
