"use client";

import React, { useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Box, Typography } from "@mui/material";
import { markMessagesAsRead } from "@/app/services/messages/messagingServices";

interface Props {
    conversationId: string;
    currentUserId: string;
    otherUserId: string;
}

const MessagingBox = ({ conversationId, currentUserId, otherUserId }: Props) => {
    useEffect(() => {
        if (conversationId && currentUserId) {
            markMessagesAsRead(conversationId, currentUserId);
        }
    }, [conversationId, currentUserId]);

    return (
        <Box>
            <Typography variant="h6" mb={2}>Chat</Typography>
            <MessageList conversationId={conversationId} currentUserId={currentUserId} />
            <MessageInput conversationId={conversationId} senderId={currentUserId} receiverId={otherUserId} />
        </Box>
    );
};

export default MessagingBox;
