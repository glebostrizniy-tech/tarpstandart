import { absoluteUrl, SITE_NAME } from "@/data/site";

type SeoProps = {
  title: string;
  description: string;
  /** Путь страницы для canonical, например "/materialy/tkan-pvh". */
  path: string;
  /** JSON-LD разметка страницы. */
  jsonLd?: Record<string, unknown>;
};

/**
 * React 19 поднимает title/meta/link в <head>, отдельная библиотека не нужна.
 */
export function Seo({ title, description, path, jsonLd }: SeoProps) {
  const canonical = absoluteUrl(path);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={absoluteUrl("/og-image.png")} />
      <meta property="og:locale" content="ru_RU" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteUrl("/og-image.png")} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </>
  );
}
