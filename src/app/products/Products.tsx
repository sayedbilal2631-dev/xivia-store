"use client";

import { Alert, Grid } from "@mui/material";
import GlobalCard from "../components/common/globalCard";
import { useProducts } from "../hooks/prodcuts/useProduct";

interface ProductsProps {
    selectedCategory: string | null;
    search: string
}

const Products = ({ selectedCategory, search }: ProductsProps) => {
    const {
        data: products = [],
        isLoading,
        isError,
    } = useProducts(selectedCategory, search);

    if (isLoading) return <Alert severity="info">Loading products...</Alert>;
    if (isError) return <Alert severity="error">Error loading products</Alert>;

    return (
        <Grid container spacing={2}>
            {products.length === 0 && (
                <Alert severity="warning" sx={{ width: "100%" }}>
                    No products found for this category
                </Alert>
            )}

            {products.map((product) => (
                <Grid
                    key={product.id}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                >
                    <GlobalCard data={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Products;
