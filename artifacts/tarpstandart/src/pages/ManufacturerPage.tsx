import { Link, useRoute } from "wouter";
import { ArrowRight, Check, ChevronRight, ExternalLink, Mail, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/not-found";
import {
  findManufacturerBySlug,
  manufacturerPath,
  MANUFACTURERS,
} from "@/data/manufacturers";
import { findMaterialBySlug, materialPath } from "@/data/materials";
import { breadcrumbJsonLd } from "@/data/structured-data";
import { CONTACT_EMAIL } from "@/data/site";
import { rememberInquiryForNextPage } from "@/lib/catalog-inquiry";

export default function ManufacturerPage() {
  const [, params] = useRoute<{ slug: string }>("/proizvoditeli/:slug");
  const manufacturer = params?.slug ? findManufacturerBySlug(params.slug) : undefined;

  if (!manufacturer) {
    return <NotFound />;
  }

  const path = manufacturerPath(manufacturer.slug);
  const materials = manufacturer.relatedMaterials
    .map((slug) => findMaterialBySlug(slug))
    .filter((material): material is NonNullable<typeof material> => Boolean(material));
  const others = MANUFACTURERS.filter((item) => item.slug !== manufacturer.slug);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo
        title={manufacturer.seoTitle}
        description={manufacturer.seoDescription}
        path={path}
      />
      <script type="application/ld+json">
        {JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: manufacturer.name, path },
          ]),
        )}
      </script>

      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <nav
            aria-label="Хлебные крошки"
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{manufacturer.name}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">{manufacturer.name}</h1>
              <div className="w-20 h-1 bg-primary mb-8" />

              <p className="text-lg text-primary font-medium mb-8">{manufacturer.tagline}</p>

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-12">
                {manufacturer.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6">Коллекции в нашем ассортименте</h2>
              <ul className="space-y-3 mb-12">
                {manufacturer.collections.map((collection) => (
                  <li key={collection} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-foreground/90">{collection}</span>
                  </li>
                ))}
              </ul>

              {materials.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Материалы производителя</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-12">
                    {materials.map((material) => (
                      <Link
                        key={material.slug}
                        href={materialPath(material.slug)}
                        className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
                      >
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {material.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{material.desc}</p>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              <h2 className="text-2xl font-bold mb-4">Сайт производителя</h2>
              <a
                href={manufacturer.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                {manufacturer.siteLabel}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 bg-card border border-border rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-2">Запросить цену</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Уточним наличие, стоимость и сроки под ваш объём.
                </p>

                <Link
                  href="/#contacts"
                  onClick={() => rememberInquiryForNextPage(manufacturer.name)}
                >
                  <Button size="lg" className="w-full h-12 font-semibold group mb-6">
                    Оставить заявку
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

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

          {others.length > 0 && (
            <div className="mt-20 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold mb-8">Другие производители</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {others.map((item) => (
                  <Link
                    key={item.slug}
                    href={manufacturerPath(item.slug)}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
                  >
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
