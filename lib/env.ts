import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://threatfade.com"),
  THREATFADE_API_URL: z.string().url().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  THREATFADE_API_URL: process.env.THREATFADE_API_URL,
  NODE_ENV: process.env.NODE_ENV,
});

if (!parsed.success && process.env.NODE_ENV === "production") {
  throw new Error(`Invalid production environment: ${parsed.error.message}`);
}

export const env = parsed.success
  ? parsed.data
  : envSchema.parse({
      NEXT_PUBLIC_SITE_URL: "https://threatfade.com",
      THREATFADE_API_URL: undefined,
      NODE_ENV: process.env.NODE_ENV ?? "development",
    });
