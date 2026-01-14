'use client';
import { FirebaseServices } from '@/app/services/firebase/Firebase';
import { Product } from '@/app/collections/schema';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: FirebaseServices.getAllProducts,
        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false, 
    });
};
