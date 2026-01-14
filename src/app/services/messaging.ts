import { collection, addDoc, query, where, getDocs, serverTimestamp, } from "firebase/firestore";
import { db } from "@/app/config/firebase";

// create or get conversation
export const getOrCreateConversation = async (
    product: any,
    buyerId: string
) => {
    const q = query(
        collection(db, "conversations"),
        where("productId", "==", product.id),
        where("buyerId", "==", buyerId)
    );

    const snap = await getDocs(q);
    if (!snap.empty) return snap.docs[0].id;

    const docRef = await addDoc(collection(db, "conversations"), {
        productId: product.id,
        productTitle: product.title || product.name || "Untitled Product",
        productPrice: product.price ?? 0,
        buyerId,
        sellerId: product.ownerId || "admin",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return docRef.id;
};


// send message
export const sendMessage = async (conversationId: string, senderId: string, text: string) => {
    await addDoc(
        collection(db, `conversations/${conversationId}/messages`),
        {
            senderId,
            text,
            createdAt: serverTimestamp(),
        }
    );
};
