import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Weight } from "lucide-react";
import { MATERIALS, materialPath } from "@/data/materials";
import { CATALOG_PDF_URL } from "@/data/site";
import { openContactFormForMaterial } from "@/lib/catalog-inquiry";

export function Catalog() {
  return (
    <section id="catalog" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Каталог материалов</h2>
            <div className="w-20 h-1 bg-primary mb-4" />
            <p className="text-xl text-muted-foreground max-w-2xl">
              Широкий ассортимент технических тканей для любых задач вашего производства.
            </p>
          </motion.div>
          <Button asChild variant="outline" className="border-border shrink-0">
            <a href={CATALOG_PDF_URL} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 w-4 h-4" />
              Каталог PDF
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MATERIALS.map((mat, idx) => (
            <motion.div
              key={mat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
              className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all group flex flex-col h-full"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  <Link
                    href={materialPath(mat.slug)}
                    className="hover:text-primary transition-colors"
                  >
                    {mat.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{mat.desc}</p>
              </div>

              <div className="pt-4 border-t border-border mt-auto flex items-center justify-between gap-2">
                <div className="flex items-center text-xs text-muted-foreground font-medium">
                  <Weight className="w-3.5 h-3.5 mr-1.5 opacity-50" />
                  {mat.weight}
                </div>
                <button
                  type="button"
                  onClick={() => openContactFormForMaterial(mat.name)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-foreground hover:bg-primary rounded-full py-2 px-3 transition-colors shrink-0"
                  aria-label={`Запросить цену на материал ${mat.name}`}
                >
                  Запросить
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
