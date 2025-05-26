import Image from 'next/image';
import * as React from 'react'; // Necessário se for usar hooks como useState

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
} from '@/components/ui/carousel'; // Para galeria de imagens

// Dados mockados para o produto (substitua por dados reais)
const product = {
	id: '1',
	name: 'Tênis Esportivo Performance Max',
	brand: 'Marca Esportiva',
	description:
		'Conforto e estilo para seus treinos e dia a dia. Este tênis oferece amortecimento superior e design moderno, perfeito para quem busca performance e visual.',
	price: 349.9,
	originalPrice: 499.9,
	discount: '30%',
	images: [
		{ src: '/placeholder-image.jpg', alt: 'Tênis Performance Max - Vista 1' },
		{ src: '/placeholder-image.jpg', alt: 'Tênis Performance Max - Vista 2' },
		{ src: '/placeholder-image.jpg', alt: 'Tênis Performance Max - Vista 3' },
		{ src: '/placeholder-image.jpg', alt: 'Tênis Performance Max - Detalhe' },
	],
	sizes: ['38', '39', '40', '41', '42', '43'],
	colors: [
		{
			name: 'Preto/Branco',
			value: 'black-white',
			available: true,
			hex: '#000000',
		},
		{
			name: 'Azul Royal',
			value: 'royal-blue',
			available: true,
			hex: '#4169E1',
		},
		{
			name: 'Cinza Chumbo',
			value: 'charcoal-gray',
			available: false,
			hex: '#36454F',
		},
	],
	rating: 4.7,
	reviewsCount: 215,
	availability: 'Em estoque',
	sku: 'SKU-PMX-001',
	details: [
		'Material do Cabedal: Malha respirável com sobreposições sintéticas',
		'Entressola: EVA com tecnologia de absorção de impacto',
		'Solado: Borracha de alta tração e durabilidade',
		'Indicado para: Corrida, Caminhada, Academia',
		'Garantia: 90 dias contra defeitos de fabricação',
	],
};

export default async function ProductDisplayPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<div className="container mx-auto px-4 py-8 lg:py-12">
			<div className="grid md:grid-cols-2 gap-8 lg:gap-16">
				{/* Coluna de Imagens */}
				<div className="space-y-4">
					<Card className="overflow-hidden">
						<Carousel className="w-full">
							<CarouselContent>
								{product.images.map((img, index) => (
									<CarouselItem key={index}>
										<CardContent className="p-0 aspect-square relative">
											<Image
												src={img.src}
												alt={img.alt}
												fill
												style={{ objectFit: 'cover' }}
												className="hover:scale-105 transition-transform duration-300"
												priority={index === 0}
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
											/>
										</CardContent>
									</CarouselItem>
								))}
							</CarouselContent>
							{product.images.length > 1 && (
								<>
									<CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
									<CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
								</>
							)}
						</Carousel>
					</Card>
					{/* Miniaturas (opcional, se não usar carrossel acima ou para navegação extra) */}
					{product.images.length > 1 && (
						<div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
							{product.images.map((img, index) => (
								<Card
									key={index}
									className="overflow-hidden aspect-square cursor-pointer hover:opacity-80 border-2 border-transparent hover:border-primary transition-all"
								>
									<CardContent className="p-0 relative w-full h-full">
										<Image
											src={img.src}
											alt={`Miniatura ${img.alt}`}
											fill
											style={{ objectFit: 'cover' }}
											sizes="100px"
											// onClick={() => /* Lógica para mudar imagem principal no carrossel */}
										/>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</div>

				{/* Coluna de Informações do Produto */}
				<div>
					<Card>
						<CardHeader className="pb-4">
							{product.brand && (
								<p className="text-sm text-muted-foreground mb-1">
									{product.brand}
								</p>
							)}
							<CardTitle className="text-2xl lg:text-3xl font-bold">
								{product.name}
							</CardTitle>
							<div className="flex items-center gap-2 mt-2 flex-wrap">
								<Badge variant="outline">
									Avaliação: {product.rating}/5 ({product.reviewsCount} reviews)
								</Badge>
								<Badge
									variant={
										product.availability === 'Em estoque'
											? 'default'
											: 'destructive'
									}
								>
									{product.availability}
								</Badge>
							</div>
						</CardHeader>
						<CardContent className="space-y-5">
							<div>
								<p className="text-3xl font-semibold text-primary">
									R$ {product.price.toFixed(2).replace('.', ',')}
								</p>
								{product.originalPrice && (
									<div className="flex items-baseline gap-2">
										<p className="text-md text-muted-foreground line-through">
											R$ {product.originalPrice.toFixed(2).replace('.', ',')}
										</p>
										{product.discount && (
											<Badge variant="secondary" className="text-sm">
												{product.discount} OFF
											</Badge>
										)}
									</div>
								)}
							</div>

							<Separator />

							<div>
								<h3 className="text-lg font-semibold mb-2">Descrição</h3>
								<CardDescription className="text-sm leading-relaxed">
									{product.description}
								</CardDescription>
							</div>

							{/* Opções do Produto */}
							<div className="space-y-4">
								{product.sizes && product.sizes.length > 0 && (
									<div>
										<h4 className="text-md font-medium mb-2">Tamanho:</h4>
										<Select
										// onValueChange={setSelectedSize} value={selectedSize}
										>
											<SelectTrigger className="w-full md:w-[200px]">
												<SelectValue placeholder="Selecione o tamanho" />
											</SelectTrigger>
											<SelectContent>
												{product.sizes.map((size) => (
													<SelectItem key={size} value={size}>
														{size}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								)}
								{product.colors && product.colors.length > 0 && (
									<div>
										<h4 className="text-md font-medium mb-2">Cor:</h4>
										<div className="flex flex-wrap gap-2">
											{product.colors.map((color) => (
												<Button
													key={color.value}
													variant={'outline'}
													// onClick={() => setSelectedColor(color.value)}
													// className={selectedColor === color.value ? "ring-2 ring-primary" : ""}
													disabled={!color.available}
													size="sm"
													className="flex items-center gap-2"
												>
													<span
														className="w-4 h-4 rounded-full border"
														style={{
															backgroundColor: color.available
																? color.hex
																: '#cccccc',
														}}
													></span>
													{color.name}
													{!color.available && (
														<span className="ml-1 text-xs text-muted-foreground">
															(Esgotado)
														</span>
													)}
												</Button>
											))}
										</div>
									</div>
								)}
							</div>
						</CardContent>
						<CardFooter className="flex-col items-stretch space-y-3 pt-5">
							{/* Quantidade (opcional) */}
							{/* <div>
                                <label htmlFor="quantity" className="text-md font-medium mb-2 block">Quantidade:</label>
                                <div className="flex items-center">
                                    <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
                                    <Input id="quantity" type="number" value={quantity} readOnly className="w-16 text-center mx-2" />
                                    <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)}>+</Button>
                                </div>
                            </div> */}
							<Button size="lg" className="w-full text-base">
								Adicionar ao Carrinho
							</Button>
							<Button size="lg" variant="outline" className="w-full text-base">
								Comprar Agora
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>

			{/* Detalhes Adicionais e Avaliações em Abas (Exemplo) */}
			<div className="mt-10 lg:mt-16">
				{/* Aqui você pode usar o componente Tabs do ShadCN/UI se preferir */}
				<Card>
					<CardHeader>
						<CardTitle>Informações Adicionais</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div>
							<h3 className="text-xl font-semibold mb-3">
								Detalhes do Produto
							</h3>
							<ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
								{product.details.map((detail, index) => (
									<li key={index}>{detail}</li>
								))}
								<li>
									SKU:{' '}
									<span className="font-medium text-foreground">
										{product.sku}
									</span>
								</li>
							</ul>
						</div>
						<Separator />
						<div>
							<h3 className="text-xl font-semibold mb-3">
								Avaliações dos Clientes
							</h3>
							{/* Conteúdo das avaliações aqui */}
							<p className="text-muted-foreground">
								Ainda não há avaliações para este produto.
							</p>
							<Button variant="outline" className="mt-4">
								Ver todas as avaliações
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Produtos Relacionados (placeholder) */}
			<section className="mt-12 lg:mt-20">
				<h2 className="text-2xl lg:text-3xl font-semibold mb-6 lg:mb-8 text-center">
					Você também pode gostar
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{[1, 2, 3, 4].map((i) => (
						<Card key={i} className="overflow-hidden group">
							<CardContent className="p-0 aspect-[3/4] relative">
								<Image
									src="/placeholder-image.jpg"
									alt={`Produto relacionado ${i}`}
									fill
									style={{ objectFit: 'cover' }}
									className="group-hover:scale-105 transition-transform duration-300"
								/>
							</CardContent>
							<CardFooter className="flex-col items-start pt-3 pb-4 px-4">
								<h3 className="font-semibold text-md truncate w-full">
									Nome do Produto Relacionado {i}
								</h3>
								<p className="text-sm text-muted-foreground">Marca</p>
								<p className="text-lg font-semibold text-primary mt-1">
									R$ 199,90
								</p>
								<Button variant="outline" size="sm" className="mt-3 w-full">
									Ver Produto
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}
