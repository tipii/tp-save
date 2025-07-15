import { createTRPCRouter } from '../init';
import { livreursRouter } from './livreurs';
import { commandesRouter } from './commandes';
import { clientsRouter } from './clients';
import { chargementsRouter } from './chargements';

export const appRouter = createTRPCRouter({
  livreurs: livreursRouter,
  commandes: commandesRouter,
  clients: clientsRouter,
  chargements: chargementsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
