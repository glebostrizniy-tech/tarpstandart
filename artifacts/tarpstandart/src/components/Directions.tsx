import { motion } from "framer-motion";
import closeupImage from "@assets/generated_images/pvc-fabric-closeup.jpg";
import tentImage from "@assets/generated_images/industrial-tent.jpg";
import watercraftImage from "@assets/generated_images/inflatable-watercraft.jpg";
import warehouseImage from "@assets/generated_images/warehouse.jpg";
import equipmentImage from "@assets/generated_images/equipment.jpg";
import tarpImage from "@assets/generated_images/construction-tarp.jpg";

export function Directions() {
  const directions = [
    {
      title: "Технический текстиль",
      subtitle: "Ткани ПВХ и другие материалы для производства",
      img: closeupImage,
      span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
    },
    {
      title: "Виды использования",
      subtitle: "От автотентов до пневмоструктур",
      img: tarpImage,
      span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    },
    {
      title: "Типы материалов",
      subtitle: "Полный ассортимент технических тканей",
      img: warehouseImage,
      span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    },
    {
      title: "Оборудование",
      subtitle: "Комплексное оснащение производств",
      img: equipmentImage,
      span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
    },
    {
      title: "Sijia",
      subtitle: "Партнёр-производитель премиум-класса",
      img: watercraftImage,
      span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    },
    {
      title: "HSD",
      subtitle: "Надёжный бренд оборудования",
      img: tentImage,
      span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    },
  ];

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
          {directions.map((dir, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${dir.span}`}
            >
              <img
                src={dir.img}
                alt={dir.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent group-hover:from-background/95 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform">{dir.title}</h3>
                <p className="text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {dir.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
