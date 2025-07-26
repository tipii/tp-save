import { createTRPCRouter } from '../init';
import { livreursRouter } from './livreurs';
import { commandesRouter } from './commandes';
import { clientsRouter } from './clients';
import { chargementsRouter } from './chargements';
import { livraisonsRouter } from './livraisons';
import { soapServiceRouter } from './soap-service';
import { rawSageDataRouter } from './raw-sage-data';
import { usersRouter } from './users';
import { livreursChargementsRouter } from './livreurs/chargements';
import { livreursLivraisonsRouter } from './livreurs/livraison';

export const appRouter = createTRPCRouter({
  // Admin routes
  livreurs: livreursRouter,
  commandes: commandesRouter,
  clients: clientsRouter,
  chargements: chargementsRouter,
  users: usersRouter,
  livraisons: livraisonsRouter,
  soapService: soapServiceRouter,
  rawSageData: rawSageDataRouter,
  // Livreur only routes
  livreursChargements: livreursChargementsRouter,
  livreursLivraisons: livreursLivraisonsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
