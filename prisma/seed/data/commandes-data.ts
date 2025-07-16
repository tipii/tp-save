export interface CommandeSeedData {
  id: string;
  ref: string;
  clientId: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  priority: string;
}

export const commandesData: CommandeSeedData[] = [
  {
    id: '1',
    ref: 'FA256988',
    clientId: '1', // Tahiti Import Export
    items: [
      { name: 'Dégraissant industriel concentrate', quantity: 12 },
      { name: 'Nettoyant multi-surface professionnel', quantity: 8 },
      { name: 'Détergent désinfectant hospitalier', quantity: 15 },
      { name: 'Nettoyant sol industriel', quantity: 6 },
      { name: 'Dégraissant cuisine alimentaire', quantity: 10 },
    ],
    priority: 'Urgent',
  },
  {
    id: '2',
    ref: 'FA256989',
    clientId: '2', // Moorea Fruits Tropicaux
    items: [
      { name: 'Nettoyant vitres professionnel', quantity: 4 },
      { name: 'Dégraissant alimentaire BIO', quantity: 8 },
      { name: 'Détergent lessive liquide', quantity: 6 },
    ],
    priority: 'Normal',
  },
  {
    id: '3',
    ref: 'FA256990',
    clientId: '3', // Bora Bora Luxury Hotels
    items: [
      { name: 'Nettoyant sanitaire luxury', quantity: 20 },
      { name: 'Dégraissant inox premium', quantity: 15 },
      { name: 'Produit de rinçage automatique', quantity: 10 },
      { name: 'Nettoyant moquette professionnel', quantity: 12 },
      { name: 'Détergent lave-vaisselle industriel', quantity: 8 },
      { name: 'Nettoyant piscine chloré', quantity: 25 },
    ],
    priority: 'Urgent',
  },
  {
    id: '4',
    ref: 'FA256991',
    clientId: '4', // Pharmacie Centrale Papeete
    items: [
      { name: 'Détergent désinfectant médical', quantity: 18 },
      { name: 'Nettoyant surface stérilisé', quantity: 12 },
      { name: 'Produit détartrant pharmaceutique', quantity: 6 },
      { name: 'Dégraissant laboratoire', quantity: 4 },
    ],
    priority: 'Îles',
  },
  {
    id: '5',
    ref: 'FA256992',
    clientId: '5', // Huahine Vanilla Coopérative
    items: [
      { name: 'Nettoyant cuve inox alimentaire', quantity: 10 },
      { name: 'Dégraissant vanille naturel', quantity: 8 },
      { name: 'Détergent équipement agricole', quantity: 6 },
      { name: 'Nettoyant haute pression', quantity: 4 },
      { name: 'Produit rinçage alimentaire', quantity: 12 },
    ],
    priority: 'Normal',
  },
  {
    id: '6',
    ref: 'FA256993',
    clientId: '6', // Raiatea Construction
    items: [
      { name: 'Nettoyant béton industriel', quantity: 25 },
      { name: 'Dégraissant moteur heavy duty', quantity: 15 },
    ],
    priority: 'Urgent',
  },
  {
    id: '7',
    ref: 'FA256994',
    clientId: '7', // Tahaa Perles Noires
    items: [
      { name: 'Nettoyant bijouterie délicat', quantity: 6 },
      { name: 'Détergent ultrasonic premium', quantity: 4 },
      { name: 'Produit polissage perles', quantity: 8 },
      { name: 'Nettoyant précision optique', quantity: 3 },
    ],
    priority: 'Îles',
  },
  {
    id: '8',
    ref: 'FA256995',
    clientId: '8', // Maupiti Fisheries
    items: [
      { name: 'Dégraissant poisson industriel', quantity: 20 },
      { name: 'Nettoyant chambre froide', quantity: 12 },
      { name: 'Détergent alimentaire marine', quantity: 8 },
    ],
    priority: 'Normal',
  },
  {
    id: '9',
    ref: 'FA256996',
    clientId: '9', // Tikehau Coprah Trading
    items: [
      { name: 'Nettoyant huile végétale', quantity: 15 },
      { name: 'Dégraissant coprah concentrate', quantity: 10 },
      { name: 'Détergent pressoir industriel', quantity: 8 },
      { name: 'Nettoyant réservoir alimentaire', quantity: 6 },
    ],
    priority: 'Urgent',
  },
  {
    id: '10',
    ref: 'FA256997',
    clientId: '10', // Fakarava Diving Center
    items: [
      { name: 'Nettoyant équipement plongée', quantity: 12 },
      { name: 'Détergent combinaison néoprène', quantity: 8 },
      { name: 'Produit rinçage eau salée', quantity: 15 },
      { name: 'Nettoyant masque tuba', quantity: 20 },
      { name: 'Dégraissant détendeur spécialisé', quantity: 5 },
    ],
    priority: 'Normal',
  },
];

export default commandesData;
