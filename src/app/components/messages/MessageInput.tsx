"use client";
import { Box, TextField, IconButton } from "@mui/material";
import { sendMessage } from "@/app/services/messaging";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const MessageInput = ({
    conversationId,
    userId,
}: {
    conversationId: string;
    userId: string;
}) => {
    const [text, setText] = useState("");

    const handleSend = async () => {
        if (!text.trim()) return;

        await sendMessage(conversationId, userId, text);
        setText("");
    };

    return (
        <Box display="flex" p={2} gap={1}>
            <TextField
                fullWidth
                size="small"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <IconButton color="primary" onClick={handleSend}>
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default MessageInput;
