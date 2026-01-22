import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/app/config/firebase";

// Get completed / paid orders (History) — NO INDEX REQUIRED
export const getSellerHistory = async (storeId: string) => {
    const q = query(
        collection(db, "orders"),
        where("storeId", "==", storeId) // only ONE filter
    );

    const snap = await getDocs(q);

    // Client-side filtering + sorting
    const data = snap.docs
        .map(doc => ({ ...doc.data() }))
        .filter(order => order.paymentStatus === "paid")
        .sort((a: any, b: any) => {
            return b.createdAt?.toMillis() - a.createdAt?.toMillis();
        });

    return data;
};

// Get saved items — NO INDEX REQUIRED
export const getSellerSaved = async (storeId: string) => {
    const q = query(
        collection(db, "sellerSaved"),
        where("storeId", "==", storeId) // only ONE filter
    );

    const snap = await getDocs(q);

    // Client-side sorting
    const data = snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a: any, b: any) => {
            return b.createdAt?.toMillis() - a.createdAt?.toMillis();
        });

    return data;
};
