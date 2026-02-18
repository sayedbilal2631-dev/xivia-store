"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import Chat from "../../component/messages/ChatWindow";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import ConversationList from "../../component/messages/ConversationList";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<{
    id: string;
    otherUserId: string;
  } | null>(null);

  const [open, setOpen] = useState(false);
  const { firebaseUser } = useUser();

  const handleToggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const handleSelectConversation = (id: string, otherUserId: string) => {
    setSelectedConversation({ id, otherUserId });
    setOpen(false);
  };

  return (
    <Box display="flex" height="80vh" position={'relative'}>
      {/* Mobile Menu Button */}
      <Box
        onClick={handleToggleDrawer}
        sx={{ display: { xs: "flex", md: "none" }, position: "absolute", top: 20, right: 20, bgcolor:'white', padding:'8px', borderRadius:'50%', boxShadow:'0px 0px 8px' }}
      >
        <Menu />
      </Box>

      {/* Mobile Drawer */}
      <Drawer open={open} onClose={handleToggleDrawer}>
        <Box width={300} p={2}>
          <IconButton onClick={handleToggleDrawer} sx={{ mb: 2 }}>
            <X />
          </IconButton>

          <ConversationList
            currentUserId={firebaseUser?.uid}
            onSelectConversation={handleSelectConversation}
          />
        </Box>
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        width="30%"
        borderRight={1}
        borderColor="grey.300"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <ConversationList
          currentUserId={firebaseUser?.uid}
          onSelectConversation={handleSelectConversation}
        />
      </Box>

      {/* Chat Window */}
      <Box flex={1}>
        {selectedConversation ? (
          <Chat
            conversationId={selectedConversation.id}
            currentUserId={firebaseUser?.uid}
            receiverId={selectedConversation.otherUserId}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography>Select a conversation to start</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
