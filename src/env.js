import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_URL_DEV: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    GOOGLE_CLOUD_STORAGE_PROJECT_ID: z.string(),
    GOOGLE_CLOUD_STORAGE_KEY_FILE_PATH: z.string(),
    GOOGLE_CLOUD_STORAGE_BUCKET_NAME: z.string(),
    GOOGLE_CLOUD_STORAGE_STORAGE_PATH: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_DEV: process.env.DATABASE_URL_DEV,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    GOOGLE_CLOUD_STORAGE_PROJECT_ID:
      process.env.GOOGLE_CLOUD_STORAGE_PROJECT_ID,
    GOOGLE_CLOUD_STORAGE_KEY_FILE_PATH:
      process.env.GOOGLE_CLOUD_STORAGE_KEY_FILE_PATH,
    GOOGLE_CLOUD_STORAGE_BUCKET_NAME:
      process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME,
    GOOGLE_CLOUD_STORAGE_STORAGE_PATH:
      process.env.GOOGLE_CLOUD_STORAGE_STORAGE_PATH,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
