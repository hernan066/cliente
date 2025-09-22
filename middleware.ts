import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request); // Returns a NextResponse object

  // Ensure your own middleware does not handle the `/auth` routes, auto-mounted and handled by the SDK
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  // Allow access to public routes without requiring a session
  if (request.nextUrl.pathname === "/") {
    return authRes;
  }

  // Any route that gets to this point will be considered a protected route, and require the user to be logged-in to be able to access it
  const { origin } = new URL(request.url);
  const session = await auth0.getSession(request);

  // If the user does not have a session, redirect to login
  if (!session) {
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  // If a valid session exists, continue with the response from Auth0 middleware
  // You can also add custom logic here...
  return authRes;
}
