"use client";

import { Table, TableHead, TableRow, TableCell, TableBody, Typography, CircularProgress, Chip } from "@mui/material";
import { getSellerHistory } from "@/app/services/history/historyService";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { useEffect, useState } from "react";

export default function HistoryTab() {
    const { firebaseUser } = useUser();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!firebaseUser) return;

        getSellerHistory(firebaseUser?.uid).then(res => {
            setOrders(res);
            setLoading(false);
        });
    }, [firebaseUser]);

    if (loading) return <CircularProgress />;

    if (orders.length === 0) {
        return <Typography>No history available.</Typography>;
    }
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {orders.map(order => (
                    <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>${order.totalAmount}</TableCell>
                        <TableCell>
                            <Chip
                                label={order.status}
                                color={order.status === "completed" ? "success" : "primary"}
                                size="small"
                            />
                        </TableCell>
                        <TableCell>
                            {order.createdAt?.toDate().toLocaleString()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
