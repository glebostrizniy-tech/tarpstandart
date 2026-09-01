export const CATALOG_INQUIRY_EVENT = "tarpstandart:catalog-inquiry";
const PENDING_INQUIRY_KEY = "tarpstandart:pending-inquiry";

export type CatalogInquiryDetail = {
  materialName: string;
  message: string;
  /** Тема формы: Материалы или Оборудование. */
  topic: "Материалы" | "Оборудование";
};

export function buildCatalogInquiryMessage(name: string): string {
  if (name === "Оборудование") {
    return `Здравствуйте! Интересует оборудование для работы с техническим текстилем.

Прошу уточнить наличие, комплектацию и сроки поставки.`;
  }

  return `Здравствуйте! Интересует: ${name}.

Прошу уточнить наличие, цены и возможность поставки или образцов.`;
}

function topicForInquiry(name: string): CatalogInquiryDetail["topic"] {
  return name === "Оборудование" ? "Оборудование" : "Материалы";
}

/** Заявка с той же страницы, где живёт форма: событие + скролл. */
export function openContactFormForMaterial(materialName: string): void {
  const message = buildCatalogInquiryMessage(materialName);

  window.dispatchEvent(
    new CustomEvent<CatalogInquiryDetail>(CATALOG_INQUIRY_EVENT, {
      detail: {
        materialName,
        message,
        topic: topicForInquiry(materialName),
      },
    }),
  );

  document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Заявка со страницы материала: форма живёт на главной, поэтому запрос
 * переносим через sessionStorage и подхватываем после навигации.
 */
export function rememberInquiryForNextPage(materialName: string): void {
  try {
    sessionStorage.setItem(PENDING_INQUIRY_KEY, materialName);
  } catch {
    // Приватный режим может блокировать sessionStorage — заявку просто
    // придётся заполнить руками, ломать переход из-за этого не нужно.
  }
}

export function consumePendingInquiry(): CatalogInquiryDetail | null {
  let materialName: string | null = null;

  try {
    materialName = sessionStorage.getItem(PENDING_INQUIRY_KEY);
    if (materialName) sessionStorage.removeItem(PENDING_INQUIRY_KEY);
  } catch {
    return null;
  }

  if (!materialName) return null;

  return {
    materialName,
    message: buildCatalogInquiryMessage(materialName),
    topic: topicForInquiry(materialName),
  };
}
