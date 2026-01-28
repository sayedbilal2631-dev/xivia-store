import { addDoc, collection, serverTimestamp, deleteDoc, doc, query, where, getDocs, getDoc, } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { WhereToVote } from "@mui/icons-material";

export class CartService {

  static async addToCart(productId: string, firebaseUser: any) {
    if (!firebaseUser) {
      throw new Error("User not authenticated");
    }

    if (!productId) {
      throw new Error("productId missing");
    }

    try {
      const ref = collection(db, "cart");

      const q = query(ref, where("productId", "==", productId));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        alert("Product already in cart — skipping upload");
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

      const q = query(collection(db, 'cart'),
        where('productId', '==', itemId),
        where('userId', '==', firebaseUser))
      const snapshot = await getDocs(q);
      await Promise.all(
        snapshot.docs.map((item) => deleteDoc(doc(db, 'cart', item.id)))
      )
    } catch (err) {
      console.error("Delete from cart failed:", err);
      throw err;
    }
  }

  static async getCartItem(firebaseUser: any) {
    try {
      if (!firebaseUser) return [];

      const q = query(
        collection(db, "cart"),
        where("userId", "==", firebaseUser)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
  }
}
