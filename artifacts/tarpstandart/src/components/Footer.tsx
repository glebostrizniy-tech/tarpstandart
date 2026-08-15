import { Link, useLocation } from "wouter";
import logoPath from "@assets/tarpstandart-logo.png";
import { Mail, Phone } from "lucide-react";
import { CATALOG_PDF_URL } from "@/data/site";
import { EQUIPMENT_PATH } from "@/data/equipment";
import { LEGAL_DOCUMENTS, legalPath } from "@/data/legal";
import { MANUFACTURERS, manufacturerPath } from "@/data/manufacturers";

export function Footer() {
  const [location, setLocation] = useLocation();

  const goToSection = (id: string) => {
    if (location !== "/") {
      setLocation(`/#${id}`);
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <img src={logoPath} alt="TarpStandard Logo" className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              Ведущий поставщик технического текстиля и оборудования для производственных предприятий в России и Беларуси.
            </p>
            <div className="flex gap-4">
              <a href="https://vk.com/tarpstandart" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                <span className="font-bold">VK</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                <span className="font-bold text-xs">TG</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6 uppercase tracking-wider text-sm">Навигация</h4>
            <ul className="space-y-3">
              <li><button onClick={() => goToSection("catalog")} className="text-muted-foreground hover:text-primary transition-colors text-sm">Каталог материалов</button></li>
              <li><button onClick={() => goToSection("applications")} className="text-muted-foreground hover:text-primary transition-colors text-sm">Сферы применения</button></li>
              <li><button onClick={() => goToSection("about")} className="text-muted-foreground hover:text-primary transition-colors text-sm">О компании</button></li>
              <li><button onClick={() => goToSection("contacts")} className="text-muted-foreground hover:text-primary transition-colors text-sm">Контакты</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6 uppercase tracking-wider text-sm">Каталог</h4>
            <ul className="space-y-3">
              <li><button onClick={() => goToSection("catalog")} className="text-muted-foreground hover:text-primary transition-colors text-sm">Ткани ПВХ</button></li>
              <li><button onClick={() => goToSection("catalog")} className="text-muted-foreground hover:text-primary transition-colors text-sm">Плёнки и сетки</button></li>
              <li><button onClick={() => goToSection("catalog")} className="text-muted-foreground hover:text-primary transition-colors text-sm">ТПУ и ТПО материалы</button></li>
              <li>
                <Link href={EQUIPMENT_PATH} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Оборудование
                </Link>
              </li>
              {MANUFACTURERS.map((manufacturer) => (
                <li key={manufacturer.slug}>
                  <Link
                    href={manufacturerPath(manufacturer.slug)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {manufacturer.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={CATALOG_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Каталог PDF
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6 uppercase tracking-wider text-sm">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+78123052516" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center group-hover:bg-primary/10">
                    <Phone size={14} />
                  </div>
                  8 (812) 305-25-16
                </a>
              </li>
              <li>
                <a href="tel:+79602441144" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center group-hover:bg-primary/10">
                    <Phone size={14} />
                  </div>
                  8 (960) 244-11-44
                </a>
              </li>
              <li>
                <a href="mailto:sale@tarpstandart.ru" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center group-hover:bg-primary/10">
                    <Mail size={14} />
                  </div>
                  sale@tarpstandart.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ООО «ТарпСтандарт». Все права защищены.</p>
          <div className="flex gap-4">
            {LEGAL_DOCUMENTS.map((doc) => (
              <Link
                key={doc.slug}
                href={legalPath(doc.slug)}
                className="hover:text-foreground transition-colors"
              >
                {doc.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
