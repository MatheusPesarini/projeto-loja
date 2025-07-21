import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

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
