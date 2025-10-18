import { StoreCategory } from '@/app/collections/store';

export const STORE_CATEGORIES = [
  { value: 'fashion' as StoreCategory, label: 'Fashion & Apparel' },
  { value: 'electronics' as StoreCategory, label: 'Electronics' },
  { value: 'food' as StoreCategory, label: 'Food & Beverages' },
  { value: 'home-garden' as StoreCategory, label: 'Home & Garden' },
  { value: 'beauty' as StoreCategory, label: 'Beauty & Cosmetics' },
  { value: 'sports' as StoreCategory, label: 'Sports & Outdoors' },
  { value: 'books' as StoreCategory, label: 'Books & Media' },
  { value: 'toys' as StoreCategory, label: 'Toys & Games' },
  { value: 'health' as StoreCategory, label: 'Health & Wellness' },
  { value: 'other' as StoreCategory, label: 'Other' },
];

export const IMAGE_UPLOAD_CONFIG = {
  MAX_STORE_IMAGES: 10,
  LOGO_RECOMMENDED_SIZE: '200x200px',
  BANNER_RECOMMENDED_SIZE: '1200x300px',
  STORE_IMAGES_RECOMMENDED_SIZE: '800x600px',
};