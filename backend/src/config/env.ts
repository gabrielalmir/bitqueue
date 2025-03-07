import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
