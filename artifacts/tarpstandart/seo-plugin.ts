import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'vite';
import { MATERIALS, materialPath } from './src/data/materials';
import { EQUIPMENT_PATH, EQUIPMENT_SEO } from './src/data/equipment';
import { MANUFACTURERS, manufacturerPath } from './src/data/manufacturers';
import { LEGAL_DOCUMENTS, legalPath } from './src/data/legal';

type SeoRoute = {
  path: string;
  title: string;
  description: string;
};

/**
 * Сайт отдаётся как статика, поэтому без предрендера все URL получают один и тот
 * же index.html с общим title. Яндекс такие страницы склеивает как дубли, так что
 * на каждый маршрут пишем отдельный HTML с уникальными метатегами.
 */
export function seoPlugin(siteUrl: string): Plugin {
  const routes: SeoRoute[] = [
    {
      path: '/',
      title:
        'ТарпСтандарт — технический текстиль и ткань ПВХ оптом в России и Беларуси',
      description:
        'Поставки ПВХ-тканей, плёнок ТПУ, тарпаулина и технического текстиля оптом. Склады в Москве, СПб, Минске и Уфе. Прямые контейнерные поставки из Китая с 2004 года.',
    },
    ...MATERIALS.map((material) => ({
      path: materialPath(material.slug),
      title: material.seoTitle,
      description: material.seoDescription,
    })),
    {
      path: EQUIPMENT_PATH,
      title: EQUIPMENT_SEO.title,
      description: EQUIPMENT_SEO.description,
    },
    ...MANUFACTURERS.map((manufacturer) => ({
      path: manufacturerPath(manufacturer.slug),
      title: manufacturer.seoTitle,
      description: manufacturer.seoDescription,
    })),
    ...LEGAL_DOCUMENTS.map((document) => ({
      path: legalPath(document.slug),
      title: document.seoTitle,
      description: document.seoDescription,
    })),
  ];

  return {
    name: 'tarpstandart-seo',
    apply: 'build',
    async closeBundle() {
      const outDir = path.resolve(import.meta.dirname, 'dist/public');
      const indexHtml = await readFile(path.join(outDir, 'index.html'), 'utf8');

      await writeFile(
        path.join(outDir, 'sitemap.xml'),
        buildSitemap(siteUrl, routes),
      );

      await writeFile(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      );

      for (const route of routes) {
        if (route.path === '/') continue;

        const html = applyMeta(indexHtml, siteUrl, route);
        const dir = path.join(outDir, route.path.replace(/^\//, ''));
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, 'index.html'), html);
      }

      await writeFile(
        path.join(outDir, 'index.html'),
        applyMeta(indexHtml, siteUrl, routes[0]),
      );
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function applyMeta(html: string, siteUrl: string, route: SeoRoute): string {
  const canonical = `${siteUrl}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?">/,
      `<meta name="description" content="${description}">`,
    )
    .replace(
      /<meta property="og:title" content="[\s\S]*?">/,
      `<meta property="og:title" content="${title}">`,
    )
    .replace(
      /<link rel="canonical" href="[\s\S]*?">/,
      `<link rel="canonical" href="${canonical}">`,
    )
    .replace(
      /<meta property="og:url" content="[\s\S]*?">/,
      `<meta property="og:url" content="${canonical}">`,
    );
}

function buildSitemap(siteUrl: string, routes: SeoRoute[]): string {
  const today = new Date().toISOString().slice(0, 10);

  const urls = routes
    .map(
      (route) =>
        `  <url>\n` +
        `    <loc>${siteUrl}${route.path}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>monthly</changefreq>\n` +
        `    <priority>${route.path === '/' ? '1.0' : '0.8'}</priority>\n` +
        `  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
