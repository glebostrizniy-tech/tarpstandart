import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logoPath from "@assets/tarpstandart-logo.png";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Материалы", id: "catalog" },
    { name: "Применение", id: "applications" },
    { name: "О компании", id: "about" },
    { name: "Контакты", id: "contacts" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <img
            src={logoPath}
            alt="TarpStandard Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.name}
            </button>
          ))}
          <Button 
            onClick={() => scrollTo("contacts")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
          >
            Запросить предложение
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-10 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-lg font-medium text-foreground/90 hover:text-primary text-left uppercase tracking-wider"
              >
                {link.name}
              </button>
            ))}
            <Button onClick={() => scrollTo("contacts")} className="w-full">
              Запросить предложение
            </Button>
          </motion.div>
        )}
      </div>
    </header>
  );
}
