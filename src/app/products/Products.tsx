"use client";

import GlobalCard from "../components/common/ProductCard";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    [key: string]: any;
}



const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    // Fetch categories
    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    // Fetch products
    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data.products))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    let cate = products.map((item) => item.category)
    let filter = products.filter((item)=> item.category === "beauty");
    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid key={product.id} size={{ md: 3, sm: 4, xs: 6 }}>
                    <GlobalCard data={product} />
                </Grid>
            ))}
        </Grid>
    );

};

export default Products;
