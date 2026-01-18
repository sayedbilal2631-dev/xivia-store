"use client";

import { Product } from "@/app/types/product";
import { Stack, Button, TextField } from "@mui/material";
import BuyNowButton from "../BuyNowButton/BuyNowButton";


interface Props {
    product: Product;
    quantity: number;
    onQuantityChange: (val: number) => void;
}

const ProductActions = ({
    product,
    quantity,
    onQuantityChange,
}: Props) => {
    return (
        <Stack spacing={2} mt={3}>
            <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) =>
                    onQuantityChange(
                        Math.max(1, Math.min(product.stock, Number(e.target.value)))
                    )
                }
                inputProps={{ min: 1, max: product.stock }}
                size="small"
                sx={{ width: 120 }}
            />

            <Button variant="outlined" fullWidth>
                Add to Cart
            </Button>

            <BuyNowButton
                product={{
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    storeId: product.storeId,
                }}
                quantity={quantity}
                fullWidth
            />
        </Stack>
    );
};

export default ProductActions;
