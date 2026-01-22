"use client";
import { db } from "@/app/config/firebase";
import { useState, useEffect, useRef } from "react";
import { sendMessage } from "@/app/services/messages/messagingServices";
import { Box, TextField, Button, List, ListItem, Paper, Typography } from "@mui/material";
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { MessageCircle, SendIcon } from "lucide-react";

interface ChatProps {
  conversationId: string;
  currentUserId: string | any;
  receiverId: string;
}

export default function Chat({ conversationId, currentUserId, receiverId }: ChatProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Listen messages
  useEffect(() => {
    if (!conversationId) return;

    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(msgs);
      scrollToBottom();

      // Mark received messages as read
      msgs.forEach(async (msg: any) => {
        if (msg.receiverId === currentUserId && !msg.read) {
          await updateDoc(
            doc(db, "conversations", conversationId, "messages", msg.id),
            { read: true }
          );
        }
      });
    });

    return () => unsubscribe();
  }, [conversationId, currentUserId]);

  // Send message
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    await sendMessage(conversationId, currentUserId, receiverId, newMessage.trim());
    setNewMessage("");
  };
  const formatTime = (timestamp: any) => {
    if (!timestamp) return "";

    let date: Date;

    // Firestore Timestamp
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else {
      // Already a JS Date or string
      date = new Date(timestamp);
    }

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUserId;

          return (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent: isMine ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  bgcolor: isMine ? "primary.main" : "grey.200",
                  color: isMine ? "white" : "black",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  borderTopRightRadius: isMine ? 0 : 16,
                  borderTopLeftRadius: isMine ? 16 : 0,
                }}
              >
                {/* Message Text */}
                <Typography variant="body2">{msg.message}</Typography>

                {/* Time */}
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "right",
                    mt: 0.5,
                    opacity: 0.7,
                    fontSize: "0.7rem",
                  }}
                >
                  {formatTime(msg.timestamp)}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Input Area */}
      <Box display="flex" gap={1} p={2} borderTop="1px solid #ddd">
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button startIcon={<SendIcon/> } variant="contained" onClick={handleSend}/>
          
      {/* /</Button> */}
      </Box>
    </Box>
  );
}
