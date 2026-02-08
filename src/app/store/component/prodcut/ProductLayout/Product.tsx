"use client";

import {
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    Card,
    CardContent,
} from "@mui/material";
import { ArrowDropDown, Inventory } from "@mui/icons-material";
import GetProduct from "../FetchProduct/GetProduct";
import React, { useState } from "react";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";

const Product = ({ isProduct }: any) => {
    const [sortOption, setSortOption] = useState("mostRecent");
    const { firebaseUser } = useUser();

    const handleSortChange = (event: any) => {
        setSortOption(event.target.value);
    };

    return (
        <Box sx={{ width: "100%" }}>
            {/* Sort Header */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 2,
                    mb: 3,
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: "grey.50",
                    borderRadius: 2,
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "0.85rem", sm: "0.9rem" },
                        color: "text.secondary",
                    }}
                >
                    Showing products
                </Typography>

                {/* Sort Select */}
                <FormControl
                    size="small"
                    sx={{
                        minWidth: { xs: "100%", sm: 180 },
                    }}
                >
                    <Select
                        value={sortOption}
                        onChange={handleSortChange}
                        displayEmpty
                        IconComponent={ArrowDropDown}
                        variant="standard"
                        disableUnderline
                        sx={{
                            fontSize: "0.875rem",
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: "#fff",
                            width: "100%",
                            "& .MuiSelect-select": {
                                py: 1,
                            },
                        }}
                    >
                        <MenuItem value="mostRecent">Most Recent</MenuItem>
                        <MenuItem value="highestPrice">Highest Price</MenuItem>
                        <MenuItem value="lowestPrice">Lowest Price</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Content / Empty State */}
            <Card
                variant="outlined"
                sx={{
                    borderRadius: 2,
                    minHeight: 300,
                }}
            >
                <CardContent
                    sx={{
                        textAlign: "center",
                        py: { xs: 6, sm: 8 },
                        px: { xs: 2, sm: 3 },
                        color: "text.secondary",
                    }}
                >
                    {isProduct === true ? (
                        <GetProduct
                            storeId={firebaseUser?.uid}
                            filter={sortOption}
                        />
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Inventory
                                sx={{
                                    fontSize: { xs: 48, sm: 64 },
                                    mb: 1,
                                    opacity: 0.5,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: "1rem", sm: "1.1rem" },
                                }}
                            >
                                No items listed at this time
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: { xs: "0.85rem", sm: "0.9rem" },
                                    maxWidth: 400,
                                }}
                            >
                                Check back later for new items from this shop.
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Product;
