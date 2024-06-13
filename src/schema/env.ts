import { z } from "zod";

const envSchema = z.object({
  NEXT_API_URL_DEV: z.string(),
  NEXT_API_URL_PROD: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
