import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

type Images = {
	src: string;
	alt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchImages(): Promise<Images[]> {
	try {
		const res = await fetch(`${API_URL}/images/home`, {
		});
		if (!res.ok) {
			console.error("Falha ao buscar imagens da API:", res.statusText);
			return [];
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Erro ao buscar imagens:", error);
		return [];
	}
}

export default async function Home() {
	const images = await fetchImages();

	return (
		<div className="flex flex-col">
			<section className="relative w-full pt-8 pb-8 bg-gray-200 dark:bg-gray-800 ">
				<Carousel opts={{ align: "start", loop: true }} className='w-full max-w-4xl mx-auto'>
					<CarouselContent>
						{images.map((image, index) => (
							<CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
								<div className="p-1">
									<Card className="overflow-hidden">
										<CardContent className="flex aspect-[16/7] items-center justify-center p-0"> {/* Ajuste aspect ratio */}
											<Image
												src={image.src}
												alt={image.alt}
												fill // Usa fill para cobrir o espaço do CardContent
												style={{ objectFit: 'cover' }} // Garante que a imagem cubra sem distorcer
												priority={index === 0} // Prioriza o carregamento da primeira imagem
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px" // Ajuda na otimização
											/>
											<div className="relative z-10 p-4 bg-zinc-800/25 backdrop-blur-md rounded-md">
												<h1 className="text-4xl md:text-6xl font-bold text-zinc-900/60 mb-4">
													Sua Nova Coleção Chegou
												</h1>
												<p className="text-lg md:text-xl text-zinc-900/80 mb-6">
													Descubra as últimas tendências da moda.
												</p>
												<Button asChild size="lg" className='bg-zinc-900/80'>
													<Link href="/new">Ver Novidades</Link>
												</Button>
											</div>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
					<CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
				</Carousel>
			</section>

			<section className="py-12 md:py-16 px-4 md:px-8">
				<h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
					Navegue por Categoria
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<Link href="/men" className="group block relative aspect-square overflow-hidden rounded-md">
						<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
							<span className="text-white text-xl font-medium">Masculino</span>
						</div>
					</Link>
					<Link href="/women" className="group block relative aspect-square overflow-hidden rounded-md bg-gray-300"> {/* Placeholder bg */}
						<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
							<span className="text-white text-xl font-medium">Feminino</span>
						</div>
					</Link>
				</div>
			</section>

			<section className="py-12 md:py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
				<h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
					Produtos em Destaque
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
					{/* Exemplo de Placeholder de Card */}
					<div className="border rounded-md p-4 bg-background">
						<div className="aspect-square bg-gray-200 dark:bg-gray-700 mb-2 rounded"></div>
						<h3 className="font-medium">Nome do Produto</h3>
						<p className="text-sm text-muted-foreground">R$ 99,90</p>
					</div>
					<div className="border rounded-md p-4 bg-background">
						<div className="aspect-square bg-gray-200 dark:bg-gray-700 mb-2 rounded"></div>
						<h3 className="font-medium">Outro Produto</h3>
						<p className="text-sm text-muted-foreground">R$ 129,90</p>
					</div>
					{/* ... */}
				</div>
				<div className="text-center mt-8">
					<Button variant="outline" asChild>
						<Link href="/products">Ver Todos os Produtos</Link>
					</Button>
				</div>
			</section>

			{/* 4. Outras Seções (Opcional) */}
			{/* <section className="py-12 md:py-16 px-4 md:px-8"> */}
			{/*    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Lookbook / Coleção Especial</h2> */}
			{/*    ... conteúdo ... */}
			{/* </section> */}

			{/* 5. CTA (Newsletter, etc.) */}
			<section className="py-12 md:py-16 px-4 md:px-8 text-center bg-primary text-primary-foreground">
				<h2 className="text-2xl md:text-3xl font-semibold mb-4">
					Fique por Dentro!
				</h2>
				<p className="mb-6">
					Assine nossa newsletter e receba novidades e promoções exclusivas.
				</p>
				<div className="flex justify-center">
					<input
						type="email"
						placeholder="Seu melhor e-mail"
						aria-label="Seu melhor e-mail"
						className="p-2 h-10 rounded-l-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-primary disabled:cursor-not-allowed disabled:opacity-50"
					/>
					<Button
						type="submit"
						variant="secondary"
						className='rounded-l-none h-10'
					>
						Inscrever
					</Button>
				</div>
			</section >

		</div >
	);
}