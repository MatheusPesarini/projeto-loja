'use client';

import * as React from 'react';
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { formatPrice } from "@/lib/utils";
import { Product } from "@/lib/actions/definitions";

interface RelatedProductsCarouselProps {
  products: Product[];
}

export function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
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
          align: 'start',
          loop: products.length > 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full md:basis-1/2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Link
                    href={`/product/${product.id}`}
                    className="group block relative aspect-square overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out">
                      <div
                        className="absolute w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        style={{ willChange: 'transform' }}
                      >
                        <Image
                          src={product.image || '/placeholder-image.jpg'}
                          alt={product.productName}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                          quality={100}
                        />
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                          <h3 className="font-medium text-sm mb-1 line-clamp-1">
                            {product.productName}
                          </h3>
                          <div className="flex items-center gap-2">
                            {product.discountedPrice && product.discountedPrice > 0 ? (
                              <>
                                <span className="font-bold text-lg">
                                  R$ {formatPrice(product.discountedPrice)}
                                </span>
                                {product.originalPrice && parseFloat(product.originalPrice.toString()) > parseFloat(product.discountedPrice.toString()) && (
                                  <span className="text-sm line-through text-gray-300">
                                    R$ {formatPrice(product.originalPrice)}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="font-bold text-lg">
                                R$ {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {product.discount && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {product.discount}% OFF
                          </span>
                        </div>
                      )}

                      {product.quantity <= 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                          <span className="bg-gray-800 text-white text-sm font-medium px-3 py-1 rounded">
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

        {products.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
    </div>
  );
}