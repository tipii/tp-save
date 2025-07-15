export interface CommandeSeedData {
  id: string;
  ref: string;
  clientId: string;
  items: number;
  priority: string;
}

export const commandesData: CommandeSeedData[] = [
  {
    id: '1',
    ref: 'FA256988',
    clientId: '1', // Tahiti Import Export
    items: 7,
    priority: 'Urgent',
  },
  {
    id: '2',
    ref: 'FA256989',
    clientId: '2', // Moorea Fruits Tropicaux
    items: 3,
    priority: 'Normal',
  },
  {
    id: '3',
    ref: 'FA256990',
    clientId: '3', // Bora Bora Luxury Hotels
    items: 12,
    priority: 'Urgent',
  },
  {
    id: '4',
    ref: 'FA256991',
    clientId: '4', // Pharmacie Centrale Papeete
    items: 5,
    priority: 'Îles',
  },
  {
    id: '5',
    ref: 'FA256992',
    clientId: '5', // Huahine Vanilla Coopérative
    items: 9,
    priority: 'Normal',
  },
  {
    id: '6',
    ref: 'FA256993',
    clientId: '6', // Raiatea Construction
    items: 2,
    priority: 'Urgent',
  },
  {
    id: '7',
    ref: 'FA256994',
    clientId: '7', // Tahaa Perles Noires
    items: 8,
    priority: 'Îles',
  },
  {
    id: '8',
    ref: 'FA256995',
    clientId: '8', // Maupiti Fisheries
    items: 4,
    priority: 'Normal',
  },
  {
    id: '9',
    ref: 'FA256996',
    clientId: '9', // Tikehau Coprah Trading
    items: 6,
    priority: 'Urgent',
  },
  {
    id: '10',
    ref: 'FA256997',
    clientId: '10', // Fakarava Diving Center
    items: 10,
    priority: 'Normal',
  },
];

export default commandesData;
