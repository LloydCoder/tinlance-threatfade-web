import NextAuth, { type NextAuthOptions, type Profile } from "next-auth";
import type { OAuthConfig } from "next-auth/providers";
import { engineIdentityRequest } from "@/lib/auth-engine";

interface ThreatFadeProfile extends Profile { sub: string; email?: string; name?: string; preferred_username?: string; }
function required(name: string): string { const value = process.env[name]; if (!value) throw new Error(`${name} is not configured`); return value; }
const issuer = required("THREATFADE_OIDC_ISSUER").replace(/\/$/, "");
const clientId = required("THREATFADE_OIDC_CLIENT_ID");
const clientSecret = required("THREATFADE_OIDC_CLIENT_SECRET");
const tokenEndpoint = required("THREATFADE_OIDC_TOKEN_URL");

const ThreatFadeOIDC: OAuthConfig<ThreatFadeProfile> = {
  id: "threatfade-oidc", name: "ThreatFade SSO", type: "oauth", issuer, clientId, clientSecret,
  wellKnown: `${issuer}/.well-known/openid-configuration`, authorization: { params: { scope: "openid profile email" } }, idToken: true, checks: ["pkce", "state", "nonce"],
  profile(profile) { return { id: profile.sub, name: profile.name ?? profile.preferred_username ?? profile.sub, email: profile.email ?? null, image: null }; },
};

async function refreshAccessToken(refreshToken: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const body = new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken, client_id: clientId, client_secret: clientSecret });
    const response = await fetch(tokenEndpoint, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" }, body, redirect: "error", cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error("OIDC token refresh rejected");
    const payload = (await response.json()) as { access_token?: string; expires_in?: number; refresh_token?: string };
    if (!payload.access_token) throw new Error("OIDC token refresh returned no access token");
    return { access_token: payload.access_token, expires_at: Date.now() + Math.max(60, Number(payload.expires_in ?? 3600) - 60) * 1000, refresh_token: payload.refresh_token ?? refreshToken };
  } finally { clearTimeout(timer); }
}

export const authOptions: NextAuthOptions = {
  providers: [ThreatFadeOIDC], secret: required("NEXTAUTH_SECRET"), session: { strategy: "jwt", maxAge: 8 * 60 * 60, updateAge: 15 * 60 }, useSecureCookies: process.env.NODE_ENV === "production"},
  pages: { signIn: "/login", error: "/login" },
  cookies: { sessionToken: { name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}threatfade.session-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: process.env.NODE_ENV === "production" } } },
  callbacks: {
    async redirect({ url, baseUrl }) { try { const target = new URL(url, baseUrl); const base = new URL(baseUrl); if (target.origin !== base.origin || !target.pathname.startsWith("/")) return `${baseUrl}/soc`; return target.toString(); } catch { return `${baseUrl}/soc`; } },
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        token.access_token = account.access_token; token.refresh_token = account.refresh_token; token.access_token_expires_at = (account.expires_at ?? Math.floor(Date.now() / 1000) + 3600) * 1000 - 60_000; token.provider = account.provider;
        if (!token.tf_session) token.tf_session = (await engineIdentityRequest<{ session_token: string }>("/enterprise/identity/sessions", account.access_token, { method: "POST" })).session_token;
      } else if (typeof token.access_token === "string" && typeof token.refresh_token === "string" && typeof token.access_token_expires_at === "number" && Date.now() >= token.access_token_expires_at) {
        try { const refreshed = await refreshAccessToken(token.refresh_token); token.access_token = refreshed.access_token; token.access_token_expires_at = refreshed.expires_at; token.refresh_token = refreshed.refresh_token; } catch { token.auth_error = "RefreshAccessTokenError"; }
      }
      if (profile?.sub) token.sub = profile.sub;
      return token;
    },
    async session({ session, token }) { if (session.user) session.user.id = typeof token.sub === "string" ? token.sub : ""; return session; },
  },
  events: { async signOut({ token }) { if (!token?.access_token || typeof token.access_token !== "string" || typeof token.tf_session !== "string") return; try { await engineIdentityRequest("/enterprise/identity/sessions/revoke", token.access_token, { method: "POST", sessionToken: token.tf_session }); } catch { /* local cookie invalidation remains authoritative */ } } },
};

export default NextAuth(authOptions);
