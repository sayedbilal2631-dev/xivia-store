"use client";
import { List, ListItemButton, ListItemText, Typography, Box, } from "@mui/material";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/config/firebase";

const ConversationList = ({ userId }: { userId: string }) => {
    const [conversations, setConversations] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const q = query(
            collection(db, "conversations"),
            where("buyerId", "==", userId)
        );

        return onSnapshot(q, (snap) => {
            setConversations(
                snap.docs.map((d) => ({ id: d.id, ...d.data() }))
            );
        });
    }, [userId]);

    return (
        <List>
            {conversations.map((c) => (
                <ListItemButton
                    key={c.id}
                    onClick={() => router.push(`/store/pages/messages/${c.id}`)}
                >
                    <ListItemText
                        primary={c.productTitle}
                        secondary={`Price: ${c.productPrice}`}
                    />
                </ListItemButton>
            ))}

            {!conversations.length && (
                <Box p={2}>
                    <Typography color="text.secondary">
                        No conversations yet
                    </Typography>
                </Box>
            )}
        </List>
    );
};

export default ConversationList;
