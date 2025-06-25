import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductCategory } from '@/lib/actions/product/get-product-category';
import { CategoryPageProps, Product } from '@/lib/actions/definitions';

const formatPrice = (price: string | number | null | undefined): string => {
	if (!price || price === null || price === undefined) {
		return '0,00';
	}

	const numPrice = typeof price === 'string' ? parseFloat(price) : price;

	if (isNaN(numPrice)) {
		return '0,00';
	}

	return numPrice.toFixed(2).replace('.', ',');
};

export default async function CategoryPageComponent({
	category,
	displayName,
	showFilters = false,
	gridCols = { sm: 2, md: 3, lg: 4 },
}: CategoryPageProps) {
	const result = await getProductCategory(category);
	const products = result.products;

	if (!result.success) {
		return (
			<div className="container mx-auto px-4 py-8 lg:py-12 text-center">
				<h1 className="text-3xl font-semibold mb-8">Erro</h1>
				<p className="text-muted-foreground mb-4">
					{result.message || 'Erro ao carregar produtos'}
				</p>
				<Button asChild>
					<Link href="/">Voltar para Home</Link>
				</Button>
			</div>
		);
	}

	if (!products || products.length === 0) {
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

	const gridClasses = `grid grid-cols-1 sm:grid-cols-${gridCols.sm} md:grid-cols-${gridCols.md} lg:grid-cols-${gridCols.lg} gap-6 lg:gap-8`;

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
					<div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<div className="flex flex-wrap gap-2">
							<Button variant="outline" size="sm">
								Filtrar por Preço
							</Button>
							<Button variant="outline" size="sm">
								Filtrar por Marca
							</Button>
						</div>
					</div>
				)}
			</header>

			<div className={gridClasses}>
				{products.map((product: Product) => (
					<Card key={product.id} className="group overflow-hidden">
						<Link href={`/product/${product.id}`} className="block">
							<CardContent className="p-0 aspect-[1/1] relative">
								<Image
									src={product.image || '/placeholder-image.jpg'}
									alt={product.productName}
									fill
									style={{ objectFit: 'cover' }}
									className="group-hover:scale-105 transition-transform duration-300"
									sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
								/>
								{product.discount && (
									<Badge
										variant="destructive"
										className="absolute top-2 right-2 z-10"
									>
										{product.discount}% OFF
									</Badge>
								)}
								{product.quantity <= 0 && (
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
										<p className="text-lg font-bold text-primary">
											R$ {formatPrice(product.discountedPrice)}
										</p>
										{product.originalPrice &&
											parseFloat(product.originalPrice.toString()) >
												parseFloat(product.discountedPrice.toString()) && (
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
							<div className="w-full space-y-2">
								<Link href={`/product/${product.id}`} className="w-full block">
									<Button variant="outline" className="w-full cursor-pointer">
										Ver Detalhes
									</Button>
								</Link>
							</div>

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
				))}
			</div>
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
