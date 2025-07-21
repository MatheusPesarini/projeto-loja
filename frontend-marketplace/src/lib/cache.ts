import { unstable_cache } from 'next/cache';
import { getProductCategory } from '@/lib/actions/product/get-product-category';

export const getCachedProducts = unstable_cache(
    async (category: string) => {
        return await getProductCategory(category);
    },
    ['products'],
    {
        revalidate: 3600,
        tags: ['products']
    }
);