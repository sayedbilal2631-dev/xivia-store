"use client";

import { collection, query, where, onSnapshot, orderBy, limit,} from "firebase/firestore";
import { Box, List, ListItemButton, Badge, Typography, Avatar,} from "@mui/material";
import { db } from "@/app/config/firebase";
import { useState, useEffect } from "react";

interface ConversationListProps {
  currentUserId: string | any;
  onSelectConversation: (conversationId: string, otherUserId: string) => void;
}

interface LastMessage {
  message: string;
  timestamp: any;
}

export default function ConversationList({
  currentUserId,
  onSelectConversation,
}: ConversationListProps) {
  const [conversations, setConversations] = useState<any[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>({});
  const [lastMessages, setLastMessages] = useState<{ [key: string]: LastMessage }>({});

  // TIME FORMATTER 
  const formatTime = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // LOAD CONVERSATIONS 
  useEffect(() => {
    if (!currentUserId) return;

    const conversationsRef = collection(db, "conversations");

    const qBuyer = query(conversationsRef, where("buyerId", "==", currentUserId));
    const qSeller = query(conversationsRef, where("sellerId", "==", currentUserId));

    const mergeConversations = (newOnes: any[]) => {
      setConversations((prev) => {
        const map = new Map(prev.map((c) => [c.id, c]));
        newOnes.forEach((c) => map.set(c.id, c));
        return Array.from(map.values());
      });
    };

    const unsubBuyer = onSnapshot(qBuyer, (snap) => {
      const buyerConvos = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      mergeConversations(buyerConvos);
    });

    const unsubSeller = onSnapshot(qSeller, (snap) => {
      const sellerConvos = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      mergeConversations(sellerConvos);
    });

    return () => {
      unsubBuyer();
      unsubSeller();
    };
  }, [currentUserId]);

  // ------------------ UNREAD COUNTS ------------------
  useEffect(() => {
    if (!currentUserId) return;

    const unsubscribes: any[] = [];

    conversations.forEach((convo) => {
      const q = query(
        collection(db, "conversations", convo.id, "messages"),
        where("receiverId", "==", currentUserId),
        where("read", "==", false)
      );

      const unsub = onSnapshot(q, (snap) => {
        setUnreadCounts((prev) => ({
          ...prev,
          [convo.id]: snap.size,
        }));
      });

      unsubscribes.push(unsub);
    });

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [conversations, currentUserId]);

  // ------------------ LAST MESSAGE PER CONVERSATION ------------------
  useEffect(() => {
    const unsubscribes: any[] = [];

    conversations.forEach((convo) => {
      const qLast = query(
        collection(db, "conversations", convo.id, "messages"),
        orderBy("timestamp", "desc"),
        limit(1)
      );

      const unsub = onSnapshot(qLast, (snap) => {
        if (!snap.empty) {
          const data = snap.docs[0].data();
          setLastMessages((prev) => ({
            ...prev,
            [convo.id]: {
              message: data.message,
              timestamp: data.timestamp,
            },
          }));
        }
      });

      unsubscribes.push(unsub);
    });

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [conversations]);

  // ------------------ UI ------------------
  return (
    <Box>
      <Typography variant="h6" mb={1}>
        Conversations
      </Typography>

      <List>
        {conversations.map((convo) => {
          const otherUserId =
            convo.buyerId === currentUserId ? convo.sellerId : convo.buyerId;

          const lastMsg = lastMessages[convo.id];

          return (
            <ListItemButton
              key={convo.id}
              onClick={() => onSelectConversation(convo.id, otherUserId)}
              sx={{
                py: 1.5,
                px: 2,
                borderRadius: 2,
                mb: 0.5,
                alignItems: "flex-start",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              {/* Avatar */}
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  mr: 2,
                  width: 48,
                  height: 48,
                  fontWeight: 600,
                }}
              >
                {otherUserId?.charAt(0).toUpperCase()}
              </Avatar>

              {/* Content */}
              <Box flex={1}>
                {/* Top Row */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight={600} noWrap>
                    {convo.productTitle}
                  </Typography>

                  {lastMsg?.timestamp && (
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(lastMsg.timestamp)}
                    </Typography>
                  )}
                </Box>

                {/* Bottom Row */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={0.5}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{ maxWidth: "85%" }}
                  >
                    {lastMsg ? lastMsg.message : "No messages yet"}
                  </Typography>

                  {unreadCounts[convo.id] > 0 && (
                    <Badge
                      color="error"
                      badgeContent={unreadCounts[convo.id]}
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
              </Box>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
