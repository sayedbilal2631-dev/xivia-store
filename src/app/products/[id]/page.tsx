"use client";
import {
    Box, Typography, CircularProgress, Card, Chip, Rating, Button, Container, Stack, Breadcrumbs, TextField,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Star, NavigateNext, Home } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useCart } from "@/app/context/CartContext/CartContext";
import AuthButton from "@/app/components/common/AuthButton";

interface Product {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    description: string;
    category: string;
    brand?: string;
    rating: number;
    stock: number;
    thumbnail: string;
    images: string[];
    reviews?: any[];
}

const ProductDetails = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);
    const [order, setOrder] = useState<number>(1);
    const router = useRouter();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            fetch(`https://dummyjson.com/products/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setProduct(data);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box textAlign="center" py={10}>
                <Typography variant="h5" color="error">
                    Product not found
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => router.push("/")}>
                    Back to Home
                </Button>
            </Box>
        );
    }

    const breadcrumbs = [
        <Link
            key="1"
            href="/"
            style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                color: "black",
            }}
        >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" /> Home
        </Link>,
        <Typography key="3" color="text.primary">
            {product.category}
        </Typography>,
    ];

    const discountPrice = product.price * (1 - product.discountPercentage / 100);

    const handleQuantityChange = (value: string) => {
        const num = parseInt(value, 10);
        if (!isNaN(num)) {
            if (num < 1) setOrder(1);
            else if (num > product.stock) setOrder(product.stock);
            else setOrder(num);
        } else {
            setOrder(1);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 4 }}>
                {breadcrumbs}
            </Breadcrumbs>

            {/* Inline Layout */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 4,
                    alignItems: "flex-start",
                }}
            >
                {/* Product Images */}
                <Box sx={{ flex: 1 }}>
                    <Card sx={{ p: 2, borderRadius: 2 }}>
                        <Box
                            sx={{
                                position: "relative",
                                borderRadius: 2,
                                overflow: "hidden",
                                backgroundColor: "#f8f9fa",
                                minHeight: 400,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {imageLoading && <CircularProgress sx={{ position: "absolute" }} />}

                            <Image
                                src={product.images?.[selectedImage] || product.thumbnail}
                                alt={product.title}
                                width={400}
                                height={400}
                                style={{
                                    objectFit: "contain",
                                    opacity: imageLoading ? 0 : 1,
                                    transition: "opacity 0.3s ease",
                                }}
                                onLoad={() => setImageLoading(false)}
                            />

                            {product.discountPercentage > 0 && (
                                <Chip
                                    label={`${product.discountPercentage}% OFF`}
                                    color="error"
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        top: 16,
                                        left: 16,
                                        fontWeight: "bold",
                                    }}
                                />
                            )}
                        </Box>

                        {/* Thumbnails */}
                        {product.images && product.images.length > 1 && (
                            <Stack direction="row" spacing={1} sx={{ mt: 2, overflowX: "auto" }}>
                                {product.images.map((image, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            border: selectedImage === index ? 2 : 1,
                                            borderColor:
                                                selectedImage === index ? "primary.main" : "grey.300",
                                            borderRadius: 1,
                                            cursor: "pointer",
                                            overflow: "hidden",
                                            flexShrink: 0,
                                        }}
                                        onClick={() => {
                                            setSelectedImage(index);
                                            setImageLoading(true);
                                        }}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.title} ${index + 1}`}
                                            width={80}
                                            height={80}
                                            style={{
                                                objectFit: "cover",

                                            }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </Card>
                </Box>

                {/* Product Details */}
                <Box sx={{ flex: 1 }}>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={1}>
                            <Chip label={product.category} variant="outlined" size="small" />
                            {product.brand && (
                                <Chip label={product.brand} variant="outlined" size="small" />
                            )}
                        </Stack>

                        <Typography variant="h4" fontWeight="bold">
                            {product.title}
                        </Typography>

                        <Box display="flex" alignItems="center">
                            <Rating value={product.rating} precision={0.1} readOnly />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {product.rating} ({product.reviews?.length || 0} reviews)
                            </Typography>
                            <Chip
                                icon={<Star />}
                                label={product.rating}
                                size="small"
                                color="primary"
                                sx={{ ml: 2 }}
                            />
                        </Box>

                        {/* Price */}
                        <Box>
                            {product.discountPercentage > 0 ? (
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="h4" fontWeight="bold" color="primary">
                                        ${discountPrice.toFixed(2)}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        sx={{ textDecoration: "line-through" }}
                                    >
                                        ${product.price}
                                    </Typography>
                                    <Typography variant="body2" color="error" fontWeight="bold">
                                        Save {product.discountPercentage}%
                                    </Typography>
                                </Stack>
                            ) : (
                                <Typography variant="h4" fontWeight="bold" color="primary">
                                    ${product.price}
                                </Typography>
                            )}
                        </Box>

                        {/* Quantity Selector */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <Box
                                sx={{
                                    height: "30px",
                                    width: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    bgcolor: "#f4f4f4",
                                    color: order >= product.stock ? "grey.500" : "black",
                                    "&:hover": {
                                        boxShadow:
                                            order < product.stock ? "0 0 5px rgba(0,0,0,0.2)" : "none",
                                        cursor: order < product.stock ? "pointer" : "not-allowed",
                                    },
                                }}
                                onClick={() => {
                                    if (order < product.stock) setOrder((prev) => prev + 1);
                                }}
                            >
                                <ArrowUp size={14} />
                            </Box>

                            {/* Input field */}
                            <TextField
                                type="number"
                                value={order}
                                onChange={(e) => handleQuantityChange(e.target.value)}
                                inputProps={{
                                    min: 1,
                                    max: product.stock,
                                    style: { textAlign: "center", width: "60px" },
                                }}
                                size="small"
                            />

                            <Box
                                sx={{
                                    height: "30px",
                                    width: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    bgcolor: "#f4f4f4",
                                    color: order <= 1 ? "grey.500" : "black",
                                    "&:hover": {
                                        boxShadow:
                                            order > 1 ? "0 0 5px rgba(0,0,0,0.2)" : "none",
                                        cursor: order > 1 ? "pointer" : "not-allowed",
                                    },
                                }}
                                onClick={() => {
                                    if (order > 1) setOrder((prev) => prev - 1);
                                }}
                            >
                                <ArrowDown size={14} />
                            </Box>
                        </Box>

                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                            {product.description}
                        </Typography>

                        <Chip
                            label={
                                product.stock > 0
                                    ? `In Stock (${product.stock})`
                                    : "Out of Stock"
                            }
                            color={product.stock > 0 ? "success" : "error"}
                        />

                        {/* Action Buttons */}
                        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    px: 4,
                                    py: 1,
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    borderWidth: 2,
                                    "&:hover": {
                                        borderWidth: 2,
                                        backgroundColor: "primary.light",
                                        color: "#fff",
                                    },
                                }}
                            // onClick={addToCart(product.id)}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    px: 4,
                                    py: 1,
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    "&:hover": { backgroundColor: "primary.dark" },
                                }}
                                onClick={() => alert(`Proceeding to buy ${order} ${product.title}`)}
                            >
                                Buy Now
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductDetails;
