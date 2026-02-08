"use client";
import { Container, Typography, Box, Avatar, CircularProgress, Card, CardContent, Grid, Chip } from "@mui/material";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { getOrders } from "@/app/services/order/orderService";
import React, { useEffect, useState } from "react";

const GetOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { firebaseUser } = useUser();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!firebaseUser) return;
            try {
                const data = await getOrders(firebaseUser?.uid);
                setOrders(data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [firebaseUser]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "warning";
            case "shipped":
                return "info";
            case "delivered":
                return "success";
            default:
                return "default";
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>

            {orders.length === 0 ? (
                <Typography>No orders found.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {orders.map(order => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={order.id}>
                            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                                <Avatar src={order.productImage} variant="square" sx={{ width: 80, height: 80, mr: 2 }} />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6">{order.productTitle}</Typography>
                                    <Typography>Amount: ${order.price}</Typography>
                                    {order.quantity && <Typography>Quantity: {order.quantity}</Typography>}
                                    {order.timestamp?.toDate && (
                                        <Typography variant="body2" color="textSecondary">
                                            Ordered: {order.timestamp.toDate().toLocaleString()}
                                        </Typography>
                                    )}
                                    <Chip
                                        label={order.status.toUpperCase()}
                                        color={getStatusColor(order.status)}
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default GetOrders;
