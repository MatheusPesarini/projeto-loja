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
// import { fetchProductsByCategory, fetchAllProducts } from "@/lib/actions/products"; // Exemplo de função de busca

// Interface para o tipo de produto (ajuste conforme sua estrutura de dados)
type Product = {
	id: string;
	slug: string; // Para o link para a página de detalhes
	name: string;
	brand?: string;
	price: number;
	originalPrice?: number;
	discount?: string;
	images: { src: string; alt: string }[];
	availability?: string;
	rating?: number;
};

// Dados mockados para a lista de produtos (substitua por dados reais)
const mockProducts: Product[] = [
	{
		id: '1',
		slug: 'tenis-esportivo-performance-max',
		name: 'Tênis Esportivo Performance Max',
		brand: 'Marca Esportiva',
		price: 349.9,
		originalPrice: 499.9,
		discount: '30%',
		images: [{ src: '/placeholder-image.jpg', alt: 'Tênis Performance Max' }],
		availability: 'Em estoque',
		rating: 4.7,
	},
	{
		id: '2',
		slug: 'camiseta-algodao-basica',
		name: 'Camiseta Algodão Básica',
		brand: 'Marca Casual',
		price: 89.9,
		images: [{ src: '/placeholder-image.jpg', alt: 'Camiseta Algodão' }],
		availability: 'Em estoque',
		rating: 4.5,
	},
	{
		id: '3',
		slug: 'calca-jeans-slim',
		name: 'Calça Jeans Slim',
		brand: 'Marca Jeanswear',
		price: 189.9,
		originalPrice: 250.0,
		discount: '24%',
		images: [{ src: '/placeholder-image.jpg', alt: 'Calça Jeans Slim' }],
		availability: 'Poucas unidades',
		rating: 4.2,
	},
	{
		id: '4',
		slug: 'moletom-com-capuz',
		name: 'Moletom com Capuz',
		brand: 'Marca Urbana',
		price: 220.5,
		images: [{ src: '/placeholder-image.jpg', alt: 'Moletom com Capuz' }],
		availability: 'Esgotado',
		rating: 4.9,
	},
	// Adicione mais produtos mockados conforme necessário
];

// Se for uma página de categoria, você pode receber 'category' via params
// export default async function ProductCategoryPage({ params }: { params: { category: string } }) {
//   const products = await fetchProductsByCategory(params.category);

export default async function AllProductsPage() {
	// Em um cenário real, você buscaria os produtos aqui:
	// const products = await fetchAllProducts();
	const products = mockProducts; // Usando dados mockados por enquanto

	if (!products || products.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8 lg:py-12 text-center">
				<h1 className="text-3xl font-semibold mb-8">Nossos Produtos</h1>
				<p className="text-muted-foreground">
					Nenhum produto encontrado no momento.
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 lg:py-12">
			<header className="mb-8 lg:mb-12">
				{/* Você pode adicionar o nome da categoria aqui se aplicável */}
				<h1 className="text-3xl lg:text-4xl font-bold text-center">
					Nossos Produtos
					{/* Exemplo se fosse uma página de categoria: {params.category.charAt(0).toUpperCase() + params.category.slice(1)} */}
				</h1>
				{/* Adicionar filtros e ordenação aqui no futuro */}
				{/* <div className="mt-6 flex justify-between items-center">
                    <div>Filtros</div>
                    <div>Ordenação</div>
                </div> */}
			</header>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
				{products.map((product) => (
					<Card
						key={product.id}
						className="overflow-hidden group flex flex-col"
					>
						<Link href={`/products/${product.slug}`} className="block">
							<CardContent className="p-0 aspect-[3/4] relative">
								<Image
									src={product.images[0]?.src || '/placeholder-image.jpg'}
									alt={product.images[0]?.alt || product.name}
									fill
									style={{ objectFit: 'cover' }}
									className="group-hover:scale-105 transition-transform duration-300"
									sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
								/>
								{product.discount && (
									<Badge
										variant="destructive"
										className="absolute top-2 right-2"
									>
										{product.discount} OFF
									</Badge>
								)}
							</CardContent>
						</Link>
						<CardHeader className="p-4 flex-grow">
							{product.brand && (
								<p className="text-xs text-muted-foreground mb-1">
									{product.brand}
								</p>
							)}
							<Link href={`/products/${product.slug}`}>
								<CardTitle className="text-md font-semibold hover:text-primary transition-colors">
									{product.name}
								</CardTitle>
							</Link>
							{/* <div className="mt-1">
                                {product.rating && <Badge variant="outline">★ {product.rating}</Badge>}
                            </div> */}
						</CardHeader>
						<CardFooter className="p-4 pt-0 flex-col items-start">
							<div className="mb-3 w-full">
								<p className="text-lg font-bold text-primary">
									R$ {product.price.toFixed(2).replace('.', ',')}
								</p>
								{product.originalPrice && (
									<p className="text-sm text-muted-foreground line-through">
										R$ {product.originalPrice.toFixed(2).replace('.', ',')}
									</p>
								)}
							</div>
							<Link href={`/products/${product.slug}`} className="w-full">
								<Button variant="outline" className="w-full">
									Ver Detalhes
								</Button>
							</Link>
							{/* <Button className="w-full mt-2">Adicionar ao Carrinho</Button> */}
						</CardFooter>
					</Card>
				))}
			</div>

			{/* Paginação (a ser implementada se necessário) */}
			{/* <div className="mt-12 flex justify-center">
                <p>Controles de Paginação Aqui</p>
            </div> */}
		</div>
	);
}
