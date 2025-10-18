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

export interface CreateStoreFormProps {
  userId: string;
  userEmail: string;
}

export interface ImageFiles {
  logo: File | null;
  banner: File | null;
  images: File[];
}

export interface ImagePreviews {
  logo: string;
  banner: string;
  images: string[];
}

export interface StoreFormData {
  storeName: string;
  description: string;
  category: StoreCategory;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface StoreAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface StoreContactInfo {
  email: string;
  phone: string;
}

export interface StoreMedia {
  logo: string;
  banner: string;
  images: string[];
}

export interface StoreSettings {
  notifications?: boolean;
  currency?: string;
  [key: string]: any;
}

export interface CreateStoreData {
  storeName: string;
  description: string;
  category: StoreCategory;
  ownerId: string;
  isActive: boolean;
  isVerified: boolean;
  phone: string;
  email: string;
  id?: string;
  settings: StoreSettings;
  contactInfo: StoreContactInfo;
  address: StoreAddress;
  media: StoreMedia;
  createdAt?: Date;
  updatedAt?: Date;
}