"use client";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { Box, Button, Typography } from "@mui/material";
import { db } from "@/app/config/firebase";
import { getAuth } from "firebase/auth";

const DangerZone = () => {
    const { firebaseUser } = useUser();

    const disableStore = async () => {
        if (!firebaseUser) return;

        await updateDoc(doc(db, "stores", firebaseUser.uid), {
            status: "disabled",
        });

        alert("Store disabled");
    };

    const deleteAccount = async () => {
        const auth = getAuth();
        if (!auth.currentUser) return;

        await deleteDoc(doc(db, "users", auth.currentUser.uid));
        await deleteDoc(doc(db, "stores", auth.currentUser.uid));
        await auth.currentUser.delete();

        alert("Account deleted");
    };

    return (
        <Box>
            <Typography variant="h6" color="error" gutterBottom>
                Danger Zone
            </Typography>

            <Box display="flex" gap={2}>
                <Button color="warning" variant="outlined" onClick={disableStore}>
                    Disable Store
                </Button>

                <Button color="error" variant="contained" onClick={deleteAccount}>
                    Delete Account
                </Button>
            </Box>
        </Box>
    );
};

export default DangerZone;
