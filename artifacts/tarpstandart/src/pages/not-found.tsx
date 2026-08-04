import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-9xl font-display font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-6">Страница не найдена</h2>
        <p className="text-muted-foreground mb-8">Возможно, она была удалена или вы ввели неверный адрес.</p>
        <Link href="/">
          <Button size="lg">Вернуться на главную</Button>
        </Link>
      </div>
    </div>
  );
}
