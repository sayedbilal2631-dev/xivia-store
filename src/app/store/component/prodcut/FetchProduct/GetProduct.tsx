"use client";

import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Stack, Pagination } from "@mui/material";
import { StoreService } from "@/app/lib/services/store-services/storeServices";
import CustomDialog from "@/app/components/customDialog/CustomDialog";
import CreateProductForm from "../uploadProduct/UploadProduct";
import useCurrentUser from "@/app/hooks/getCurrentUser";
import ShowProduct from "../showProduct/ShowProduct";
import { Product } from "@/app/collections/schema";
import CustomButton from "@/app/components/common/Button";

const PRODUCTS_PER_PAGE = 6;

const GetProduct = ({
  filter,
  storeId,
}: {
  filter: string;
  storeId: string | any;
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [conform, setConform] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const {user} = useCurrentUser();

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
          sorted.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
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

  const handleOpenConfirm = (product: Product) => {
    setProductToDelete(product);
    setConform(true);
  };

  const handleDelete = async (product: Product) => {
    try {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      await StoreService.permanentlyDeleteProduct(product.id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    await handleDelete(productToDelete);
    setConform(false);
    setProductToDelete(null);
  };

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
        <Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, sm: 2.5, md: 3 },
              justifyContent: "center",
              mt: 2,
            }}
          >
            {paginatedProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  flex: {
                    xs: "1 1 100%",
                    sm: "1 1 calc(50% - 16px)",
                    md: "1 1 calc(33.33% - 20px)",
                  },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ShowProduct
                  data={product}
                  onEdit={handleEdit}
                  onDelete={handleOpenConfirm}
                />
              </Box>
            ))}
          </Box>

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
        </Box>
      )}

      <CustomDialog open={conform} onClose={() => setConform(false)}>
        <Typography sx={{ mb: 2 }}>
          Are you sure you want to delete this product?
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <CustomButton buttonType="orange" onClick={handleConfirmDelete}>
            Delete
          </CustomButton>

          <CustomButton buttonType="soft" onClick={() => setConform(false)}>
            Cancel
          </CustomButton>
        </Box>
      </CustomDialog>

      <CustomDialog open={openDialog} onClose={handleCloseDialog} btnTitle="Cancel">
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
