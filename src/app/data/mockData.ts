import { Product, Order, Promotion } from '../types';

export const mockProducts: Product[] = [
  // Services de garage
  {
    id: 'srv-1',
    name: 'Vidange Complète',
    description: 'Vidange moteur avec filtre à huile et contrôle général. Huile synthétique premium incluse.',
    price: 79.99,
    category: 'service',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    stock: 100,
    duration: '45 min'
  },
  {
    id: 'srv-2',
    name: 'Révision Complète',
    description: 'Révision complète du véhicule avec contrôle de tous les points essentiels et remplacement des consommables.',
    price: 249.99,
    category: 'service',
    image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800',
    stock: 100,
    duration: '2h30'
  },
  {
    id: 'srv-3',
    name: 'Changement Plaquettes de Frein',
    description: 'Remplacement des plaquettes de frein avant ou arrière avec contrôle du système de freinage.',
    price: 159.99,
    category: 'service',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800',
    stock: 100,
    duration: '1h30'
  },
  {
    id: 'srv-4',
    name: 'Géométrie et Parallélisme',
    description: 'Réglage de la géométrie et du parallélisme pour une tenue de route optimale.',
    price: 89.99,
    category: 'service',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800',
    stock: 100,
    duration: '1h'
  },
  {
    id: 'srv-5',
    name: 'Diagnostic Électronique',
    description: 'Diagnostic complet du véhicule avec analyse des codes défauts et rapport détaillé.',
    price: 59.99,
    category: 'service',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    stock: 100,
    duration: '30 min'
  },
  {
    id: 'srv-6',
    name: 'Climatisation - Recharge',
    description: 'Recharge complète du système de climatisation avec contrôle d\'étanchéité.',
    price: 99.99,
    category: 'service',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    stock: 100,
    duration: '45 min'
  },

  // Location d'outils
  {
    id: 'rent-1',
    name: 'Pont Élévateur Mobile',
    description: 'Pont élévateur mobile professionnel, capacité 3 tonnes. Idéal pour travaux sous le véhicule.',
    price: 89.99,
    category: 'rental',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
    stock: 3,
    rentalPeriod: 'day'
  },
  {
    id: 'rent-2',
    name: 'Compresseur Professionnel',
    description: 'Compresseur d\'air 200L, 3CV. Parfait pour tous vos travaux de pneumatique et peinture.',
    price: 45.99,
    category: 'rental',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
    stock: 5,
    rentalPeriod: 'day'
  },
  {
    id: 'rent-3',
    name: 'Valise Diagnostic OBD',
    description: 'Valise de diagnostic professionnelle multi-marques avec tablette tactile.',
    price: 29.99,
    category: 'rental',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    stock: 4,
    rentalPeriod: 'day'
  },
  {
    id: 'rent-4',
    name: 'Démonte-pneu Automatique',
    description: 'Machine à démonte-pneu professionnelle automatique pour jantes jusqu\'à 24 pouces.',
    price: 69.99,
    category: 'rental',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    stock: 2,
    rentalPeriod: 'day'
  },
  {
    id: 'rent-5',
    name: 'Équilibreuse de Roues',
    description: 'Équilibreuse électronique de précision pour un équilibrage parfait des roues.',
    price: 59.99,
    category: 'rental',
    image: 'https://images.unsplash.com/photo-1563920443079-783e5c786b83?w=800',
    stock: 2,
    rentalPeriod: 'day'
  },
  {
    id: 'rent-6',
    name: 'Coffre à Outils Complet',
    description: 'Coffre à outils professionnel avec plus de 200 pièces. Clés, douilles, tournevis, etc.',
    price: 39.99,
    category: 'rental',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800',
    stock: 8,
    rentalPeriod: 'day'
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user-1',
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[6], quantity: 2 }
    ],
    total: 259.97,
    status: 'completed',
    createdAt: new Date('2025-01-15'),
    paymentMethod: 'stripe'
  },
  {
    id: 'ORD-002',
    userId: 'user-2',
    items: [
      { product: mockProducts[1], quantity: 1 }
    ],
    total: 249.99,
    status: 'processing',
    createdAt: new Date('2025-01-18'),
    paymentMethod: 'paypal'
  },
  {
    id: 'ORD-003',
    userId: 'user-3',
    items: [
      { product: mockProducts[2], quantity: 1 },
      { product: mockProducts[8], quantity: 1 }
    ],
    total: 189.98,
    status: 'pending',
    createdAt: new Date('2025-01-19'),
    paymentMethod: 'stripe'
  },
];

export const mockPromotions: Promotion[] = [
  {
    id: 'promo-1',
    code: 'VWBLUE',
    discount: 15,
    validUntil: new Date('2025-03-31'),
    active: true
  },
  {
    id: 'promo-2',
    code: 'WINTER25',
    discount: 20,
    validUntil: new Date('2025-02-28'),
    active: true
  },
  {
    id: 'promo-3',
    code: 'CLASSIC',
    discount: 10,
    validUntil: new Date('2025-12-31'),
    active: true
  }
];

// Mock user pour démonstration
export const mockUsers = [
  {
    id: 'user-1',
    email: 'client@example.com',
    password: 'client123',
    name: 'Jean Dupont',
    role: 'client' as const
  },
  {
    id: 'admin-1',
    email: 'admin@garage-vw.com',
    password: 'admin123',
    name: 'Administrateur',
    role: 'admin' as const
  }
];
