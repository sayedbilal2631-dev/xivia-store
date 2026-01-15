"use client";

import { Box, Card, CardContent, Typography, Rating, IconButton, Button, } from "@mui/material";
import { getOrCreateConversation } from "@/app/services/messages/messagingServices";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCart } from "@/app/context/CartContext/CartContext";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface GlobalCardProps {
  data: any;
}

const GlobalCard = ({ data }: GlobalCardProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [wishlisted, setWishlisted] = useState(false);

  const router = useRouter();
  const { addToCart } = useCart();
  const { firebaseUser, loading } = useUser();

  const goToProduct = (id: number) => router.push(`/products/${id}`);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted((prev) => !prev);
  };

  const handleAskPrice = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (loading) return;

    if (!firebaseUser) {
      router.push("/login");
      return;
    }

    try {
      const conversationId = await getOrCreateConversation(
        data,
        firebaseUser.uid
      );

      router.push(`/store/pages/messages/${conversationId}`);
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  return (
    <Card
      key={data.id}
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        position: "relative",
        overflow: "visible",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid rgba(0,0,0,0.05)",
        "&:hover": {
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        },
      }}
      onMouseEnter={() => setHovered(data.id)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => goToProduct(data.id)}
    >
      {/* Image Section */}
      <Box sx={{ position: "relative", overflow: "hidden", height: 250 }}>
        <Image
          src={
            hovered === data.id && data.images?.[1]
              ? data.images[1]
              : data.thumbnail
          }
          alt={data.title}
          sizes="250px"
          fill
          style={{
            objectFit: "cover",
            transition: "all 0.5s ease",
            transform: hovered === data.id ? "scale(1.1)" : "scale(1)",
            cursor: "pointer",
          }}
        />

        {/* Hover Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3))",
            opacity: hovered === data.id ? 1 : 0,
            transition: "opacity 0.3s ease",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            pb: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<VisibilityIcon />}
            size="small"
            sx={{
              borderRadius: "25px",
              textTransform: "none",
              fontWeight: "bold",
              background: "rgba(255,255,255,0.9)",
              color: "text.primary",
              "&:hover": {
                background: "white",
                transform: "translateY(-2px)",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              goToProduct(data.id);
            }}
          >
            Quick View
          </Button>
        </Box>

        {/* Wishlist Button */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <IconButton
            onClick={handleWishlist}
            sx={{
              bgcolor: "white",
              color: wishlisted ? "red" : "text.secondary",
              "&:hover": {
                bgcolor: "white",
                color: "red",
                transform: "scale(1.1)",
              },
              boxShadow: 2,
            }}
          >
            {wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="caption"
          color="primary"
          fontWeight="bold"
          sx={{ textTransform: "uppercase", letterSpacing: "0.5px" }}
        >
          {data.category}
        </Typography>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mt: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.3,
          }}
        >
          {data.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Rating value={data.rating || 4} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            ({data.rating || "4.0"})
          </Typography>
        </Box>

        {/* Price + Actions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1.5,
          }}
        >
          <Typography variant="h6" color="primary" fontWeight="bold">
            ${data.price}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {/* Chat / Ask Price */}
            <IconButton
              onClick={handleAskPrice}
              disabled={loading}
              sx={{
                bgcolor: "white",
                color: "secondary.main",
                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "white",
                  transform: "scale(1.1)",
                },
                boxShadow: 2,
              }}
            >
              <ChatIcon />
            </IconButton>

            {/* Add to Cart */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                addToCart(data.id);
              }}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                  transform: "scale(1.1)",
                },
                boxShadow: 2,
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GlobalCard;
