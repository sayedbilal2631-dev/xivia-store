import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, updateDoc,} from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { toast } from "react-toastify";


//  Place a New Order (Real Ecommerce)
export const placeOrder = async (orderData: {
  buyerId: string;
  sellerId: string;

  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };

  items: {
    productId: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
  }[];

  shippingAddress: {
    city: string;
    country: string;
    street: string;
    postalCode?: string;
  };

  paymentMethod: "COD" | "Stripe";
}) => {
  const ordersRef = collection(db, "orders");

  const docRef = await addDoc(ordersRef, {
    buyerId: orderData.buyerId,
    sellerId: orderData.sellerId,

    customerInfo: orderData.customerInfo,

    items: orderData.items,

    pricing: {
      subtotal: orderData.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      shippingFee: 0,
      tax: 0,
      total: orderData.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    },

    payment: {
      method: orderData.paymentMethod,
      status: "unpaid",
      transactionId: null,
    },

    shippingAddress: orderData.shippingAddress,

    status: "pending",

    fulfillment: {
      trackingNumber: null,
      shippedAt: null,
      deliveredAt: null,
    },

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  toast.success("Order placed successfully ");
  return docRef.id;
};



// Fetch Orders for Seller Dashboard
export const getOrders = async (sellerUid: string) => {
  const ordersRef = collection(db, "orders");

  const q = query(ordersRef, where("sellerId", "==", sellerUid));

  const snapshot = await getDocs(q);

  const orders = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  //  Correct Firestore timestamp sorting
  orders.sort((a: any, b: any) => {
    const aTime = a.createdAt?.seconds || 0;
    const bTime = b.createdAt?.seconds || 0;
    return bTime - aTime;
  });

  return orders;
};



//  Update Order Status (Pending → Shipped → Delivered)
export const updateOrderStatus = async (
  orderId: string,
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
) => {
  const orderRef = doc(db, "orders", orderId);

  const updates: any = {
    status,
    updatedAt: serverTimestamp(),
  };

  if (status === "shipped") {
    updates["fulfillment.shippedAt"] = serverTimestamp();
  }

  if (status === "delivered") {
    updates["fulfillment.deliveredAt"] = serverTimestamp();
  }

  await updateDoc(orderRef, updates);

  toast.success(`Order marked as ${status.toUpperCase()} `);
};



//  Mark Order Shipped Shortcut
export const markOrderShipped = async (orderId: string) => {
  return updateOrderStatus(orderId, "shipped");
};
