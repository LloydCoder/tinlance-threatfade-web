import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: { id: string; name?: string | null; email?: string | null; image?: string | null };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    access_token_expires_at?: number;
    tf_session?: string;
    provider?: string;
    auth_error?: string;
  }
}
