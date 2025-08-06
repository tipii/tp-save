import 'dotenv/config';
import path from 'path';
import { defineConfig } from 'prisma/config';
export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema'),
  migrations: {
    path: path.join('prisma', 'migrations'),
  },
});
