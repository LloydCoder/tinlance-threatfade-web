export function safeCallbackUrl(url: string, baseUrl: string): string {
  try {
    const target = new URL(url, baseUrl);
    const base = new URL(baseUrl);
    if (target.origin !== base.origin || !target.pathname.startsWith("/")) return `${baseUrl}/soc`;
    return target.toString();
  } catch {
    return `${baseUrl}/soc`;
  }
}

export function sessionCookieName(production: boolean): string {
  return `${production ? "__Secure-" : ""}threatfade.session-token`;
}
