"use client";
import { StoreService } from "@/app/lib/services/store-services/storeServices";
import useCurrentUser from "@/app/hooks/getCurrentUser";
import { Box, Grid, Typography } from "@mui/material";
import ShowProduct from "../showProduct/ShowProduct";
import { Product } from "@/app/collections/schema";
import { useEffect, useState } from "react";

const GetProduct = ({ filter }: { filter: string }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const user = useCurrentUser();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            if (!user?.uid) return;

            const data = await StoreService.getUserProducts(user.uid);

            let sorted = [...data];

            if (filter === "lowestPrice") {
                sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
            }

            if (filter === "highestPrice") {
                sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
            }

            if (filter === "mostRecent") {
                sorted.sort(
                    (a, b) =>
                        b.createdAt.seconds - a.createdAt.seconds
                );
            }

            setProducts(sorted);
            setLoading(false);
        };

        fetchProducts();
    }, [user?.uid, filter]);
    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading products...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>

            {products.length === 0 ? (
                <Typography>No products found.</Typography>
            ) : (
                <Grid container spacing={'10px'}>
                    {products.map((product) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                                <ShowProduct key={product.id} data={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default GetProduct;
