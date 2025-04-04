import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Skip middleware for login page, API routes, and static files
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.includes("_next") ||
    request.nextUrl.pathname.includes("favicon.ico")
  ) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const isAuthenticated = request.cookies.has("authenticated")

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

