import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/config/firebase";

// Place a new order
export const placeOrder = async (orderData: {
    buyerId: string;
    sellerId: string;
    productId: string;
    productName: string;
    productImage: string;
    amount: number;
}) => {
    const ordersRef = collection(db, "orders");
    const docRef = await addDoc(ordersRef, {
        ...orderData,
        status: "pending",
        timestamp: serverTimestamp(),
    });
    return docRef.id;
};

// Fetch orders for buyer
export const getOrders = async (userUid: string) => {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("storeId", "==", userUid));
    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    orders.sort((a: any, b: any) => {
        const aTime = a.timestamp?.sec || 0;
        const bTime = b.timestamp?.sec || 0;
        return bTime - aTime;
    })
    return orders;
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: "pending" | "shipped" | "delivered") => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status });
};
