import Link from 'next/link';
import Image from 'next/image';
import { Store } from 'lucide-react';
import { Separator } from '../ui/separator';

interface MenuItem {
	title: string;
	links: {
		text: string;
		url: string;
	}[];
}

type FooterProps = {
	logo?: {
		url: string;
		title: string;
	};
	tagline?: string;
	menuItems?: MenuItem[];
	copyright?: string;
	bottomLinks?: {
		text: string;
		url: string;
	}[];
};

export const Footer = ({
	logo = {
		url: '/',
		title: 'Loja Online',
	},
	menuItems = [
		{
			title: 'Produtos',
			links: [
				{ text: 'Tênis Masculinos', url: '/men/sneakers' },
				{ text: 'Tênis Femininos', url: '/women/sneakers' },
				{ text: 'Calças Masculinas', url: '/men/pants' },
				{ text: 'Calças Femininas', url: '/women/pants' },
			],
		},
		{
			title: 'Empresa',
			links: [
				{ text: 'Sobre Nós', url: '/about' },
				{ text: 'Contato', url: '/contact' },
				{ text: 'Trabalhe Conosco', url: '/careers' },
			],
		},
		{
			title: 'Suporte',
			links: [
				{ text: 'Central de Ajuda', url: '/help' },
				{ text: 'Política de Troca', url: '/returns' },
				{ text: 'Rastreamento', url: '/tracking' },
			],
		},
	],
	copyright = '© 2025 Loja Online. Todos os direitos reservados.',
	bottomLinks = [
		{ text: 'Termos de Uso', url: '/terms' },
		{ text: 'Política de Privacidade', url: '/privacy' },
	],
}: FooterProps) => {
	return (
		<footer className="bg-footer border-t">
			<div className="container mx-auto px-6 py-12">
				{/* Seção Principal */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
					{/* Logo e Descrição */}
					<div className="lg:col-span-2">
						<Link href={logo.url} className="flex items-center gap-3 mb-4">
							<Store className="size-8 text-primary" />
							<span className="text-xl font-bold tracking-tight">
								{logo.title}
							</span>
						</Link>
						<p className="text-sm text-muted-foreground max-w-md">
							Sua loja online de confiança com os melhores produtos
							de moda e calçados. Qualidade garantida e entrega rápida.
						</p>
					</div>

					{/* Menu Items */}
					{menuItems.map((section, index) => (
						<div key={index}>
							<h3 className="font-semibold mb-4 text-foreground">
								{section.title}
							</h3>
							<ul className="space-y-3">
								{section.links.map((link, linkIndex) => (
									<li key={linkIndex}>
										<Link
											href={link.url}
											className="text-sm text-muted-foreground hover:text-primary transition-colors"
										>
											{link.text}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Separador */}
				<Separator className="my-8" />

				{/* Rodapé */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm text-muted-foreground">
						{copyright}
					</p>

					<div className="flex gap-6">
						{bottomLinks.map((link, index) => (
							<Link
								key={index}
								href={link.url}
								className="text-sm text-muted-foreground hover:text-primary transition-colors"
							>
								{link.text}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};
