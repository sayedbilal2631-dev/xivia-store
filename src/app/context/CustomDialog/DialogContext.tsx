"use client"
import React, { createContext, useContext, useState } from 'react'
interface dialogContext {
    open: boolean,
    onClose: () => void;
    setTrue: () => void;
    setFalse: () => void;
}

const customDialogContext = createContext<dialogContext | null>(null)
const DialogContext = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    const setTrue = () => setOpen(true);
    const setFalse = () => setOpen(false);
    const onClose = () => setOpen((prev) => !prev)
    return (
        <customDialogContext.Provider value={{ open, setTrue, setFalse, onClose }}>
            {children}
        </customDialogContext.Provider>
    )
}

export const useDialog = () => {
    const context = useContext(customDialogContext)
    if (!context) {
        throw new Error('Error Occur context not found');
    }
}

export default DialogContext