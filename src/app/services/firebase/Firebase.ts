import { collection, getDocs, query, where } from "firebase/firestore";
import { Product } from "@/app/collections/schema";
import { db } from "@/app/config/firebase";

export class FirebaseServices {
    static async getAllProducts() {
        try {
            const ref = collection(db, "products");
            const snapshot = await getDocs(ref);

            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }) as Product);
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }

    static async getProductByStoreId(storeId: string) {
        try {
            const ref = query(collection(db, "products"), where("storeId", "==", storeId));
            const snapshot = await getDocs(ref);

            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            console.error("Error fetching products by storeId:", error);
            throw error;
        }
    }
}
