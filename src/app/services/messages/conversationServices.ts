import { db } from '@/app/config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const listenUserConversations = (userId: string, callback: (conversations: any[]) => void) => {
  const q = query(collection(db, 'messages'), where('receiverId', '==', userId));

  const unsubscribe = onSnapshot(q, snapshot => {
    const convMap: { [key: string]: any } = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      const conversationId = data.conversationId;
      if (!convMap[conversationId]) {
        convMap[conversationId] = {
          conversationId,
          lastMessage: data.message,
          timestamp: data.timestamp,
          unread: data.read ? 0 : 1,
          otherUserId: data.senderId
        };
      } else {
        convMap[conversationId].lastMessage = data.message;
        convMap[conversationId].timestamp = data.timestamp;
        if (!data.read) convMap[conversationId].unread += 1;
      }
    });

    const conversations = Object.values(convMap).sort(
      (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
    );

    callback(conversations);
  });

  return unsubscribe;
};
