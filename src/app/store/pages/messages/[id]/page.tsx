import { Box } from "@mui/material";
import { auth } from "@/app/config/firebase";
import ChatWindow from "@/app/components/messages/ChatWindow";
import MessageInput from "@/app/components/messages/MessageInput";

export default function ChatPage({ params }: any) {
    const user = auth.currentUser;
    if (!user) return null;

    return (
        <Box maxWidth={800} mx="auto">
            <ChatWindow
                conversationId={params.id}
                userId={user.uid}
            />
            <MessageInput
                conversationId={params.id}
                userId={user.uid}
            />
        </Box>
    );
}
