"use client";

import { listenMessages } from "@/app/services/messages/messagingServices";
import { Box, Typography, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Props {
    conversationId: string;
    currentUserId: string;
}

const MessageList = ({ conversationId, currentUserId }: Props) => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = listenMessages(conversationId, setMessages);
        return () => unsubscribe();
    }, [conversationId]);

    return (
        <Box>
            {messages.map((msg) => (
                <Box
                    key={msg.id}
                    display="flex"
                    justifyContent={msg.senderId === currentUserId ? "flex-end" : "flex-start"}
                    mb={1}
                >
                    <Paper sx={{ p: 1, maxWidth: "70%", bgcolor: msg.senderId === currentUserId ? "primary.main" : "grey.200", color: msg.senderId === currentUserId ? "white" : "black" }}>
                        <Typography>{msg.message}</Typography>
                    </Paper>
                </Box>
            ))}
        </Box>
    );
};

export default MessageList;
