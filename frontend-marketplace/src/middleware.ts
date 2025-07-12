import { type NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from './lib/session/dal';

const protectedRoutes = ['/dashboard'];
const publicRoutes = [
	{ path: '/', whenAuthenticated: 'allow' },
	{ path: '/shopProducts', whenAuthenticated: 'allow' },
	{ path: '/login', whenAuthenticated: 'redirect' },
	{ path: '/register', whenAuthenticated: 'redirect' },
];

const LOGIN_ROUTE = '/login';
const DASHBOARD_ROUTE = '/dashboard';

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const isProtectedRoute = protectedRoutes.some(
		(route) => path === route || path.startsWith(`${route}/`),
	);

	if (isProtectedRoute) {
		const auth = await isAuthenticated();
		if (!auth) {
			return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
		}
	}

	const publicRoute = publicRoutes.find((route) => route.path === path);
	if (publicRoute?.whenAuthenticated === 'redirect') {
		const auth = await isAuthenticated();
		if (auth) {
			return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
};
