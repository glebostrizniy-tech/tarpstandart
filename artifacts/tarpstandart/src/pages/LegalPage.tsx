import { Link, useRoute } from "wouter";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import NotFound from "@/pages/not-found";
import {
  findLegalDocumentBySlug,
  legalPath,
  LEGAL_DOCUMENTS,
} from "@/data/legal";
import { breadcrumbJsonLd } from "@/data/structured-data";

export default function LegalPage() {
  const [, params] = useRoute<{ slug: string }>("/:slug");
  const document = params?.slug ? findLegalDocumentBySlug(params.slug) : undefined;

  if (!document) {
    return <NotFound />;
  }

  const path = legalPath(document.slug);
  const others = LEGAL_DOCUMENTS.filter((item) => item.slug !== document.slug);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo title={document.seoTitle} description={document.seoDescription} path={path} />
      <script type="application/ld+json">
        {JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: document.name, path },
          ]),
        )}
      </script>

      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <nav
            aria-label="Хлебные крошки"
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{document.name}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{document.heading}</h1>
          <div className="w-20 h-1 bg-primary mb-6" />
          <p className="text-sm text-muted-foreground mb-10">
            Редакция действует с {document.effectiveDate}
          </p>

          <div className="space-y-4 text-muted-foreground leading-relaxed mb-12">
            {document.intro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="space-y-10">
            {document.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                {section.paragraphs && (
                  <div className="space-y-3 text-muted-foreground leading-relaxed">
                    {section.paragraphs.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}
                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-foreground/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {others.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <div className="flex flex-wrap gap-4">
                {others.map((item) => (
                  <Link
                    key={item.slug}
                    href={legalPath(item.slug)}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {item.name}
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
