"use client";
import { Box, Button, Card, CardContent, Typography, Switch, FormControlLabel, } from "@mui/material";
import { StoreService } from "@/app/lib/services/store-services/storeServices";
import { StoreFormData, StoreCategory } from "@/app/collections/schema";
import MUITextFieldEnhanced from "@/app/components/common/TextField";
import { useForm, Controller } from "react-hook-form";
import { auth } from "@/app/config/firebase";
import { useRouter } from "next/navigation";
import React from "react";

// Categories
const categories: StoreCategory[] = [
  "electronics",
  "fashion",
  "home-garden",
  "beauty-health",
  "sports-outdoors",
  "food-grocery",
  "books-media",
  "toys-games",
  "automotive",
  "other",
];

// Default form values
const defaultValues: StoreFormData = {
  storeName: "",
  description: "",
  category: "other",
  email: "",
  phone: "",
  website: "",
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  settings: {
    allowReturns: true,
    returnPeriod: 7,
    minimumOrder: 0,
    freeShippingThreshold: 0,
  },
  socialMedia: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
};

const CreateStoreForm: React.FC = () => {
  const user = auth.currentUser;
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<StoreFormData>({
    defaultValues,
  });

  const onSubmit = async (data: StoreFormData) => {
    if (!user) {
      alert("Please sign in first.");
      return;
    }

    try {
      const storeId = await StoreService.createStore({
        ...data,
        ownerId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: false,
      });
      alert(`✅ Store created successfully (ID: ${storeId})`);
      reset(defaultValues);
      router.push("/store");
    } catch (error) {
      console.error("❌ Error creating store:", error);
      alert("Failed to create store. Check console for details.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" py={4} sx={{ width: { xs: '95%', md: '100%' } }}>
      <Card
        sx={{
          width: "100%",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          🏪 Create Your Store
        </Typography>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* BASIC INFO */}
            <Controller
              name="storeName"
              control={control}
              rules={{ required: "Store name is required" }}
              render={({ field, fieldState }) => (
                <MUITextFieldEnhanced  {...field} label="Store Name" fullWidth margin="normal" error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <MUITextFieldEnhanced  {...field} label="Description" fullWidth rows={3} margin="normal"
                />
              )}
            />

            {/* CONTACT */}
            <Typography variant="h6" fontWeight={600} mt={3}> Contact Info </Typography>

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              }}
              render={({ field, fieldState }) => (
                <MUITextFieldEnhanced {...field} label="Email" fullWidth margin="normal" error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <MUITextFieldEnhanced {...field} label="Phone" fullWidth margin="normal" />
              )}
            />

            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <MUITextFieldEnhanced {...field} label="Website" fullWidth margin="normal" />
              )}
            />

            {/* ADDRESS */}
            <Typography variant="h6" fontWeight={600} mt={3}>
              Address
            </Typography>

            {(Object.keys(defaultValues.address) as (keyof typeof defaultValues.address)[]).map(
              (key) => (
                <Controller
                  key={key}
                  name={`address.${key}` as const}
                  control={control}
                  render={({ field }) => (
                    <MUITextFieldEnhanced {...field} label={key.replace(/([A-Z])/g, " $1")} fullWidth margin="normal"
                    />
                  )}
                />
              )
            )}

            {/* SETTINGS */}
            <Typography variant="h6" fontWeight={600} mt={3}>
              Store Settings
            </Typography>

            <Controller
              name="settings.allowReturns"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Allow Returns"
                />
              )}
            />


            {/* SOCIAL MEDIA */}
            <Typography variant="h6" fontWeight={600} mt={3}>
              Social Media
            </Typography>

            {(Object.keys(defaultValues.socialMedia) as (keyof typeof defaultValues.socialMedia)[]).map(
              (key) => (
                <Controller
                  key={key}
                  name={`socialMedia.${key}` as const}
                  control={control}
                  render={({ field }) => (
                    <MUITextFieldEnhanced {...field} label={`${key} URL`} fullWidth margin="normal" />
                  )}
                />
              )
            )}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 3, py: 1.3, fontWeight: 600 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Store..." : "Create Store"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateStoreForm;
