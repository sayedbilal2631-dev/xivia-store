"use client";

import { Box, Button, Typography, Switch, FormControlLabel, MenuItem, Select } from "@mui/material";
import { StoreService } from "@/app/lib/services/store-services/storeServices";
import { useForm, Controller } from "react-hook-form";
import MUITextFieldEnhanced from "@/app/components/common/TextField";
import useCurrentUser from "@/app/hooks/getCurrentUser";
import { ProductFormData } from "@/app/collections/types";
import { STORE_CATEGORIES } from "@/app/constants/store";
import React, { useEffect } from "react";

const defaultValues: ProductFormData = {
  name: "",
  description: "",
  price: null,
  costPrice: null,
  category: "other" as any,
  tags: [],
  sku: "",
  barcode: "",
  stock: null,
  trackQuantity: true,
  allowBackorders: false,
  weight: 0,
  dimensions: { length: 0, width: 0, height: 0 },
  images: [],
  primaryImage: "",
  hasVariants: false,
  seo: { title: "", description: "", slug: "" },
  status: "draft" as any,
  isFeatured: false,
};

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  product?: ProductFormData | any;
}

const CreateProductForm = ({ open, setOpen, product }: Props) => {
  const user = useCurrentUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues,
  });

  /* fill the textfield while editing */
  useEffect(() => {
    if (product) {
      reset({
        ...defaultValues,
        ...product,
      });
    } else {
      reset(defaultValues);
    }
  }, [product, reset]);

  // submit handler
  const onSubmit = async (data: ProductFormData) => {
    if (!user) {
      alert("Please sign in first.");
      return;
    }

    try {
      if (product) {
        // UPDATE MODE
        await StoreService.updateProduct(product.id, {
          ...data,
          storeId: user.uid,
        });

        alert("✅ Product updated successfully!");
      } else {
        // CREATE MODE
        await StoreService.createProduct({
          ...data,
          storeId: user.uid,
        });

        alert("✅ Product created successfully!");
      }

      setOpen(false);
      reset(defaultValues);
    } catch (error) {
      console.error("❌ Error saving product:", error);
      alert("Failed to save product. Check console for details.");
    }
  };

  /* UI  */
  return (
    <Box display="flex" justifyContent="center" py={4}>
      <Box sx={{ width: "100%", p: { xs: 0.5, md: 4 } }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          {product ? "Update Product" : "Create New Product"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* BASIC INFO */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "Product name is required" }}
            render={({ field, fieldState }) => (
              <MUITextFieldEnhanced
                {...field}
                label="Product Name"
                fullWidth
                margin="normal"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={3}
                margin="normal"
              />
            )}
          />

          {/* CATEGORY */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "16px" }}
                {...field}
                fullWidth
              >
                {STORE_CATEGORIES.map((cat, i) => (
                  <MenuItem key={i} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          {/* PRICING & STOCK */}
          <Typography variant="h6" fontWeight={600} mt={3}>
            Pricing & Stock
          </Typography>

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} type="number" label="Price ($)" fullWidth margin="normal" />
            )}
          />

          <Controller
            name="costPrice"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} type="number" label="Cost Price ($)" fullWidth margin="normal" />
            )}
          />

          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} type="number" label="Stock" fullWidth margin="normal" />
            )}
          />

          {/* SKU & BARCODE */}
          <Controller name="sku" control={control} render={({ field }) => (
            <MUITextFieldEnhanced {...field} label="SKU" fullWidth margin="normal" />
          )} />

          <Controller name="barcode" control={control} render={({ field }) => (
            <MUITextFieldEnhanced {...field} label="Barcode" fullWidth margin="normal" />
          )} />

          {/* IMAGES */}
          <Typography variant="h6" fontWeight={600} mt={3}>
            Images
          </Typography>

          <Controller
            name="primaryImage"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} label="Primary Image URL" fullWidth margin="normal" />
            )}
          />

          {/* SWITCHES */}
          <Box mt={2}>
            {["trackQuantity", "allowBackorders", "isFeatured"].map((name: any) => (
              <FormControlLabel
                key={name}
                control={
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label={name}
              />
            ))}
          </Box>

          {/* SEO */}
          <Typography variant="h6" fontWeight={600} mt={3}>
            SEO Settings
          </Typography>

          <Controller name="seo.title" control={control} render={({ field }) => (
            <MUITextFieldEnhanced {...field} label="SEO Title" fullWidth margin="normal" />
          )} />

          <Controller name="seo.description" control={control} render={({ field }) => (
            <MUITextFieldEnhanced {...field} label="SEO Description" fullWidth multiline rows={2} margin="normal" />
          )} />

          <Controller name="seo.slug" control={control} render={({ field }) => (
            <MUITextFieldEnhanced {...field} label="Slug" fullWidth margin="normal" />
          )} />

          {/* SUBMIT */}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4, py: 1.3, fontWeight: 600 }}
            disabled={isSubmitting}
            type="submit"
          >
            {product
              ? isSubmitting ? "Updating Product..." : "Update Product"
              : isSubmitting ? "Creating Product..." : "Create Product"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreateProductForm;
