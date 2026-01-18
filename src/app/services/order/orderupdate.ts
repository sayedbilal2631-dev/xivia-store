import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { OrderStatus } from "@/app/collections/store";

export const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus
) => {
    await updateDoc(doc(db, "orders", orderId), {
        status,
    });
};
