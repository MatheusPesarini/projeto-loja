import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getProductCategory } from '@/lib/actions/product/get-product-category';
import type { CategoryPageProps } from '@/lib/types/definitions';
import { ProductGrid } from './ProductGrid';

export default async function CategoryPageComponent({
	category,
	displayName,
	showFilters = false,
}: CategoryPageProps) {
	const result = await getProductCategory(category);

	if (!result.success) {
		return (
			<div className="container mx-auto px-4 py-8 lg:py-12 text-center">
				<h1 className="text-3xl font-semibold mb-8">Ops! Algo deu errado</h1>
				<p className="text-muted-foreground mb-4">
					{result.message || 'Erro ao carregar produtos'}
				</p>
				<Button asChild>
					<Link href="/">Voltar para Home</Link>
				</Button>
			</div>
		);
	}

	const products = result.products || [];

	if (products.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8 lg:py-12 text-center">
				<h1 className="text-3xl font-semibold mb-8">{displayName}</h1>
				<p className="text-muted-foreground mb-6">
					Nenhum produto encontrado nesta categoria no momento.
				</p>
				<Button asChild variant="outline">
					<Link href="/">Explorar outras categorias</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 lg:py-12">
			<header className="mb-8 lg:mb-12">
				<h1 className="text-3xl lg:text-4xl font-bold text-center mb-4">
					{displayName}
				</h1>
				<p className="text-center text-muted-foreground">
					{products.length} produto{products.length !== 1 ? 's' : ''} encontrado
					{products.length !== 1 ? 's' : ''}
				</p>

				{showFilters && (
					<div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
						<div className="flex flex-wrap gap-2">
							<Button variant="outline" size="sm">
								Filtrar por Preço
							</Button>
							<Button variant="outline" size="sm">
								Filtrar por Marca
							</Button>
							<Button variant="outline" size="sm">
								Ordenar por
							</Button>
						</div>
					</div>
				)}
			</header>

			<ProductGrid
				products={products}
				columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
				gap="lg"
				variant="grid"
			/>
		</div>
	);
}

export function generateCategoryMetadata(
	category: string,
	customMetadata?: {
		title?: string;
		description?: string;
	},
) {
	const categoryDisplayName =
		category.charAt(0).toUpperCase() + category.slice(1);

	return {
		title: customMetadata?.title || `${categoryDisplayName} - Loja`,
		description:
			customMetadata?.description ||
			`Explore nossa coleção de ${categoryDisplayName.toLowerCase()}. Encontre os melhores produtos com preços imperdíveis.`,
	};
}
