"use client";

import { StoreService } from "@/app/lib/services/store-services/storeServices";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import CustomDialog from "@/app/components/customDialog/CustomDialog";
import CreateProductForm from "../uploadProduct/UploadProduct";
import useCurrentUser from "@/app/hooks/getCurrentUser";
import ShowProduct from "../showProduct/ShowProduct";
import { Product } from "@/app/collections/schema";
import { useEffect, useState } from "react";

const GetProduct = ({
    filter,
    storeId,
}: {
    filter: string;
    storeId: string | any;
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const user = useCurrentUser();

    useEffect(() => {
        const fetchProducts = async () => {
            if (!user?.uid || !storeId) return;

            try {
                setLoading(true);

                const data = await StoreService.getUserProducts(storeId);
                let sorted = [...data];

                if (filter === "lowestPrice") {
                    sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
                }

                if (filter === "highestPrice") {
                    sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
                }

                if (filter === "mostRecent") {
                    sorted.sort(
                        (a, b) => b.createdAt.seconds - a.createdAt.seconds
                    );
                }

                setProducts(sorted);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [user?.uid, storeId, filter]);

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProduct(null);
    };

    const handleDelete = async (product: Product) => {
        try {
            setProducts((prev) => prev.filter((p) => p.id !== product.id));
            await StoreService.permanentlyDeleteProduct(product.id);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    /* LOADING STATE */
    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <CircularProgress size={28} />
                <Typography>Loading products…</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: "100%",
                p: { xs: 1.5, sm: 2, md: 3 },
            }}
        >
            {/* Header */}
            <Typography
                sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: {
                        xs: "1.2rem",
                        sm: "1.4rem",
                        md: "1.6rem",
                    },
                }}
            >
                Your Products
            </Typography>

            {/* Empty State */}
            {products.length === 0 ? (
                <Typography
                    sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                    }}
                >
                    No products found. Create your first product to get started.
                </Typography>
            ) : (
                /* PRODUCT GRID */
                <Grid
                    container
                    spacing={{ xs: 2, sm: 2.5, md: 3 }}
                >
                    {products.map((product) => (
                        <Grid
                            key={product.id}
                            size={{
                                xs: 12,   // mobile: 1 per row
                                sm: 6,    // tablet: 2 per row
                                md: 4,    // desktop: 3 per row
                                lg: 3,    // large: 4 per row
                            }}
                        >
                            <ShowProduct
                                data={product}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Edit / Create Dialog */}
            <CustomDialog
                open={openDialog}
                onClose={handleCloseDialog}
                btnTitle="Cancel"
            >
                <CreateProductForm
                    open={openDialog}
                    setOpen={setOpenDialog}
                    product={selectedProduct}
                />
            </CustomDialog>
        </Box>
    );
};

export default GetProduct;
