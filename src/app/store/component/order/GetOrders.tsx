"use client";
import { Container, Typography, Box, CircularProgress, Chip, Stack } from "@mui/material";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { getOrders } from "@/app/services/order/orderService";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ShowOrders from "./ShowOrders";

const GetOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { firebaseUser } = useUser();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!firebaseUser) return;

            try {
                const data = await getOrders(firebaseUser.uid);
                setOrders(data);
            } catch (err) {
                toast.error(`Error fetching orders: ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [firebaseUser]);
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight={600}>
                    My Orders
                </Typography>

                <Chip
                    label={`Total Orders: ${orders.length}`}
                    color="primary"
                    variant="outlined"
                />
            </Stack>

            {orders.length === 0 ? (
                <Typography>No orders found.</Typography>
            ) : (
                <ShowOrders orders={orders} />
            )}
        </Container>
    );
};

export default GetOrders;
