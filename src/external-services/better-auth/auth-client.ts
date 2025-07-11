import { createAuthClient } from 'better-auth/react';
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { getServerUrl } from './server-url';
import type { auth } from './auth';

export const authClient = createAuthClient({
  baseURL: getServerUrl(),
  plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
});

export type Session = typeof authClient.$Infer.Session;
