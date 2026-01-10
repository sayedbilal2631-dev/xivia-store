// app/hooks/useCurrentUser.ts
import { useState, useEffect, } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../config/firebase";

const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          createdAt: firebaseUser.metadata.creationTime,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useCurrentUser;
