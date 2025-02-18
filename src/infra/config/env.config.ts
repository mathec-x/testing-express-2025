import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().url(),
  LOG_LEVEL: z.string().default('info'),
  NODE_ENV: z.string()
});

export const env = envSchema.parse(process.env);
