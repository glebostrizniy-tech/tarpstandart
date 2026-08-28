import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@assets/generated_images/hero-pvc-rolls.jpg";
import { COMPANY_SLOGAN } from "@/data/site";

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden noise-bg">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background/0 to-transparent z-0 opacity-60" />
      
      {/* Abstract geometric background patterns */}
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-6">
                Премиальный индустриальный партнер
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-foreground"
            >
              Технический <span className="text-primary">текстиль</span><br />
              для вашего производства
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: "easeOut" }}
              className="max-w-xl border-l-2 border-primary pl-5 mb-6 text-base md:text-lg leading-snug text-foreground/85"
            >
              {COMPANY_SLOGAN}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
            >
              Поставки ПВХ-тканей и технического текстиля. Россия и Беларусь. Опыт 20 лет прямых контейнерных поставок.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                onClick={() => scrollTo("catalog")}
                className="text-base font-semibold group h-14 px-8"
              >
                Смотреть каталог
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollTo("contacts")}
                className="text-base font-semibold h-14 px-8 border-border hover:bg-muted"
              >
                Запросить предложение
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:h-[700px] flex items-center justify-center hidden lg:flex"
          >
            {/* The generated image goes here */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
              <img 
                src={heroImage} 
                alt="Технический текстиль ПВХ" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => scrollTo("advantages")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
}
