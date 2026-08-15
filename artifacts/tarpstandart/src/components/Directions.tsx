import { motion } from "framer-motion";
import { Link } from "wouter";
import technicalTextileImage from "@assets/directions/technical-textile.png";
import usageShipyardImage from "@assets/directions/usage-shipyard.png";
import materialSamplesImage from "@assets/directions/material-samples.png";
import weldingMachinesImage from "@assets/equipment/welding-machines.png";
import sijiaBoatImage from "@assets/directions/sijia-boat.png";
import inflatableHangarImage from "@assets/directions/inflatable-hangar.png";
import { EQUIPMENT_PATH } from "@/data/equipment";
import { manufacturerPath } from "@/data/manufacturers";

type Direction = {
  title: string;
  subtitle: string;
  img: string;
  alt: string;
  span: string;
  /** Внутренняя страница, если у направления она есть. */
  href?: string;
  /** Секция главной, к которой скроллим, если отдельной страницы нет. */
  scrollTo?: string;
};

export function Directions() {
  const directions: Direction[] = [
    {
      title: "Технический текстиль",
      subtitle: "Ткани ПВХ и другие материалы для производства",
      img: technicalTextileImage,
      alt: "Рулоны технической ПВХ-ткани",
      span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
      scrollTo: "catalog",
    },
    {
      title: "Виды использования",
      subtitle: "От автотентов до пневмоструктур",
      img: usageShipyardImage,
      alt: "Промышленные укрытия из ПВХ-ткани на судоремонте",
      span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
      scrollTo: "applications",
    },
    {
      title: "Типы материалов",
      subtitle: "Полный ассортимент технических тканей",
      img: materialSamplesImage,
      alt: "Образцы ПВХ-ткани разных цветов",
      span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
      scrollTo: "catalog",
    },
    {
      title: "Оборудование",
      subtitle: "Сварка, раскрой и комплексное оснащение производств",
      img: weldingMachinesImage,
      alt: "Сварочные аппараты TarpStandart для технического текстиля",
      span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
      href: EQUIPMENT_PATH,
    },
    {
      title: "Sijia",
      subtitle: "Мировой лидер в производстве тканей ПВХ",
      img: sijiaBoatImage,
      alt: "Надувной катер — применение газодержащей ПВХ-ткани Sijia",
      span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
      href: manufacturerPath("sijia"),
    },
    {
      title: "HSD",
      subtitle: "Газодержащие ткани ПВХ Hongshida",
      img: inflatableHangarImage,
      alt: "Мобильный надувной ангар из технического текстиля",
      span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
      href: manufacturerPath("hongshida"),
    },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Направления работы</h2>
          <div className="w-20 h-1 bg-primary mb-8" />
          <p className="text-xl text-muted-foreground max-w-2xl">
            Комплексные решения для промышленных предприятий. Мы обеспечиваем производства материалами и оборудованием высшего класса.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {directions.map((dir, idx) => {
            const card = (
              <>
                <img
                  src={dir.img}
                  alt={dir.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-colors" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform">{dir.title}</h3>
                  <p className="text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {dir.subtitle}
                  </p>
                </div>
              </>
            );

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative rounded-2xl overflow-hidden group ${dir.span}`}
              >
                {dir.href ? (
                  <Link href={dir.href} className="absolute inset-0 block">
                    {card}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => dir.scrollTo && scrollToSection(dir.scrollTo)}
                    className="absolute inset-0 block w-full text-left"
                    aria-label={dir.title}
                  >
                    {card}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
