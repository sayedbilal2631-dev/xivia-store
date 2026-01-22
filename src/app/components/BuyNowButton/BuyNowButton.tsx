"use client";
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { placeOrder } from "@/app/services/order/orderService";
import CustomButton from "../common/Button";


interface BuyNowButtonProps {
    product: {
        id: string;
        name: string;
        thumbnail: string;
        price: number;
        storeId: string;
        image: string | any
    };
    quantity?: number;
    fullWidth?: boolean;
}

const BuyNowButton = ({
    product,
    quantity = 1,
    fullWidth = false,
}: BuyNowButtonProps) => {
    const { firebaseUser } = useUser();
    const [loading, setLoading] = useState(false);

    const handleBuyNow = async () => {
        if (!firebaseUser) {
            alert("Please login to place an order");
            return;
        }

        try {
            setLoading(true);

            await placeOrder({
                buyerId: firebaseUser.uid,
                sellerId: product.storeId,
                productId: product.id,
                productName: product.name,
                productImage: product.image,
                amount: product.price
            });

            alert("Order placed successfully");
        } catch (error) {
            alert(`Failed to place order ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CustomButton
            variant="contained"
            color="soft"
            fullWidth={fullWidth}
            // disabled={loading}
            onClick={handleBuyNow}
            startIcon={loading ? <CircularProgress size={18} /> : null}
            bgColor={'orange'}
        >
            {loading ? "Placing Order..." : "Buy Now"}
        </CustomButton>
    );
};

export default BuyNowButton;
