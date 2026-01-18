"use client";
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { createOrder } from "@/app/services/order/ordercreate";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";


interface BuyNowButtonProps {
    product: {
        id: string;
        title: string;
        thumbnail: string;
        price: number;
        storeId: string;
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

            await createOrder({
                buyerId: firebaseUser.uid,
                storeId: product.storeId,
                product,
                quantity,
            });

            alert("Order placed successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="contained"
            color="primary"
            fullWidth={fullWidth}
            disabled={loading}
            onClick={handleBuyNow}
            startIcon={loading ? <CircularProgress size={18} /> : null}
        >
            {loading ? "Placing Order..." : "Buy Now"}
        </Button>
    );
};

export default BuyNowButton;
