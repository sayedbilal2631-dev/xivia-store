"use client"
import { CardContent, Typography, Button, Stack, Card, Box, } from "@mui/material";
import { useBoolean } from "@/app/context/ProductContext/ProductContext";
import { Inventory, Search, Store, } from "@mui/icons-material";
import Product from "../../prodcut/ProductLayout/Product";
import MUIButton from "@/app/components/common/Button";
import UserStore from "../getstore/getStore";
import { useState } from "react";

const StoreDescription = ({ data, isProduct }: any,) => {
    const [open, setOpen] = useState<boolean>(false)
    // const { loadProduct, toggle } = useBoolean();
    const handleProductUpload = () => {
        setOpen(() => open === true ? false : true)
    }

    return (
        <Box sx={{ width: { xs: '100%', md: '100%' }, margin: 'auto', p: 2 }}>
            {/* Shop Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                            {data.storeName}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                No reviews yet
                            </Typography>
                        </Stack>
                    </Box>
                    <Box>
                        <MUIButton color="secondary" variant="outlined" startIcon={<Store />} buttonType={'soft'}>
                            Edit shop
                        </MUIButton>
                        <MUIButton onClick={handleProductUpload} color="success" buttonType={'orange'}>
                            Add Product
                        </MUIButton>
                    </Box>
                </Box>
            </Box>
            {/* Check if product is state is true  */}
            {open ? <UserStore setOpen={setOpen} open={open} /> : <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                {/* Left Sidebar */}
                <Box sx={{ width: { md: 250 }, flexShrink: 0 }}>
                    {/* Items Section */}
                    <Card
                        variant="outlined"
                        sx={{
                            mb: 3,
                            borderRadius: 3,
                            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                            p: 1,
                        }}
                    >
                        <CardContent sx={{ p: "16px !important" }}>
                            {/* Search Section */}
                            <Box
                                sx={{
                                    display: "flex", alignItems: "center", gap: 1.2, mb: 2, p: 1, borderRadius: 2, cursor: "pointer", transition: "0.2s",
                                    "&:hover": {
                                        background: "rgba(0,0,0,0.05)",
                                    },
                                }}
                            >
                                <Search fontSize="small" sx={{ color: "text.primary" }} />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    Search items
                                </Typography>
                            </Box>

                            {/* Divider */}
                            <Box sx={{ width: "100%", height: "1px", background: "#e5e5e5", mb: 2 }} />

                            {/* All Items Section */}
                            <Box
                                sx={{
                                    display: "flex", alignItems: "center", gap: 1.2, p: 1, borderRadius: 2,
                                    cursor: "pointer", transition: "0.2s",
                                    "&:hover": {
                                        background: "rgba(0,0,0,0.05)",
                                    },
                                }}
                            >
                                <Inventory fontSize="small" sx={{ color: "text.primary" }} />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    All items
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                </Box>

                {/* Main Content Area */}
                <Box sx={{ flex: 1 }}>
                    <Product isProduct={isProduct} />
                </Box>
            </Box>}

        </Box >
    );
};

export default StoreDescription;