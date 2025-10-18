// src/services/firebaseService.ts
import { db, auth } from "@/app/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

class FirebaseService {
  async getUserStore() {
    const user = auth.currentUser;
    if (!user) return null;

    const q = query(collection(db, "stores"), where("ownerId", "==", user.uid));
    const snap = await getDocs(q);
    return snap.empty ? null : snap.docs[0];
  }

  async getUserProducts() {
    const storeDoc = await this.getUserStore();
    if (!storeDoc) return [];

    const productsRef = collection(db, "stores", storeDoc.id, "products");
    const snapshot = await getDocs(productsRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}

export const firebaseService = new FirebaseService();
