import { motion } from "framer-motion";
import { Link } from "wouter";
import { manufacturerPath } from "@/data/manufacturers";

type Partner = {
  name: string;
  href?: string;
};

export function Partners() {
  const partners: Partner[] = [
    { name: "Sijia", href: manufacturerPath("sijia") },
    { name: "HSD", href: manufacturerPath("hongshida") },
    { name: "MSD" },
    { name: "Shenda Kobond" },
    { name: "Vowalom GMBH" },
  ];

  return (
    <section className="py-20 border-y border-border bg-background/50">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-10">
          Надежные партнеры-производители
        </p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {partners.map((partner, idx) => {
            const className =
              "px-8 py-4 rounded-xl bg-card border border-border flex items-center justify-center grayscale hover:grayscale-0 hover:border-primary/30 transition-all";

            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {partner.href ? (
                  <Link href={partner.href} className={`${className} cursor-pointer`}>
                    <span className="text-2xl font-display font-bold text-foreground/70">
                      {partner.name}
                    </span>
                  </Link>
                ) : (
                  <div className={className}>
                    <span className="text-2xl font-display font-bold text-foreground/70">
                      {partner.name}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
