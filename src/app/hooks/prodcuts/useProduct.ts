import { db } from "@/app/config/firebase";
import { Product } from "@/app/types/product";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where, Query, DocumentData, } from "firebase/firestore";

export const useProducts = (category: string | null, search: string) => {
    return useQuery({
        queryKey: ["products", category, search],

        queryFn: async (): Promise<Product[]> => {
            let q: Query<DocumentData> = collection(db, "products");

            if (category && category !== "all") {
                q = query(q, where("category", "==", category));
            }

            const snapshot = await getDocs(q);

            let products: Product[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Product, "id">),
            }));

            if (search.trim().length >= 2) {
                const searchText = search.toLowerCase();

                products = products.filter((product) =>
                    product.name?.toLowerCase().includes(searchText)
                );
            }

            return products;
        },

        enabled: search.length === 0 || search.length >= 2,
    });
};
