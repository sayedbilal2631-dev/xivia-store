"use client";

import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { placeOrder } from "@/app/services/order/orderService";
import { CircularProgress } from "@mui/material";
import CustomButton from "../common/Button";
import { toast } from "react-toastify";
import { useState } from "react";

interface BuyNowButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    storeId: string;
    image: string;
  };

  quantity?: number;
  fullWidth?: boolean;
  sessionFn: () => any;
}

const BuyNowButton = ({
  product,
  quantity = 1,
  fullWidth = false,
  sessionFn,
}: BuyNowButtonProps) => {
  const { firebaseUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    if (!firebaseUser) {
      toast.error("Please login to place an order");
      return;
    }

    try {
      setLoading(true);

      await placeOrder({
        buyerId: firebaseUser.uid,
        sellerId: product.storeId,

        customerInfo: {
          name: firebaseUser.displayName || "Unknown Customer",
          email: firebaseUser.email || "No Email",
          phone: "",
        },

        items: [
          {
            productId: product.id,
            title: product.name,
            image: product.image,
            price: product.price,
            quantity: quantity,
          },
        ],

        shippingAddress: {
          city: "Not Provided",
          country: "Not Provided",
          street: "Not Provided",
          postalCode: "",
        },

        paymentMethod: "COD",
      });

      toast.success("Order placed successfully ");

      sessionFn();
    } catch (error) {
      toast.error(`Failed to place order: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomButton
      variant="contained"
      color="soft"
      fullWidth={fullWidth}
      onClick={handleBuyNow}
      startIcon={loading ? <CircularProgress size={18} /> : null}
      bgColor={"orange"}
    >
      {loading ? "Placing Order..." : "Buy Now"}
    </CustomButton>
  );
};

export default BuyNowButton;
