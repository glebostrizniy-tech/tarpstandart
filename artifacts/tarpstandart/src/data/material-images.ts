import technicalTextileImage from "@assets/directions/technical-textile.png";
import inflatableBoatImage from "@assets/generated_images/inflatable-watercraft.jpg";
import fabricCloseupImage from "@assets/generated_images/pvc-fabric-closeup.jpg";
import yachtCoverImage from "@assets/generated_images/maritime-tarp.jpg";
import dropStitchFurnitureImage from "@assets/directions/drop-stitch-chair.png";
import truckTarpImage from "@assets/generated_images/construction-tarp.jpg";

/**
 * Картинки вынесены из materials.ts: seo-plugin импортирует данные материалов
 * на этапе загрузки vite.config, а alias @assets там ещё не работает.
 */
export const MATERIAL_IMAGES: Record<string, { src: string; alt: string }> = {
  "tkan-pvh": {
    src: technicalTextileImage,
    alt: "Рулоны тентовой ткани ПВХ на складе ТарпСтандарт",
  },
  "tkan-pvh-gazoderzhashchaya": {
    src: inflatableBoatImage,
    alt: "Надувная лодка RIB из газодержащей ткани ПВХ",
  },
  "tkani-tpu-i-blendy": {
    src: fabricCloseupImage,
    alt: "Структура технической ткани с полиуретановым покрытием крупным планом",
  },
  "akrilovaya-tkan": {
    src: yachtCoverImage,
    alt: "Стояночный тент из акриловой ткани на парусной яхте",
  },
  "airdeck-drop-stitch": {
    src: dropStitchFurnitureImage,
    alt: "Надувное кресло из двустенного материала drop stitch",
  },
  "pe-polietilenovoe": {
    src: truckTarpImage,
    alt: "Груз под тарпаулиновым тентом на автомобильной платформе",
  },
};
