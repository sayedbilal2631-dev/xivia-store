import { Box, Typography, Rating, Chip, Stack } from "@mui/material";
import { Star } from "@mui/icons-material";
import { Product } from "@/app/types/product";

const ProductInfo = ({ product }: { product: Product }) => {
    const discountPrice =
        product.price * (1 - product.discountPercentage / 100);

    return (
        <Stack spacing={2}>
            <Typography variant="h4" fontWeight="bold">
                {product.title}
            </Typography>

            <Box display="flex" alignItems="center">
                <Rating value={product.rating} readOnly />
                <Chip
                    icon={<Star />}
                    label={product.rating}
                    color="primary"
                    sx={{ ml: 2 }}
                />
            </Box>

            <Typography variant="h4" color="primary">
                ${discountPrice.toFixed(2)}
            </Typography>

            <Typography variant="body1">
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
        </Stack>
    );
};

export default ProductInfo;
