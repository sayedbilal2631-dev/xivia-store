"use client";

import { db } from "@/app/config/firebase";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { StoreService } from "@/app/lib/services/store-services/storeServices";
import MUITextFieldEnhanced from "../common/TextField";
import CustomButton from "../common/Button";
import { EditIcon } from "lucide-react";
import CustomDialog from "../customDialog/CustomDialog";

interface Store {
    id: string;
    storeName: string;
    description: string;
}

const StoreForm = () => {
    const { firebaseUser } = useUser();
    const [store, setStore] = useState<Store | null>(null);
    const [draftName, setDraftName] = useState("");
    const [draftDescription, setDraftDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (!firebaseUser) return;

        const fetchStore = async () => {
            try {
                setFetching(true);
                const stores = await StoreService.getStoresByOwner(firebaseUser.uid);
                if (stores.length > 0) {
                    const s = stores[0];
                    const normalized: Store = {
                        id: s.id as any,
                        storeName: s.storeName || "",
                        description: s.description || "",
                    };
                    setStore(normalized);
                    setDraftName(normalized.storeName);
                    setDraftDescription(normalized.description);
                }
            } catch (error) {
                console.error("Error fetching store:", error);
            } finally {
                setFetching(false);
            }
        };

        fetchStore();
    }, [firebaseUser]);


    const handleOpen = () => {
        if (!store) return;
        setDraftName(store.storeName);
        setDraftDescription(store.description);
        setOpen(true);
    };


    const handleSave = async () => {
        if (!store) return;

        try {
            setLoading(true);

            await updateDoc(doc(db, "stores", store.id), {
                storeName: draftName.trim(),
                description: draftDescription.trim(),
                updatedAt: new Date(),
            });

            setStore({
                ...store,
                storeName: draftName.trim(),
                description: draftDescription.trim(),
            });

            setOpen(false);
        } catch (error) {
            console.error("Error updating store:", error);
            alert("Failed to update store");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (!store) {
        return (
            <Typography color="error">
                No store found for this account.
            </Typography>
        );
    }


    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Store Information
            </Typography>

            {/* Display mode */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                p={2}
                border="1px solid #eee"
                borderRadius={2}
            >
                <Box>
                    <Typography fontWeight={600}>{store.storeName}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        {store.description || "No description provided"}
                    </Typography>
                </Box>

                <CustomButton
                    height="42px"
                    buttonType="orange"
                    startIcon={<EditIcon size={18} />}
                    onClick={handleOpen}
                >
                    Edit
                </CustomButton>
            </Box>

            {/* Edit dialog */}
            <CustomDialog open={open} onClose={() => setOpen(false)} btnTitle="Cancel">
                <Box display="grid" gap={2} maxWidth={600} pt={1}>
                    <MUITextFieldEnhanced
                        label="Store Name"
                        value={draftName}
                        onChange={(e: any) => setDraftName(e.target.value)}
                        fullWidth
                    />

                    <MUITextFieldEnhanced
                        label="Store Description"
                        value={draftDescription}
                        onChange={(e: any) => setDraftDescription(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                    />

                    <Box display="flex" gap={2} justifyContent="flex-start" mt={2}>

                        <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </Box>
                </Box>
            </CustomDialog>
        </Box>
    );
};

export default StoreForm;
