"use client";

import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { sendMessage } from "@/app/services/messages/messagingServices";

interface Props {
  conversationId: string;
  senderId: string;
  receiverId: string;
}

const MessageInput = ({ conversationId, senderId, receiverId }: Props) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(conversationId, senderId, receiverId, text);
    setText("");
  };

  return (
    <Box display="flex" gap={1} mt={2}>
      <TextField
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <IconButton onClick={handleSend} color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
