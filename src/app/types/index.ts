export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'service' | 'rental';
  image: string;
  stock: number;
  duration?: string; // Pour les services
  rentalPeriod?: 'hour' | 'day' | 'week'; // Pour les locations
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  paymentMethod: 'stripe' | 'paypal';
}

export interface NewsletterSubscription {
  email: string;
  subscribedAt: Date;
}

export interface Promotion {
  id: string;
  code: string;
  discount: number; // percentage
  validUntil: Date;
  active: boolean;
}
