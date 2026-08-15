import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Advantages } from "@/components/Advantages";
import { Directions } from "@/components/Directions";
import { Catalog } from "@/components/Catalog";
import { ApplicationAreas } from "@/components/ApplicationAreas";
import { AboutCompany } from "@/components/AboutCompany";
import { Partners } from "@/components/Partners";
import { FAQ } from "@/components/FAQ";
import { Contacts } from "@/components/Contacts";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { organizationJsonLd } from "@/data/structured-data";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo
        title="ТарпСтандарт — технический текстиль и ткань ПВХ оптом в России и Беларуси"
        description="Поставки ПВХ-тканей, плёнок ТПУ, тарпаулина и технического текстиля оптом. Склады в Москве, СПб, Минске и Уфе. Прямые контейнерные поставки из Китая с 2004 года."
        path="/"
        jsonLd={organizationJsonLd()}
      />
      <Navbar />
      <main>
        <Hero />
        <Advantages />
        <Directions />
        <Catalog />
        <ApplicationAreas />
        <AboutCompany />
        <Partners />
        <FAQ />
        <Contacts />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
