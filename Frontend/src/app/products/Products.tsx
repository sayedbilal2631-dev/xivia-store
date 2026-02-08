"use client";

import { Alert, Pagination, Stack, Box } from "@mui/material";
import { useUser } from "../context/CurrentUser/CurrentUser";
import { useProducts } from "../hooks/prodcuts/useProduct";
import GlobalCard from "../components/common/globalCard";
import { useState } from "react";

interface ProductsProps {
    selectedCategory: string | null;
    search: string;
}

const PRODUCTS_PER_PAGE = 30;

const Products = ({ selectedCategory, search }: ProductsProps) => {
    const { data: products = [], isLoading, error } = useProducts(selectedCategory, search);
    const { firebaseUser } = useUser();
    const [page, setPage] = useState(1);

    // Correct total pages
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    // Slice products for current page
    const paginatedProducts = products.slice(
        (page - 1) * PRODUCTS_PER_PAGE,
        page * PRODUCTS_PER_PAGE
    );

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading)
        return <Alert severity="info">Loading products...</Alert>;

    if (error)
        return (
            <Alert severity="error">
                {firebaseUser?.uid
                    ? `Error loading products: ${error}`
                    : `Create or Sign In To Your Account`}
            </Alert>
        );

    return (
        <Box>
            {/* Grid */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: { xs: 2, sm: 2, md: 2 },
                    justifyContent: "center",
                    mt: 2,
                }}
            >
                {paginatedProducts.length === 0 && (
                    <Alert severity="warning" sx={{ width: "100%" }}>
                        No products found for this category
                    </Alert>
                )}

                {paginatedProducts.map((product) => (
                        <GlobalCard key={product.id} data={product} />
                ))}
            </Box>

            {/* Pagination */}
            {totalPages > 1 && (
                <Stack direction="row" justifyContent="center" mt={4}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            )}
        </Box>
    );
};

export default Products;
