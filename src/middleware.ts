import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow next internals, static assets, sign in, and auth callbacks
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/auth/unauthorized") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // protect admin
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const loginUrl = new URL("/signin", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.toString());
      return NextResponse.redirect(loginUrl);
    }

    // allow only your admin email
    if ((token as any).email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
      return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
