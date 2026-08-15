import { motion } from "framer-motion";

export function AboutCompany() {
  return (
    <section id="about" className="py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">О компании</h2>
            <div className="w-20 h-1 bg-primary mb-8" />
            
            <div className="space-y-6 text-lg text-muted-foreground mb-10">
              <p>
                <strong className="text-foreground font-semibold">ТарпСтандарт</strong> — надёжная компания-импортёр, работающая на рынке России и Беларуси с 2004 года. Основная специализация — технический текстиль для различных отраслей промышленности.
              </p>
              <p>
                Большая партнёрская сеть поставщиков в Китае и по всему миру позволяет нам гибко реагировать на потребности клиентов, обеспечивая бесперебойные поставки материалов высочайшего качества.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-6">Наши услуги:</h3>
            <ul className="space-y-4">
              {[
                "Консультация и подбор технических тканей под ваши задачи",
                "Организация регулярного снабжения производств и разовые поставки",
                "Широкий ассортимент на складах в России и Беларуси",
                "Прямые контейнерные поставки из Китая",
                "Гибкая ценовая политика и срочные поставки"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="bg-card border border-border p-8 rounded-3xl h-48 flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl font-display font-bold text-primary mb-2">20+</div>
                <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Лет опыта</div>
              </div>
              <div className="bg-card border border-border p-8 rounded-3xl h-48 flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl font-display font-bold text-primary mb-2">4</div>
                <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Склада РФ и РБ</div>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="bg-card border border-border p-8 rounded-3xl h-48 flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl font-display font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Видов тканей</div>
              </div>
              <div className="bg-primary p-8 rounded-3xl h-48 flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl font-display font-bold text-white mb-2">100%</div>
                <div className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">Контроль качества</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
