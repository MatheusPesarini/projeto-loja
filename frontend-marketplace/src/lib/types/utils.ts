import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const categoryToUrlMap: { [key: string]: string } = {
	tenis_masculinos: '/men/sneakers',
	tenis_femininos: '/women/sneakers',
	calcas_masculinas: '/men/pants',
	calcas_femininas: '/women/pants',
	camisetas_masculinas: '/men/shirts',
	camisetas_femininas: '/women/shirts',
	acessorios: '/accessories',
	tenis_kids: '/kids/sneakers',
};

export const getCategoryUrl = (category: string): string => {
	return categoryToUrlMap[category] || `/${category}`;
};

export const getCategoryDisplayName = (
	category: string | undefined,
): string => {
	if (!category) {
		return 'Categoria não especificada';
	}

	const displayNames: { [key: string]: string } = {
		tenis_masculinos: 'Tênis Masculinos',
		tenis_femininos: 'Tênis Femininos',
		calcas_masculinas: 'Calças Masculinas',
		calcas_femininas: 'Calças Femininas',
		camisetas_masculinas: 'Camisetas Masculinas',
		camisetas_femininas: 'Camisetas Femininas',
		bolsas_femininas: 'Bolsas Femininas',
	};

	return (
		displayNames[category] ||
		category.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
	);
};

export const formatPrice = (
	price: string | number | null | undefined,
): string => {
	if (!price || price === null || price === undefined) {
		return '0,00';
	}

	const numPrice = typeof price === 'string' ? Number.parseFloat(price) : price;

	if (Number.isNaN(numPrice)) {
		return '0,00';
	}

	return numPrice.toFixed(2).replace('.', ',');
};

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	DASHBOARD: '/dashboard',
	SHOP_PRODUCTS: '/shopProducts',
} as const;

export const PROTECTED_ROUTES = [ROUTES.DASHBOARD];

export const PUBLIC_ROUTES = [
	{ path: ROUTES.HOME, whenAuthenticated: 'allow' },
	{ path: ROUTES.SHOP_PRODUCTS, whenAuthenticated: 'allow' },
	{ path: ROUTES.LOGIN, whenAuthenticated: 'redirect' },
	{ path: ROUTES.REGISTER, whenAuthenticated: 'redirect' },
] as const;