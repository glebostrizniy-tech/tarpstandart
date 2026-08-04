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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
