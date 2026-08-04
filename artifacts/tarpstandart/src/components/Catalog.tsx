import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Weight } from "lucide-react";

export function Catalog() {
  const materials = [
    { name: "Ткань ПВХ", desc: "Универсальный материал для тентов и ангаров", weight: "от 400 до 1200 г/м²" },
    { name: "Ткань ПВХ газодержащая", desc: "Для надувных лодок и пневмоструктур", weight: "650-1450 г/м²" },
    { name: "Материал для вейдерсов", desc: "Водонепроницаемая дышащая ткань", weight: "различная плотность" },
    { name: "Плёнки ПВХ", desc: "Для прозрачных окон и штор", weight: "0.4 - 2.0 мм" },
    { name: "Плёнки ТПУ", desc: "Сверхпрочные полиуретановые пленки", weight: "0.1 - 1.5 мм" },
    { name: "Ткани ТПУ и бленды", desc: "Высокая износостойкость и морозостойкость", weight: "от 200 г/м²" },
    { name: "Кожзаменитель", desc: "Для мебели, авто и катеров", weight: "премиум качество" },
    { name: "Акриловая ткань", desc: "Для маркиз, навесов и яхт", weight: "300 г/м²" },
    { name: "Сетка ПВХ", desc: "Для фасадных и заградительных работ", weight: "250-400 г/м²" },
    { name: "Аирдэк (AirDeck)", desc: "Материал 3D (Drop Stitch) для жестких надувных полов", weight: "индивидуально" },
    { name: "Ткань ТПО", desc: "Экологичный кровельный и мембранный материал", weight: "от 500 г/м²" },
    { name: "Полиэстровая ткань", desc: "С различными покрытиями и пропитками", weight: "различная плотность" },
    { name: "Медицинские материалы", desc: "Специализированные ткани с антибактериальным покрытием", weight: "стандарт" },
    { name: "ПП (полипропиленовое)", desc: "Промышленные тенты и упаковка", weight: "легкий вес" },
    { name: "ПЭ (полиэтиленовое)", desc: "Тарпаулин для укрытий", weight: "60-280 г/м²" },
  ];

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
          <Button variant="outline" className="hidden md:flex border-white/10 shrink-0">
            Скачать прайс-лист
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {materials.map((mat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
              className="p-6 rounded-2xl bg-background border border-white/5 hover:border-primary/30 transition-all group flex flex-col h-full"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{mat.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{mat.desc}</p>
              </div>
              
              <div className="pt-4 border-t border-white/5 mt-auto flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground font-medium">
                  <Weight className="w-3.5 h-3.5 mr-1.5 opacity-50" />
                  {mat.weight}
                </div>
                <button className="text-primary hover:text-primary-foreground hover:bg-primary rounded-full p-2 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
