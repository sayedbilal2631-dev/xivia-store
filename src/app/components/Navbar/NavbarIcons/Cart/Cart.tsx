"use client";
import { ProductionQuantityLimits, ShoppingCartCheckoutOutlined, } from "@mui/icons-material";
import { StoreService } from "@/app/lib/services/store-services/storeServices";
import { Box, IconButton, Typography, Badge, Drawer, } from "@mui/material";
import { useCart } from "@/app/context/CartContext/CartContext";
import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";

const Cart = () => {
  const [openCart, setOpenCart] = useState(false);
  const { cartItems, cartCount, } = useCart();
  const [cartProducts, setCartProducts] = useState<any[]>([]);

  const handleToggleCart = (state: boolean) => () => {
    setOpenCart(state);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      // Fetch all products
      Promise.all(
        cartItems.map((id) =>
          StoreService.getProductById(id)
        )
      ).then((data) => {
        setCartProducts(data);
      });
    } else {
      setCartProducts([]);
    }
  }, [cartItems]);
  return (
    <Box>
      {/* Cart Icon */}
      <IconButton onClick={handleToggleCart(true)} sx={{ color: "black" }}>
        <Badge
          badgeContent={cartCount > 9 ? "9+" : cartCount}
          color="error"
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.7rem",
              height: "18px",
              minWidth: "18px",
            },
          }}
        >
          <ShoppingCartCheckoutOutlined fontSize="medium" />
        </Badge>
      </IconButton>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={openCart}
        onClose={handleToggleCart(false)}
        PaperProps={{
          sx: {
            width: { xs: "80%", sm: 350 },
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 4,
          },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          {cartCount > 0 ? (
            <>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Your Cart
              </Typography>

              {/* ✅ Map and send product data to CartProduct */}
              {cartProducts.map((product, idx) => (
                <Box key={idx} sx={{ mt: 2 }}>
                  <CartProduct data={product} />
                </Box>
              ))}
            </>
          ) : (
            <>
              <ProductionQuantityLimits
                sx={{ fontSize: 60, color: "gray", mb: 1 }}
              />
              <Typography sx={{ fontSize: 14, textAlign: "center" }}>
                Your shopping cart is empty
              </Typography>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Cart;
