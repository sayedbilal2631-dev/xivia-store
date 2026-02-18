"use client";
import { Box, Typography, CircularProgress, Card, Chip, Rating, Button, Container, Stack, Breadcrumbs, TextField, } from "@mui/material";
import { NavigateNext, Home, Star, } from "@mui/icons-material";
import { useCart } from "@/app/context/CartContext/CartContext";
import CustomButton from "@/app/components/common/Button";
import { useParams, useRouter } from "next/navigation";
import { ArrowDown, ArrowUp } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/app/config/firebase";
import image from "/public/product.jpg";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    stock: number;
    thumbnail: string;
    images: string[];
    storeId: string;
    primaryImage: string;
    sellerStripeId: string
}

const ProductDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [orderQty, setOrderQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            try {
                const ref = doc(db, "products", id as string);
                const snap = await getDoc(ref);

                if (!snap.exists()) {
                    setProduct(null);
                    return;
                }

                setProduct({ id: snap.id, ...snap.data() } as Product);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" minHeight="60vh">
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
                <Button sx={{ mt: 2 }} onClick={() => router.push("/")}>
                    Back to Home
                </Button>
            </Box>
        );
    }

    const handleQtyChange = (value: string) => {
        const num = Number(value);

        if (!num || num < 1) setOrderQty(1);
        else if (num > product.stock) setOrderQty(product.stock);
        else setOrderQty(num);
    };

    const handleCart = () => {
        addToCart(product.id);
        toast.success("Item Added To Cart ");
    };

    //  Stripe Checkout (Only Payment, No Order Creation Yet)
    const handleStripeCheckout = async () => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
                {
                    product: product,
                    sellerStripeAccountId: product.sellerStripeId
                }
            );

            toast.success("Redirecting to payment...");
            window.location.href = res.data.url;
        } catch (error) {
            console.log(error)
            toast.error(`Checkout failed ${error}` );
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 4 }}>
                <Link href="/" style={{ display: "flex", alignItems: "center" }}>
                    <Home sx={{ mr: 0.5 }} fontSize="inherit" /> Home
                </Link>
                <Typography>{product.category}</Typography>
            </Breadcrumbs>

            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
                {/* Images */}
                <Box flex={1}>
                    <Card sx={{ p: 2 }}>
                        <Box
                            sx={{
                                minHeight: 400,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {imageLoading && <CircularProgress />}
                            <Image
                                src={
                                    product.images[selectedImage] ||
                                    product.primaryImage ||
                                    image
                                }
                                alt={product.name}
                                width={400}
                                height={400}
                                style={{ objectFit: "contain" }}
                                onLoad={() => setImageLoading(false)}
                            />
                        </Box>

                        <Stack direction="row" spacing={1} mt={2}>
                            {product.images.map((img, i) => (
                                <Box
                                    key={i}
                                    width={80}
                                    height={80}
                                    onClick={() => {
                                        setSelectedImage(i);
                                        setImageLoading(true);
                                    }}
                                    sx={{
                                        cursor: "pointer",
                                        border:
                                            selectedImage === i
                                                ? "2px solid"
                                                : "1px solid #ddd",
                                    }}
                                >
                                    <Image src={img} alt="" width={80} height={80} />
                                </Box>
                            ))}
                        </Stack>
                    </Card>
                </Box>

                {/* Details */}
                <Box flex={1}>
                    <Stack spacing={2}>
                        <Typography variant="h4" fontWeight="bold">
                            {product.name}
                        </Typography>

                        <Box display="flex" alignItems="center">
                            <Rating value={product.rating} readOnly />
                            <Chip icon={<Star />} label={product.rating} sx={{ ml: 2 }} />
                        </Box>

                        <Typography variant="h4" color="primary">
                            ${product.price}
                        </Typography>

                        {/* Quantity */}
                        <Box display="flex" gap={1} alignItems="center">
                            <ArrowUp
                                onClick={() =>
                                    setOrderQty(Math.min(orderQty + 1, product.stock))
                                }
                            />

                            <TextField
                                size="small"
                                value={orderQty}
                                onChange={(e) => handleQtyChange(e.target.value)}
                                inputProps={{
                                    style: { textAlign: "center", width: 60 },
                                }}
                            />

                            <ArrowDown
                                onClick={() => setOrderQty(Math.max(orderQty - 1, 1))}
                            />
                        </Box>

                        <Typography>{product.description}</Typography>

                        <Chip
                            label={
                                product.stock > 0
                                    ? `In Stock (${product.stock})`
                                    : "Out of Stock"
                            }
                            color={product.stock > 0 ? "success" : "error"}
                        />

                        {/* ACTIONS */}
                        <Stack direction="row" spacing={2} mt={2}>
                            <CustomButton
                                buttonType="soft"
                                variant="outlined"
                                onClick={handleCart}
                            >
                                Add to Cart
                            </CustomButton>

                            {/*  COD Order Placement */}
                            {/* <BuyNowButton
                                product={{
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    storeId: product.storeId,
                                    image: product.images[0] || "",
                                }}
                                quantity={orderQty}
                                sessionFn={() => toast.success("Order Created (COD) ")}
                            /> */}
                            <CustomButton
                                buttonType={'orange'}
                                variant="contained"
                                onClick={handleStripeCheckout} >
                                Pay with Stripe
                            </CustomButton>
                        </Stack>

                        {/* Stripe Payment Button */}

                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductDetails;
