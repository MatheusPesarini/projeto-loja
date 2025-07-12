import { getRelatedProducts } from '@/lib/actions/product/get-related-products';
import { RelatedProductsCarousel } from './RelatedProductsCarrousel';

interface RelatedProductsWrapperProps {
	productId: string;
	category: string;
	limit?: number;
}

export default async function RelatedProductsWrapper({
	productId,
	category,
	limit = 8,
}: RelatedProductsWrapperProps) {
	const result = await getRelatedProducts(category, productId, limit);

	if (!result.success || !result.products || result.products.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-muted-foreground">
					Nenhum produto relacionado encontrado.
				</p>
			</div>
		);
	}

	return <RelatedProductsCarousel products={result.products} />;
}
