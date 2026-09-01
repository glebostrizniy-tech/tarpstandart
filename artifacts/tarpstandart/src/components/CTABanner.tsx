import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-primary noise-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Готовы начать сотрудничество?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Оставьте заявку, и наши специалисты подберут оптимальное решение для вашего производства.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => scrollTo("contacts")}
              className="bg-white text-primary hover:bg-white/90 text-lg h-14 px-10 font-bold"
            >
              Запросить предложение
            </Button>
            <Button 
              size="lg" 
              onClick={() => scrollTo("catalog")}
              className="bg-white text-primary hover:bg-white/90 text-lg h-14 px-10 font-bold"
            >
              Смотреть каталог
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
