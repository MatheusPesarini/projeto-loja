import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatPrice, type ProductCardProps } from "@/lib/types/product";
import { Button } from "../ui/button";

export default function ProductCardComponent({
  product,
  variant = "default",
  className = "",
}: ProductCardProps) {
  const isOutOfStock = product.quantity <= 0;
  const hadDiscount =
    product.discountedPrice && Number(product.discountedPrice) > 0;

  const cardVariants = {
    default:
      "group overflow-hidden hover:shadow-lg transition-all duration-300",
    carousel:
      "group overflow-hidden hover:shadow-md transition-all duration-200",
    grid: "group overflow-hidden hover:shadow-2xl transition-all duration-300",
    featured:
      "group overflow-hidden hover:shadow-2xl transition-all duration-300",
  };
  return (
    <Card key={product.id} className={`${cardVariants[variant]} ${className}`}>
      <Link href={`/product/${product.id}`} className="block">
        <CardContent className="p-0 aspect-[1/1] relative">
          <Image
            src={product.image || "/placeholder-image.jpg"}
            alt={product.productName}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {hadDiscount && (
            <Badge
              variant="destructive"
              className="absolute top-2 right-2 z-10"
            >
              {product.discount}% OFF
            </Badge>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
              <Badge variant="secondary">Esgotado</Badge>
            </div>
          )}
        </CardContent>
      </Link>

      <CardHeader className="p-4 flex-grow">
        {product.brand && (
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
            {product.brand}
          </p>
        )}
        <Link href={`/product/${product.id}`}>
          <CardTitle className="text-sm font-semibold hover:text-primary transition-colors line-clamp-2">
            {product.productName}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardFooter className="p-4 pt-0 flex-col items-start">
        <div className="mb-3 w-full">
          {product.discountedPrice && product.discountedPrice > 0 ? (
            <>
              <p className="text-lg font-bold dark:text-white">
                R$ {formatPrice(product.discountedPrice)}
              </p>
              {product.originalPrice &&
                Number.parseFloat(product.originalPrice.toString()) >
                  Number.parseFloat(product.discountedPrice.toString()) && (
                  <p className="text-sm text-muted-foreground line-through">
                    R$ {formatPrice(product.originalPrice)}
                  </p>
                )}
            </>
          ) : (
            <p className="text-lg font-bold text-primary">
              R$ {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
        <Link href={`/product/${product.id}`} className="w-full block">
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Indisponível" : "Ver Produto"}
          </Button>
        </Link>

        {product.quantity && product.quantity > 0 ? (
          <Badge variant="outline" className="mt-2 text-xs">
            {product.quantity} em estoque
          </Badge>
        ) : (
          <Badge variant="outline" className="mt-2 text-xs">
            Fora de Estoque
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}
