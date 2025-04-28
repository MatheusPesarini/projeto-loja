import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ImageCarousel } from '@/components/carrousel-images/carrouselImages';

export default function Home() {
	return (
		<div className="flex flex-col">
			<ImageCarousel />

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
					<Link href="/women" className="group block relative aspect-square overflow-hidden rounded-md bg-gray-300"> {/* Placeholder bg */}
						<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
							<span className="text-white text-xl font-medium">Infatil</span>
						</div>
					</Link>
					<Link href="/women" className="group block relative aspect-square overflow-hidden rounded-md bg-gray-300"> {/* Placeholder bg */}
						<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
							<span className="text-white text-xl font-medium">Acessórios</span>
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