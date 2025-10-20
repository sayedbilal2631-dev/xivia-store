"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/app/config/firebase";
import GlobalCard from "@/app/components/common/globalCard";



const UserProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // ✅ Query products where userId == current user's UID
          const q = query(collection(db, "products"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);

          const userProducts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as [];

          setProducts(userProducts);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Typography>Loading products...</Typography>;
  }

  if (products.length === 0) {
    return <Typography>No products found for this user.</Typography>;
  }

  return (
    <div id="product">
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
        {products.map((product) => (
          <GlobalCard data = {product} />
        ))}
      </Box>
    </div>
  );
};

export default UserProduct;