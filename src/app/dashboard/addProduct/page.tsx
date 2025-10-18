"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
// import { StoreService } from "@/app/services/storeService";
import { ProductStatus } from "@/app/collections/schema";
import { StoreService } from "@/app/lib/services/store-services/storeServices";

interface ProductFormData {
  storeId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  tags: string[];
  image: string;
  status: ProductStatus;
}

const ProductDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    storeId: "store123", // replace this with logged-in store’s ID
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    tags: [],
    image: "",
    status: "active",
  });

  // ✅ Fetch all products by store
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await StoreService.getProductsByStore(formData.storeId);
      setProducts(result);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Handle field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  // ✅ Handle tag input
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((t) => t.trim());
    setFormData((prev) => ({ ...prev, tags }));
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productId = await StoreService.createProduct({
        storeId: formData.storeId,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        stock: formData.stock,
        tags: formData.tags,
        images: [formData.image],
        status: formData.status,
      } as any);

      alert(`✅ Product added successfully! ID: ${productId}`);
      setFormData({
        ...formData,
        name: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        tags: [],
        image: "",
      });

      await fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        🛒 Manage Your Products
      </Typography>

      {/* Product Creation Form */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          boxShadow: 3,
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <Typography variant="h6" fontWeight={500} mb={2}>
          ➕ Add New Product
        </Typography>

        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            label="Stock Quantity"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
          <TextField
            label="Tags (comma-separated)"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={handleTagsChange}
          />
          <TextField
            label="Product Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Add Product"}
          </Button>
        </Box>
      </Paper>

      {/* Product List */}
      <Typography variant="h6" fontWeight={500} gutterBottom>
        📦 Your Products
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <Typography color="text.secondary">No products added yet.</Typography>
      ) : (
        <Grid container spacing={3} mt={1}>
          {products.map((product) => (
            <Grid size={{xs:12, sm:6, md:4}} key={product.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={
                    product.images?.[0] ||
                    "https://via.placeholder.com/300x160.png?text=No+Image"
                  }
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {product.description?.slice(0, 60)}...
                  </Typography>
                  <Typography variant="body1" color="primary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductDashboard;
