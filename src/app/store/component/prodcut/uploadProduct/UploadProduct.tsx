"use client";

import { StoreService } from "@/app/lib/services/store-services/storeServices";
import MUITextFieldEnhanced from "@/app/components/common/TextField";
import { Box, Typography, MenuItem, Select } from "@mui/material";
import CustomButton from "@/app/components/common/Button";
import { ProductFormData } from "@/app/collections/types";
import { productCategories } from "@/app/constants/store";
import { uploadToCloudinary } from "@/app/lib/cloudinary";
import useCurrentUser from "@/app/hooks/getCurrentUser";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { toast } from "react-toastify";

const defaultValues: ProductFormData = {
  name: "",
  description: "",
  price: null,
  costPrice: null,
  category: "automotive",
  tags: [],
  sku: "",
  barcode: "",
  stock: null,
  trackQuantity: true,
  allowBackorders: false,
  weight: 0,
  dimensions: { length: 0, width: 0, height: 0 },
  primaryImage: "",
  images: [],
  hasVariants: false,
  seo: { title: "", description: "", slug: "" },
  status: "active",
  isFeatured: false,
  sellerStripeId: ''
};

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  product?: any;
}

const CreateProductForm = ({ open, setOpen, product }: Props) => {
  const { user, sellerStripeId } = useCurrentUser();
  const [uploading, setUploading] = useState(false);


  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues,
  });

  const primaryImage = watch("primaryImage");
  const images = watch("images");
  
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

  const onSubmit = async (data: ProductFormData) => {
    if (!user) {
      toast.error("Please sign in first.");
      return;
    }

    try {
      if (product) {
        await StoreService.updateProduct(product.id, {
          ...data,
          storeId: user.uid,
        });
        toast.success("Product updated successfully!");
      } else {
        await StoreService.createProduct({
          ...data,
          storeId: user.uid,
          sellerStripeId: sellerStripeId
        });
        toast.success("Product created successfully!");
      }

      reset(defaultValues);
      setOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product.");
    }
  };

  const removePrimaryImage = () => {
    const currentImages = watch("images") || [];

    if (currentImages.length > 0) {
      setValue("primaryImage", currentImages[0]);
      setValue("images", currentImages.slice(1));
    } else {
      setValue("primaryImage", "");
    }
  };

  const removeGalleryImage = (index: number) => {
    const currentImages = watch("images") || [];
    setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  return (
    <Box display="flex" justifyContent="center" py={4}>
      <Box sx={{ width: "100%", p: { xs: 1, md: 4 } }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          {product ? "Update Product" : "Create New Product"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Product name is required" }}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} label="Product Name" fullWidth />
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
              />
            )}
          />

          <Controller
            name="sku"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} label="SKU" fullWidth />
            )}
          />

          <Controller
            name="barcode"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} label="Barcode" fullWidth />
            )}
          />

          <Typography mt={2} fontWeight={600}>
            Category
          </Typography>

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select {...field} fullWidth sx={{ mt: 1 }}>
                {productCategories.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          <Typography variant="h6" fontWeight={600} mt={4}>
            Pricing
          </Typography>

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} label="Price" type="number" />
            )}
          />

          <Controller
            name="costPrice"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced
                {...field}
                label="Cost Price"
                type="number"
              />
            )}
          />

          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} label="Stock" type="number" />
            )}
          />

          <Typography variant="h6" fontWeight={600} mt={4}>
            Shipping Info
          </Typography>

          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} label="Weight (kg)" />
            )}
          />

          <Typography variant="h6" fontWeight={600} mt={4}>
            SEO Settings
          </Typography>

          <Controller
            name="seo.title"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} label="SEO Title" fullWidth />
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
              />
            )}
          />

          <Controller
            name="seo.slug"
            control={control}
            render={({ field }) => (
              <MUITextFieldEnhanced {...field} label="SEO Slug" fullWidth />
            )}
          />

          <Typography mt={3} fontWeight={600}>
            Status
          </Typography>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select {...field} fullWidth>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            )}
          />

          <Typography variant="h6" fontWeight={600} mt={4}>
            Primary Image
          </Typography>

          <Controller
            name="primaryImage"
            control={control}
            render={() => (
              <MUITextFieldEnhanced
                type="file"
                fullWidth
                label=""
                margin="normal"
                inputProps={{
                  accept: "image/*",
                  multiple: true,
                }}
                InputLabelProps={{ shrink: true }}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  const files: File[] = Array.from(
                    e.target.files as FileList
                  );

                  if (files.length === 0) return;

                  setUploading(true);

                  try {
                    const uploadedUrls: string[] = [];

                    for (const file of files) {
                      const uploaded = await uploadToCloudinary(file);
                      uploadedUrls.push(uploaded.url);
                    }

                    const existingPrimary = watch("primaryImage");
                    const existingImages = watch("images") || [];

                    if (!existingPrimary) {
                      setValue("primaryImage", uploadedUrls[0]);
                      setValue("images", [
                        ...existingImages,
                        ...uploadedUrls.slice(0),
                      ]);
                    } else {
                      setValue("images", [...existingImages, ...uploadedUrls]);
                    }
                  } catch (error) {
                    console.error("Upload failed:", error);
                  }

                  setUploading(false);
                  e.target.value = "";
                }}
              />
            )}
          />

          {primaryImage && (
            <Box mt={3}>
              <Typography fontWeight={600}>Primary Image Preview:</Typography>

              <Box position="relative" display="inline-block" mt={1}>
                <img title="Image" src={primaryImage} width={200} />

                <Button
                  type="button"
                  onclick={removePrimaryImage} />
              </Box>
            </Box>
          )}

          {images?.length > 0 && (
            <Box mt={3}>
              <Typography fontWeight={600}>Other Images Preview:</Typography>

              <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
                {images.map((img, i) => (
                  <Box key={i} position="relative">
                    <img title="Image" src={img} width={120} />

                    <Button
                      type="button"
                      onclick={() => removeGalleryImage(i)} />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Typography variant="h6" fontWeight={600} mt={4}>
            Options
          </Typography>

          <Box mt={4}>
            <CustomButton
              variant="contained"
              disabled={isSubmitting || uploading}
              type="submit"
              buttonType="orange"
            >
              {product ? "Update Product" : "Create Product"}
            </CustomButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreateProductForm;
