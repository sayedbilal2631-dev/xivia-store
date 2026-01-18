import { OrderStatus } from "@/app/collections/store";
import { Chip } from "@mui/material";

const statusColorMap: Record<OrderStatus, any> = {
    pending: "warning",
    confirmed: "info",
    shipped: "primary",
    delivered: "success",
};

const OrderStatusChip = ({ status }: { status: OrderStatus }) => {
    return <Chip label={status} color={statusColorMap[status]} />;
};

export default OrderStatusChip;
