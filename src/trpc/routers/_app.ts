import { createTRPCRouter } from '../init';
import { livreursRouter } from './livreurs';

export const appRouter = createTRPCRouter({
  livreurs: livreursRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
