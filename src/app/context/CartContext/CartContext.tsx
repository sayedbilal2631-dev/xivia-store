"use client";

import { createContext, useContext, useState, ReactNode } from "react";
// import { CartService } from "@/app/hooks/cart/CartServices";
// import { useUser } from "../CurrentUser/CurrentUser";

interface CartContextType {
  cartItems: string[];        
  cartCount: number;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>; 
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // const { firebaseUser } = useUser();
  const [cartItems, setCartItems] = useState<string[]>([]);

  // ADD PRODUCT TO FIREBASE
  const addToCart = async (productId: string) => {
    // if (!firebaseUser) {
    //   console.error("User not logged in");
    //   return;
    // }

    try {
      // await CartService.addToCart(productId, firebaseUser.uid);

      // Local UI update (only for count display)
      setCartItems((prev) => [...prev, productId]);
    } catch (err) {
      console.error("addToCart failed:", err);
    }
  };

  // REMOVE PRODUCT FROM FIREBASE (by CART DOCUMENT ID)
  const removeFromCart = async (cartItemId: string) => {
    // if (!firebaseUser) {
    //   console.error("User not logged in");
    //   return;
    // }

    try {
      // await CartService.deleteFromCart(cartItemId, firebaseUser.uid);

      setCartItems((prev) => prev.filter((id) => id !== cartItemId));
    } catch (err) {
      console.error("removeFromCart failed:", err);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.length,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
