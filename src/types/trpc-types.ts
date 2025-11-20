import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '../trpc/routers/_app';

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type TrpcLivreur = RouterOutput['livreurs']['getLivreurs'][0];
export type TrpcCommande = RouterOutput['commandes']['getCommandes']['commandes'][0];
export type TrpcLivraisonFromCommande = TrpcCommande['livraisons'][0];
export type TrpcClientFromCommande = TrpcCommande['client'];

export type TrpcClient = RouterOutput['clients']['getClients'][0];
export type TrpcChargement = RouterOutput['chargements']['getChargements'][0];
export type TrpcLivraison = RouterOutput['livraisons']['getPendingLivraisons'][0];
export type TrpcLivreurChargmenent = RouterOutput['chargements']['getChargementsByLivreur'][0];
