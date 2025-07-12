export interface UserSeedData {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  role?: string;
  banned?: boolean;
  banReason?: string;
  banExpires?: Date;
  username?: string;
  displayUsername?: string;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  // Additional field for Better Auth integration (not in schema)
  password?: string;
}

export const usersData: UserSeedData[] = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    emailVerified: true,
    role: 'admin',
    phoneNumber: '+1234567890',
    phoneNumberVerified: true,
    username: 'admin',
    displayUsername: 'Admin',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    password: 'admin123456',
  },
  {
    name: 'Marie Dubois',
    email: 'marie.dubois@example.com',
    emailVerified: true,
    role: 'secretaire',
    phoneNumber: '+1234567891',
    phoneNumberVerified: true,
    username: 'mariedubois',
    displayUsername: 'Marie D.',
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z'),
    password: 'secretaire123456',
  },
  {
    name: 'Pierre Martin',
    email: 'pierre.martin@example.com',
    emailVerified: true,
    role: 'commerciaux',
    phoneNumber: '+1234567892',
    phoneNumberVerified: false,
    username: 'pierremartin',
    displayUsername: 'Pierre M.',
    createdAt: new Date('2024-01-03T00:00:00Z'),
    updatedAt: new Date('2024-01-03T00:00:00Z'),
    password: 'commerciaux123456',
    image: 'https://example.com/avatars/pierre.jpg',
  },
  {
    name: 'Jean Technicien',
    email: 'jean.technicien@example.com',
    emailVerified: false,
    role: 'technicien',
    phoneNumber: '+1234567893',
    phoneNumberVerified: false,
    username: 'jeantechnicien',
    displayUsername: 'Jean T.',
    createdAt: new Date('2024-01-04T00:00:00Z'),
    updatedAt: new Date('2024-01-04T00:00:00Z'),
    password: 'technicien123456',
  },
  {
    name: 'Sophie Depot',
    email: 'sophie.depot@example.com',
    emailVerified: true,
    role: 'depot',
    phoneNumber: '+1234567894',
    phoneNumberVerified: true,
    username: 'sophiedepot',
    displayUsername: 'Sophie D.',
    createdAt: new Date('2024-01-05T00:00:00Z'),
    updatedAt: new Date('2024-01-05T00:00:00Z'),
    password: 'depot123456',
    image: 'https://example.com/avatars/sophie.jpg',
  },
  {
    name: 'Marc Livreur',
    email: 'marc.livreur@example.com',
    emailVerified: true,
    role: 'livreur',
    phoneNumber: '+1234567895',
    phoneNumberVerified: true,
    username: 'marclivreur',
    displayUsername: 'Marc L.',
    createdAt: new Date('2024-01-06T00:00:00Z'),
    updatedAt: new Date('2024-01-06T00:00:00Z'),
    password: 'livreur123456',
  },
  {
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    role: 'commerciaux',
    username: 'testuser',
    displayUsername: 'Test',
    createdAt: new Date('2024-01-07T00:00:00Z'),
    updatedAt: new Date('2024-01-07T00:00:00Z'),
    password: 'test123456',
  },
];

export default usersData;
