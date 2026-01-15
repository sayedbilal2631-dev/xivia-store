"use client";
import { listenUserConversations } from "@/app/services/messages/conversationServices";
import { Box, List, ListItem, ListItemButton, ListItemText, Badge, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Props {
  currentUserId?: string; // make it optional to handle undefined
  onSelectConversation: (conversationId: string, otherUserId: string) => void;
}

const ConversationList = ({ currentUserId, onSelectConversation }: Props) => {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUserId) return; // guard against undefined
    const unsubscribe = listenUserConversations(currentUserId, setConversations);
    return () => unsubscribe();
  }, [currentUserId]);

  // Show message if userId not available
  if (!currentUserId) {
    return (
      <Box p={2}>
        <Typography variant="body2" color="text.secondary">
          Loading conversations...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" mb={2}>Your Conversations</Typography>
      <List>
        {conversations.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ pl: 2 }}>
            No conversations yet.
          </Typography>
        )}
        {conversations.map(conv => (
          <ListItem key={conv.conversationId} disablePadding>
            <ListItemButton
              onClick={() => onSelectConversation(conv.conversationId, conv.otherUserId)}
            >
              <ListItemText
                primary={`Chat with ${conv.otherUserId}`}
                secondary={conv.lastMessage || "No messages yet"}
              />
              {conv.unread > 0 && (
                <Badge color="error" badgeContent={conv.unread} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConversationList;
