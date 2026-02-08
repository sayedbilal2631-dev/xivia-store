import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot, updateDoc, serverTimestamp, } from "firebase/firestore";
import { db } from "@/app/config/firebase";


export const sendMessage = async (
  conversationId: string,
  senderId: string,
  receiverId: string,
  message: string
) => {
  const messagesRef = collection(db, "conversations", conversationId, "messages");

  await addDoc(messagesRef, {
    senderId,
    receiverId,
    message,
    timestamp: serverTimestamp(),
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

/**
 * Mark messages as read for current user
 */
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
 * Get or create a conversation between buyer and seller for a product
 * Sends initial message automatically
 */
export const getOrCreateConversation = async (
  product: any,
  buyerId: string
) => {
  const conversationsRef = collection(db, "conversations");
  const conversationKey = `${product.id}_${buyerId}_${product.storeId}`;

  // Check if conversation exists
  const q = query(conversationsRef, where("key", "==", conversationKey));
  const existing = await getDocs(q);

  let conversationId: string;

  if (!existing.empty) {
    conversationId = existing.docs[0].id;
  } else {
    // Create new conversation
    const newConversation = await addDoc(conversationsRef, {
      key: conversationKey,
      productId: product.id,
      productTitle: product.name,
      buyerId: buyerId,
      sellerId: product.storeId,
      members: [buyerId, product.storeId],
      createdAt: serverTimestamp(),
    });
    conversationId = newConversation.id;

    const messagesRef = collection(db, "conversations", conversationId, "messages");

    // Add initial message
    await addDoc(messagesRef, {
      conversationId,
      senderId: buyerId,
      receiverId: product.storeId,
      message: `Hi, I’m interested in buying ${product.name}`,
      timestamp: serverTimestamp(),
      read: false,
    });
  }

  return conversationId;
};

