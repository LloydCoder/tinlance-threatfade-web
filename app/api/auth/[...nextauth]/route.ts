import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";

const oidcConfigured = Boolean(
  process.env.THREATFADE_OIDC_ISSUER &&
    process.env.THREATFADE_OIDC_CLIENT_ID &&
    process.env.THREATFADE_OIDC_CLIENT_SECRET &&
    process.env.THREATFADE_OIDC_TOKEN_URL,
);

type AuthRouteContext = {
  params: Promise<{ nextauth?: string[] }>;
};

async function handler(request: NextRequest, context: AuthRouteContext) {
  if (!oidcConfigured) {
    return NextResponse.json(
      { error: "Authentication is not configured" },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": "3600",
        },
      },
    );
  }

  const { authOptions } = await import("@/auth");
  return NextAuth(authOptions)(request, context);
}

export { handler as GET, handler as POST };
