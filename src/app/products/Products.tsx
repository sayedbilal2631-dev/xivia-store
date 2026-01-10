"use client";

import { FirebaseServices } from "../services/firebase/Firebase";
import GlobalCard from "../components/common/globalCard";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Product } from "../collections/schema";

// interface Product {
//     id: string;
//     title: string;
//     price: number;
//     description: string;
//     thumbnail: string;
//     category?: string;
// }

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await FirebaseServices.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Grid container spacing={2}>
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
