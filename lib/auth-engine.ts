import "server-only";

const TIMEOUT_MS = 8000;
const MAX_RESPONSE = 1024 * 1024;

function baseUrl() {
  const raw = process.env.THREATFADE_API_URL;
  if (!raw) throw new Error("THREATFADE_API_URL is not configured");
  const parsed = new URL(raw);
  if (process.env.NODE_ENV === "production" && parsed.protocol !== "https:") {
    throw new Error("ThreatFade API must use HTTPS in production");
  }
  return raw.replace(/\/$/, "");
}

export async function engineIdentityRequest<T>(
  path: string,
  accessToken: string,
  options: { method?: string; body?: unknown; sessionToken?: string } = {},
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const headers: HeadersInit = { Accept: "application/json", Authorization: `Bearer ${accessToken}` };
    if (options.sessionToken) headers["X-ThreatFade-Session"] = options.sessionToken;
    let body: string | undefined;
    if (options.body !== undefined) {
      body = JSON.stringify(options.body);
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`${baseUrl()}${path}`, {
      method: options.method ?? "GET",
      headers,
      body,
      redirect: "error",
      cache: "no-store",
      signal: controller.signal,
    });
    const bytes = await response.arrayBuffer();
    if (bytes.byteLength > MAX_RESPONSE) throw new Error("Identity service response too large");
    const text = new TextDecoder().decode(bytes);
    let payload: unknown = null;
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch {
        throw new Error("Identity service returned invalid JSON");
      }
    }
    if (!response.ok) {
      const message = typeof payload === "object" && payload && "detail" in payload ? String(payload.detail) : "Identity request rejected";
      throw new Error(message);
    }
    return payload as T;
  } finally {
    clearTimeout(timer);
  }
}
