import { Card, CardContent, Typography, Box } from "@mui/material";
import OrderStatusChip from "./OrderStatusChip";
import OrderStatusActions from "./OrderStatusActions";
import { Order } from "@/app/collections/store";

interface Props {
    order: Order;
    isStoreOwner?: boolean;
}

const OrderCard = ({ order, isStoreOwner }: Props) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography fontWeight={600}>
                    {order.productTitle}
                </Typography>

                <Typography>Quantity: {order.quantity}</Typography>
                <Typography>Total: ${order.totalAmount}</Typography>

                <Box mt={1} display="flex" gap={1} alignItems="center">
                    <OrderStatusChip status={order.status} />
                    {isStoreOwner && (
                        <OrderStatusActions
                            orderId={order.id}
                            status={order.status}
                        />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default OrderCard;
