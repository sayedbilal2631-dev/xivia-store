"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { CartService } from "@/app/hooks/cart/CartServices";
import { useUser } from "../CurrentUser/CurrentUser";

interface CartItem {
  id: string;
  productId: string;
  userId: string;
  quantity?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { firebaseUser } = useUser();
  const [cartItems, setCartItems] = useState<any[]>([]);

  const getCartItem = async () => {
    if (!firebaseUser?.uid) return;
    const data = await CartService.getCartItem(firebaseUser.uid);
    setCartItems(data);
  };

  // fetch cart when user logs in
  useEffect(() => {
    getCartItem();
  }, [firebaseUser]);

  const addToCart = async (productId: string) => {
    if (!firebaseUser?.uid) return;

    await CartService.addToCart(productId, firebaseUser.uid);
    await getCartItem();
  };

  const removeFromCart = async (cartItemId: string) => {
    if (!firebaseUser?.uid) return;

    await CartService.deleteFromCart(cartItemId, firebaseUser.uid);
    // setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    getCartItem();
  };

  const clearCart = () => setCartItems([]);

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
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
