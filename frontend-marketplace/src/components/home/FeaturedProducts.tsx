import Link from "next/link";
import { Button } from "../ui/button";

export default function FeaturedProducts() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Produtos em Destaque</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="border rounded-md p-4 bg-background">
          <div className="aspect-square bg-gray-200 dark:bg-gray-700 mb-2 rounded" />
          <h3 className="font-medium">Nome do Produto</h3>
          <p className="text-sm text-muted-foreground">R$ 99,90</p>
        </div>
        <div className="border rounded-md p-4 bg-background">
          <div className="aspect-square bg-gray-200 dark:bg-gray-700 mb-2 rounded" />
          <h3 className="font-medium">Outro Produto</h3>
          <p className="text-sm text-muted-foreground">R$ 129,90</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <Button variant="outline" asChild>
          <Link href="/products">Ver Todos os Produtos</Link>
        </Button>
      </div>
    </section>
  );
}
