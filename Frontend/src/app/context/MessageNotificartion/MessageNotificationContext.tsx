"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { useUser } from "../CurrentUser/CurrentUser";
import { db } from "@/app/config/firebase";

interface NotificationContextType {
    unreadCount: number;
}

const MessageNotificationContext = createContext<NotificationContextType>({
    unreadCount: 0,
});

export const MessageNotificationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { firebaseUser } = useUser();
    const [unreadCount, setUnreadCount] = useState(0);
    useEffect(() => {
        if (!firebaseUser) return;

        const q = query(
            collection(db, "conversations"),
            where("storeId", "==", firebaseUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let totalUnread = 0;

            snapshot.forEach((doc) => {
                const data = doc.data();
                const count = data.unreadCount?.store || 0;
                totalUnread += count;
            });

            setUnreadCount(totalUnread);
        });

        return () => unsubscribe();
    }, [firebaseUser]);

    return (
        <MessageNotificationContext.Provider value={{ unreadCount }}>
            {children}
        </MessageNotificationContext.Provider>
    );
};

export const useMessageNotification = () =>
    useContext(MessageNotificationContext);
