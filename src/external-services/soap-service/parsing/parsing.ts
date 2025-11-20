import { DocVente, LigneBonLivraison } from '../types/types';
import { Decimal } from '@prisma/client/runtime/library';
import { getTahitiToday } from '@/lib/date-utils';

/**
 * Type definition for DocVente Prisma insertion
 * Matches the schema defined in prisma/schema/doc-vente.prisma
 */
export type DocVentePrismaInput = {
  piece: string;
  cbPiece: string;
  guid: string;
  domaine: string;
  type: string;
  date: Date;
  ref: string;
  souche: string;
  period: string;
  heure: string;
  statut: string;
  eStatut: string;
  docType: string;
  refExterne?: string;
  noWeb?: string;
  tiers: string;
  cbTiers: string;
  numPayeur: string;
  cbNumPayeur: string;
  numCentrale?: string;
  cbNumCentrale?: string;
  contact?: string;
  devise: string;
  cours: string;
  totalHT: Decimal;
  totalHTNet: Decimal;
  totalTTC: Decimal;
  netAPayer: Decimal;
  montantRegle: Decimal;
  escompte: Decimal;
  txEscompte: Decimal;
  ecart?: Decimal;
  taxe1: Decimal;
  typeTaux1: string;
  typeTaxe1: string;
  codeTaxe1: string;
  taxe2: Decimal;
  typeTaux2: string;
  typeTaxe2: string;
  codeTaxe2: string;
  taxe3: Decimal;
  typeTaux3: string;
  typeTaxe3: string;
  codeTaxe3: string;
  tvaDebit?: string;
  expedit?: string;
  dateLivr?: Date;
  dateLivrRealisee?: Date;
  dateExpedition?: Date;
  colisage?: string;
  typeColis?: string;
  creneauLivraison?: string;
  personneContact?: string;
  adresseLivraison?: string;
  coNo?: string;
  cbCoNo?: string;
  deNo?: string;
  cbDeNo?: string;
  liNo?: string;
  cbLiNo?: string;
  caNum?: string;
  cbCaNum?: string;
  caNo?: string;
  cbCaNo?: string;
  caNumIFRS?: string;
  cgNum?: string;
  cbCgNum?: string;
  etNo?: string;
  cbEtNo?: string;
  ebNo?: string;
  cfarNo?: string;
  cbCfarNo?: string;
  facNo?: string;
  cbFacNo?: string;
  coord01?: string;
  coord02?: string;
  coord03?: string;
  coord04?: string;
  condition?: string;
  tarif?: string;
  typeCalcul?: string;
  conversion?: string;
  typeFrais?: string;
  valFrais?: Decimal;
  typeLigneFrais?: string;
  typeFranco?: string;
  valFranco?: Decimal;
  typeLigneFranco?: string;
  nbFacture?: string;
  blFact?: string;
  reliquat?: string;
  imprim?: string;
  ventile?: string;
  transfere?: string;
  cloture?: string;
  attente?: string;
  valide?: string;
  statutBAP?: string;
  demandeRegul?: string;
  exclure?: string;
  refPaiement?: string;
  adressePaiement?: string;
  paiementLigne?: string;
  transaction?: string;
  typeTransac?: string;
  regime?: string;
  catCompta?: string;
  majCpta?: string;
  langue?: string;
  provenance?: string;
  motif?: string;
  motifDevis?: string;
  factureElec?: string;
  factureFile?: string;
  factureFrs?: string;
  cbFactureFrs?: string;
  pieceOrig?: string;
  cbPieceOrig?: string;
  abNo?: string;
  debutAbo?: Date;
  finAbo?: Date;
  debutPeriod?: Date;
  finPeriod?: Date;
  noCaissier?: string;
  cbNoCaissier?: string;
  coffre?: string;
  expeIle?: string;
  expeNoCsnt?: string;
  obs1?: string;
  obs2?: string;
  obs3?: string;
  obs4?: string;
  bcClient?: string;
  cdeSaisiePar?: string;
  cdeTransmissePar?: string;
  cdeModeReception?: string;
  heureDebut?: string;
  mrNo?: string;
  codeService?: string;
  cbProt: number;
  cbMarq: number;
  cbCreateur: string;
  cbModification: Date;
  cbReplication: number;
  cbFlag: number;
  cbCreation: Date;
  cbCreationUser: string;
  cbHash?: string;
  cbHashVersion?: number;
  cbHashDate?: Date;
  cbHashOrder?: number;
};

/**
 * Helper function to parse date strings from SOAP to Date objects
 * Handles empty strings by returning undefined
 * Supports SOAP format: YYYYMMDDHHmmssSSS (e.g., 20251120000000000)
 */
function parseDate(dateStr: string | undefined): Date | undefined {
  // console.log('dateStr', dateStr);
  if (!dateStr || dateStr.trim() === '') return undefined;
  // check if date is not only 0s, if so, return undefined
  // if (dateStr.trim() === '00000000000000000' || dateStr.trim() === '17530101000000000')
  //   return undefined;
  // Check if it's a SOAP format date (17 characters: YYYYMMDDHHmmssSSS)
  if (/^\d{17}$/.test(dateStr)) {
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1; // Month is 0-indexed
    const day = parseInt(dateStr.substring(6, 8), 10);
    const hour = parseInt(dateStr.substring(8, 10), 10);
    const minute = parseInt(dateStr.substring(10, 12), 10);
    const second = parseInt(dateStr.substring(12, 14), 10);
    const millisecond = parseInt(dateStr.substring(14, 17), 10);

    const parsed = new Date(year, month, day, hour, minute, second, millisecond);

    // if date < 2022-01-01, return undefined
    // console.log('parsed', parsed, parsed < new Date('2022-01-01'));
    if (parsed < new Date('2022-01-01')) return undefined;
    return isNaN(parsed.getTime()) ? undefined : parsed;
  }

  // Try standard date parsing
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? undefined : parsed;
}

/**
 * Helper function to parse decimal strings from SOAP to Prisma Decimal
 * Returns 0 for empty/invalid values for required fields
 */
function parseDecimal(value: string | undefined, isOptional = false): Decimal | undefined {
  if (!value || value.trim() === '') {
    return isOptional ? undefined : new Decimal(0);
  }
  try {
    return new Decimal(value);
  } catch {
    return isOptional ? undefined : new Decimal(0);
  }
}

/**
 * Helper function to parse integer strings from SOAP
 */
function parseInt(value: string | undefined, defaultValue = 0): number {
  if (!value || value.trim() === '') return defaultValue;
  const parsed = Number.parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Helper function to handle optional string fields
 */
function parseOptionalString(value: string | undefined): string | undefined {
  return value && value.trim() !== '' ? value : undefined;
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

export function parseSoapDocVenteList(soapResult: string): DocVente[] {
  return soapResult
    .split('\r')
    .filter(Boolean)
    .map((line) => {
      const fields = line.split('#;#');
      return {
        DO_Domaine: fields[0]?.replace('\n', '') ?? '',
        DO_Type: fields[1] ?? '',
        DO_Piece: fields[2] ?? '',
        cbDO_Piece: fields[3] ?? '',
        DO_Date: fields[4] ?? '',
        DO_Ref: fields[5] ?? '',
        DO_Tiers: fields[6] ?? '',
        cbDO_Tiers: fields[7] ?? '',
        CO_No: fields[8] ?? '',
        cbCO_No: fields[9] ?? '',
        DO_Period: fields[10] ?? '',
        DO_Devise: fields[11] ?? '',
        DO_Cours: fields[12] ?? '',
        DE_No: fields[13] ?? '',
        cbDE_No: fields[14] ?? '',
        LI_No: fields[15] ?? '',
        cbLI_No: fields[16] ?? '',
        CT_NumPayeur: fields[17] ?? '',
        cbCT_NumPayeur: fields[18] ?? '',
        DO_Expedit: fields[19] ?? '',
        DO_NbFacture: fields[20] ?? '',
        DO_BLFact: fields[21] ?? '',
        DO_TxEscompte: fields[22] ?? '',
        DO_Reliquat: fields[23] ?? '',
        DO_Imprim: fields[24] ?? '',
        CA_Num: fields[25] ?? '',
        cbCA_Num: fields[26] ?? '',
        DO_Coord01: fields[27] ?? '',
        DO_Coord02: fields[28] ?? '',
        DO_Coord03: fields[29] ?? '',
        DO_Coord04: fields[30] ?? '',
        DO_Souche: fields[31] ?? '',
        DO_DateLivr: fields[32] ?? '',
        DO_Condition: fields[33] ?? '',
        DO_Tarif: fields[34] ?? '',
        DO_Colisage: fields[35] ?? '',
        DO_TypeColis: fields[36] ?? '',
        DO_Transaction: fields[37] ?? '',
        DO_Langue: fields[38] ?? '',
        DO_Ecart: fields[39] ?? '',
        DO_Regime: fields[40] ?? '',
        N_CatCompta: fields[41] ?? '',
        DO_Ventile: fields[42] ?? '',
        AB_No: fields[43] ?? '',
        DO_DebutAbo: fields[44] ?? '',
        DO_FinAbo: fields[45] ?? '',
        DO_DebutPeriod: fields[46] ?? '',
        DO_FinPeriod: fields[47] ?? '',
        CG_Num: fields[48] ?? '',
        cbCG_Num: fields[49] ?? '',
        DO_Statut: fields[50] ?? '',
        DO_Heure: fields[51] ?? '',
        CA_No: fields[52] ?? '',
        cbCA_No: fields[53] ?? '',
        CO_NoCaissier: fields[54] ?? '',
        cbCO_NoCaissier: fields[55] ?? '',
        DO_Transfere: fields[56] ?? '',
        DO_Cloture: fields[57] ?? '',
        DO_NoWeb: fields[58] ?? '',
        DO_Attente: fields[59] ?? '',
        DO_Provenance: fields[60] ?? '',
        CA_NumIFRS: fields[61] ?? '',
        MR_No: fields[62] ?? '',
        DO_TypeFrais: fields[63] ?? '',
        DO_ValFrais: fields[64] ?? '',
        DO_TypeLigneFrais: fields[65] ?? '',
        DO_TypeFranco: fields[66] ?? '',
        DO_ValFranco: fields[67] ?? '',
        DO_TypeLigneFranco: fields[68] ?? '',
        DO_Taxe1: fields[69] ?? '',
        DO_TypeTaux1: fields[70] ?? '',
        DO_TypeTaxe1: fields[71] ?? '',
        DO_Taxe2: fields[72] ?? '',
        DO_TypeTaux2: fields[73] ?? '',
        DO_TypeTaxe2: fields[74] ?? '',
        DO_Taxe3: fields[75] ?? '',
        DO_TypeTaux3: fields[76] ?? '',
        DO_TypeTaxe3: fields[77] ?? '',
        DO_MajCpta: fields[78] ?? '',
        DO_Motif: fields[79] ?? '',
        CT_NumCentrale: fields[80] ?? '',
        cbCT_NumCentrale: fields[81] ?? '',
        DO_Contact: fields[82] ?? '',
        DO_FactureElec: fields[83] ?? '',
        DO_TypeTransac: fields[84] ?? '',
        DO_DateLivrRealisee: fields[85] ?? '',
        DO_DateExpedition: fields[86] ?? '',
        DO_FactureFrs: fields[87] ?? '',
        cbDO_FactureFrs: fields[88] ?? '',
        DO_PieceOrig: fields[89] ?? '',
        cbDO_PieceOrig: fields[90] ?? '',
        DO_GUID: fields[91] ?? '',
        DO_EStatut: fields[92] ?? '',
        DO_DemandeRegul: fields[93] ?? '',
        ET_No: fields[94] ?? '',
        cbET_No: fields[95] ?? '',
        DO_Valide: fields[96] ?? '',
        DO_Coffre: fields[97] ?? '',
        DO_CodeTaxe1: fields[98] ?? '',
        DO_CodeTaxe2: fields[99] ?? '',
        DO_CodeTaxe3: fields[100] ?? '',
        DO_TotalHT: fields[101] ?? '',
        DO_StatutBAP: fields[102] ?? '',
        DO_Escompte: fields[103] ?? '',
        DO_DocType: fields[104] ?? '',
        DO_TypeCalcul: fields[105] ?? '',
        DO_FactureFile: fields[106] ?? '',
        DO_TotalHTNet: fields[107] ?? '',
        DO_TotalTTC: fields[108] ?? '',
        DO_NetAPayer: fields[109] ?? '',
        DO_MontantRegle: fields[110] ?? '',
        DO_RefPaiement: fields[111] ?? '',
        DO_AdressePaiement: fields[112] ?? '',
        DO_PaiementLigne: fields[113] ?? '',
        DO_MotifDevis: fields[114] ?? '',
        DO_Conversion: fields[115] ?? '',
        cbProt: fields[116] ?? '',
        cbMarq: fields[117] ?? '',
        cbCreateur: fields[118] ?? '',
        cbModification: fields[119] ?? '',
        cbReplication: fields[120] ?? '',
        cbFlag: fields[121] ?? '',
        cbCreation: fields[122] ?? '',
        cbCreationUser: fields[123] ?? '',
        cbHash: fields[124] ?? '',
        cbHashVersion: fields[125] ?? '',
        cbHashDate: fields[126] ?? '',
        cbHashOrder: fields[127] ?? '',
        'BC client': fields[128] ?? '',
        'Créneau de livraison': fields[129] ?? '',
        'Personne à contacter sur place': fields[130] ?? '',
        'Adresse liv° / sce à livrer': fields[131] ?? '',
        'EXPE : ILE': fields[132] ?? '',
        'EXPE N° CSNT': fields[133] ?? '',
        'OBS. 1': fields[134] ?? '',
        'OBS. 2': fields[135] ?? '',
        'OBS. 3': fields[136] ?? '',
        'OBS. 4': fields[137] ?? '',
        'Cde saisie par': fields[138] ?? '',
        'Cde transmisse par': fields[139] ?? '',
        'Cde : mode de réception': fields[140] ?? '',
        'Heure début': fields[141] ?? '',
        DO_TVADebit: fields[142] ?? '',
        EB_No: fields[143] ?? '',
        DO_RefExterne: fields[144] ?? '',
        CFAR_No: fields[145] ?? '',
        cbCFAR_No: fields[146] ?? '',
        FAC_No: fields[147] ?? '',
        cbFAC_No: fields[148] ?? '',
        DO_Exclure: fields[149] ?? '',
        DO_CodeService: fields[150] ?? '',
      };
    });
}

// 0#;#6#;#FA25110343#;#   FA25110343#;#20251110000000000#;##;#TAHITINETTOYAGE#;#TAHITINETTOYAGE#;#15#;#15#;#1#;#0#;#0#;#1#;#1#;#2242#;#2242#;#TAHITINETTOYAGE#;#TAHITINETTOYAGE#;#1#;#1#;#0#;#0#;#0#;#1#;##;##;##;##;##;##;#0#;#20251120000000000#;#1#;#1#;#1#;#1#;#11#;#0#;#0#;#21#;#1#;#0#;#0#;#17530101000000000#;#17530101000000000#;#17530101000000000#;#17530101000000000#;#411000#;#411000#;#2#;#000112832#;#0#;#0#;#0#;#0#;#0#;#0#;##;#0#;#0#;##;#0#;#0#;#0#;#0#;#0#;#0#;#0#;#0#;#0#;#0#;#0#;#0#;#0#;#0#;#0#;#0#;#0#;##;##;##;##;#0#;#0#;#20251120000000000#;#17530101000000000#;##;##;##;#             #;#00000000-0000-0000-0000-000000000000#;#0#;#0#;#0#;#0#;#0#;#0#;##;##;##;#1936#;#0#;#0#;#6#;#0#;#00000000-0000-0000-0000-000000000000#;#1936#;#2246#;#2246#;#0#;#00000000-0000-0000-0000-000000000000#;##;#0#;#0#;#0#;#0#;#1377191#;#COLU#;#20251118142421000#;#0#;#0#;#20251110112832000#;#0db6891f-f072-4936-bc66-5bf9d778f7e4#;##;#1#;#00000000000000000#;#0#;#bc500#;#dès que possible#;#Pierre#;#Punaauia a coté du manguier#;#TAHITI#;#600#;#obs1#;#ob2#;#ob3#;#dessus le devis initiale#;#Christelle#;#Noémie#;#MP / SMS#;##;#0#;#0#;##;#0#;#0#;#0#;#0#;#0#;#
/**
 * Parses SOAP DocVente data into Prisma-compatible format for database insertion
 * Handles proper type conversions for DateTime and Decimal fields
 * Fields are ordered by their index in the SOAP response
 */
export function parseSoapDocVenteForPrisma(soapResult: string): DocVentePrismaInput[] {
  return soapResult
    .split('\r')
    .filter(Boolean)
    .map((line) => {
      const fields = line.split('#;#');

      return {
        // fields[0] - DO_Domaine
        domaine: fields[0]?.replace('\n', '') ?? '',
        // fields[1] - DO_Type
        type: fields[1] ?? '',
        // fields[2] - DO_Piece (PRIMARY KEY)
        piece: fields[2] ?? '',
        // fields[3] - cbDO_Piece
        cbPiece: fields[3] ?? '',
        // fields[4] - DO_Date
        date: parseDate(fields[4]) ?? new Date(),
        // fields[5] - DO_Ref
        ref: fields[5] ?? '',
        // fields[6] - DO_Tiers
        tiers: fields[6] ?? '',
        // fields[7] - cbDO_Tiers
        cbTiers: fields[7] ?? '',
        // fields[8] - CO_No
        coNo: parseOptionalString(fields[8]),
        // fields[9] - cbCO_No
        cbCoNo: parseOptionalString(fields[9]),
        // fields[10] - DO_Period
        period: fields[10] ?? '',
        // fields[11] - DO_Devise
        devise: fields[11] ?? '',
        // fields[12] - DO_Cours
        cours: fields[12] ?? '',
        // fields[13] - DE_No
        deNo: parseOptionalString(fields[13]),
        // fields[14] - cbDE_No
        cbDeNo: parseOptionalString(fields[14]),
        // fields[15] - LI_No
        liNo: parseOptionalString(fields[15]),
        // fields[16] - cbLI_No
        cbLiNo: parseOptionalString(fields[16]),
        // fields[17] - CT_NumPayeur
        numPayeur: fields[17] ?? '',
        // fields[18] - cbCT_NumPayeur
        cbNumPayeur: fields[18] ?? '',
        // fields[19] - DO_Expedit
        expedit: parseOptionalString(fields[19]),
        // fields[20] - DO_NbFacture
        nbFacture: parseOptionalString(fields[20]),
        // fields[21] - DO_BLFact
        blFact: parseOptionalString(fields[21]),
        // fields[22] - DO_TxEscompte
        txEscompte: parseDecimal(fields[22])!,
        // fields[23] - DO_Reliquat
        reliquat: parseOptionalString(fields[23]),
        // fields[24] - DO_Imprim
        imprim: parseOptionalString(fields[24]),
        // fields[25] - CA_Num
        caNum: parseOptionalString(fields[25]),
        // fields[26] - cbCA_Num
        cbCaNum: parseOptionalString(fields[26]),
        // fields[27] - DO_Coord01
        coord01: parseOptionalString(fields[27]),
        // fields[28] - DO_Coord02
        coord02: parseOptionalString(fields[28]),
        // fields[29] - DO_Coord03
        coord03: parseOptionalString(fields[29]),
        // fields[30] - DO_Coord04
        coord04: parseOptionalString(fields[30]),
        // fields[31] - DO_Souche
        souche: fields[31] ?? '',
        // fields[32] - DO_DateLivr
        dateLivr: parseDate(fields[32]) ?? getTahitiToday(),
        // fields[33] - DO_Condition
        condition: parseOptionalString(fields[33]),
        // fields[34] - DO_Tarif
        tarif: parseOptionalString(fields[34]),
        // fields[35] - DO_Colisage
        colisage: parseOptionalString(fields[35]),
        // fields[36] - DO_TypeColis
        typeColis: parseOptionalString(fields[36]),
        // fields[37] - DO_Transaction
        transaction: parseOptionalString(fields[37]),
        // fields[38] - DO_Langue
        langue: parseOptionalString(fields[38]),
        // fields[39] - DO_Ecart
        ecart: parseDecimal(fields[39], true),
        // fields[40] - DO_Regime
        regime: parseOptionalString(fields[40]),
        // fields[41] - N_CatCompta
        catCompta: parseOptionalString(fields[41]),
        // fields[42] - DO_Ventile
        ventile: parseOptionalString(fields[42]),
        // fields[43] - AB_No
        abNo: parseOptionalString(fields[43]),
        // fields[44] - DO_DebutAbo
        debutAbo: parseDate(fields[44]),
        // fields[45] - DO_FinAbo
        finAbo: parseDate(fields[45]),
        // fields[46] - DO_DebutPeriod
        debutPeriod: parseDate(fields[46]),
        // fields[47] - DO_FinPeriod
        finPeriod: parseDate(fields[47]),
        // fields[48] - CG_Num
        cgNum: parseOptionalString(fields[48]),
        // fields[49] - cbCG_Num
        cbCgNum: parseOptionalString(fields[49]),
        // fields[50] - DO_Statut
        statut: fields[50] ?? '',
        // fields[51] - DO_Heure
        heure: fields[51] ?? '',
        // fields[52] - CA_No
        caNo: parseOptionalString(fields[52]),
        // fields[53] - cbCA_No
        cbCaNo: parseOptionalString(fields[53]),
        // fields[54] - CO_NoCaissier
        noCaissier: parseOptionalString(fields[54]),
        // fields[55] - cbCO_NoCaissier
        cbNoCaissier: parseOptionalString(fields[55]),
        // fields[56] - DO_Transfere
        transfere: parseOptionalString(fields[56]),
        // fields[57] - DO_Cloture
        cloture: parseOptionalString(fields[57]),
        // fields[58] - DO_NoWeb
        noWeb: parseOptionalString(fields[58]),
        // fields[59] - DO_Attente
        attente: parseOptionalString(fields[59]),
        // fields[60] - DO_Provenance
        provenance: parseOptionalString(fields[60]),
        // fields[61] - CA_NumIFRS
        caNumIFRS: parseOptionalString(fields[61]),
        // fields[62] - MR_No
        mrNo: parseOptionalString(fields[62]),
        // fields[63] - DO_TypeFrais
        typeFrais: parseOptionalString(fields[63]),
        // fields[64] - DO_ValFrais
        valFrais: parseDecimal(fields[64], true),
        // fields[65] - DO_TypeLigneFrais
        typeLigneFrais: parseOptionalString(fields[65]),
        // fields[66] - DO_TypeFranco
        typeFranco: parseOptionalString(fields[66]),
        // fields[67] - DO_ValFranco
        valFranco: parseDecimal(fields[67], true),
        // fields[68] - DO_TypeLigneFranco
        typeLigneFranco: parseOptionalString(fields[68]),
        // fields[69] - DO_Taxe1
        taxe1: parseDecimal(fields[69])!,
        // fields[70] - DO_TypeTaux1
        typeTaux1: fields[70] ?? '',
        // fields[71] - DO_TypeTaxe1
        typeTaxe1: fields[71] ?? '',
        // fields[72] - DO_Taxe2
        taxe2: parseDecimal(fields[72])!,
        // fields[73] - DO_TypeTaux2
        typeTaux2: fields[73] ?? '',
        // fields[74] - DO_TypeTaxe2
        typeTaxe2: fields[74] ?? '',
        // fields[75] - DO_Taxe3
        taxe3: parseDecimal(fields[75])!,
        // fields[76] - DO_TypeTaux3
        typeTaux3: fields[76] ?? '',
        // fields[77] - DO_TypeTaxe3
        typeTaxe3: fields[77] ?? '',
        // fields[78] - DO_MajCpta
        majCpta: parseOptionalString(fields[78]),
        // fields[79] - DO_Motif
        motif: parseOptionalString(fields[79]),
        // fields[80] - CT_NumCentrale
        numCentrale: parseOptionalString(fields[80]),
        // fields[81] - cbCT_NumCentrale
        cbNumCentrale: parseOptionalString(fields[81]),
        // fields[82] - DO_Contact
        contact: parseOptionalString(fields[82]),
        // fields[83] - DO_FactureElec
        factureElec: parseOptionalString(fields[83]),
        // fields[84] - DO_TypeTransac
        typeTransac: parseOptionalString(fields[84]),
        // fields[85] - DO_DateLivrRealisee
        dateLivrRealisee: parseDate(fields[85]),
        // fields[86] - DO_DateExpedition
        dateExpedition: parseDate(fields[86]),
        // fields[87] - DO_FactureFrs
        factureFrs: parseOptionalString(fields[87]),
        // fields[88] - cbDO_FactureFrs
        cbFactureFrs: parseOptionalString(fields[88]),
        // fields[89] - DO_PieceOrig
        pieceOrig: parseOptionalString(fields[89]),
        // fields[90] - cbDO_PieceOrig
        cbPieceOrig: parseOptionalString(fields[90]),
        // fields[91] - DO_GUID (UNIQUE)
        guid: fields[91] ?? '',
        // fields[92] - DO_EStatut
        eStatut: fields[92] ?? '',
        // fields[93] - DO_DemandeRegul
        demandeRegul: parseOptionalString(fields[93]),
        // fields[94] - ET_No
        etNo: parseOptionalString(fields[94]),
        // fields[95] - cbET_No
        cbEtNo: parseOptionalString(fields[95]),
        // fields[96] - DO_Valide
        valide: parseOptionalString(fields[96]),
        // fields[97] - DO_Coffre
        coffre: parseOptionalString(fields[97]),
        // fields[98] - DO_CodeTaxe1
        codeTaxe1: fields[98] ?? '',
        // fields[99] - DO_CodeTaxe2
        codeTaxe2: fields[99] ?? '',
        // fields[100] - DO_CodeTaxe3
        codeTaxe3: fields[100] ?? '',
        // fields[101] - DO_TotalHT
        totalHT: parseDecimal(fields[101])!,
        // fields[102] - DO_StatutBAP
        statutBAP: parseOptionalString(fields[102]),
        // fields[103] - DO_Escompte
        escompte: parseDecimal(fields[103])!,
        // fields[104] - DO_DocType
        docType: fields[104] ?? '',
        // fields[105] - DO_TypeCalcul
        typeCalcul: parseOptionalString(fields[105]),
        // fields[106] - DO_FactureFile
        factureFile: parseOptionalString(fields[106]),
        // fields[107] - DO_TotalHTNet
        totalHTNet: parseDecimal(fields[107])!,
        // fields[108] - DO_TotalTTC
        totalTTC: parseDecimal(fields[108])!,
        // fields[109] - DO_NetAPayer
        netAPayer: parseDecimal(fields[109])!,
        // fields[110] - DO_MontantRegle
        montantRegle: parseDecimal(fields[110])!,
        // fields[111] - DO_RefPaiement
        refPaiement: parseOptionalString(fields[111]),
        // fields[112] - DO_AdressePaiement
        adressePaiement: parseOptionalString(fields[112]),
        // fields[113] - DO_PaiementLigne
        paiementLigne: parseOptionalString(fields[113]),
        // fields[114] - DO_MotifDevis
        motifDevis: parseOptionalString(fields[114]),
        // fields[115] - DO_Conversion
        conversion: parseOptionalString(fields[115]),
        // fields[116] - cbProt
        cbProt: parseInt(fields[116]),
        // fields[117] - cbMarq
        cbMarq: parseInt(fields[117]),
        // fields[118] - cbCreateur
        cbCreateur: fields[118] ?? '',
        // fields[119] - cbModification
        cbModification: parseDate(fields[119]) ?? new Date(),
        // fields[120] - cbReplication
        cbReplication: parseInt(fields[120]),
        // fields[121] - cbFlag
        cbFlag: parseInt(fields[121]),
        // fields[122] - cbCreation
        cbCreation: parseDate(fields[122]) ?? new Date(),
        // fields[123] - cbCreationUser
        cbCreationUser: fields[123] ?? '',
        // fields[124] - cbHash
        cbHash: parseOptionalString(fields[124]),
        // fields[125] - cbHashVersion
        cbHashVersion: fields[125] ? parseInt(fields[125]) : undefined,
        // fields[126] - cbHashDate
        cbHashDate: parseDate(fields[126]),
        // fields[127] - cbHashOrder
        cbHashOrder: fields[127] ? parseInt(fields[127]) : undefined,
        // fields[128] - BC client
        bcClient: parseOptionalString(fields[128]),
        // fields[129] - Créneau de livraison
        creneauLivraison: parseOptionalString(fields[129]),
        // fields[130] - Personne à contacter sur place
        personneContact: parseOptionalString(fields[130]),
        // fields[131] - Adresse liv° / sce à livrer
        adresseLivraison: parseOptionalString(fields[131]),
        // fields[132] - EXPE : ILE
        expeIle: parseOptionalString(fields[132]),
        // fields[133] - EXPE N° CSNT
        expeNoCsnt: parseOptionalString(fields[133]),
        // fields[134] - OBS. 1
        obs1: parseOptionalString(fields[134]),
        // fields[135] - OBS. 2
        obs2: parseOptionalString(fields[135]),
        // fields[136] - OBS. 3
        obs3: parseOptionalString(fields[136]),
        // fields[137] - OBS. 4
        obs4: parseOptionalString(fields[137]),
        // fields[138] - Cde saisie par
        cdeSaisiePar: parseOptionalString(fields[138]),
        // fields[139] - Cde transmisse par
        cdeTransmissePar: parseOptionalString(fields[139]),
        // fields[140] - Cde : mode de réception
        cdeModeReception: parseOptionalString(fields[140]),
        // fields[141] - Heure début
        heureDebut: parseOptionalString(fields[141]),
        // fields[142] - DO_TVADebit
        tvaDebit: parseOptionalString(fields[142]),
        // fields[143] - EB_No
        ebNo: parseOptionalString(fields[143]),
        // fields[144] - DO_RefExterne
        refExterne: parseOptionalString(fields[144]),
        // fields[145] - CFAR_No
        cfarNo: parseOptionalString(fields[145]),
        // fields[146] - cbCFAR_No
        cbCfarNo: parseOptionalString(fields[146]),
        // fields[147] - FAC_No
        facNo: parseOptionalString(fields[147]),
        // fields[148] - cbFAC_No
        cbFacNo: parseOptionalString(fields[148]),
        // fields[149] - DO_Exclure
        exclure: parseOptionalString(fields[149]),
        // fields[150] - DO_CodeService
        codeService: parseOptionalString(fields[150]),
      };
    });
}
