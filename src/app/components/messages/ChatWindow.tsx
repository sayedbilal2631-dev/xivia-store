"use client";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Box, Paper, Typography } from "@mui/material";
import { db } from "@/app/config/firebase";
import { useEffect, useState } from "react";

const ChatWindow = ({ conversationId, userId, }: { conversationId: string; userId: string; }) => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const q = query(
            collection(db, `conversations/${conversationId}/messages`),
            orderBy("createdAt")
        );

        return onSnapshot(q, (snap) => {
            setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
    }, [conversationId]);

    return (
        <Box p={2} sx={{ height: "70vh", overflowY: "auto" }}>
            {messages.map((msg) => {
                const isMine = msg.senderId === userId;

                return (
                    <Box
                        key={msg.id}
                        display="flex"
                        justifyContent={isMine ? "flex-end" : "flex-start"}
                        mb={1}
                    >
                        <Paper
                            sx={{
                                p: 1.5,
                                maxWidth: "70%",
                                bgcolor: isMine ? "primary.main" : "grey.200",
                                color: isMine ? "white" : "black",
                            }}
                        >
                            <Typography variant="body2">
                                {msg.text}
                            </Typography>
                        </Paper>
                    </Box>
                );
            })}
        </Box>
    );
};

export default ChatWindow;
