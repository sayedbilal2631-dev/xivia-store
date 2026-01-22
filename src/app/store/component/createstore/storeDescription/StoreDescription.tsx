"use client";
import { Box, Card, CardContent, Typography, } from "@mui/material";
import { Inventory, Search,  } from "@mui/icons-material";
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
                    <Box sx={{ width: { md: 260 }, flexShrink: 0 }}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                            }}
                        >
                            <CardContent>
                                {/* Search */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.2,
                                        p: 1,
                                        mb: 2,
                                        borderRadius: 2,
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: "rgba(0,0,0,0.05)",
                                        },
                                    }}
                                >
                                    <Search fontSize="small" />
                                    <Typography fontWeight={500}>
                                        Search items
                                    </Typography>
                                </Box>

                                <Box sx={{ height: 1, backgroundColor: "#e5e5e5", mb: 2 }} />

                                {/* All Items */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.2,
                                        p: 1,
                                        borderRadius: 2,
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: "rgba(0,0,0,0.05)",
                                        },
                                    }}
                                >
                                    <Inventory fontSize="small" />
                                    <Typography fontWeight={500}>
                                        All items
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Product isProduct={isProduct} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default StoreDescription;
