"use client";
import { Box, Card, CardContent, Typography, Switch, FormControlLabel, FormControl, InputLabel, Select, MenuItem, } from "@mui/material";
import { StoreService } from "@/app/lib/services/store-services/storeServices";
import { StoreFormData, StoreCategory } from "@/app/collections/schema";
import MUITextFieldEnhanced from "@/app/components/common/TextField";
import CustomButton from "@/app/components/common/Button";
import { useForm, Controller } from "react-hook-form";
import { auth } from "@/app/config/firebase";
import { useRouter } from "next/navigation";
import currencyCodes from "currency-codes";
import React from "react";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { toast } from "react-toastify";

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

// Currency list
const currencies = currencyCodes.data
  .map((info) => ({ code: info.code, name: info.currency }))
  .filter(Boolean);

// Default form values
const defaultValues: StoreFormData = {
  storeName: "",
  description: "",
  category: "other",
  sellerStripeId: '',
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
    currency: "PKR",
  },
  socialMedia: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
};

const CreateStoreForm: React.FC = () => {
  const { firebaseUser } = useUser();
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
    if (!firebaseUser?.uid) {
      toast.error("Please sign in first.");
      return;
    }

    try {
      const storeId = await StoreService.createStore({
        ...data,
        ownerId: firebaseUser.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: false,
      });
      alert(` Store created successfully (ID: ${storeId})`);
      reset(defaultValues);
      router.push("/store");
    } catch (error) {
      console.error(" Error creating store:", error);
      alert("Failed to create store. Check console for details.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" sx={{ width: { xs: "95%", md: "100%" } }}>
      <Card sx={{ width: "100%" }}>
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
                <MUITextFieldEnhanced
                  {...field}
                  label="Store Name"
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
                <MUITextFieldEnhanced {...field} label="Description" fullWidth rows={3} margin="normal" />
              )}
            />

            {/* CATEGORY */}
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel id="category-label">Store Category</InputLabel>
                  <Select
                    labelId="category-label"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    sx={{
                      borderRadius: 1,
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#888" },
                    }}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat.replace(/-/g, " ")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            {/* CONTACT */}
            <Typography variant="h6" fontWeight={600} mt={3}>
              Contact Info
            </Typography>
            {/* email */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
              }}
              render={({ field, fieldState }) => (
                <MUITextFieldEnhanced {...field} label="Email" fullWidth margin="normal" error={fieldState.error?.message} />
              )}
            />
            {/* stripe id */}
            <Controller
              name="sellerStripeId"
              control={control}
              rules={{
                required: "stripeId is required",
              }}
              render={({ field, fieldState }) => (
                <MUITextFieldEnhanced {...field} label="stripeId" fullWidth margin="normal" error={fieldState.error?.message} />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => <MUITextFieldEnhanced {...field} label="Phone" fullWidth margin="normal" />}
            />

            <Controller
              name="website"
              control={control}
              render={({ field }) => <MUITextFieldEnhanced {...field} label="Website" fullWidth margin="normal" />}
            />

            {/* ADDRESS */}
            <Typography variant="h6" fontWeight={600} mt={3}>
              Address
            </Typography>

            {(Object.keys(defaultValues.address) as (keyof typeof defaultValues.address)[]).map((key) => (
              <Controller
                key={key}
                name={`address.${key}` as const}
                control={control}
                render={({ field }) => (
                  <MUITextFieldEnhanced
                    {...field}
                    label={key.replace(/([A-Z])/g, " $1")}
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            ))}

            {/* SETTINGS */}
            <Typography variant="h6" fontWeight={600} mt={3}>
              Store Settings
            </Typography>

            {/* Currency Selector */}
            <Controller
              name="settings.currency"
              control={control}
              rules={{ required: "Currency is required" }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel id="currency-label">Store Currency</InputLabel>
                  <Select
                    labelId="currency-label"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    sx={{
                      borderRadius: 1,
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#888" },
                    }}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency.code} value={currency.code}>
                        {currency.name} ({currency.code})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="settings.allowReturns"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                  label="Allow Returns"
                />
              )}
            />

            {/* SOCIAL MEDIA */}
            <Typography variant="h6" fontWeight={600} mt={3}>
              Social Media
            </Typography>

            {(Object.keys(defaultValues.socialMedia) as (keyof typeof defaultValues.socialMedia)[]).map((key) => (
              <Controller
                key={key}
                name={`socialMedia.${key}` as const}
                control={control}
                render={({ field }) => <MUITextFieldEnhanced {...field} label={`${key} URL`} fullWidth margin="normal" />}
              />
            ))}

            <CustomButton type="submit" buttonType={"orange"} disabled={isSubmitting}>
              {isSubmitting ? "Creating Store..." : "Create Store"}
            </CustomButton>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateStoreForm;
