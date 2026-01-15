import { db } from "@/app/config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

// Send a new message
export const sendMessage = async (
  conversationId: string,
  senderId: string,
  receiverId: string,
  message: string
) => {
  const messagesRef = collection(db, "messages");
  await addDoc(messagesRef, {
    conversationId,
    senderId,
    receiverId,
    message,
    timestamp: new Date(),
    read: false,
  });
};

export const listenMessages = (
  conversationId: string,
  callback: (messages: any[]) => void
) => {
  const q = query(
    collection(db, "messages"),
    where("conversationId", "==", conversationId),
    orderBy("timestamp", "asc")
  );
  return onSnapshot(q, (snapshot) => {
    const messages: any[] = [];
    snapshot.forEach((doc) => messages.push({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};

// Mark all messages as read for a user
export const markMessagesAsRead = async (
  conversationId: string,
  userId: string
) => {
  const q = query(
    collection(db, "messages"),
    where("conversationId", "==", conversationId),
    where("receiverId", "==", userId)
  );
  const snapshot = await getDocs(q);
  snapshot.forEach(async (docSnap) => {
    await updateDoc(docSnap.ref, { read: true });
  });
};

/**
 * Get or create a unique conversation for a product and buyer
 * @param product Product object
 * @param buyerId User ID of the buyer
 * @returns conversationId (string)
 */
export const getOrCreateConversation = async (
  product: any,
  buyerId: string
) => {
  const conversationsRef = collection(db, "conversations");

  // Generate a unique conversation key: productId + buyerId + sellerId
  const conversationKey = `${product.id}_${buyerId}_${product.sellerId}`;

  // Check if conversation already exists
  const q = query(
    conversationsRef,
    where("key", "==", conversationKey)
  );
  const existing = await getDocs(q);

  if (!existing.empty) {
    // Return the first existing conversation ID
    return existing.docs[0].id;
  }

  // If not exists, create a new conversation
  const newConversation = await addDoc(conversationsRef, {
    key: conversationKey,
    productId: product.id,
    productTitle: product.title,
    buyerId,
    sellerId: product.sellerId,
    createdAt: new Date(),
  });

  return newConversation.id;
};
