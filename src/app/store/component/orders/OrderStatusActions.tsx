"use client";

import { OrderStatus } from "@/app/collections/store";
import { updateOrderStatus } from "@/app/services/order/orderupdate";
import { Button, Stack } from "@mui/material";


interface Props {
    orderId: string;
    status: OrderStatus;
}

const OrderStatusActions = ({ orderId, status }: Props) => {
    return (
        <Stack direction="row" spacing={1}>
            {status === "pending" && (
                <Button
                    size="small"
                    onClick={() => updateOrderStatus(orderId, "confirmed")}
                >
                    Confirm
                </Button>
            )}

            {status === "confirmed" && (
                <Button
                    size="small"
                    onClick={() => updateOrderStatus(orderId, "shipped")}
                >
                    Ship
                </Button>
            )}

            {status === "shipped" && (
                <Button
                    size="small"
                    onClick={() => updateOrderStatus(orderId, "delivered")}
                >
                    Deliver
                </Button>
            )}
        </Stack>
    );
};

export default OrderStatusActions;
