export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPercentage: number;
    category: string;
    brand?: string;
    rating: number;
    stock: number;
    thumbnail: string;
    images: string[];
    storeId: string;
}
