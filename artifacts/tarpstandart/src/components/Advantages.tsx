import { motion } from "framer-motion";
import { Globe2, MapPin, Factory, ShieldCheck } from "lucide-react";

export function Advantages() {
  const advantages = [
    {
      icon: <Globe2 className="w-8 h-8 text-primary" />,
      title: "Импорт и поставки из Китая",
      description: "Прямые контейнерные поставки от ведущих заводов. Минимальные цены без посредников.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Склады в ключевых городах",
      description: "Оперативная отгрузка из Москвы, Минска, Санкт-Петербурга и Уфы.",
    },
    {
      icon: <Factory className="w-8 h-8 text-primary" />,
      title: "Современное оборудование",
      description: "Комплексное оснащение производств профессиональными станками и машинами.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Контроль качества",
      description: "Строгий аудит на каждом этапе — от размещения заказа на заводе до доставки клиенту.",
    },
  ];

  return (
    <section id="advantages" className="py-24 bg-card/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="mb-6 p-4 rounded-xl bg-background inline-flex border border-border group-hover:bg-primary/5 transition-colors">
                {adv.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{adv.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
