"use client";

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Badge, IconButton } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useState } from "react";
import { db } from "@/app/config/firebase";

interface Props {
  userId: string;
}

const NotificationBadge = ({ userId }: Props) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'messages'), where('receiverId', '==', userId), where('read', '==', false));
    const unsubscribe = onSnapshot(q, snapshot => {
      setUnreadCount(snapshot.size);
    });
    return () => unsubscribe();
  }, [userId]);

  return (
    <IconButton>
      <Badge badgeContent={unreadCount} color="error">
        <MailIcon />
      </Badge>
    </IconButton>
  );
};

export default NotificationBadge;
