import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { neonVercel, vercel } from '@t3-oss/env-nextjs/presets-zod';
export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.url(),
    TRIGGER_SECRET_KEY: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
  },
  extends: [vercel(), neonVercel()],

  experimental__runtimeEnv: process.env,
});
