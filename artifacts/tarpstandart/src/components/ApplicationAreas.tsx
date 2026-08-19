import { motion } from "framer-motion";
import { useState } from "react";
import { Truck, Tent, Wind, Waves, Factory, Recycle, Hammer, Armchair, Shield } from "lucide-react";
import type { ReactNode } from "react";
import inflatableStructureImage from "@assets/directions/usage-inflatable.png";
import industrialTentImage from "@assets/generated_images/industrial-tent.jpg";
import shipyardImage from "@assets/directions/usage-shipyard.png";
import dropStitchFurnitureImage from "@assets/directions/drop-stitch-chair.png";

type Category = {
  id: string;
  name: string;
  icon: ReactNode;
  items: string[];
  /** Фото применения из нашей базы, если для категории оно есть. */
  img?: string;
  imgAlt?: string;
};

export function ApplicationAreas() {
  const categories: Category[] = [
    {
      id: "transport",
      name: "Транспорт",
      icon: <Truck className="w-5 h-5" />,
      items: ["Автотенты", "Тенты на фуры", "Чехлы на катера и яхты"],
    },
    {
      id: "inflatable",
      name: "Надувные конструкции",
      icon: <Wind className="w-5 h-5" />,
      items: ["Тюбинги (ватрушки)", "Батуты", "Пневмоангары", "Пневмоструктуры", "Зорбы", "Аэролоки"],
      img: inflatableStructureImage,
      imgAlt: "Крупная надувная конструкция из ПВХ-ткани"
    },
    {
      id: "tents",
      name: "Тентовые сооружения",
      icon: <Tent className="w-5 h-5" />,
      items: ["Ангары", "Коровники", "Лёгкие тентовые конструкции", "Тентовые конструкции больших размеров", "Беседки", "Навесы", "Маркизы", "Перголы"],
      img: industrialTentImage,
      imgAlt: "Тентовый ангар из ПВХ-ткани на промышленной площадке"
    },
    {
      id: "sport",
      name: "Спорт и отдых",
      icon: <Waves className="w-5 h-5" />,
      items: ["Лодки ПВХ", "SUP", "Гермосумки и Гермобаулы", "Спортивные принадлежности", "Аттракционы", "Палатки", "Детские площадки"],
    },
    {
      id: "industry",
      name: "Промышленность",
      icon: <Factory className="w-5 h-5" />,
      items: ["Вентиляционные рукава", "Технологические ленты", "Чехлы на оборудование", "Упаковка", "Производство НДН", "Производство СВП"],
      img: shipyardImage,
      imgAlt: "Промышленные укрытия из ПВХ-ткани на судоремонтном производстве"
    },
    {
      id: "ecology",
      name: "Экология",
      icon: <Recycle className="w-5 h-5" />,
      items: ["Боны от загрязнений", "Нефтяные танки", "Ёмкости для топлива", "Ёмкости для удобрений", "Гибкие баки"]
    },
    {
      id: "construction",
      name: "Строительство",
      icon: <Hammer className="w-5 h-5" />,
      items: ["Шторы ПВХ", "Окна ПВХ", "Гибкие окна/Мягкие окна", "Строительные укрытия"]
    },
    {
      id: "furniture",
      name: "Мебель",
      icon: <Armchair className="w-5 h-5" />,
      items: ["Уличная мебель", "Мебель для HoReCa", "Массажные кушетки", "Беседки"],
      img: dropStitchFurnitureImage,
      imgAlt: "Надувное кресло из материала drop stitch"
    },
    {
      id: "other",
      name: "Спецодежда",
      icon: <Shield className="w-5 h-5" />,
      items: ["Плащи", "Фартуки для производств", "Сумки"]
    }
  ];

  const [activeTab, setActiveTab] = useState(categories[0].id);

  const activeCategory = categories.find(c => c.id === activeTab);

  return (
    <section id="applications" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Сферы применения</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Наши материалы используются в десятках отраслей: от легкой промышленности до тяжелого машиностроения.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Tabs Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-left font-medium ${
                  activeTab === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                    : "bg-card/50 text-foreground/70 hover:bg-card hover:text-foreground border border-transparent hover:border-border"
                }`}
              >
                {cat.icon}
                <span className="text-lg">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:w-2/3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-3xl p-8 md:p-12 h-full"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                  {activeCategory?.icon}
                </div>
                <h3 className="text-3xl font-bold">{activeCategory?.name}</h3>
              </div>

              {activeCategory?.img && (
                <div className="mb-8 rounded-2xl overflow-hidden border border-border">
                  <img
                    src={activeCategory.img}
                    alt={activeCategory.imgAlt}
                    className="w-full h-56 md:h-72 object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCategory?.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
