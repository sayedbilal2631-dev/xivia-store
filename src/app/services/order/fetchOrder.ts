import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { Order } from "@/app/collections/store";

export const listenToStoreOrders = (
  storeOwnerId: string,
  callback: (orders: Order[]) => void
) => {
  const q = query(
    collection(db, "orders"),
    where("storeOwnerId", "==", storeOwnerId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];

    callback(orders);
  });
};

export const listenToBuyerOrders = (
  buyerId: string,
  callback: (orders: Order[]) => void
) => {
  const q = query(
    collection(db, "orders"),
    where("buyerId", "==", buyerId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];

    callback(orders);
  });
};
