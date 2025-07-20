import { type NextRequest, NextResponse } from 'next/server';
import { handleProtectedRoute, handlePublicRoute } from './lib/middleware/route-guards';

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const protectedRouteResponse = await handleProtectedRoute(request, path);
	if (protectedRouteResponse) return protectedRouteResponse;

	const publicRouteResponse = await handlePublicRoute(request, path);
	if (publicRouteResponse) return publicRouteResponse;

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
};
