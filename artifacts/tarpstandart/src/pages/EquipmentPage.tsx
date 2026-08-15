import { Link } from "wouter";
import { ArrowRight, Check, ChevronRight, ExternalLink, Mail, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import weldingMachinesImage from "@assets/equipment/welding-machines.png";
import { EQUIPMENT_PARTNERS, EQUIPMENT_PATH, EQUIPMENT_SEO } from "@/data/equipment";
import { breadcrumbJsonLd } from "@/data/structured-data";
import { CONTACT_EMAIL } from "@/data/site";
import { rememberInquiryForNextPage } from "@/lib/catalog-inquiry";

const CAPABILITIES = [
  "Закройные комплексы и автоматические раскройные машины",
  "Аппараты сварки горячим воздухом и утюжком (горячим клином)",
  "Станки и линии сварки ТВЧ",
  "Лентопроклеечные машины",
  "Комплексы для работы с материалом Airdeck",
  "Аппараты ультразвуковой сварки",
];

export default function EquipmentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo
        title={EQUIPMENT_SEO.title}
        description={EQUIPMENT_SEO.description}
        path={EQUIPMENT_PATH}
      />
      <script type="application/ld+json">
        {JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Оборудование", path: EQUIPMENT_PATH },
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
            <span className="text-foreground">Оборудование</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Оборудование для работы с техническим текстилем
              </h1>
              <div className="w-20 h-1 bg-primary mb-8" />

              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                TarpStandart занимается комплексными поставками оборудования для работы с
                техническим текстилем — от закройных комплексов до аппаратов сварки ТВЧ,
                горячим воздухом и ультразвуком.
              </p>

              <div className="rounded-3xl overflow-hidden border border-border mb-12">
                <img
                  src={weldingMachinesImage}
                  alt="Партия сварочных аппаратов TarpStandart для технического текстиля на производстве"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              <h2 className="text-2xl font-bold mb-6">Что поставляем</h2>
              <ul className="space-y-3 mb-12">
                {CAPABILITIES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4">Производители-партнёры</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Нашими партнёрами являются такие производители, как:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {EQUIPMENT_PARTNERS.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {partner.name}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">{partner.focus}</p>
                  </a>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-12">
                А также другие ведущие производители.
              </p>

              <h2 className="text-2xl font-bold mb-6">Наличие и поставка</h2>
              <p className="text-muted-foreground leading-relaxed">
                Узнать о наличии оборудования на складе в России или оставить запрос на его
                поставку вы можете в отделе продаж TarpStandart.
              </p>
            </div>

            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 bg-card border border-border rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-2">Запросить оборудование</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Подберём решение под ваш материал и объём производства.
                </p>

                <Link
                  href="/#contacts"
                  onClick={() => rememberInquiryForNextPage("Оборудование")}
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
