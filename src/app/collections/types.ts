import { Timestamp } from 'firebase/firestore';

export type StoreCategory =
  | 'fashion'
  | 'electronics'
  | 'food'
  | 'home-garden'
  | 'beauty'
  | 'sports'
  | 'books'
  | 'toys'
  | 'health'
  | 'other';

export interface StoreMetrics {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  reviewCount: number;
}

export interface Store {
  id: string;
  storeName: string;
  description: string;
  category: StoreCategory;
  ownerId: string;
  isActive: boolean;
  isVerified: boolean;
  contactInfo: {
    email: string;
    phone?: string;
  };
  metrics: StoreMetrics;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
export interface Order {
  id: string;
  product: string;
  customer: string;
  date: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
}

export interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories?: string[];
}

export interface NavItem {
  id: string;
  name: string;
  categories: Category[];
  featuredItems?: string[];
}