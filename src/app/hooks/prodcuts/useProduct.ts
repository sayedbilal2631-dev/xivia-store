import { db } from "@/app/config/firebase";
import { Product } from "@/app/types/product";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where, orderBy, startAt, endAt, } from "firebase/firestore";

export const useProducts = (
    category: string | null,
    search: string
) => {
    return useQuery({
        queryKey: ["products", category, search],

        queryFn: async (): Promise<Product[]> => {
            let q: any = collection(db, "products");

            if (category) {
                q = query(q, where("category", "==", category));
            }

            if (search) {
                q = query(
                    q,
                    orderBy("name"),
                    startAt(search),
                    endAt(search + "\uf8ff")
                );
            }

            const snapshot = await getDocs(q);

            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Product, "id">),
            }));
        },

        enabled: search.length === 0 || search.length >= 2,
    });
};
