import { db } from "@/app/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export class FirebaseServices {
    static async getAllProducts() {
        try {
            const ref = collection(db, "products");
            const snapshot = await getDocs(ref);

            const products = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }

    static async getProductByStoreId(storeId: string | any) {
        try {
            const ref = collection(db, 'products');
            const snapshot = await getDocs(ref);

            const products = snapshot.docs.filter((doc) => {
                return doc.data().storeId;
            });
        } catch {

        }
    }

}
