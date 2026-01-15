"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/app/config/firebase";

interface UserContextType {
  isUser: boolean;
  loading: boolean;
  ownerId: string | null;
  firebaseUser: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (!user) {
        setFirebaseUser(null);
        setOwnerId(null);
        setLoading(false);
        return;
      }

      setFirebaseUser(user);

      try {
        const q = query(
          collection(db, "stores"),
          where("ownerId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setOwnerId(snapshot.docs[0].id);
        } else {
          setOwnerId(null);
        }
      } catch (error) {
        console.error("Error fetching store owner:", error);
        setOwnerId(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isUser: Boolean(firebaseUser),
        loading,
        ownerId,
        firebaseUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
