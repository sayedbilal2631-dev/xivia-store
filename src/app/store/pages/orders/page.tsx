"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Order } from "@/app/collections/store";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { listenToStoreOrders } from "@/app/services/order/fetchOrder";
import OrderCard from "../../component/orders/OrderCard";

const StoreOrdersPage = () => {
  const { firebaseUser } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!firebaseUser?.uid) return;

    const unsubscribe = listenToStoreOrders(firebaseUser.uid, setOrders);
    return () => unsubscribe();
  }, [firebaseUser?.uid]);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Store Orders
      </Typography>

      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          isStoreOwner
        />
      ))}
    </Box>
  );
};

export default StoreOrdersPage;
