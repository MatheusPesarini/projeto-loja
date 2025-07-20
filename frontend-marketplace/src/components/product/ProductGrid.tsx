import ProductCardComponent from '@/components/product/ProductCard';
import type { ProductGridProps } from '@/lib/types/product';

export function ProductGrid({ 
    products, 
    columns = { sm: 1, md: 2, lg: 3, xl: 4 },
    gap = 'md',
    variant = 'grid'
}: ProductGridProps & { variant?: 'grid' | 'default' | 'featured' }) {
    if (!products?.length) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                    Nenhum produto encontrado.
                </p>
            </div>
        );
    }

    const gapClasses = {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8'
    };

    const gridCols = `grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} xl:grid-cols-${columns.xl}`;

    return (
        <div className={`grid ${gridCols} ${gapClasses[gap]}`}>
            {products.map((product) => (
                <ProductCardComponent
                    key={product.id}
                    product={product}
                    variant={variant}
                />
            ))}
        </div>
    );
}