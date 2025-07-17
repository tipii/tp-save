type LigneBonLivraison = {
  DO_Piece: string;
  DL_LIGNE: string;
  AR_REF: string; // Code article (vide si commentaire)
  DL_QTEBL: string;
  QTE_DIFF_CMDE: string;
  DL_Design: string; // Description ou commentaire
  DL_PrixUnitaire: string;
  DL_MontantHT: string;
  Commentaires: string;
  Commentaires2: string;
  Famille_ART: string;
};

type BonLivraison = {
  DO_Piece: string; // Numéro du BL
  DO_DateLiv: string; // Date au format brut (ex: "20250612000000000")
  DO_Tiers: string; // Code client
  DO_Ref: string; // Référence externe / livreur
  DO_Coord01: string; // Nom/Raison client
  DE_No: string; // Dépôt
  DO_Imprim: string; // 0 ou 1
  DO_TotalTTC: string;
  DO_NetAPayer: string;
  BCClient: string;
  Creneau: string;
  Personne: string;
  Obs1: string;
  Obs2: string;
};
