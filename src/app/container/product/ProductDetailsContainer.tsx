"use client";

import { useState } from "react";
import { Container, Box } from "@mui/material";
import { Product } from "@/app/types/product";
import ProductGallery from "@/app/components/Product/ProductGallery";
import ProductInfo from "@/app/components/Product/ProductInfo";
import ProductActions from "@/app/components/Product/ProductActions";


const ProductDetailsContainer = ({ product }: { product: Product }) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap={4}
            >
                <ProductGallery images={product.images} thumbnail={product.thumbnail} />

                <Box flex={1}>
                    <ProductInfo product={product} />
                    <ProductActions
                        product={product}
                        quantity={quantity}
                        onQuantityChange={setQuantity}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default ProductDetailsContainer;
