"use client";
import { Box, Typography, } from "@mui/material";
import Product from "../../prodcut/ProductLayout/Product";
import MUIButton from "@/app/components/common/Button";
import UserStore from "../getstore/UserStore";
import { useState } from "react";

interface StoreDescriptionProps {
    data: {
        storeName: string;
    };
    isProduct: boolean;
}

const StoreDescription = ({ data, isProduct }: StoreDescriptionProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleProductUpload = () => {
        setOpen(prev => !prev);
    };

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Box sx={{ mb: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                        >
                            {data.storeName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            No reviews yet
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>

                        <MUIButton
                            onClick={handleProductUpload}
                            color="success"
                            buttonType="orange"
                        >
                            Add Product
                        </MUIButton>
                    </Box>
                </Box>
            </Box>

            {open ? (
                <UserStore open={open} setOpen={setOpen} />
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        gap: 4,
                        flexDirection: { xs: "column", md: "row" },
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Product isProduct={isProduct} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default StoreDescription;
