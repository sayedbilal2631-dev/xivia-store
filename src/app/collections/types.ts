import { Timestamp } from 'firebase/firestore';
import { Product } from './schema';

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

export interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  color: string;
}

export interface MUITextFieldProps {
  label: string;
  type?: "text" | "password" | "email" | "number";
  value: string | undefined | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  margin?: "none" | "dense" | "normal";
  select?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

export interface MUIModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export interface AuthButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: any;
  type?: "button" | "submit";
  variant?: "contained" | "outlined";
  loading?: boolean;
  disabled?: boolean;
  color?: string;
  width?: number | string
}

export interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export interface MUIButtonProps {
  children: React.ReactNode;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | any;
  isLoading?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  width?: number
  bgColor?: any
  buttonType?: any
  height?: any
}


export type ProductFormData = Omit<
  Product,
  | "id"
  | "metrics"
  | "variants"
  | "createdAt"
  | "updatedAt"
  | "publishedAt"
  | "storeId"
>;

export const defaultValues: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  costPrice: 0,
  category: "other" as any,
  tags: [],
  sku: "",
  barcode: "",
  stock: 0,
  trackQuantity: true,
  allowBackorders: false,
  weight: 0,
  dimensions: { length: 0, width: 0, height: 0 },
  images: [],
  primaryImage: "",
  hasVariants: false,
  seo: { title: "", description: "", slug: "" },
  status: "draft" as any,
  isFeatured: false,
};

