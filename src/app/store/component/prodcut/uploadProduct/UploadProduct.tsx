"use client";

import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm, Controller, DefaultValues } from "react-hook-form";
import MUITextFieldEnhanced from "@/app/components/common/TextField";
import { useRouter } from "next/navigation";
import { StoreService } from "@/app/lib/services/store-services/storeServices";
import useCurrentUser from "@/app/hooks/getCurrentUser";
import { ProductFormData } from "@/app/collections/types";
import { STORE_CATEGORIES } from "@/app/constants/store";


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

const CreateProductForm = ({ open, setOpen }: any) => {
  const router = useRouter();
  const user = useCurrentUser();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues,
  });

  const onSubmit = async (data: ProductFormData) => {
    if (!user) {
      alert("Please sign in first.");
      return;
    }

    try {
      await StoreService.createProduct({
        ...data,
        storeId: user.uid,
      });

      alert("✅ Product created successfully!");
      setOpen(!open)
      reset(defaultValues);
    } catch (error) {
      console.error("❌ Error creating product:", error);
      alert("Failed to create product. Check console for details.");
    }
  };
  return (
    <Box display="flex" justifyContent="center" py={4}>
      <Box
        sx={{
          width: "100%",
          p: { xs: 0.5, md: 4 },
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          Create New Product
        </Typography>

        <Box>
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
            {/* Descripion */}
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
                <Select sx={{ backgroundColor: '#f9f9f9', borderRadius: "16px", "&hover": { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } }} {...field} title="Category" fullWidth >
                  {STORE_CATEGORIES.map((cat, i) => (
                    <MenuItem key={i} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            {/* PRICING */}
            <Typography variant="h6" fontWeight={600} mt={3}>
              Pricing & Stock
            </Typography>

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <MUITextFieldEnhanced
                  {...field}
                  type="number"
                  label="Price ($)"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="costPrice"
              control={control}
              render={({ field }) => (
                <MUITextFieldEnhanced
                  {...field}
                  type="number"
                  label="Cost Price ($)"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            {/* Stock */}
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <MUITextFieldEnhanced
                  {...field}
                  type="number"
                  label='Stock'
                  fullWidth
                  margin="normal"
                />
              )}
            />

            {/* SKU & BARCODE */}
            <Controller
              name="sku"
              control={control}
              render={({ field }) => (
                <MUITextFieldEnhanced {...field} label="SKU" fullWidth margin="normal" />
              )}
            />
            {/* Barcode */}
            <Controller
              name="barcode"
              control={control}
              render={({ field }) => (
                <MUITextFieldEnhanced
                  {...field}
                  label="Barcode (optional)"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            {/* IMAGES */}
            <Typography variant="h6" fontWeight={600} mt={3}>
              Images
            </Typography>

            {/* Product images */}
            <Controller
              name="primaryImage"
              control={control}
              render={({ field }) => (
                <MUITextFieldEnhanced
                  {...field}
                  label="Primary Image URL"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            {/* SWITCHES */}
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Controller
                    name="trackQuantity"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label="Track Quantity"
              />

              <FormControlLabel
                control={
                  <Controller
                    name="allowBackorders"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label="Allow Backorders"
              />

              <FormControlLabel
                control={
                  <Controller
                    name="isFeatured"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label="Featured Product"
              />
            </Box>

            {/* SEO */}
            <Typography variant="h6" fontWeight={600} mt={3}>
              SEO Settings
            </Typography>

            <Controller
              name="seo.title"
              control={control}
              render={({ field }) => (
                <MUITextFieldEnhanced {...field} label="SEO Title" fullWidth margin="normal" />
              )}
            />

            <Controller
              name="seo.description"
              control={control}
              render={({ field }) => (
                <MUITextFieldEnhanced
                  {...field}
                  label="SEO Description"
                  fullWidth
                  multiline
                  rows={2}
                  margin="normal"
                />
              )}
            />

            <Controller
              name="seo.slug"
              control={control}
              // rules={{ required: "Slug is required" }}
              render={({ field, fieldState }) => (
                <MUITextFieldEnhanced
                  {...field}
                  label="Slug (URL path)"
                  fullWidth
                  margin="normal"
                  error={fieldState.error?.message}
                />
              )}
            />

            {/* SUBMIT BUTTON */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 4, py: 1.3, fontWeight: 600 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Product..." : "Create Product"}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateProductForm;
