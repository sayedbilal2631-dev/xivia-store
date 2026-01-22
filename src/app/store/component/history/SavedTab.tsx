"use client";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { getSellerSaved } from "@/app/services/history/historyService";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { useEffect, useState } from "react";

export default function SavedTab() {
    const { firebaseUser } = useUser();
    const [saved, setSaved] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!firebaseUser) return;

        getSellerSaved(firebaseUser?.uid).then(res => {
            setSaved(res);
            setLoading(false);
        });
    }, [firebaseUser]);

    if (loading) return <CircularProgress />;

    if (saved.length === 0) {
        return <Typography>No saved items yet.</Typography>;
    }

    return (
        <Box display="grid" gap={2}>
            {saved.map(item => (
                <Card key={item.id}>
                    <CardContent>
                        <Typography fontWeight={600}>Product: {item.productId}</Typography>
                        <Typography variant="body2">Order: {item.orderId}</Typography>
                        <Typography variant="caption">
                            Saved on: {item.createdAt?.toDate().toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
