import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/", "/report", "/category", "/product"];

  if (
    protectedRoutes.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    )
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/report/:path*",
    "/category/:path*",
    "/product/:path*",
    "/auth",
  ],
};
