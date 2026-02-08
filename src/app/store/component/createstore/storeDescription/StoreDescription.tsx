"use client";

import { Box, Typography } from "@mui/material";
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
        setOpen((prev) => !prev);
    };

    return (
        <Box
            sx={{
                width: "100%",
                p: { xs: 1.5, sm: 2, md: 3 },
            }}
        >
            {/* Header Section */}
            <Box sx={{ mb: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: 2,
                    }}
                >
                    {/* Store Info */}
                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                textTransform: "capitalize",
                                fontSize: {
                                    xs: "1.4rem",
                                    sm: "1.6rem",
                                    md: "2rem",
                                },
                                lineHeight: 1.2,
                                wordBreak: "break-word",
                            }}
                        >
                            {data.storeName}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", mt: 0.5 }}
                        >
                            No reviews yet
                        </Typography>
                    </Box>

                    {/* Action Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            width: { xs: "100%", sm: "auto" },
                            justifyContent: { xs: "flex-start", sm: "flex-end" },
                        }}
                    >
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

            {/* Content Section */}
            {open ? (
                <UserStore open={open} setOpen={setOpen} />
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 2, md: 4 },
                        width: "100%",
                    }}
                >
                    {/* Products */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Product isProduct={isProduct} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default StoreDescription;
