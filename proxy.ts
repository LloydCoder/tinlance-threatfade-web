import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPrefixes = ["/soc", "/account", "/organizations"];

export async function proxy(request: NextRequest) {
  if (!protectedPrefixes.some((prefix) => request.nextUrl.pathname === prefix || request.nextUrl.pathname.startsWith(`${prefix}/`))) return NextResponse.next();
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return NextResponse.redirect(new URL("/login", request.url));
  const token = await getToken({ req: request, secret, cookieName: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}threatfade.session-token` });
  if (!token?.access_token || !token.tf_session) return NextResponse.redirect(new URL("/login", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/soc/:path*", "/account/:path*", "/organizations/:path*"] };
