import { addDoc, collection, serverTimestamp, deleteDoc, doc, query, where, getDocs, } from "firebase/firestore";
import { db } from "@/app/config/firebase";

export class CartService {

  static async addToCart(productId: string, firebaseUser: string) {
    if (!firebaseUser) {
      throw new Error("User not authenticated");
    }

    if (!productId) {
      throw new Error("productId missing");
    }

    try {
      const ref = collection(db, "cart", firebaseUser);

      const q = query(ref, where("productId", "==", productId));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        console.log("Product already in cart — skipping upload");
        return;
      }

      await addDoc(ref, {
        productId,
        userId: firebaseUser,
        createdAt: serverTimestamp(),
        quantity: 1,
      });

    } catch (err) {
      console.error("Add to cart failed:", err);
      throw err;
    }
  }

  static async deleteFromCart(itemId: string, firebaseUser: string) {
    if (!firebaseUser) {
      throw new Error("User not authenticated");
    }

    if (!itemId) {
      throw new Error("itemId missing");
    }

    try {
      const ref = doc(db, "cart", firebaseUser, itemId);
      await deleteDoc(ref);
    } catch (err) {
      console.error("Delete from cart failed:", err);
      throw err;
    }
  }
}
