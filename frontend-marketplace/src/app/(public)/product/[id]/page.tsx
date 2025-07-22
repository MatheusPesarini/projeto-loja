import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductId } from "@/lib/actions/product/get-product-id";
import Link from "next/link";
import {
  formatPrice,
  getCategoryDisplayName,
  getCategoryUrl,
} from "@/lib/types/product";
import ExpandableDescription from "@/components/common/ExpandableDescription";
import RelatedProductsWrapper from "@/components/product/RelatedProductsWrapper";

export default async function ProductDisplayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const result = await getProductId((await params).id);

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8 lg:py-12 text-center">
        <h1 className="text-3xl font-semibold mb-8">Produto não encontrado</h1>
        <Button asChild>
          <Link href="/">Voltar para Home</Link>
        </Button>
      </div>
    );
  }

  const product = result.product;

  if (!product) {
    console.error("Product is undefined:", result);
    return (
      <div className="container mx-auto px-4 py-8 lg:py-12 text-center">
        <h1 className="text-3xl font-semibold mb-8">Produto não encontrado</h1>
        <p className="text-muted-foreground mb-4">
          Os dados do produto não puderam ser carregados.
        </p>
        <Button asChild>
          <Link href="/">Voltar para Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <nav className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link
            href={getCategoryUrl(product.category)}
            className="hover:text-foreground"
          >
            {getCategoryDisplayName(product.category)}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.productName}</span>
        </div>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0 aspect-square relative">
              <Image
                src={product.image || "/placeholder-image.jpg"}
                alt={product.productName}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
              {product.discount && (
                <Badge
                  variant="destructive"
                  className="absolute top-4 right-4 z-10"
                >
                  {product.discount}% OFF
                </Badge>
              )}
              {product.quantity === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <Badge variant="secondary" className="text-lg">
                    Esgotado
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-4">
              {product.brand && (
                <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">
                  {product.brand}
                </p>
              )}
              <CardTitle className="text-2xl lg:text-3xl font-bold">
                {product.productName}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {product.discountedPrice !== product.originalPrice && (
                  <Badge variant="destructive">Promoção</Badge>
                )}
                <Badge
                  variant={product.quantity > 0 ? "success" : "destructive"}
                >
                  {product.quantity > 0 ? "Em estoque" : "Esgotado"}
                </Badge>
                {product.quantity > 0 && (
                  <Badge variant="secondary">
                    {product.quantity} disponíveis
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div>
                {product.discountedPrice &&
                Number.parseFloat(product.discountedPrice.toString()) > 0 ? (
                  <>
                    <p className="text-3xl font-semibold">
                      R$ {formatPrice(product.discountedPrice)}
                    </p>
                    {product.originalPrice &&
                      Number.parseFloat(product.originalPrice.toString()) >
                        Number.parseFloat(
                          product.discountedPrice.toString(),
                        ) && (
                        <div className="flex items-baseline gap-2 mt-1">
                          <p className="text-lg text-muted-foreground line-through">
                            R$ {formatPrice(product.originalPrice)}
                          </p>
                          {product.discount && (
                            <Badge variant="secondary" className="text-sm">
                              {product.discount}% OFF
                            </Badge>
                          )}
                        </div>
                      )}
                  </>
                ) : (
                  <p className="text-3xl font-semibold text-primary">
                    R$ {formatPrice(product.originalPrice)}
                  </p>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                <ExpandableDescription
                  description={
                    product.description || "Descrição não disponível."
                  }
                  maxLength={200}
                  className="capitalize"
                />
              </div>
              {(product.genre || product.warranty || product.weight) && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold mb-2">
                      Especificações
                    </h3>
                    {product.genre && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gênero:</span>
                        <span className="font-medium capitalize">
                          {product.genre}
                        </span>
                      </div>
                    )}
                    {product.warranty && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Garantia:</span>
                        <span className="font-medium">
                          {Number.parseInt(product.warranty) + 3} (3 meses de
                          garantia legal + ALTERAR SIST DE GARANTIA)
                        </span>
                      </div>
                    )}
                    {product.weight && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Peso:</span>
                        <span className="font-medium">{product.weight}KG</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoria:</span>
                      <span className="font-medium capitalize">
                        {getCategoryDisplayName(product.category)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>

            <CardFooter className="flex-col items-stretch space-y-3 pt-5">
              <Button
                size="lg"
                className="w-full text-base cursor-pointer"
                variant="outline"
                disabled={product.quantity === 0}
              >
                {product.quantity === 0
                  ? "Produto Esgotado"
                  : "Adicionar ao Carrinho"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full text-base cursor-pointer"
                disabled={product.quantity === 0}
              >
                {product.quantity === 0 ? "Indisponível" : "Comprar Agora"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-10 lg:mt-16">
        <Card>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Detalhes</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Marca:</span>
                      <span className="font-medium">
                        {product.brand || "Não informado"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoria:</span>
                      <span className="font-medium capitalize">
                        {getCategoryDisplayName(product.category)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Criado em:</span>
                      <span className="font-medium">
                        {new Date(product.createdAt).toLocaleDateString(
                          "pt-BR",
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Atualizado em:
                      </span>
                      <span className="font-medium">
                        {new Date(product.updatedAt).toLocaleDateString(
                          "pt-BR",
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Disponibilidade</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estoque:</span>
                      <span
                        className={
                          product.quantity > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {product.quantity > 0
                          ? `${product.quantity} unidades`
                          : "Esgotado"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge
                        variant={
                          product.quantity > 0 ? "success" : "destructive"
                        }
                      >
                        {product.quantity > 0 ? "Disponível" : "Indisponível"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-stretch">
                <Separator orientation="vertical" className="h-auto" />
              </div>

              <Separator className="lg:hidden" />

              <div className="flex-1">
                <h4 className="font-semibold mb-3">Produtos Relacionados</h4>

                <div>
                  <RelatedProductsWrapper
                    productId={product.id}
                    category={product.category}
                    limit={8}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link href={getCategoryUrl(product.category)}>
            ← Voltar para {getCategoryDisplayName(product.category)}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const result = await getProductId(resolvedParams.id);

  if (!result.success || !result.product) {
    return {
      title: "Produto não encontrado",
    };
  }

  return {
    title: result.product.productName,
    description: result.product.description,
  };
}
