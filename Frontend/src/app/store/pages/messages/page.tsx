"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import Chat from "../../component/messages/ChatWindow";
import ConversationList from "../../component/messages/ConversationList";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<{ id: string; otherUserId: string } | null>(null);
  const { firebaseUser } = useUser();
  return (
    <Box display="flex" height="80vh" gap={2}>
      <Box width="30%" borderRight={1} borderColor="grey.300">
        <ConversationList
          currentUserId={firebaseUser?.uid}
          onSelectConversation={(id, otherUserId) => setSelectedConversation({ id, otherUserId })}
        />
      </Box>
      <Box flex={1}>
        {selectedConversation ? (
          <Chat
            conversationId={selectedConversation.id}
            currentUserId={firebaseUser?.uid}
            receiverId={selectedConversation.otherUserId}
          />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            Select a conversation to start
          </Box>
        )}
      </Box>
    </Box>
  );
}
