'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ImageCarousel } from '@/components/common/CarrouselImages';
import { fetchSectionImages } from '@/lib/actions/images/get-section-image';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Images = {
	src: string;
	alt: string;
};

export default function Home() {
	const [images, setImages] = useState<Images[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadImages() {
			try {
				setLoading(true);
				const fetchedImages = await fetchSectionImages();
				setImages(fetchedImages);
			} catch (error) {
				console.error('Erro ao carregar imagens:', error);
			} finally {
				setLoading(false);
			}
		}

		loadImages();
	}, []);

	return (
		<div className="flex flex-col">
			<ImageCarousel />

			<section className="py-12 md:py-16 px-4 md:px-8">
				<h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
					Navegue por Categoria
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<Link
						href="/men"
						className="group block relative aspect-square overflow-hidden border-2 transition-all duration-300 ease-in-out hover:shadow-lg"
					>
						<div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out flex items-center justify-center">
							<div
								className="absolute w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
								style={{ willChange: 'transform' }}
							>
								<Image
									src={images[0]?.src || '/placeholder-image.jpg'}
									alt={images[0]?.alt || 'Categoria Masculino'}
									fill
									style={{ objectFit: 'cover' }}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
									quality={100}
									priority
								/>
							</div>
							<span className="text-white text-2xl bg-black/20 font-medium z-10 p-2">
								Masculino
							</span>
						</div>
					</Link>
					<Link
						href="/women"
						className="group block relative overflow-hidden border-2 transition-all duration-300 ease-in-out hover:shadow-lg"
					>
						<div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out flex items-center justify-center">
							<div
								className="absolute w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
								style={{ willChange: 'transform' }}
							>
								<Image
									src={images[1]?.src || '/placeholder-image.jpg'}
									alt={images[1]?.alt || 'Categoria Feminino'}
									fill
									style={{ objectFit: 'cover' }}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
									quality={100}
								/>
							</div>
							<span className="text-white text-2xl bg-black/20 font-medium z-10 p-2">
								Feminino
							</span>
						</div>
					</Link>
					<Link
						href="/kids"
						className="group block relative overflow-hidden border-2 transition-all duration-300 ease-in-out hover:shadow-lg"
					>
						<div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out flex items-center justify-center">
							<div
								className="absolute w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
								style={{ willChange: 'transform' }}
							>
								<Image
									src={images[2]?.src || '/placeholder-image.jpg'}
									alt={images[2]?.alt || 'Categoria Infantil'}
									fill
									style={{ objectFit: 'cover' }}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
									quality={100}
								/>
							</div>
							<span className="text-white text-2xl bg-black/20 font-medium z-10 p-2">
								Infantil
							</span>
						</div>
					</Link>
					<Link
						href="/accessories"
						className="group block relative overflow-hidden border-2 transition-all duration-300 ease-in-out hover:shadow-lg"
					>
						<div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out flex items-center justify-center">
							<div
								className="absolute w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
								style={{ willChange: 'transform' }}
							>
								<Image
									src={images[3]?.src || '/placeholder-image.jpg'}
									alt={images[3]?.alt || 'Categoria Acessórios'}
									fill
									style={{ objectFit: 'cover' }}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
									quality={100}
								/>
							</div>
							<span className="text-white text-2xl bg-black/20 font-medium z-10 p-2">
								Acessórios
							</span>
						</div>
					</Link>
				</div>
			</section>

			<section className="py-12 md:py-16 px-4 md:px-8">
				<h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
					Produtos em Destaque
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
					{/* Exemplo de Placeholder de Card */}
					<div className="border rounded-md p-4 bg-background">
						<div className="aspect-square bg-gray-200 dark:bg-gray-700 mb-2 rounded" />
						<h3 className="font-medium">Nome do Produto</h3>
						<p className="text-sm text-muted-foreground">R$ 99,90</p>
					</div>
					<div className="border rounded-md p-4 bg-background">
						<div className="aspect-square bg-gray-200 dark:bg-gray-700 mb-2 rounded" />
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
						className="rounded-l-none h-10"
					>
						Inscrever
					</Button>
				</div>
			</section>
		</div>
	);
}
