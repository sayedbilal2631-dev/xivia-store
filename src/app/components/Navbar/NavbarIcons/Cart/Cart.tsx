"use client";
import {
  Box,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
import {
  ProductionQuantityLimits,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext/CartContext";

const Cart = () => {
  const [openCart, setOpenCart] = useState(false);
  const { cartCount } = useCart();

  return (
    <Box>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <IconButton
          onMouseEnter={() => setOpenCart(true)}
          onMouseLeave={() => setOpenCart(false)}
          sx={{ color: "black" }}
        >
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

        {openCart && (
          <Box
            onMouseEnter={() => setOpenCart(true)}
            onMouseLeave={() => setOpenCart(false)}
            sx={{
              position: "absolute",
              top: "100%",
              right: 0,
              bgcolor: "white",
              boxShadow: 3,
              p: 2,
              minWidth: "220px",
              minHeight: "150px",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            {cartCount > 0 ? (
              <>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  You have {cartCount} item{cartCount > 1 ? "s" : ""} in your cart
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "primary.main",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  View Cart
                </Typography>
              </>
            ) : (
              <>
                <ProductionQuantityLimits sx={{ fontSize: "50px", color: "gray" }} />
                <Typography sx={{ fontSize: "12px" }}>
                  Shopping cart is empty
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
