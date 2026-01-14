import { StoreCategory } from '@/app/collections/store';
import {
  Dashboard,
  MailOutline,
  ShoppingCart,
  Payments,
  BookmarkBorder,
  LocalShipping,
  Layers,
  Settings,
} from "@mui/icons-material";
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


export const sidebarSections = [
  {
    title: "Online trading",
    items: [
      { label: "Dashboard", href: "/store", icon: Dashboard },
      { label: "Messages", href: "/store/pages/messages", icon: MailOutline },
      { label: "Orders", href: "/store/pages/orders", icon: ShoppingCart },
      { label: "Payment", href: "/store/pages/payment", icon: Payments },
      { label: "Saved & history", href: "/store/pages/saved", icon: BookmarkBorder },
    ],
  },
  // {
  //   title: "Add-on services",
  //   items: [
  //     { label: "Logistics services", href: "/store/pages/logistics", icon: LocalShipping },
  //     { label: "Dropshipping", href: "/store/pages/dropshipping", icon: Layers },
  //   ],
  // },
  {
    title: "Settings",
    items: [
      { label: "Account settings", href: "/store/pages/settings", icon: Settings },
    ],
  },
];
