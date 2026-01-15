"use client";

import ChatWindow from "@/app/store/component/messages/ChatWindow";
import MessageInput from "@/app/store/component/messages/MessageInput";
import { auth } from "@/app/config/firebase";

export default function Page({ params }: any) {
  const user = auth.currentUser;
  if (!user) return null;

  return (
    <>
      <ChatWindow conversationId={params.id} userId={user.uid} />
      <MessageInput conversationId={params.id} userId={user.uid} />
    </>
  );
}
