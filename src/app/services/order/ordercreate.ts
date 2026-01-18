
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/config/firebase";

interface CreateOrderParams {
    buyerId: string;
    storeId: string;
    product: {
        id: string;
        title: string;
        thumbnail: string;
        price: number;
    };
    quantity: number;
}

export const createOrder = async ({
    buyerId,
    storeId,
    product,
    quantity,
}: CreateOrderParams) => {
    const orderRef = await addDoc(collection(db, "orders"), {
        buyerId,
        storeId,
        productId: product.id,
        productTitle: product.title,
        productImage: product.thumbnail || '',
        quantity,
        price: product.price,
        totalAmount: product.price * quantity,
        status: "pending",
        createdAt: serverTimestamp(),
    });

    // Notification for store owner
    await addDoc(collection(db, "notifications"), {
        userId: storeId,
        type: "order",
        message: "You have a new order",
        orderId: orderRef.id,
        isRead: false,
        createdAt: serverTimestamp(),
    });
};
