import ConversationList from "@/app/components/messages/ConversationList";
import { Box, Typography } from "@mui/material";
import { auth } from "@/app/config/firebase";

export default function MessagesPage() {
  const user = auth.currentUser;
  if (!user) return null;

  return (
    <Box maxWidth={600} mx="auto" >
      <Typography variant="h6" p={2} color="black">
        Messages
      </Typography>
      <ConversationList userId={user.uid} />
    </Box>
  );
}
