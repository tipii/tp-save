import { createTRPCRouter } from '../init';
import { livreursRouter } from './livreurs';
import { commandesRouter } from './commandes';
import { clientsRouter } from './clients';
import { chargementsRouter } from './chargements';
import { livraisonsRouter } from './livraisons';
import { soapServiceRouter } from './soap-service';
import { rawSageDataRouter } from './raw-sage-data';

export const appRouter = createTRPCRouter({
  livreurs: livreursRouter,
  commandes: commandesRouter,
  clients: clientsRouter,
  chargements: chargementsRouter,
  livraisons: livraisonsRouter,
  soapService: soapServiceRouter,
  rawSageData: rawSageDataRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
