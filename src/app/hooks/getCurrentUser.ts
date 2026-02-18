// app/hooks/useCurrentUser.ts
import { useState, useEffect } from "react";
import app, { db } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  const [sellerStripeId, setSellerStripeId] = useState<string>("");
  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const currentUser = {
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          createdAt: firebaseUser.metadata.creationTime,
        };
        setUser(currentUser);

        const ref = query(
          collection(db, "stores"),
          where("ownerId", "==", firebaseUser.uid)
        );
        const snapshot = await getDocs(ref);
        if (!snapshot.empty) {
          const storeData = snapshot.docs[0].data();
          if (storeData.sellerStripeId) {
            setSellerStripeId(storeData.sellerStripeId);
          }
        }
      } else {
        setUser(null);
        setSellerStripeId("");
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, sellerStripeId };
};

export default useCurrentUser;
