"use client";
import { Box, Card, CardContent, CardMedia, Typography, IconButton, Stack, Tooltip, } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Product } from "@/app/collections/schema";

const ShowProduct = ({
  data,
  onEdit,
  onDelete,
}: {
  data: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}) => {
  return (
    <Box sx={{ width: 260 }}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          transition: "0.3s",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-4px)",
          },
        }}
      >
        {/* Product Image */}
        <CardMedia
          component="img"
          height="150"
          image={data.images[0] || "/placeholder.png"}
          alt={data.name}
          sx={{ objectFit: "cover" }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          {/* Name */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            noWrap
            title={data.name}
            gutterBottom
          >
            {data.name}
          </Typography>

          {/* Price */}
          <Typography
            variant="h6"
            color="primary"
            fontWeight="bold"
          >
            ${data.price}
          </Typography>

          {/* Stock */}
          {typeof data.stock === "number" && (
            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              Stock: {data.stock}
            </Typography>
          )}

          {/* Description */}
          {data.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              mt={1}
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {data.description}
            </Typography>
          )}
        </CardContent>

        {/* Action Bar */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
          pb={1.5}
        >
          <Stack direction="row" spacing={1}>
            {/* Edit */}
            <Tooltip title="Edit product">
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEdit(data)}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Delete */}
          <Tooltip title="Delete product">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(data)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Card>
    </Box>
  );
};

export default ShowProduct;
