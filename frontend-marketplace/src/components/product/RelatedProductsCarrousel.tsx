"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/types/product";
import type { Product } from "@/lib/types/definitions";

interface RelatedProductsCarouselProps {
  products: Product[];
}

export function RelatedProductsCarousel({
  products,
}: RelatedProductsCarouselProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhum produto relacionado encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: products.length > 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1 md:-ml-2">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-1 md:pl-2 basis-1/2 md:basis-1/3"
            >
              <Card className="overflow-hidden h-full">
                <CardContent className="p-0">
                  <Link
                    href={`/product/${product.id}`}
                    className="group block relative aspect-square overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out">
                      <div
                        className="absolute w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        style={{ willChange: "transform" }}
                      >
                        <Image
                          src={product.image || "/placeholder-image.jpg"}
                          alt={product.productName}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33, 200px"
                          quality={100}
                        />
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 z-10">
                        <div className="bg-black/30 backdrop-blur-sm rounded-md p-2 text-white">
                          <h3 className="font-medium text-xs mb-1 line-clamp-1 leading-tight">
                            {product.productName}
                          </h3>
                          <div className="flex items-center gap-1">
                            {product.discountedPrice &&
                            product.discountedPrice > 0 ? (
                              <>
                                <span className="font-bold text-sm">
                                  R$ {formatPrice(product.discountedPrice)}
                                </span>
                                {product.originalPrice &&
                                  Number.parseFloat(
                                    product.originalPrice.toString(),
                                  ) >
                                    Number.parseFloat(
                                      product.discountedPrice.toString(),
                                    ) && (
                                    <span className="text-xs line-through text-gray-300">
                                      R$ {formatPrice(product.originalPrice)}
                                    </span>
                                  )}
                              </>
                            ) : (
                              <span className="font-bold text-sm">
                                R$ {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {product.quantity <= 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                          <span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded">
                            Esgotado
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
