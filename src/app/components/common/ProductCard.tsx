"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext/CartContext";

interface GlobalCardProps {
  data: any;
}

const GlobalCard = ({ data }: GlobalCardProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [wishlisted, setWishlisted] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const goToProduct = (id: number) => router.push(`/products/${id}`);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  const discount = data.discountPercentage
    ? Math.round(data.discountPercentage)
    : 0;
  const originalPrice =
    discount > 0 ? (data.price / (1 - discount / 100)).toFixed(2) : null;
  const title = data.title.split(" ").slice(0, 2).join(" ");

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
            hovered === data.id && data.images[1]
              ? data.images[1]
              : data.thumbnail
          }
          alt={data.title}
          fill
          style={{
            objectFit: "cover",
            transition: "all 0.5s ease",
            transform: hovered === data.id ? "scale(1.1)" : "scale(1)",
            cursor: "pointer",
          }}
        />

        {/* Hover Overlay - Quick View Button */}
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
              transition: "all 0.3s ease",
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
            display: "flex",
            flexDirection: "column",
            gap: 1,
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
              transition: "all 0.3s ease",
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
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Rating value={data.rating || 4} size="small" readOnly precision={0.5} />
          <Typography variant="caption" color="text.secondary">
            ({data.rating || "4.0"})
          </Typography>
        </Box>

        {/* Price & Cart */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            mt: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              ${data.price}
            </Typography>
            {originalPrice && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ${originalPrice}
              </Typography>
            )}
          </Box>

          <IconButton
            sx={{
              bgcolor: "white",
              color: "primary.main",
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
              boxShadow: 2,
            }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GlobalCard;
