import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { Product } from "@/app/types/product";

export const getProductById = async (id: string): Promise<Product | null> => {
    const ref = doc(db, "products", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return { id: snap.id, ...snap.data() } as Product;
};
