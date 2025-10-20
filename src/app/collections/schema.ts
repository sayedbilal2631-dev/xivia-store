import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface Store {
  id?: string;
  ownerId: string;
  storeName: string;
  description: string;
  category: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  seo?: {
    title: string;
    description: string;
  };
  contactInfo?: {
    phone: string;
    email: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  isVerified?: boolean;
}


// Store Categories
export type StoreCategory =
  | 'electronics'
  | 'fashion'
  | 'home-garden'
  | 'beauty-health'
  | 'sports-outdoors'
  | 'food-grocery'
  | 'books-media'
  | 'toys-games'
  | 'automotive'
  | 'other';

// Store Status Types
export type StoreStatus = 'active' | 'inactive' | 'suspended' | 'pending';

// Business Hours Default
export const defaultBusinessHours = {
  monday: { open: '09:00', close: '17:00', isClosed: false },
  tuesday: { open: '09:00', close: '17:00', isClosed: false },
  wednesday: { open: '09:00', close: '17:00', isClosed: false },
  thursday: { open: '09:00', close: '17:00', isClosed: false },
  friday: { open: '09:00', close: '17:00', isClosed: false },
  saturday: { open: '10:00', close: '16:00', isClosed: false },
  sunday: { open: '00:00', close: '00:00', isClosed: true }
};

// Store Form Data
export interface StoreFormData {
  storeName: string;
  description: string;
  category: StoreCategory;

  // Contact
  email: string;
  phone: string;
  website?: string;

  // Address
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  // Business Hours
  // businessHours: Store['businessHours'];

  // Settings
  settings: {
    allowReturns: boolean;
    returnPeriod: number;
    minimumOrder: number;
    freeShippingThreshold: number;
  };

  // Social Media
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

// User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'store_owner' | 'admin';
  avatar?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Product Categories
export type ProductCategory =
  | 'electronics'
  | 'clothing'
  | 'home-kitchen'
  | 'beauty'
  | 'sports-fitness'
  | 'books'
  | 'toys-games'
  | 'automotive'
  | 'food-beverages'
  | 'health-wellness'
  | 'jewelry-accessories'
  | 'pet-supplies'
  | 'office-supplies'
  | 'baby-products'
  | 'garden-outdoor';

// Product Status
export type ProductStatus = 'active' | 'inactive' | 'out-of-stock' | 'discontinued';

// Product Interface
export interface Product {
  id: string;
  storeId: DocumentReference; // Reference to stores collection
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number; // Original price for sales
  costPrice?: number; // Cost for profit calculation
  category: ProductCategory;
  subcategory?: string;
  tags: string[];
  sku: string;
  barcode?: string;
  
  // Inventory
  stock: number;
  lowStockAlert: number;
  trackQuantity: boolean;
  allowBackorders: boolean;
  
  // Shipping
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  
  // Media
  images: string[];
  primaryImage: string;
  
  // Variants
  hasVariants: boolean;
  variants?: ProductVariant[];
  
  // SEO
  seo: {
    title?: string;
    description?: string;
    slug: string;
  };
  
  // Status
  status: ProductStatus;
  isFeatured: boolean;
  
  // Analytics
  metrics: {
    viewCount: number;
    purchaseCount: number;
    averageRating: number;
    reviewCount: number;
  };
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
}

// Product Variant
export interface ProductVariant {
  id: string;
  name: string;
  options: {
    [key: string]: string; // size: 'XL', color: 'Red'
  };
  price: number;
  comparePrice?: number;
  sku: string;
  stock: number;
  images?: string[];
}

// Order Status Types
export type OrderStatus =
  | 'pending'           // Order placed, payment pending
  | 'confirmed'         // Payment confirmed
  | 'processing'        // Order being prepared
  | 'ready-for-shipment' // Ready for shipping
  | 'shipped'          // Shipped to customer
  | 'out-for-delivery' // With delivery agent
  | 'delivered'        // Successfully delivered
  | 'cancelled'        // Order cancelled
  | 'refunded'         // Order refunded
  | 'failed'           // Delivery failed
  | 'on-hold';         // Order on hold

// Payment Status
export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

// Payment Method
export type PaymentMethod =
  | 'credit-card'
  | 'debit-card'
  | 'paypal'
  | 'stripe'
  | 'apple-pay'
  | 'google-pay'
  | 'bank-transfer'
  | 'cash-on-delivery';

// Shipping Method
export interface ShippingMethod {
  id: string;
  name: string;
  cost: number;
  estimatedDays: {
    min: number;
    max: number;
  };
  description?: string;
}

// Order Item
export interface OrderItem {
  productId: DocumentReference;
  variantId?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
  attributes?: {
    [key: string]: string; // size, color, etc.
  };
}

// Order Interface
export interface Order {
  id: string;
  orderNumber: string; // Unique human-readable order number
  storeId: DocumentReference;
  customerId: DocumentReference;
  
  // Order Details
  items: OrderItem[];
  total: number;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  
  // Status
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  
  // Payment
  paymentMethod: PaymentMethod;
  paymentId?: string; // Payment gateway reference
  paidAt?: Timestamp;
  
  // Shipping
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  billingAddress?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  shippingMethod: ShippingMethod;
  trackingNumber?: string;
  shippedAt?: Timestamp;
  deliveredAt?: Timestamp;
  
  // Customer Notes
  customerNotes?: string;
  adminNotes?: string;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  cancelledAt?: Timestamp;
  refundedAt?: Timestamp;
}

// Order History Entry
export interface OrderHistory {
  id: string;
  orderId: DocumentReference;
  status: OrderStatus;
  description: string;
  createdAt: Timestamp;
  createdBy: DocumentReference; // User who made the change
}

// Cart Item
export interface CartItem {
  productId: DocumentReference;
  variantId?: string;
  quantity: number;
  addedAt: Timestamp;
}

// Shopping Cart
export interface Cart {
  id: string;
  userId: DocumentReference;
  items: CartItem[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Default Order Status Flow
export const defaultOrderStatusFlow: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'ready-for-shipment',
  'shipped',
  'out-for-delivery',
  'delivered'
];

// Order Status Labels
export const orderStatusLabels: Record<OrderStatus, string> = {
  'pending': 'Pending',
  'confirmed': 'Confirmed',
  'processing': 'Processing',
  'ready-for-shipment': 'Ready for Shipment',
  'shipped': 'Shipped',
  'out-for-delivery': 'Out for Delivery',
  'delivered': 'Delivered',
  'cancelled': 'Cancelled',
  'refunded': 'Refunded',
  'failed': 'Failed',
  'on-hold': 'On Hold'
};

// Payment Status Labels
export const paymentStatusLabels: Record<PaymentStatus, string> = {
  'pending': 'Pending',
  'processing': 'Processing',
  'completed': 'Completed',
  'failed': 'Failed',
  'refunded': 'Refunded',
  'cancelled': 'Cancelled'
};