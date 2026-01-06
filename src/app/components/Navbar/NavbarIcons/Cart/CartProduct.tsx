"use client";
import { Typography, Card, CardContent, IconButton, Box } from "@mui/material";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext/CartContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const CartProduct = ({ data }: { data: any }) => {
    const { removeFromCart } = useCart();
    const router = useRouter();
    const shortTitle = data.title.split(" ").slice(0, 2).join(" ");

    return (
        <Card
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                p: 1,
                mb: 1,
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
        >
            {/* Product Image */}
            <Box sx={{width:'70px', height:'70px', position:'relative'}}>
                <Image
                    src={data.thumbnail}
                    alt={data.title}
                    fill
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                />
            </Box>
            {/* Product Details */}
            <CardContent sx={{ flex: 1, ml: 2, p: 0 }}>
                <Typography variant="subtitle2" fontWeight="bold" noWrap>
                    {shortTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ${data.price}
                </Typography>
            </CardContent>

            {/* View Product */}
            <IconButton
                onClick={() => router.push(`/products/${data.id}`)}
                color="primary"
                sx={{
                    "&:hover": {
                        backgroundColor: "rgba(13,110,253,0.1)",
                        transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease",
                }}
            >
                <Eye />
            </IconButton>

            {/* Remove from Cart */}
            <IconButton
                onClick={() => removeFromCart(data.id)}
                color="error"
                sx={{
                    "&:hover": {
                        backgroundColor: "rgba(255,0,0,0.1)",
                        transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease",
                }}
            >
                <DeleteOutlineIcon />
            </IconButton>
        </Card>
    );
};

export default CartProduct;
