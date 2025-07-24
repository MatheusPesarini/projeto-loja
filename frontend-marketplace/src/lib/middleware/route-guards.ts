import { type NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../session/dal";
import { PROTECTED_ROUTES, PUBLIC_ROUTES, ROUTES } from "../types/utils";

export async function handleProtectedRoute(request: NextRequest, path: string) {
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) return null;

  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return null;
}

export async function handlePublicRoute(request: NextRequest, path: string) {
  const publicRoute = PUBLIC_ROUTES.find((route) => route.path === path);

  if (!publicRoute || publicRoute.whenAuthenticated !== "redirect") {
    return null;
  }

  const auth = await isAuthenticated();
  if (auth) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return null;
}
