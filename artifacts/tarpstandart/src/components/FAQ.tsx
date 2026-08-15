import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      q: "Какие минимальные объёмы поставки?",
      a: "Минимальный объём зависит от вида материала. Для позиций в наличии на складе возможна отгрузка от одного рулона. Для спецзаказов и контейнерных поставок — уточняйте у менеджера."
    },
    {
      q: "Есть ли материалы на складе?",
      a: "Да, популярные виды тканей ПВХ и других материалов всегда в наличии на наших складах в Москве, Санкт-Петербурге, Минске и Уфе."
    },
    {
      q: "Работаете ли вы с физическими лицами?",
      a: "Мы работаем преимущественно с юридическими лицами и ИП, так как ориентированы на оптовые промышленные поставки."
    },
    {
      q: "Как рассчитывается стоимость?",
      a: "Стоимость рассчитывается индивидуально по запросу. Она зависит от объёма партии, веса материала, плотности и условий поставки (склад или прямой импорт)."
    },
    {
      q: "Предоставляете ли образцы?",
      a: "Да, мы предоставляем каталоги с образцами (веера) для всех наших материалов. Вы можете запросить их через форму на сайте или связавшись с отделом продаж."
    },
    {
      q: "Какие сроки поставки?",
      a: "Отгрузка со склада осуществляется от 1–3 дней после оплаты. Сроки контейнерных поставок из Китая согласовываются индивидуально."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Частые вопросы</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="border border-border rounded-2xl bg-card/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-foreground">{faq.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${openIndex === idx ? "rotate-180 text-primary" : ""}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
