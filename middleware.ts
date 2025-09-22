import { auth0 } from "./lib/auth0";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Inicializa el middleware de Auth0
  const authRes = await auth0.middleware(request);

  // No interferir con rutas de Auth0
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
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
