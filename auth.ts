import NextAuth, { type NextAuthOptions, type Profile } from "next-auth";
import type { OAuthConfig } from "next-auth/providers";
import { engineIdentityRequest } from "@/lib/auth-engine";

interface ThreatFadeProfile extends Profile {
  sub: string;
  email?: string;
  name?: string;
  preferred_username?: string;
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

const issuer = required("THREATFADE_OIDC_ISSUER").replace(/\/$/, "");
const clientId = required("THREATFADE_OIDC_CLIENT_ID");
const clientSecret = required("THREATFADE_OIDC_CLIENT_SECRET");

const ThreatFadeOIDC: OAuthConfig<ThreatFadeProfile> = {
  id: "threatfade-oidc",
  name: "ThreatFade SSO",
  type: "oauth",
  issuer,
  clientId,
  clientSecret,
  wellKnown: `${issuer}/.well-known/openid-configuration`,
  authorization: { params: { scope: "openid profile email" } },
  idToken: true,
  checks: ["pkce", "state", "nonce"],
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name ?? profile.preferred_username ?? profile.sub,
      email: profile.email ?? null,
      image: null,
    };
  },
};

export const authOptions: NextAuthOptions = {
  providers: [ThreatFadeOIDC],
  secret: required("NEXTAUTH_SECRET"),
  session: { strategy: "jwt", maxAge: 8 * 60 * 60, updateAge: 15 * 60 },
  useSecureCookies: process.env.NODE_ENV === "production",
  pages: { signIn: "/login", error: "/login" },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}threatfade.session-token`,
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: process.env.NODE_ENV === "production" },
    },
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      try {
        const target = new URL(url, baseUrl);
        const base = new URL(baseUrl);
        if (target.origin !== base.origin) return `${baseUrl}/soc`;
        if (!target.pathname.startsWith("/")) return `${baseUrl}/soc`;
        return target.toString();
      } catch {
        return `${baseUrl}/soc`;
      }
    },
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        token.access_token = account.access_token;
        token.provider = account.provider;
        if (!token.tf_session) {
          try {
            const created = await engineIdentityRequest<{ session_token: string }>("/enterprise/identity/sessions", account.access_token, {
              method: "POST",
            });
            token.tf_session = created.session_token;
          } catch {
            throw new Error("Authentication session could not be established");
          }
        }
      }
      if (profile?.sub) token.sub = profile.sub;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.sub === "string" ? token.sub : "";
      }
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      if (!token?.access_token || typeof token.access_token !== "string" || typeof token.tf_session !== "string") return;
      try {
        await engineIdentityRequest("/enterprise/identity/sessions/revoke", token.access_token, {
          method: "POST",
          sessionToken: token.tf_session,
        });
      } catch {
        // Cookie invalidation still completes even if the upstream revocation call is unavailable.
      }
    },
  },
};

export default NextAuth(authOptions);
