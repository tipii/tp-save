export function parseSoapLivraisonList(soapResult: string): BonLivraison[] {
  return soapResult
    .split('\r')
    .filter(Boolean)
    .map((line) => {
      const fields = line.split('#;#');
      return {
        DO_Piece: fields[0].replace('\n', ''),
        DO_DateLiv: fields[1],
        DO_Tiers: fields[2],
        DO_Ref: fields[3],
        DO_Coord01: fields[4],
        DE_No: fields[5],
        DO_Imprim: fields[6],
        DO_TotalTTC: fields[9],
        DO_NetAPayer: fields[10],
        BCClient: fields[11],
        Creneau: fields[12],
        Personne: fields[13],
        Obs1: fields[14],
        Obs2: fields[15],
      };
    });
}

export function parseSoapLivraisonLignes(soapResult: string): LigneBonLivraison[] {
  return soapResult
    .split('\r')
    .filter(Boolean)
    .map((line) => {
      const fields = line.split('#;#');
      return {
        DO_Piece: fields[0].replace('\n', ''),
        DL_LIGNE: fields[1],
        AR_REF: fields[2], // Code article (vide si commentaire)
        DL_QTEBL: fields[3],
        QTE_DIFF_CMDE: fields[4],
        DL_Design: fields[5], // Description ou commentaire
        DL_PrixUnitaire: fields[6],
        DL_MontantHT: fields[7],
        Commentaires: fields[8],
        Commentaires2: fields[9],
        Famille_ART: fields[10],
      };
    });
}
