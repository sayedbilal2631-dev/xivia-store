"use client";

import { Grid, Card, Avatar, Typography, Box, Chip, Stack, Divider, Button, } from "@mui/material";
import React from "react";

const ShowOrders = ({ orders }: { orders: any[] }) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "warning";
            case "processing":
                return "info";
            case "shipped":
                return "primary";
            case "delivered":
                return "success";
            case "cancelled":
                return "error";
            default:
                return "default";
        }
    };

    return (
        <Grid container spacing={3}>
            {orders.map((order) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={order.id}>
                    <Card
                        sx={{
                            p: 2,
                            borderRadius: "16px",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                            transition: "0.3s",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                            },
                        }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar
                                src={order.productImage.blurDataURL}
                                variant="rounded"
                                sx={{
                                    width: 90,
                                    height: 90,
                                    borderRadius: "12px",
                                    bgcolor: "#f5f5f5",
                                }}
                            />

                            <Box flex={1}>
                                <Typography fontWeight={600} variant="h6" noWrap>
                                    {order.productTitle}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Order ID: #{order.id.slice(0, 6)}
                                </Typography>

                                <Typography mt={0.5} fontWeight={500}>
                                    Total: ${order.amount}
                                </Typography>

                                {order.quantity && (
                                    <Typography variant="body2" color="text.secondary">
                                        Quantity: {order.quantity}
                                    </Typography>
                                )}
                            </Box>
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Chip
                                label={order.status.toUpperCase()}
                                color={getStatusColor(order.status)}
                                size="small"
                                sx={{
                                    fontWeight: 600,
                                    borderRadius: "8px",
                                }}
                            />

                            {order.timestamp?.toDate && (
                                <Typography variant="caption" color="text.secondary">
                                    {order.timestamp.toDate().toLocaleDateString()}
                                </Typography>
                            )}
                        </Stack>

                        <Stack direction="row" spacing={1} mt={2}>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                }}
                            >
                                View Details
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                }}
                            >
                                Mark Shipped
                            </Button>
                        </Stack>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ShowOrders;
