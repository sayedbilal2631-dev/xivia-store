// // "use client"
// // import MessageInput from "@/app/store/component/messages/MessageInput";
// // import ChatWindow from "@/app/store/component/messages/ChatWindow";
// // import { useUser } from "@/app/context/CurrentUser/CurrentUser";

// // export default function Page({ params }: any) {
// //   const { firebaseUser } = useUser()
// //   if (!firebaseUser?.uid) return null;
// //   return (
// //     <>
// //       <ChatWindow conversationId={params.id} userId={firebaseUser.uid} />
// //       <MessageInput conversationId={params.id} senderId={firebaseUser.uid} receiverId="" />
// //     </>
// //   );
// // }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Box, TextField, Button, List, ListItem, Typography, Paper } from "@mui/material";
// import { listenMessages, sendMessage } from "@/app/services/messages/messagingServices";

// interface ChatProps {
//   conversationId: string;
//   currentUserId: string;
//   receiverId: string;
// }

// export default function Chat({ conversationId, currentUserId, receiverId }: ChatProps) {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Scroll to bottom when messages update
//   const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

//   useEffect(() => {
//     if (!conversationId) return;

//     const unsubscribe = listenMessages(conversationId, (msgs) => {
//       setMessages(msgs);
//       scrollToBottom();
//     });

//     return () => unsubscribe();
//   }, [conversationId]);

//   const handleSend = async () => {
//     if (!newMessage.trim()) return;

//     await sendMessage(conversationId, currentUserId, receiverId, newMessage.trim());
//     setNewMessage("");
//   };

//   return (
//     <Box display="flex" flexDirection="column" height="100%" p={2}>
//       {/* Messages */}
//       <List
//         sx={{
//           flex: 1,
//           overflowY: "auto",
//           mb: 2,
//           display: "flex",
//           flexDirection: "column",
//           gap: 1,
//         }}
//       >
//         {messages.map((msg) => (
//           <ListItem
//             key={msg.id}
//             sx={{
//               justifyContent: msg.senderId === currentUserId ? "flex-end" : "flex-start",
//             }}
//           >
//             <Paper
//               sx={{
//                 p: 1.5,
//                 maxWidth: "70%",
//                 bgcolor: msg.senderId === currentUserId ? "primary.main" : "grey.300",
//                 color: msg.senderId === currentUserId ? "white" : "black",
//               }}
//             >
//               <Typography variant="body1">{msg.message}</Typography>
//             </Paper>
//           </ListItem>
//         ))}
//         <div ref={messagesEndRef}></div>
//       </List>

//       {/* Input */}
//       <Box display="flex" gap={1}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <Button variant="contained" color="primary" onClick={handleSend}>
//           Send
//         </Button>
//       </Box>
//     </Box>
//   );
// }

