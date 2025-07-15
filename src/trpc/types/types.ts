import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '../routers/_app';

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type TrpcLivreurs = RouterOutput['livreurs']['getLivreurs'][0];
export type TrpcCommandes = RouterOutput['commandes']['getCommandes'][0];
export type TrpcClients = RouterOutput['clients']['getClients'][0];
export type TrpcChargements = RouterOutput['chargements']['getChargements'][0];
