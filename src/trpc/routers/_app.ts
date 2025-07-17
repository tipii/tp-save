import { createTRPCRouter } from '../init';
import { livreursRouter } from './livreurs';
import { commandesRouter } from './commandes';
import { clientsRouter } from './clients';
import { chargementsRouter } from './chargements';
import { lotsRouter } from './lots';
import { soapServiceRouter } from './soap-service';

export const appRouter = createTRPCRouter({
  livreurs: livreursRouter,
  commandes: commandesRouter,
  clients: clientsRouter,
  chargements: chargementsRouter,
  lots: lotsRouter,
  soapService: soapServiceRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
