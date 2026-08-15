import { Link, useRoute } from "wouter";
import { ArrowRight, Check, ChevronRight, FileText, Mail, Phone, Weight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/not-found";
import { findMaterialBySlug, materialPath, MATERIALS } from "@/data/materials";
import { MATERIAL_IMAGES } from "@/data/material-images";
import { breadcrumbJsonLd, materialJsonLd } from "@/data/structured-data";
import { CATALOG_PDF_URL, CONTACT_EMAIL, WAREHOUSE_CITIES_IN } from "@/data/site";
import { rememberInquiryForNextPage } from "@/lib/catalog-inquiry";

export default function MaterialPage() {
  const [, params] = useRoute<{ slug: string }>("/materialy/:slug");
  const material = params?.slug ? findMaterialBySlug(params.slug) : undefined;

  if (!material) {
    return <NotFound />;
  }

  const path = materialPath(material.slug);
  const related = MATERIALS.filter((item) => item.slug !== material.slug).slice(0, 4);
  const image = MATERIAL_IMAGES[material.slug];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo
        title={material.seoTitle}
        description={material.seoDescription}
        path={path}
        jsonLd={materialJsonLd(material)}
      />
      <script type="application/ld+json">
        {JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Каталог материалов", path: "/#catalog" },
            { name: material.name, path },
          ]),
        )}
      </script>

      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <nav aria-label="Хлебные крошки" className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/#catalog" className="hover:text-primary transition-colors">Каталог материалов</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{material.name}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">{material.name}</h1>
              <div className="w-20 h-1 bg-primary mb-8" />

              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-lg bg-card border border-border text-sm font-medium">
                <Weight className="w-4 h-4 text-primary" />
                {material.weight}
              </div>

              {image && (
                <div className="rounded-3xl overflow-hidden border border-border mb-12">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto max-h-[28rem] object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-12">
                {material.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {material.properties && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Характеристики</h2>
                  <dl className="mb-12 rounded-2xl border border-border overflow-hidden">
                    {material.properties.map((property, idx) => (
                      <div
                        key={property.label}
                        className={`grid sm:grid-cols-[minmax(0,14rem)_1fr] gap-1 sm:gap-6 px-5 py-4 ${
                          idx % 2 === 1 ? "bg-card/50" : ""
                        }`}
                      >
                        <dt className="text-sm font-semibold text-muted-foreground">
                          {property.label}
                        </dt>
                        <dd className="text-foreground/90">{property.value}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}

              {material.specTables?.map((table) => (
                <div key={table.title} className="mb-12">
                  <h3 className="text-xl font-semibold mb-4">{table.title}</h3>
                  <div className="rounded-2xl border border-border overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-card">
                          {table.headers.map((header) => (
                            <th
                              key={header}
                              scope="col"
                              className="text-left font-semibold px-5 py-3 whitespace-nowrap border-b border-border"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row) => (
                          <tr key={row[0]} className="border-b border-border last:border-0">
                            {row.map((cell, cellIdx) => (
                              <td
                                key={cellIdx}
                                className={`px-5 py-3 whitespace-nowrap ${
                                  cellIdx === 0
                                    ? "font-medium text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {table.note && (
                    <p className="mt-4 text-muted-foreground leading-relaxed">{table.note}</p>
                  )}
                </div>
              ))}

              <h2 className="text-2xl font-bold mb-6">Где применяется</h2>
              <ul className="space-y-3 mb-12">
                {material.applications.map((application) => (
                  <li key={application} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-foreground/90">{application}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-6">Поставка со складов</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Материал отгружаем со складов в {WAREHOUSE_CITIES_IN}. Для крупных объёмов
                организуем прямые контейнерные поставки из Китая.
              </p>
            </div>

            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 bg-card border border-border rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-2">Запросить цену</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Уточним наличие, стоимость и сроки под ваш объём.
                </p>

                <Link
                  href="/#contacts"
                  onClick={() => rememberInquiryForNextPage(material.name)}
                >
                  <Button size="lg" className="w-full h-12 font-semibold group mb-6">
                    Оставить заявку
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <a
                  href={CATALOG_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-11 mb-6 rounded-md border border-border text-sm font-semibold hover:border-primary/30 hover:text-primary transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Каталог PDF
                </a>

                <div className="space-y-3 text-sm">
                  <a
                    href="tel:+78123052516"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    8 (812) 305-25-16
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-8">Другие материалы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={materialPath(item.slug)}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
