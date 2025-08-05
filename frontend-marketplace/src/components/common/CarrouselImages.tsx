'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { fetchHomeImages } from '@/lib/actions/images/get-home-image';

type Images = {
  src: string;
  alt: string;
};

export function ImageCarousel({ autoplay = true, autoplayDelay = 3500 }) {
  const [images, setImages] = useState<Images[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        const fetchedImages = await fetchHomeImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error('Erro ao carregar imagens:', error);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  const plugin = React.useRef(
    autoplay ? Autoplay({ delay: autoplayDelay, stopOnInteraction: true }) : null
  );

  if (loading) {
    return (
      <div className="w-full aspect-[16/7] bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-muted-foreground">
        Carregando imagens...
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[16/7] bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-muted-foreground">
        Não há imagens para exibir no momento.
      </div>
    );
  }

  return (
    <section className="relative w-full bg-gray-200 dark:bg-gray-800">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={autoplay ? [plugin.current!] : undefined}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full">
              <Card className="overflow-hidden border-0 rounded-none">
                <CardContent className="flex aspect-[16/7] items-center justify-center p-0">
                  <div className="absolute w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                      quality={100}
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-y-0 left-8 right-8 flex items-center justify-between z-10 pointer-events-none md:flex">
          <CarouselPrevious className="ml-4 md:ml-8 pointer-events-auto cursor-pointer" />
          <CarouselNext className="mr-4 md:mr-8 pointer-events-auto cursor-pointer" />
        </div>
      </Carousel>
    </section>
  );
}
