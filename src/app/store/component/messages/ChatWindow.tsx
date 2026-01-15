"use client";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ChatWindow({
  conversationId,
  userId,
}: any) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("createdAt")
    );

    return onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => d.data()));
    });
  }, [conversationId]);

  return (
    <Box p={2} height={400} overflow="auto">
      {messages.map((m, i) => (
        <Typography
          key={i}
          align={m.senderId === userId ? "right" : "left"}
        >
          {m.text}
        </Typography>
      ))}
    </Box>
  );
}
