"use client";

import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import MessagingBox from "../../component/messages/MessageBox";
import ConversationList from "../../component/messages/ConversationList";
import useCurrentUser from "@/app/hooks/getCurrentUser";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";

interface Conversation {
  conversationId: string;
  otherUserId: string;
}

interface Props {
  currentUserId: string;
}

const MessagingPage = ({ currentUserId }: Props) => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const { firebaseUser } = useUser()
  return (
    <Box sx={{ height: "100vh", p: 2 }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        {/* LEFT: Conversation List */}
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            height: "100%",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <ConversationList
            currentUserId={firebaseUser?.uid}
            onSelectConversation={(conversationId, otherUserId) =>
              setSelectedConversation({ conversationId, otherUserId })
            }
          />
        </Grid>

        {/* RIGHT: Messaging Area */}
        <Grid size={{ xs: 12, md: 8 }} sx={{ height: "100%" }}>
          {selectedConversation ? (
            <MessagingBox
              conversationId={selectedConversation.conversationId}
              currentUserId={currentUserId}
              otherUserId={selectedConversation.otherUserId}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">
                Select a conversation to start chatting
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessagingPage;
