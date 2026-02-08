"use client";
import { StoreService } from "@/app/lib/services/store-services/storeServices";
import CreateProductForm from "../../prodcut/uploadProduct/UploadProduct";
import CustomDialog from "@/app/components/customDialog/CustomDialog";
import StoreDescription from "../storeDescription/StoreDescription";
import { Box, CircularProgress, Alert } from "@mui/material";
import { Product, Store } from "@/app/collections/schema";
import React, { useEffect, useState } from "react";
import MUIButton from "@/app/components/common/Button";
import CreateStoreForm from "../CreateStoreForm/CreateStore";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";


const UserStore = ({ open, setOpen }: any) => {
    const [store, setStore] = useState<Store | null>(null);
    const [createStore, setCreateStore] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { firebaseUser } = useUser();

    useEffect(() => {
        const fetchStoreData = async () => {
            if (!firebaseUser) {
                setLoading(false);
                return;
            }

            try {
                const [userProducts, userStores] = await Promise.all([
                    StoreService.getUserProducts(firebaseUser?.uid),
                    StoreService.getStoresByOwner(firebaseUser?.uid),
                ]);

                setProducts(userProducts);
                setStore(userStores.length > 0 ? userStores[0] : null);
            } catch (error) {
                console.error("Error fetching user store:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [firebaseUser]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (!store) {
        return (
            <Box textAlign="center" sx={{ display: 'flex', justifyContent: 'space-between', height: '80px', alignItems: 'center' }} mt={4}>
                <Alert severity="info" sx={{ mb: 2 }}>
                    You don’t have a store yet.
                </Alert>
                <MUIButton
                    onClick={() => setCreateStore(!createStore)}
                    color={'success'}
                    buttonType={'orange'} >
                    CreateStore
                </MUIButton>
                <CustomDialog
                    open={createStore}
                    onClose={() => setCreateStore(false)}
                    children={<CreateStoreForm />}
                    btnTitle="Cancel"
                />
            </Box>
        );
    }

    return (
        <Box mt={4}>
            {open ?
                <CustomDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    btnTitle="Cancel"
                >
                    <CreateProductForm open={open} setOpen={setOpen} />
                </CustomDialog>
                :
                <StoreDescription
                    data={store}
                    isProduct={products.length > 0}
                />
            }
        </Box>
    );
};

export default UserStore;
