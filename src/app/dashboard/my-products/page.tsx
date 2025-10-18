"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { firebaseService } from "@/app/lib/services/firestoreservices/fireStore";

export default function MyProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await firebaseService.getUserProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress />
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          You haven’t uploaded any products yet.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddBoxIcon />}
          href="/dashboard/add-product"
        >
          Add Your First Product
        </Button>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        My Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid  size={{xs:12, sm:6, md:4 }} key={product.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
              <CardMedia
                component="img"
                height="180"
                image={product.image || "/no-image.png"}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description?.substring(0, 60)}...
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                  Rs {product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="error">
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
