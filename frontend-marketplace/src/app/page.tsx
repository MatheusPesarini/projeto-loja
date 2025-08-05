'use client';

import { ImageCarousel } from '@/components/common/CarrouselImages';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function Home() {
  return (
    <div className="flex flex-col">
      <ImageCarousel />
      <CategoryGrid />
      <FeaturedProducts />
      <NewsletterSection />
    </div>
  );
}
