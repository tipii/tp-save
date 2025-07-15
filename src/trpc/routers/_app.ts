import { createTRPCRouter } from '../init';
import { livreursRouter } from './livreurs';
import { commandesRouter } from './commandes';
import { clientsRouter } from './clients';

export const appRouter = createTRPCRouter({
  livreurs: livreursRouter,
  commandes: commandesRouter,
  clients: clientsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
