import { motion } from "framer-motion";

export function Partners() {
  const partners = [
    "Sijia",
    "HSD",
    "MSD",
    "Shenda Kobond",
    "Vowalom GMBH"
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-background/50">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-10">Надежные партнеры-производители</p>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="px-8 py-4 rounded-xl bg-card border border-white/5 flex items-center justify-center grayscale hover:grayscale-0 hover:border-primary/30 transition-all cursor-pointer"
            >
              <span className="text-2xl font-display font-bold text-foreground/70">{partner}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
