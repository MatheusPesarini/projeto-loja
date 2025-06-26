import Image from 'next/image';
import * as React from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { getProductId } from '@/lib/actions/product/get-product-id';
import Link from 'next/link';
import { getCategoryDisplayName, getCategoryUrl } from '@/lib/utils';
import ExpandableDescription from '@/components/expandable-description.tsx/expandableDescription';

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

export default async function ProductDisplayPage({
	params,
}: {
	params: { id: string };
}) {
	const result = await getProductId(params.id);

	if (!result.success) {
		return (
			<div className="container mx-auto px-4 py-8 lg:py-12 text-center">
				<h1 className="text-3xl font-semibold mb-8">Produto não encontrado</h1>
				<Button asChild>
					<Link href="/">Voltar para Home</Link>
				</Button>
			</div>
		);
	}

	const product = result.product;

	if (!product) {
		console.error('Product is undefined:', result);
		return (
			<div className="container mx-auto px-4 py-8 lg:py-12 text-center">
				<h1 className="text-3xl font-semibold mb-8">Produto não encontrado</h1>
				<p className="text-muted-foreground mb-4">
					Os dados do produto não puderam ser carregados.
				</p>
				<Button asChild>
					<Link href="/">Voltar para Home</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 lg:py-12">
			<nav className="mb-6">
				<div className="flex items-center space-x-2 text-sm text-muted-foreground">
					<Link href="/" className="hover:text-foreground">
						Home
					</Link>
					<span>/</span>
					<Link
						href={getCategoryUrl(product.category)}
						className="hover:text-foreground"
					>
						{getCategoryDisplayName(product.category)}
					</Link>
					<span>/</span>
					<span className="text-foreground">{product.productName}</span>
				</div>
			</nav>

			<div className="grid md:grid-cols-2 gap-8 lg:gap-16">
				<div className="space-y-4">
					<Card className="overflow-hidden">
						<CardContent className="p-0 aspect-square relative">
							<Image
								src={product.image || '/placeholder-image.jpg'}
								alt={product.productName}
								fill
								style={{ objectFit: 'cover' }}
								priority
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
							/>
							{product.discount && (
								<Badge
									variant="destructive"
									className="absolute top-4 right-4 z-10"
								>
									{product.discount}% OFF
								</Badge>
							)}
							{product.quantity === 0 && (
								<div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
									<Badge variant="secondary" className="text-lg">
										Esgotado
									</Badge>
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				<div>
					<Card>
						<CardHeader className="pb-4">
							{product.brand && (
								<p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">
									{product.brand}
								</p>
							)}
							<CardTitle className="text-2xl lg:text-3xl font-bold">
								{product.productName}
							</CardTitle>
							<div className="flex items-center gap-2 mt-2 flex-wrap">
								{product.discountedPrice != product.originalPrice && (
									<Badge variant="destructive">Promoção</Badge>
								)}
								<Badge
									variant={product.quantity > 0 ? 'default' : 'destructive'}
								>
									{product.quantity > 0 ? 'Em estoque' : 'Esgotado'}
								</Badge>
								{product.quantity > 0 && (
									<Badge variant="secondary">
										{product.quantity} disponíveis
									</Badge>
								)}
							</div>
						</CardHeader>

						<CardContent className="space-y-5">
							<div>
								{product.discountedPrice &&
									parseFloat(product.discountedPrice.toString()) > 0 ? (
									<>
										<p className="text-3xl font-semibold text-primary">
											R$ {formatPrice(product.discountedPrice)}
										</p>
										{product.originalPrice &&
											parseFloat(product.originalPrice.toString()) >
											parseFloat(product.discountedPrice.toString()) && (
												<div className="flex items-baseline gap-2 mt-1">
													<p className="text-lg text-muted-foreground line-through">
														R$ {formatPrice(product.originalPrice)}
													</p>
													{product.discount && (
														<Badge variant="secondary" className="text-sm">
															{product.discount}% OFF
														</Badge>
													)}
												</div>
											)}
									</>
								) : (
									<p className="text-3xl font-semibold text-primary">
										R$ {formatPrice(product.originalPrice)}
									</p>
								)}
							</div>

							<Separator />

							<div>
								<h3 className="text-lg font-semibold mb-2">Descrição</h3>
								<ExpandableDescription
									description={product.description || 'Descrição não disponível.'}
									maxLength={200} 
								/>
							</div>
							{/* Informações adicionais */}
							{(product.genre || product.warranty || product.weight) && (
								<>
									<Separator />
									<div className="space-y-2">
										<h3 className="text-lg font-semibold mb-2">
											Especificações
										</h3>
										{product.genre && (
											<div className="flex justify-between">
												<span className="text-muted-foreground">Gênero:</span>
												<span className="font-medium">{product.genre}</span>
											</div>
										)}
										{product.warranty && (
											<div className="flex justify-between">
												<span className="text-muted-foreground">Garantia:</span>
												<span className="font-medium">{product.warranty}</span>
											</div>
										)}
										{product.weight && (
											<div className="flex justify-between">
												<span className="text-muted-foreground">Peso:</span>
												<span className="font-medium">{product.weight}</span>
											</div>
										)}
										<div className="flex justify-between">
											<span className="text-muted-foreground">Categoria:</span>
											<span className="font-medium capitalize">
												{product.category?.replace('_', ' ')}
											</span>
										</div>
									</div>
								</>
							)}
						</CardContent>

						<CardFooter className="flex-col items-stretch space-y-3 pt-5">
							<Button
								size="lg"
								className="w-full text-base"
								disabled={product.quantity === 0}
							>
								{product.quantity === 0
									? 'Produto Esgotado'
									: 'Adicionar ao Carrinho'}
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="w-full text-base"
								disabled={product.quantity === 0}
							>
								{product.quantity === 0 ? 'Indisponível' : 'Comprar Agora'}
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>

			{/* Informações Adicionais */}
			<div className="mt-10 lg:mt-16">
				<Card>
					<CardHeader>
						<CardTitle>Informações do Produto</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold mb-2">Detalhes</h4>
								<div className="space-y-1 text-sm">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Marca:</span>
										<span>{product.brand || 'Não informado'}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Categoria:</span>
										<span className="capitalize">
											{product.category?.replace('_', ' ')}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Criado em:</span>
										<span>
											{new Date(product.createdAt).toLocaleDateString('pt-BR')}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">
											Atualizado em:
										</span>
										<span>
											{new Date(product.updatedAt).toLocaleDateString('pt-BR')}
										</span>
									</div>
								</div>
							</div>

							<div>
								<h4 className="font-semibold mb-2">Disponibilidade</h4>
								<div className="space-y-1 text-sm">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Estoque:</span>
										<span
											className={
												product.quantity > 0 ? 'text-green-600' : 'text-red-600'
											}
										>
											{product.quantity > 0
												? `${product.quantity} unidades`
												: 'Esgotado'}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Status:</span>
										<Badge
											variant={product.quantity > 0 ? 'default' : 'destructive'}
										>
											{product.quantity > 0 ? 'Disponível' : 'Indisponível'}
										</Badge>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Botão Voltar */}
			<div className="mt-8 text-center">
				<Button variant="outline" asChild>
					<Link href={`/${product.category}`}>
						← Voltar para {product.category?.replace('_', ' ')}
					</Link>
				</Button>
			</div>
		</div>
	);
}

// Metadata dinâmica
export async function generateMetadata({ params }: { params: { id: string } }) {
	const result = await getProductId(params.id);

	if (!result.success || !result.product) {
		return {
			title: 'Produto não encontrado - Loja',
			description: 'O produto solicitado não foi encontrado.',
		};
	}

	const product = result.product;

	return {
		title: `${product.productName} - ${product.brand || 'Loja'}`,
		description:
			product.description ||
			`${product.productName} - ${product.brand || 'Produto'} disponível em nossa loja online.`,
	};
}
