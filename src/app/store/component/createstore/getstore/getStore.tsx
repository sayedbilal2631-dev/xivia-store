"use client";
import { StoreService } from "@/app/lib/services/store-services/storeServices";
import CreateProductForm from "../../prodcut/uploadProduct/UploadProduct";
import CustomDialog from "@/app/components/customDialog/CustomDialog";
import StoreDescription from "../storeDescription/StoreDescription";
import { CircularProgress, Box, Alert, } from "@mui/material";
import CreateStoreForm from "../CreateStoreForm/CreateStore";
import { Product, Store } from "@/app/collections/schema";
import useCurrentUser from "@/app/hooks/getCurrentUser";
import React, { useEffect, useState } from "react";

const UserStore = ({ setOpen, open }: any) => {
    const [store, setStore] = useState<Store | null>(null);
    const [product, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const user = useCurrentUser();
    const { uid } = user || {};
    useEffect(() => {
        const fetchStore = async () => {
            if (!uid) {
                setLoading(false);
                return;
            }
            try {
                const getProducts = await StoreService.getUserProducts(uid);
                const userStores = await StoreService.getStoresByOwner(uid);
                setProducts(getProducts);
                setStore(userStores.length > 0 ? userStores[0] : null);
            } catch (error) {
                console.error("Error fetching user store:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStore();
    }, [uid]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (open) {
        return (
            <CustomDialog
                onClose={setOpen}
                open={product.length > 0 ? true : false}
                children={<CreateProductForm open={open} setOpen={setOpen} />}
                btnTitle="Cancel"
            />
        )
    }
    if (!store) {
        if (store) { return };
        return (
            <Box textAlign="center" mt={4}>
                <Alert>
                    You don’t have a store yet.
                </Alert>
                <CreateStoreForm />
            </Box>
        );
    }
    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <StoreDescription data={store} isProduct={product.length > 0 ? true : false} />
        </Box>
    );
};

export default UserStore;
