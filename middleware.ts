import { auth0 } from "./lib/auth0";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Inicializa el middleware de Auth0
  const authRes = await auth0.middleware(request);

  // No interferir con recursos estáticos o Auth0
  const path = request.nextUrl.pathname;
  if (
    path.startsWith("/_next") ||
    path.startsWith("/auth") ||
    path.startsWith("/favicon.ico") ||
    path.startsWith("/robots.txt") ||
    path.startsWith("/sitemap.xml")
  ) {
    return NextResponse.next();
  }

  // Rutas públicas
  const publicRoutes = ["/", "/productos"];
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return authRes;
  }

  // Rutas privadas → verificar sesión
  const { origin } = new URL(request.url);
  const session = await auth0.getSession(request);

  if (!session) {
    // Redirige al login si no está autenticado
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  // Usuario autenticado → permitir acceso
  return authRes;
}
